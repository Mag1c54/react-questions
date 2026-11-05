import { Skeleton } from "@/shared/ui";
import { SocialAuthSkeleton } from "../../social-auth/ui/SocialAuthSkeleton";
import "@/shared/ui/form/auth-form.scss";

export const LoginFormSkeleton = () => (
  <div className="auth-form" role="status" aria-label="Загрузка формы входа">
    <div className="ui-skeleton-field">
      <Skeleton width={150} height={13} />
      <Skeleton height={44} radius="md" />
    </div>

    <div className="ui-skeleton-field">
      <Skeleton width={90} height={13} />
      <Skeleton height={44} radius="md" />
      <Skeleton width={110} height={12} className="ui-skeleton-self-end" />
    </div>

    <Skeleton height={48} radius="md" />

    <SocialAuthSkeleton />
  </div>
);
