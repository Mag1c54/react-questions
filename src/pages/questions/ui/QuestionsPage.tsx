import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import type {
  GetPublicQuestionsResponse,
  FetchQuestionsParams,
} from "@/entities/question/model/types";
import { fetchQuestions } from "@/entities/question/api/questionApi";
import { parsePositiveInt } from "@/shared/lib/parseParams";
import { QuestionsListWidget } from "@/widgets/question-list-widget/ui/QuestionListWidget";
import { QuestionNavigationWidget } from "@/widgets/question-navigation-widget/ui/QuestionNavigationWidget";
import "./QuestionsPage.scss";
import { VscSettings } from "react-icons/vsc";

export const QuestionsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<GetPublicQuestionsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const limit = 10;
  const currentPage = parsePositiveInt(searchParams.get("page"));
  const totalPages = data ? Math.max(1, Math.ceil(data.total / limit)) : 1;

  useEffect(() => {
    const controller = new AbortController();

    const loadQuestions = async () => {
      setLoading(true);
      setError(null);
      const queryParams: FetchQuestionsParams = {
        page: currentPage,
        limit,
        title: searchParams.get("title") || undefined,
        complexity: searchParams.get("complexity") || undefined,
        skills: searchParams.get("skills") || undefined,
        rate: searchParams.get("rate") || undefined,
        order: "ASC",
        orderBy: "createdAt",
      };

      try {
        const responseData = await fetchQuestions(queryParams, controller.signal);
        setData(responseData);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError((err as Error).message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    const timeoutId = setTimeout(loadQuestions, 300);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [searchParams, currentPage]);

  useEffect(() => {
    if (!data || loading || currentPage <= totalPages) return;

    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (totalPages > 1) next.set("page", String(totalPages));
        else next.delete("page");
        return next;
      },
      { replace: true },
    );
  }, [data, loading, currentPage, totalPages, setSearchParams]);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", String(newPage));
    setSearchParams(newParams);
  };

  return (
    <main className="page-container">
      <div className="page-content">
        <section className="question-container">
          <div className="question-header">
            <h1>Вопросы</h1>
            <button
              type="button"
              className="sidebar-toggle"
              aria-label="Открыть настройки"
              onClick={() => setIsSidebarOpen(true)}
            >
              <VscSettings />
            </button>
          </div>

          <QuestionsListWidget
            data={data}
            loading={loading}
            error={error}
            page={currentPage}
            limit={limit}
            onPageChange={handlePageChange}
          />
        </section>

        <aside className={`right-sidebar ${isSidebarOpen ? "right-sidebar--open" : ""}`}>
          <button
            type="button"
            className="sidebar-close"
            onClick={() => setIsSidebarOpen(false)}
          >
            Закрыть
          </button>
          <QuestionNavigationWidget />
        </aside>
      </div>
    </main>
  );
};