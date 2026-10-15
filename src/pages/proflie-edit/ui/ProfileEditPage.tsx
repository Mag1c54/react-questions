import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { getActiveProfile, PROFILE_PARAM } from "@/entities/profile/lib/getActiveProfile";
import { useGetProfileQuery } from "@/entities/profile/api/profileApi";
import { CreateProfileCard } from "@/features/profile-create/ui/CreateProfileCard";
import { EditProfileForm } from "@/features/profile-edit/ui/EditProfileForm";
import { ProfileSpecializationPicker } from "@/features/profile-specialization/ui/ProfileSpecializationPicker";
import "./ProfileEditPage.scss";

export const ProfileEditPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data: user, isLoading, isError, refetch } = useGetProfileQuery();

  const profiles = user?.profiles ?? [];
  const profile = getActiveProfile(profiles, searchParams.get(PROFILE_PARAM));

  const renderBody = () => {
    if (isLoading) return <p className="profile-edit-page__status">Загрузка профиля...</p>;

    if (isError || !user) {
      return (
        <div className="profile-edit-page__status">
          Не удалось загрузить профиль
          <button type="button" className="profile-edit-page__retry" onClick={refetch}>
            Повторить
          </button>
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
      <Link
        to={profile ? `/profile?${PROFILE_PARAM}=${profile.id}` : "/profile"}
        className="profile-edit-page__back"
      >
        <FiArrowLeft aria-hidden="true" />К профилю
      </Link>
      {renderBody()}
    </main>
  );
};
