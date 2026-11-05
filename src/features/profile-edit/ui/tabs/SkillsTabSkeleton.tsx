import { FormRow, Skeleton } from "@/shared/ui";
import "../EditProfileForm.scss";

const SKILL_WIDTHS = [88, 112, 76, 96];

export const SkillsTabSkeleton = () => (
  <div role="status" aria-label="Загрузка навыков">
    <FormRow title="Твои навыки" hint="Покажи что ты умеешь и в чём ты действительно хорошо">
      <div className="profile-edit__skills">
        <div className="profile-edit__select-field">
          <Skeleton height={44} radius="md" />
        </div>

        <div className="profile-edit__selected">
          <Skeleton width={160} height={14} />

          <div className="profile-edit__tags">
            {SKILL_WIDTHS.map((width) => (
              <Skeleton key={width} width={width} height={32} radius="md" />
            ))}
          </div>
        </div>
      </div>
    </FormRow>
  </div>
);
