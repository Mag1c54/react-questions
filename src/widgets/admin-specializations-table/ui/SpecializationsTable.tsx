import type { Specialization } from "@/entities/specialization/model/types";
import { formatDate } from "@/shared/lib/formatDate";
import { SafeImage } from "@/shared/ui";
import "./SpecializationsTable.scss";

interface SpecializationsTableProps {
  rows: Specialization[];
  selectedIds: number[];
  isFetching: boolean;
  onToggleRow: (id: number) => void;
  onToggleAll: () => void;
}

export const SpecializationsTable = ({
  rows,
  selectedIds,
  isFetching,
  onToggleRow,
  onToggleAll,
}: SpecializationsTableProps) => {
  const allSelected = rows.length > 0 && rows.every((row) => selectedIds.includes(row.id));
  const someSelected = selectedIds.length > 0 && !allSelected;

  return (
    <div className={`specializations-table ${isFetching ? "specializations-table--loading" : ""}`}>
      <table className="specializations-table__table">
        <thead>
          <tr>
            <th className="specializations-table__check">
              <input
                type="checkbox"
                aria-label="Выбрать все на странице"
                checked={allSelected}
                ref={(el) => {
                  if (el) el.indeterminate = someSelected;
                }}
                onChange={onToggleAll}
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
              <td className="specializations-table__check">
                <input
                  type="checkbox"
                  aria-label={`Выбрать «${row.title}»`}
                  checked={selectedIds.includes(row.id)}
                  onChange={() => onToggleRow(row.id)}
                />
              </td>
              <td>
                <SafeImage src={row.imageSrc} className="specializations-table__image" />
              </td>
              <td className="specializations-table__title">{row.title}</td>
              <td className="specializations-table__muted">{row.createdBy?.username ?? "—"}</td>
              <td className="specializations-table__muted">{formatDate(row.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
