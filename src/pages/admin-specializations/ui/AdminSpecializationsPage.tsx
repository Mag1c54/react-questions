import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { FiSearch, FiTrash2, FiPlus } from "react-icons/fi";
import { CollectionImage } from "@/entities/collection/ui/collection-image/CollectionImage";

import {
  useDeleteSpecializationMutation,
  useGetSpecializationListQuery,
} from "@/entities/specialization/api/specializationApi";
import { QuestionPagination } from "@/features/question-pagination/ui/QuestionPagination";
import { formatDate } from "@/shared/lib/formatDate";
import { getApiErrorCode } from "@/shared/lib/getApiErrorCode";
import { getErrorMessage } from "@/shared/lib/getErrorMessage";
import { parsePositiveInt } from "@/shared/lib/parseParams";
import { useDebouncedValue } from "@/shared/lib/useDebouncedValue";
import "./AdminSpecializationsPage.scss";

const LIMIT = 10;

const DELETE_ERRORS: Record<string, string> = {
  "specialization.specialization.not_found": "уже удалена",
  "specialization.specialization.constraint.foreign_key_violation": "связана с другими данными",
  "specialization.question.constraint.foreign_key_violation": "используется в вопросах",
  "specialization.collection.constraint.foreign_key_violation": "используется в коллекциях",
  "auth.roles.admin": "нужны права администратора",
  "auth.user.verified": "нужно подтвердить почту",
};

const describeDeleteError = (error: unknown): string => {
  const code = getApiErrorCode(error);
  if (code && DELETE_ERRORS[code]) return DELETE_ERRORS[code];
  if ((error as { status?: number } | null)?.status === 403) return "недостаточно прав";
  return getErrorMessage(error);
};

export const AdminSpecializationsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parsePositiveInt(searchParams.get("page"));

  const [text, setText] = useState("");
  const title = useDebouncedValue(text.trim(), 400);

  const { data, isLoading, isFetching, isError, error } = useGetSpecializationListQuery({
    page,
    limit: LIMIT,
    title: title || undefined,
  });
  const [deleteSpecialization] = useDeleteSpecializationMutation();

  const listKey = `${page}|${title}`;
  const [selection, setSelection] = useState<{ key: string; ids: number[] }>({
    key: listKey,
    ids: [],
  });
  const selectedIds = selection.key === listKey ? selection.ids : [];
  const updateSelection = (ids: number[]) => setSelection({ key: listKey, ids });

  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteErrors, setDeleteErrors] = useState<string[]>([]);

  const rows = data?.data ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / LIMIT));
  const allSelected = rows.length > 0 && rows.every((row) => selectedIds.includes(row.id));
  const someSelected = selectedIds.length > 0 && !allSelected;

  useEffect(() => {
    if (!data || isFetching || page <= totalPages) return;

    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (totalPages > 1) next.set("page", String(totalPages));
        else next.delete("page");
        return next;
      },
      { replace: true },
    );
  }, [data, isFetching, page, totalPages, setSearchParams]);

  const setPage = (next: number) =>
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (next > 1) params.set("page", String(next));
      else params.delete("page");
      return params;
    });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    if (page !== 1) setPage(1);
  };

  const handleReset = () => {
    setText("");
    if (page !== 1) setPage(1);
  };

  const toggleRow = (id: number) =>
    updateSelection(
      selectedIds.includes(id) ? selectedIds.filter((item) => item !== id) : [...selectedIds, id],
    );

  const toggleAll = () => updateSelection(allSelected ? [] : rows.map((row) => row.id));

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Удалить выбранные специализации (${selectedIds.length})?`)) return;

    setIsDeleting(true);
    setDeleteErrors([]);

    const titleById = new Map(rows.map((row) => [row.id, row.title]));
    const results = await Promise.allSettled(
      selectedIds.map((id) => deleteSpecialization(id).unwrap()),
    );

    const failed = results.flatMap((result, index) =>
      result.status === "rejected" ? [{ id: selectedIds[index], reason: result.reason }] : [],
    );

    updateSelection(failed.map((item) => item.id));
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
      <div className={`admin-table__wrap ${isFetching ? "admin-table__wrap--loading" : ""}`}>
        <table className="admin-table">
          <thead>
            <tr>
              <th className="admin-table__check">
                <input
                  type="checkbox"
                  aria-label="Выбрать все на странице"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected;
                  }}
                  onChange={toggleAll}
                />
              </th>
              <th>Картинка</th>
              <th>Название</th>
              <th>Автор</th>
              <th>Дата создания</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="admin-table__check">
                  <input
                    type="checkbox"
                    aria-label={`Выбрать «${row.title}»`}
                    checked={selectedIds.includes(row.id)}
                    onChange={() => toggleRow(row.id)}
                  />
                </td>
                <td>
                  <CollectionImage src={row.imageSrc} className="admin-table__image" />
                </td>
                <td className="admin-table__title">{row.title}</td>
                <td className="admin-table__muted">{row.createdBy?.username ?? "—"}</td>
                <td className="admin-table__muted">{formatDate(row.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <section className="admin-page">
      <div className="admin-page__toolbar">
        <label className="admin-page__search">
          <FiSearch className="admin-page__search-icon" aria-hidden="true" />
          <input
            type="search"
            value={text}
            onChange={handleSearch}
            placeholder="Поиск"
            className="admin-page__search-input"
          />
        </label>

        <button
          type="button"
          className="admin-page__btn admin-page__btn--outline"
          disabled={!text}
          onClick={handleReset}
        >
          Сбросить фильтр
        </button>

        <button
          type="button"
          className="admin-page__btn admin-page__btn--danger"
          disabled={selectedIds.length === 0 || isDeleting}
          onClick={handleDeleteSelected}
        >
          <FiTrash2 aria-hidden="true" />
          {isDeleting
            ? "Удаляем..."
            : `Удалить выбранное${selectedIds.length > 0 ? ` (${selectedIds.length})` : ""}`}
        </button>
        <Link
          to="/admin/specializations/create"
          className="admin-page__btn admin-page__btn--primary"
        >
          Добавить
          <FiPlus aria-hidden="true" />
        </Link>
      </div>

      {deleteErrors.length > 0 && (
        <div className="admin-page__alert" role="alert">
          <p className="admin-page__alert-title">Не удалось удалить:</p>
          <ul className="admin-page__alert-list">
            {deleteErrors.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
          <button
            type="button"
            className="admin-page__alert-close"
            onClick={() => setDeleteErrors([])}
          >
            Закрыть
          </button>
        </div>
      )}

      <div className="admin-page__card">
        {renderTable()}

        {total > LIMIT && (
          <QuestionPagination
            currentPage={page}
            totalCount={total}
            limit={LIMIT}
            onPageChange={setPage}
          />
        )}
      </div>
    </section>
  );
};
