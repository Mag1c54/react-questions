import { CardSkeleton, Skeleton, SkeletonFormRow } from "@/shared/ui";
import "./EditProfileForm.scss";

const TABS = [88, 64, 80];
const FIELDS = [0, 1, 2];
const FIELD_LABEL_WIDTHS = [90, 70, 60];
const LINK_LABEL_WIDTHS = [76, 92, 54];

export const EditProfileFormSkeleton = () => (
  <CardSkeleton as="section" padding="lg" radius="lg">
    <div className="profile-edit" role="status" aria-label="Загрузка формы редактирования профиля">
      <Skeleton width={240} height={24} />

      <div className="ui-skeleton-tabs">
        {TABS.map((width) => (
          <Skeleton key={width} width={width} height={32} />
        ))}
      </div>

      <div className="profile-edit__panel">
        <SkeletonFormRow labelWidth={120} hintWidth={220}>
          <div className="ui-skeleton-upload">
            <Skeleton width={104} height={104} radius="md" />
            <Skeleton height={104} radius="lg" />
          </div>
        </SkeletonFormRow>

        <SkeletonFormRow labelWidth={110} hintWidth={240}>
          <div className="ui-skeleton-chips">
            <Skeleton width={110} height={36} radius="md" />
            <Skeleton width={132} height={36} radius="md" />
          </div>

          <div className="ui-skeleton-row">
            <Skeleton height={44} radius="md" />
            <Skeleton width={100} height={40} radius="md" />
          </div>
        </SkeletonFormRow>

        <SkeletonFormRow labelWidth={160} hintWidth={200}>
          <div className="profile-edit__fields">
            {FIELDS.map((field) => (
              <div key={field} className="ui-skeleton-field">
                <Skeleton width={FIELD_LABEL_WIDTHS[field]} height={13} />
                <Skeleton height={44} radius="md" />
              </div>
            ))}
          </div>
        </SkeletonFormRow>

        <SkeletonFormRow labelWidth={110} hintWidth={230}>
          <div className="profile-edit__fields">
            {FIELDS.map((field) => (
              <div key={field} className="ui-skeleton-field">
                <Skeleton width={LINK_LABEL_WIDTHS[field]} height={13} />
                <Skeleton height={44} radius="md" />
              </div>
            ))}
          </div>
        </SkeletonFormRow>
      </div>

      <div className="profile-edit__footer">
        <Skeleton width={120} height={48} radius="md" />
      </div>
    </div>
  </CardSkeleton>
);
