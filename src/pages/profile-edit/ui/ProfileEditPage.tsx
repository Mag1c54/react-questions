import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { PROFILE_PARAM } from "@/entities/profile";
import { useGetProfileQuery } from "@/entities/profile";
import { useActiveProfile } from "@/entities/profile";
import { CreateProfileCard } from "@/features/profile-create";
import { EditProfileForm } from "@/features/profile-edit";
import { EditProfileFormSkeleton } from "@/features/profile-edit";
import { ProfileSpecializationPicker } from "@/features/profile-specialization";
import { Button, ButtonLink } from "@/shared/ui";
import "./ProfileEditPage.scss";

export const ProfileEditPage = () => {
  const navigate = useNavigate();
  const { data: user, isLoading, isError, refetch } = useGetProfileQuery();

  const { profiles, profile } = useActiveProfile(user);

  const renderBody = () => {
    if (isLoading) return <EditProfileFormSkeleton />;

    if (isError || !user) {
      return (
        <div className="profile-edit-page__status">
          Не удалось загрузить профиль
          <Button variant="outline" size="sm" onClick={refetch}>
            Повторить
          </Button>
        </div>
      );
    }

    if (!profile) return <CreateProfileCard userId={user.id} />;

    const handleSelect = (id: string) => {
      const params = new URLSearchParams({ [PROFILE_PARAM]: id, tab: "personal" });
      navigate(`/profile/edit?${params.toString()}`);
    };

    return (
      <EditProfileForm
        key={profile.id}
        user={user}
        profile={profile}
        specializationSlot={
          <ProfileSpecializationPicker
            userId={user.id}
            profiles={profiles}
            activeProfileId={profile.id}
            onSelect={handleSelect}
          />
        }
      />
    );
  };

  return (
    <main className="profile-edit-page">
      <ButtonLink
        to={profile ? `/profile?${PROFILE_PARAM}=${profile.id}` : "/profile"}
        variant="link"
        className="profile-edit-page__back"
        leftIcon={<FiArrowLeft aria-hidden="true" />}
      >
        К профилю
      </ButtonLink>
      {renderBody()}
    </main>
  );
};
