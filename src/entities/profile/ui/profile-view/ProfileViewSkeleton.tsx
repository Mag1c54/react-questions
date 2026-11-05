import { CardSkeleton, Skeleton, SkeletonText } from "@/shared/ui";
import "./ProfileView.scss";

const SOCIALS = [0, 1, 2];
const SKILL_WIDTHS = [84, 106, 72, 96];

export const ProfileViewSkeleton = () => (
  <div className="profile-view" role="status" aria-label="Загрузка профиля">
    <CardSkeleton
      as="section"
      padding="none"
      radius="md"
      className="profile-view__card profile-view__header"
    >
      <Skeleton width={120} height={140} radius="md" className="profile-view__avatar" />

      <div className="profile-view__info">
        <Skeleton width="45%" height={24} />
        <Skeleton width="32%" height={14} />
        <Skeleton width="26%" height={13} />

        <div className="profile-view__contacts">
          <Skeleton width="36%" height={13} />
          <Skeleton width="48%" height={13} />
        </div>

        <div className="profile-view__socials">
          {SOCIALS.map((item) => (
            <Skeleton key={item} width={24} height={24} circle />
          ))}
        </div>
      </div>
    </CardSkeleton>

    <CardSkeleton as="section" padding="none" radius="md" className="profile-view__card">
      <div className="profile-view__head">
        <Skeleton width={100} height={16} />
      </div>
      <SkeletonText lines={3} />
    </CardSkeleton>

    <CardSkeleton as="section" padding="none" radius="md" className="profile-view__card">
      <div className="profile-view__head">
        <Skeleton width={90} height={16} />
      </div>

      <div className="profile-view__skills">
        {SKILL_WIDTHS.map((width) => (
          <Skeleton key={width} width={width} height={32} radius="md" />
        ))}
      </div>
    </CardSkeleton>
  </div>
);
