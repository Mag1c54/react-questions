import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useCreateProfileMutation } from "@/entities/profile/api/profileApi";
import type { Profile } from "@/entities/profile/model/types";
import { useGetSpecializationsQuery } from "@/entities/specialization/api/specializationApi";
import { getApiErrorCode } from "@/shared/lib/getApiErrorCode";
import { getErrorMessage } from "@/shared/lib/getErrorMessage";
import { Chip } from "@/shared/ui/Chip";
import "./ProfileSpecializationPicker.scss";

const PROFILE_TYPE_CANDIDATE = 1;

interface ProfileSpecializationPickerProps {
  userId: string;
  profiles: Profile[];
  activeProfileId: string;
  onSelect: (profileId: string) => void;
}

export const ProfileSpecializationPicker = ({
  userId,
  profiles,
  activeProfileId,
  onSelect,
}: ProfileSpecializationPickerProps) => {
  const { data, isLoading } = useGetSpecializationsQuery();
  const [createProfile, { isLoading: isCreating }] = useCreateProfileMutation();

  const [newSpecializationId, setNewSpecializationId] = useState("");
  const [error, setError] = useState<string | null>(null);

  const specializations = data?.data ?? [];
  const titleById = new Map(specializations.map((item) => [item.id, item.title]));
  const usedIds = new Set(profiles.map((item) => item.specializationId));
  const available = specializations.filter((item) => !usedIds.has(item.id));

  const handleAdd = async () => {
    const specializationId = Number(newSpecializationId);

    if (!specializationId) {
      setError("Выберите специализацию");
      return;
    }

    setError(null);

    try {
      const created = await createProfile({
        userId,
        profileType: PROFILE_TYPE_CANDIDATE,
        specializationId,
        markingWeight: 1,
        description: "",
        socialNetwork: [],
        profileSkills: [],
      }).unwrap();

      setNewSpecializationId("");
      onSelect(created.id);
    } catch (err) {
      const code = getApiErrorCode(err);

      if (code === "profile.specialization.already_exists") {
        setError("Профиль с этой специализацией уже есть");
      } else if (code === "profile.user.owner_required") {
        setError("Профиль можно создать только для своего аккаунта");
      } else {
        setError(getErrorMessage(err));
      }
    }
  };

  return (
    <div className="spec-picker">
      <div className="spec-picker__current">
        <span className="spec-picker__label">Мои специализации</span>
        <div className="spec-picker__chips" role="radiogroup" aria-label="Активная специализация">
          {profiles.map((profile) => (
            <Chip
              key={profile.id}
              type="radio"
              name="active-profile"
              checked={profile.id === activeProfileId}
              onChange={() => onSelect(profile.id)}
            >
              {titleById.get(profile.specializationId) ?? "Специализация"}
            </Chip>
          ))}
        </div>
      </div>

      {isLoading && <p className="spec-picker__hint">Загрузка специализаций...</p>}

      {available.length > 0 && (
        <div className="spec-picker__add">
          <label htmlFor="spec-picker-select" className="spec-picker__label">
            Добавить специализацию
          </label>

          <div className="spec-picker__add-row">
            <div className="spec-picker__select-wrap">
              <select
                id="spec-picker-select"
                className="spec-picker__select"
                value={newSpecializationId}
                onChange={(e) => {
                  setNewSpecializationId(e.target.value);
                  setError(null);
                }}
              >
                <option value="">Выберите специализацию</option>
                {available.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
              <FiChevronDown className="spec-picker__select-icon" aria-hidden="true" />
            </div>

            <button
              type="button"
              className="spec-picker__btn"
              disabled={isCreating}
              onClick={handleAdd}
            >
              {isCreating ? "Добавляем..." : "Добавить"}
            </button>
          </div>
        </div>
      )}

      {error && (
        <p className="spec-picker__error" role="alert">
          {error}
        </p>
      )}

      <p className="spec-picker__hint">
        Каждая специализация это отдельный профиль со своим описанием и навыками.
      </p>
    </div>
  );
};
