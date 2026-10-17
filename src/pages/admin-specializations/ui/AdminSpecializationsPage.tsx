import { useState } from "react";
import { FiPlus, FiSearch, FiTrash2 } from "react-icons/fi";
import {
  useDeleteSpecializationMutation,
  useGetSpecializationListQuery,
} from "@/entities/specialization/api/specializationApi";
import { QuestionPagination } from "@/features/question-pagination/ui/QuestionPagination";
import { describeDeleteError } from "@/features/specialization-manage/model/errors";
import { ADMIN_ROUTES } from "@/shared/config/routes";
import { getErrorMessage } from "@/shared/lib/getErrorMessage";
import { runBulk } from "@/shared/lib/runBulk";
import { useDebouncedValue } from "@/shared/lib/useDebouncedValue";
import { useClampPage, usePageParam } from "@/shared/lib/usePageParam";
import { useRowSelection } from "@/shared/lib/useRowSelection";
import { Alert, Button, ButtonLink, Card, Input } from "@/shared/ui";
import { SpecializationsTable } from "@/widgets/admin-specializations-table/ui/SpecializationsTable";
import "./AdminSpecializationsPage.scss";

const LIMIT = 10;

export const AdminSpecializationsPage = () => {
  const { page, setPage } = usePageParam();

  const [text, setText] = useState("");
  const title = useDebouncedValue(text.trim(), 400);

  const { data, isLoading, isFetching, isError, error } = useGetSpecializationListQuery({
    page,
    limit: LIMIT,
    title: title || undefined,
  });
  const [deleteSpecialization] = useDeleteSpecializationMutation();

  const { selectedIds, setSelectedIds, toggle, toggleAll } = useRowSelection<number>(
    `${page}|${title}`,
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteErrors, setDeleteErrors] = useState<string[]>([]);

  const rows = data?.data ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / LIMIT));

  useClampPage(page, totalPages, Boolean(data) && !isFetching, setPage);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    if (page !== 1) setPage(1);
  };

  const handleReset = () => {
    setText("");
    if (page !== 1) setPage(1);
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Удалить выбранные специализации (${selectedIds.length})?`)) return;

    setIsDeleting(true);
    setDeleteErrors([]);

    const titleById = new Map(rows.map((row) => [row.id, row.title]));
    const failed = await runBulk(selectedIds, (id) => deleteSpecialization(id).unwrap());

    setSelectedIds(failed.map((item) => item.id));
    setDeleteErrors(
      failed.map(
        (item) => `«${titleById.get(item.id) ?? item.id}»: ${describeDeleteError(item.reason)}`,
      ),
    );
    setIsDeleting(false);
  };

  const renderTable = () => {
    if (isLoading) return <p className="admin-page__status">Загрузка...</p>;

    if (isError) {
      return (
        <p className="admin-page__status admin-page__status--error">{getErrorMessage(error)}</p>
      );
    }

    if (rows.length === 0) return <p className="admin-page__status">Ничего не найдено</p>;

    return (
      <SpecializationsTable
        rows={rows}
        selectedIds={selectedIds}
        isFetching={isFetching}
        onToggleRow={toggle}
        onToggleAll={() => toggleAll(rows.map((row) => row.id))}
      />
    );
  };

  return (
    <section className="admin-page">
      <Card radius="md" className="admin-page__toolbar">
        <Input
          type="search"
          value={text}
          onChange={handleSearch}
          placeholder="Поиск"
          leftIcon={<FiSearch />}
          wrapperClassName="admin-page__search"
        />

        <Button variant="outline" disabled={!text} onClick={handleReset}>
          Сбросить фильтр
        </Button>

        <div className="admin-page__actions">
          <Button
            variant="danger-outline"
            disabled={selectedIds.length === 0}
            isLoading={isDeleting}
            loadingText="Удаляем..."
            leftIcon={<FiTrash2 aria-hidden="true" />}
            onClick={handleDeleteSelected}
          >
            Удалить выбранное{selectedIds.length > 0 ? ` (${selectedIds.length})` : ""}
          </Button>

          <ButtonLink
            to={ADMIN_ROUTES.specializationCreate}
            rightIcon={<FiPlus aria-hidden="true" />}
          >
            Добавить
          </ButtonLink>
        </div>
      </Card>

      {deleteErrors.length > 0 && (
        <Alert title="Не удалось удалить:" onClose={() => setDeleteErrors([])}>
          <ul className="admin-page__errors">
            {deleteErrors.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        </Alert>
      )}

      <Card radius="lg" className="admin-page__card">
        {renderTable()}

        {total > LIMIT && (
          <QuestionPagination
            currentPage={page}
            totalCount={total}
            limit={LIMIT}
            onPageChange={setPage}
          />
        )}
      </Card>
    </section>
  );
};
