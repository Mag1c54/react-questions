import { useSearchParams } from "react-router-dom";
import { getActiveProfile, PROFILE_PARAM } from "@/entities/profile/lib/getActiveProfile";
import { ProfileView } from "@/entities/profile/ui/profile-view/ProfileView";
import { useGetProfileQuery } from "@/entities/profile/api/profileApi";
import { useGetSpecializationsQuery } from "@/entities/specialization/api/specializationApi";
import { CreateProfileCard } from "@/features/profile-create/ui/CreateProfileCard";
import { ProfileSpecializationPicker } from "@/features/profile-specialization/ui/ProfileSpecializationPicker";
import "./ProfilePage.scss";

export const ProfilePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: user, isLoading, isError, refetch } = useGetProfileQuery();
  const { data: specializations } = useGetSpecializationsQuery();

  const profiles = user?.profiles ?? [];
  const profile = getActiveProfile(profiles, searchParams.get(PROFILE_PARAM));

  const renderBody = () => {
    if (isLoading) return <p className="profile-page__status">Загрузка профиля...</p>;

    if (isError || !user) {
      return (
        <div className="profile-page__status profile-page__status--error">
          Не удалось загрузить профиль
          <button type="button" className="profile-page__retry" onClick={refetch}>
            Повторить
          </button>
        </div>
      );
    }

    if (!profile) return <CreateProfileCard userId={user.id} />;

    const specializationTitle = specializations?.data.find(
      (item) => item.id === profile.specializationId,
    )?.title;

    return (
      <>
        <section className="profile-page__spec">
          <ProfileSpecializationPicker
            userId={user.id}
            profiles={profiles}
            activeProfileId={profile.id}
            onSelect={(id) => setSearchParams({ [PROFILE_PARAM]: id })}
          />
        </section>

        <ProfileView user={user} profile={profile} specializationTitle={specializationTitle} />
      </>
    );
  };

  return <main className="profile-page">{renderBody()}</main>;
};
