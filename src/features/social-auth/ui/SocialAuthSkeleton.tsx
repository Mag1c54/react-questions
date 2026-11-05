import { Skeleton } from "@/shared/ui";
import "./SocialAuth.scss";

export const SocialAuthSkeleton = () => (
  <div className="social-auth" role="status" aria-label="Загрузка авторизации через соцсети">
    <Skeleton width={240} height={12} />

    <div className="social-auth__list">
      <Skeleton width={28} height={28} circle />
    </div>
  </div>
);
