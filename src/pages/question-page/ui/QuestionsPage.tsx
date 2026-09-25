import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import type {
  GetPublicQuestionsResponse,
  FetchQuestionsParams,
} from "@/entities/question/model/types";
import { fetchQuestions } from "@/entities/question/api";
import { QuestionsListWidget } from "@/widgets/question-list-widget/ui/QuestionListWidget";
import { QuestionNavigationWidget } from "@/widgets/question-navigation-widget/ui/QuestionNavigationWidget";
import "@/styles/question-page/QuestionPage.scss";

export const QuestionsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<GetPublicQuestionsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const limit = 10;
  const currentPage = Number(searchParams.get("page")) || 1;

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
        const responseData = await fetchQuestions(
          queryParams,
          controller.signal
        );
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

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", String(newPage));
    setSearchParams(newParams);
  };

  return (
    <main className="page-container">
      <div className="page-content">
        <section className="question-container">
           <h1>Вопросы</h1>
          <QuestionsListWidget
            data={data}
            loading={loading}
            error={error}
            page={currentPage}
            limit={limit}
            onPageChange={handlePageChange}
          />
        </section>

        <aside className="right-sidebar">
          <QuestionNavigationWidget />
        </aside>
      </div>
    </main>
  );
};