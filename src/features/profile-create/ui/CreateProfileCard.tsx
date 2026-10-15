import { useState } from "react";
import { useCreateProfileMutation } from "@/entities/profile/api/profileApi";
import { useGetSpecializationsQuery } from "@/entities/specialization/api/specializationApi";
import { getApiErrorCode } from "@/shared/lib/getApiErrorCode";
import { getErrorMessage } from "@/shared/lib/getErrorMessage";
import { Chip } from "@/shared/ui/Chip";
import "./CreateProfileCard.scss";

const PROFILE_TYPE_CANDIDATE = 1;

interface CreateProfileCardProps {
  userId: string;
}

export const CreateProfileCard = ({ userId }: CreateProfileCardProps) => {
  const { data, isLoading: isSpecsLoading } = useGetSpecializationsQuery();
  const [createProfile, { isLoading: isCreating }] = useCreateProfileMutation();

  const [specializationId, setSpecializationId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async () => {
    if (specializationId === null) {
      setError("Выберите специализацию");
      return;
    }

    setError(null);

    try {
      await createProfile({
        userId,
        profileType: PROFILE_TYPE_CANDIDATE,
        specializationId,
        markingWeight: 1,
        description: "",
        socialNetwork: [],
        profileSkills: [],
      }).unwrap();
    } catch (err) {
      const code = getApiErrorCode(err);

      if (code === "profile.specialization.already_exists") {
        setError("У вас уже есть профиль с этой специализацией");
      } else if (code === "profile.user.owner_required") {
        setError("Профиль можно создать только для своего аккаунта");
      } else {
        setError(getErrorMessage(err));
      }
    }
  };

  return (
    <section className="create-profile">
      <h1 className="create-profile__title">Создайте профиль</h1>
      <p className="create-profile__text">
        Выберите специализацию, чтобы мы подобрали вам вопросы для подготовки. Остальное можно
        заполнить позже.
      </p>

      {isSpecsLoading && <p className="create-profile__text">Загрузка специализаций...</p>}

      <div className="create-profile__chips" role="radiogroup" aria-label="Специализация">
        {data?.data.map((spec) => (
          <Chip
            key={spec.id}
            type="radio"
            name="profile-specialization"
            checked={specializationId === spec.id}
            onChange={() => {
              setSpecializationId(spec.id);
              setError(null);
            }}
          >
            {spec.title}
          </Chip>
        ))}
      </div>

      {error && (
        <p className="create-profile__error" role="alert">
          {error}
        </p>
      )}

      <button
        type="button"
        className="create-profile__btn"
        disabled={isCreating}
        onClick={handleCreate}
      >
        {isCreating ? "Создаём..." : "Создать профиль"}
      </button>
    </section>
  );
};
