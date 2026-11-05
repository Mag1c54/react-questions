import { Skeleton } from "@/shared/ui";
import "./SpecializationsTable.scss";

const ROWS = [0, 1, 2, 3, 4];
const TITLE_WIDTHS = [170, 210, 150, 190, 160];

export const SpecializationsTableSkeleton = () => (
  <div className="specializations-table" role="status" aria-label="Загрузка специализаций">
    <table className="specializations-table__table">
      <thead>
        <tr>
          <th className="specializations-table__check">
            <Skeleton width={16} height={16} />
          </th>
          <th>Картинка</th>
          <th>Название</th>
          <th>Автор</th>
          <th>Дата создания</th>
        </tr>
      </thead>

      <tbody>
        {ROWS.map((row) => (
          <tr key={row}>
            <td className="specializations-table__check">
              <Skeleton width={16} height={16} />
            </td>
            <td>
              <Skeleton width={64} height={64} radius="md" />
            </td>
            <td className="specializations-table__title">
              <Skeleton width={TITLE_WIDTHS[row]} height={14} />
            </td>
            <td className="specializations-table__muted">
              <Skeleton width={110} height={13} />
            </td>
            <td className="specializations-table__muted">
              <Skeleton width={90} height={13} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
