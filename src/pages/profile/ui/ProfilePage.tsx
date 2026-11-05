import { useGetProfileQuery } from "@/entities/profile";
import { useActiveProfile } from "@/entities/profile";
import { ProfileView } from "@/entities/profile";
import { useGetSpecializationsQuery } from "@/entities/specialization";
import { CreateProfileCard } from "@/features/profile-create";
import { ProfileSpecializationPicker } from "@/features/profile-specialization";
import { Button, Card } from "@/shared/ui";
import { ProfilePageSkeleton } from "./ProfilePageSkeleton";
import "./ProfilePage.scss";

export const ProfilePage = () => {
  const { data: user, isLoading, isError, refetch } = useGetProfileQuery();
  const { data: specializations } = useGetSpecializationsQuery();
  const { profiles, profile, selectProfile } = useActiveProfile(user);

  const renderBody = () => {
    if (isLoading) return <ProfilePageSkeleton />;

    if (isError || !user) {
      return (
        <div className="profile-page__status profile-page__status--error">
          Не удалось загрузить профиль
          <Button variant="outline" size="sm" onClick={refetch}>
            Повторить
          </Button>
        </div>
      );
    }

    if (!profile) return <CreateProfileCard userId={user.id} />;

    const specializationTitle = specializations?.data.find(
      (item) => item.id === profile.specializationId,
    )?.title;

    return (
      <>
        <Card as="section" padding="none" radius="md" shadow className="profile-page__spec">
          <ProfileSpecializationPicker
            userId={user.id}
            profiles={profiles}
            activeProfileId={profile.id}
            onSelect={selectProfile}
          />
        </Card>

        <ProfileView user={user} profile={profile} specializationTitle={specializationTitle} />
      </>
    );
  };

  return <main className="profile-page">{renderBody()}</main>;
};
