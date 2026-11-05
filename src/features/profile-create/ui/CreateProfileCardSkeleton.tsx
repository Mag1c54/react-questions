import { CardSkeleton, Skeleton, SkeletonText } from "@/shared/ui";
import "./CreateProfileCard.scss";

const CHIP_WIDTHS = [104, 132, 88, 118];

export const CreateProfileCardSkeleton = () => (
  <CardSkeleton
    as="section"
    padding="lg"
    radius="lg"
    className="create-profile"
    role="status"
    aria-label="Загрузка создания профиля"
  >
    <Skeleton width="40%" height={26} />
    <SkeletonText lines={2} lastLineWidth="72%" />

    <div className="create-profile__chips">
      {CHIP_WIDTHS.map((width) => (
        <Skeleton key={width} width={width} height={36} radius="md" />
      ))}
    </div>

    <Skeleton width={170} height={40} radius="md" className="create-profile__btn" />
  </CardSkeleton>
);
