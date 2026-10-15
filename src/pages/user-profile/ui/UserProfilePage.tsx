import { Navigate, useParams, useSearchParams } from "react-router-dom";
import { useGetUserByIdQuery } from "@/entities/profile/api/profileApi";
import { getActiveProfile, PROFILE_PARAM } from "@/entities/profile/lib/getActiveProfile";
import { ProfileView } from "@/entities/profile/ui/profile-view/ProfileView";
import { useGetProfileQuery } from "@/entities/profile/api/profileApi";
import { useGetSpecializationsQuery } from "@/entities/specialization/api/specializationApi";
import { Chip } from "@/shared/ui/Chip";
import "./UserProfilePage.scss";

export const UserProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: me } = useGetProfileQuery();
  const { data: specializations } = useGetSpecializationsQuery();
  const {
    data: user,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetUserByIdQuery(id ?? "", { skip: !id });

  if (me && id === me.id) return <Navigate to="/profile" replace />;

  const profiles = user?.profiles ?? [];
  const profile = getActiveProfile(profiles, searchParams.get(PROFILE_PARAM));
  const titleById = new Map(specializations?.data.map((item) => [item.id, item.title]));

  const renderBody = () => {
    if (isLoading) return <p className="user-profile-page__status">Загрузка профиля...</p>;

    if (isError || !user) {
      const isNotFound = !!error && "status" in error && error.status === 404;

      return (
        <div className="user-profile-page__status">
          {isNotFound ? "Пользователь не найден" : "Не удалось загрузить профиль"}
          {!isNotFound && (
            <button type="button" className="user-profile-page__retry" onClick={refetch}>
              Повторить
            </button>
          )}
        </div>
      );
    }

    if (!profile) {
      return (
        <div className="user-profile-page__status">
          У пользователя {user.username} пока нет профиля
        </div>
      );
    }

    return (
      <>
        {profiles.length > 1 && (
          <div className="user-profile-page__tabs" role="radiogroup" aria-label="Специализация">
            {profiles.map((item) => (
              <Chip
                key={item.id}
                type="radio"
                name="user-profile"
                checked={item.id === profile.id}
                onChange={() => setSearchParams({ [PROFILE_PARAM]: item.id })}
              >
                {titleById.get(item.specializationId) ?? "Специализация"}
              </Chip>
            ))}
          </div>
        )}

        <ProfileView
          readOnly
          user={user}
          profile={profile}
          specializationTitle={titleById.get(profile.specializationId)}
        />
      </>
    );
  };

  return <main className="user-profile-page">{renderBody()}</main>;
};
