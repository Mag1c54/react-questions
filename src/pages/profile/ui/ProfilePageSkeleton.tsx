import { CardSkeleton } from "@/shared/ui";
import { ProfileViewSkeleton } from "@/entities/profile";
import { ProfileSpecializationPickerSkeleton } from "@/features/profile-specialization";
import "./ProfilePage.scss";

export const ProfilePageSkeleton = () => (
  <>
    <CardSkeleton
      as="section"
      padding="none"
      radius="md"
      className="profile-page__spec"
      aria-busy="true"
    >
      <ProfileSpecializationPickerSkeleton />
    </CardSkeleton>

    <ProfileViewSkeleton />
  </>
);
