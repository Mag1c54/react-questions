import { Skeleton } from "@/shared/ui";
import { SocialAuthSkeleton } from "@/entities/session";
import "@/shared/ui/form/auth-form.scss";

const FIELDS = [
  { label: 80, hint: 0 },
  { label: 150, hint: 0 },
  { label: 90, hint: 0 },
  { label: 150, hint: 0 },
];

const CONSENTS = [0, 1, 2];

export const RegisterFormSkeleton = () => (
  <div className="auth-form" role="status" aria-label="Загрузка формы регистрации">
    {FIELDS.map((field, index) => (
      <div key={index} className="ui-skeleton-field">
        <Skeleton width={field.label} height={13} />
        <Skeleton height={44} radius="md" />
      </div>
    ))}

    <Skeleton height={48} radius="md" />

    <Skeleton width={320} height={12} />

    <div className="auth-form__consents">
      {CONSENTS.map((item) => (
        <div key={item} className="ui-skeleton-row">
          <Skeleton width={16} height={16} />
          <Skeleton width="70%" height={12} />
        </div>
      ))}
    </div>

    <SocialAuthSkeleton />
  </div>
);
