import { CardSkeleton, Skeleton, SkeletonFormRow } from "@/shared/ui";
import "./SpecializationForm.scss";

export const SpecializationFormSkeleton = () => (
  <div className="specialization-form" role="status" aria-label="Загрузка формы специализации">
    <div className="specialization-form__bar">
      <Skeleton width={32} height={32} circle />
      <Skeleton width={110} height={40} radius="md" />
    </div>

    <CardSkeleton as="section" padding="lg" shadow={false} className="specialization-form__card">
      <Skeleton width={160} height={22} />

      <SkeletonFormRow labelWidth={160} hintWidth={210}>
        <Skeleton width={320} height={44} radius="md" className="specialization-form__input" />
      </SkeletonFormRow>

      <SkeletonFormRow labelWidth={170} hintWidth={220}>
        <div className="ui-skeleton-upload">
          <Skeleton width={104} height={104} radius="md" />
          <Skeleton height={104} radius="lg" />
        </div>
      </SkeletonFormRow>

      <SkeletonFormRow stacked labelWidth={190} hintWidth={280}>
        <Skeleton height={140} radius="lg" />
      </SkeletonFormRow>
    </CardSkeleton>
  </div>
);
