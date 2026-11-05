import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { VscSettings } from "react-icons/vsc";
import { useGetPublicQuestionsQuery } from "@/entities/question";
import { getErrorMessage } from "@/shared/lib";
import { parsePositiveInt } from "@/shared/lib";
import { useDebouncedValue } from "@/shared/lib";
import { QuestionsListWidget } from "@/widgets/question-list-widget";
import { QuestionNavigationWidget } from "@/widgets/question-navigation-widget";
import { Button, Card } from "@/shared/ui";
import "./QuestionsPage.scss";

const LIMIT = 10;

export const QuestionsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const currentPage = parsePositiveInt(searchParams.get("page"));
  const title = useDebouncedValue(searchParams.get("title") ?? "");

  const { data, isFetching, isError, error } = useGetPublicQuestionsQuery({
    page: currentPage,
    limit: LIMIT,
    title: title || undefined,
    complexity: searchParams.get("complexity") || undefined,
    skills: searchParams.get("skills") || undefined,
    rate: searchParams.get("rate") || undefined,
    order: "ASC",
    orderBy: "createdAt",
  });

  const totalPages = data ? Math.max(1, Math.ceil(data.total / LIMIT)) : 1;

  useEffect(() => {
    if (!data || isFetching || currentPage <= totalPages) return;

    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (totalPages > 1) next.set("page", String(totalPages));
        else next.delete("page");
        return next;
      },
      { replace: true },
    );
  }, [data, isFetching, currentPage, totalPages, setSearchParams]);

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
        <Card as="section" padding="none" radius="lg" shadow className="question-container">
          <div className="question-header">
            <h1>Вопросы</h1>
            <Button
              type="button"
              variant="outline"
              iconOnly
              className="sidebar-toggle"
              aria-label="Открыть настройки"
              onClick={() => setIsSidebarOpen(true)}
            >
              <VscSettings aria-hidden="true" />
            </Button>
          </div>

          <QuestionsListWidget
            data={data ?? null}
            loading={isFetching}
            error={isError ? getErrorMessage(error) : null}
            page={currentPage}
            limit={LIMIT}
            onPageChange={handlePageChange}
          />
        </Card>

        <aside className={`right-sidebar ${isSidebarOpen ? "right-sidebar--open" : ""}`}>
          <Button
            type="button"
            variant="outline"
            className="sidebar-close"
            onClick={() => setIsSidebarOpen(false)}
          >
            Закрыть
          </Button>
          <QuestionNavigationWidget />
        </aside>
      </div>
    </main>
  );
};
