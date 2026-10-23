import { useGetProfileQuery } from "@/entities/profile/api/profileApi";
import { useActiveProfile } from "@/entities/profile/model/useActiveProfile";
import { ProfileView } from "@/entities/profile/ui/profile-view/ProfileView";
import { useGetSpecializationsQuery } from "@/entities/specialization/api/specializationApi";
import { CreateProfileCard } from "@/features/profile-create/ui/CreateProfileCard";
import { ProfileSpecializationPicker } from "@/features/profile-specialization/ui/ProfileSpecializationPicker";
import "./ProfilePage.scss";

export const ProfilePage = () => {
  const { data: user, isLoading, isError, refetch } = useGetProfileQuery();
  const { data: specializations } = useGetSpecializationsQuery();
  const { profiles, profile, selectProfile } = useActiveProfile(user);

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
            onSelect={selectProfile}
          />
        </section>

        <ProfileView user={user} profile={profile} specializationTitle={specializationTitle} />
      </>
    );
  };

  return <main className="profile-page">{renderBody()}</main>;
};
