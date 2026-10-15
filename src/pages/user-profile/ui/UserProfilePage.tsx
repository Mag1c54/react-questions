import { Navigate, useParams } from "react-router-dom";
import { useGetProfileByIdQuery } from "@/entities/profile/api/profileApi";
import { ProfileView } from "@/entities/profile/ui/profile-view/ProfileView";
import { useGetProfileQuery } from "@/entities/profile/api/profileApi";
import { useGetSpecializationsQuery } from "@/entities/specialization/api/specializationApi";
import "./UserProfilePage.scss";

export const UserProfilePage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: me } = useGetProfileQuery();
  const { data: specializations } = useGetSpecializationsQuery();

  const {
    data: profile,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetProfileByIdQuery(id ?? "", { skip: !id });

  if (me && profile && "userId" in profile && profile.userId === me.id) {
    return <Navigate to="/profile" replace />;
  }

  const titleById = new Map(specializations?.data.map((item) => [item.id, item.title]));

  const renderBody = () => {
    if (isLoading) return <p className="user-profile-page__status">Загрузка профиля...</p>;

    if (isError || !profile) {
      const isNotFound = !!error && "status" in error && error.status === 404;

      return (
        <div className="user-profile-page__status">
          {isNotFound ? "Профиль не найден" : "Не удалось загрузить профиль"}
          {!isNotFound && (
            <button type="button" className="user-profile-page__retry" onClick={refetch}>
              Повторить
            </button>
          )}
        </div>
      );
    }

    return (
      <ProfileView
        readOnly
        user={{
          username: profile.username,
          email: "",
          avatarUrl: profile.image_src,
        }}
        profile={profile}
        specializationTitle={titleById.get(profile.specializationId)}
      />
    );
  };

  return <main className="user-profile-page">{renderBody()}</main>;
};
