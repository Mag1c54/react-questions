import { Skeleton, SkeletonText } from "@/shared/ui";
import "./ProfileSpecializationPicker.scss";

const PROFILE_CHIP_WIDTHS = [116, 94, 128];

export const ProfileSpecializationPickerSkeleton = () => (
  <div className="spec-picker" role="status" aria-label="Загрузка специализаций">
    <div className="spec-picker__current">
      <Skeleton width={150} height={13} />

      <div className="spec-picker__chips">
        {PROFILE_CHIP_WIDTHS.map((width) => (
          <Skeleton key={width} width={width} height={36} radius="md" />
        ))}
      </div>
    </div>

    <div className="spec-picker__add">
      <Skeleton width={180} height={13} />

      <div className="spec-picker__add-row">
        <Skeleton height={44} radius="md" className="spec-picker__select" />
        <Skeleton width={100} height={40} radius="md" />
      </div>
    </div>

    <SkeletonText lines={2} lastLineWidth="84%" />
  </div>
);
