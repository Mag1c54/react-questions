import { useMemo, useState, type ReactNode } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Controller, useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiArrowRight, FiChevronDown, FiUser, FiX } from "react-icons/fi";
import { useUpdateProfileMutation, useUpdateUserMutation } from "@/entities/profile/api/profileApi";
import { SOCIAL_PLATFORMS } from "@/entities/profile/config/platforms";
import type { Profile, UpdateUserPayload } from "@/entities/profile/model/types";
import type { AuthUser } from "@/entities/session/model/types";
import { useGetSkillsQuery } from "@/entities/skill/api/skillApi";
import { getApiErrorCode } from "@/shared/lib/getApiErrorCode";
import { getErrorMessage } from "@/shared/lib/getErrorMessage";
import { stripDataUrlPrefix } from "@/shared/lib/isHttpUrl";
import { TextField } from "@/shared/ui/form/TextField";
import { ImageUploader } from "@/shared/ui/image-uploader/ImageUploader";
import { ABOUT_MAX, createProfileEditSchema, type ProfileEditValues } from "../model/schema";
import "./EditProfileForm.scss";

const TABS = [
  { id: "personal", label: "Личная информация" },
  { id: "about", label: "Обо мне" },
  { id: "skills", label: "Навыки" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const COMING_SOON_TABS = ["Проекты", "Профиль", "Образование"];

const AVATAR_MAX_KB = 500;

interface SkillOption {
  id: number;
  title: string;
  imageSrc: string | null;
}

const hideBrokenImage = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.style.display = "none";
};

const describeError = (error: unknown): string => {
  const code = getApiErrorCode(error);

  if (
    code === "user.user.owner_or_admin_required" ||
    code === "auth.roles.admin_or_owner_required"
  ) {
    return "Можно редактировать только свой профиль";
  }
  if (code === "user.user.id.not_found" || code === "profile.profile.not_found") {
    return "Профиль не найден, обновите страницу";
  }

  return getErrorMessage(error);
};

interface EditProfileFormProps {
  user: AuthUser;
  profile: Profile;
  specializationSlot: ReactNode;
}

export const EditProfileForm = ({ user, profile, specializationSlot }: EditProfileFormProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const requestedTab = searchParams.get("tab");
  const [tab, setTab] = useState<TabId>(
    TABS.find((item) => item.id === requestedTab)?.id ?? "personal",
  );

  const [updateUser] = useUpdateUserMutation();
  const [updateProfile] = useUpdateProfileMutation();
  const { data: skillsData, isLoading: isSkillsLoading } = useGetSkillsQuery({
    specializations: [profile.specializationId],
  });

  const schema = useMemo(() => createProfileEditSchema(user.username), [user.username]);

  const savedLinks = Object.fromEntries(
    (profile.socialNetwork ?? []).map((item) => [item.code, item.title]),
  );

  const {
    register,
    control,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProfileEditValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: user.username,
      country: user.country ?? "",
      city: user.city ?? "",
      newAvatar: null,
      description: profile.description ?? "",
      skills: profile.profileSkills.map((skill) => skill.id),
      links: Object.fromEntries(
        SOCIAL_PLATFORMS.map((platform) => [platform.code, savedLinks[platform.code] ?? ""]),
      ),
    },
  });

  const descriptionLength = watch("description").length;

  const skillOptions = useMemo(() => {
    const options = new Map<number, SkillOption>();
    profile.profileSkills.forEach((skill) => options.set(skill.id, skill));
    skillsData?.data.forEach((skill) => options.set(skill.id, skill));
    return Array.from(options.values());
  }, [profile.profileSkills, skillsData]);

  const tabIndex = TABS.findIndex((item) => item.id === tab);
  const isLastTab = tabIndex === TABS.length - 1;

  const onInvalid = (formErrors: FieldErrors<ProfileEditValues>) => {
    if (formErrors.username || formErrors.country || formErrors.city || formErrors.links) {
      setTab("personal");
    } else if (formErrors.description) {
      setTab("about");
    } else if (formErrors.skills) {
      setTab("skills");
    }
  };

  const onSubmit = async (values: ProfileEditValues) => {
    const userBody: UpdateUserPayload = {};
    if (values.username !== user.username) userBody.username = values.username;
    if (values.country !== (user.country ?? "")) userBody.country = values.country;
    if (values.city !== (user.city ?? "")) userBody.city = values.city;
    if (values.newAvatar) userBody.avatarImage = stripDataUrlPrefix(values.newAvatar);

    const extraLinks = (profile.socialNetwork ?? []).filter(
      (item) => !SOCIAL_PLATFORMS.some((platform) => platform.code === item.code),
    );

    try {
      if (Object.keys(userBody).length > 0) {
        await updateUser({ id: user.id, body: userBody }).unwrap();
      }

      await updateProfile({
        id: profile.id,
        body: {
          userId: user.id,
          markingWeight: profile.markingWeight,
          description: values.description,
          socialNetwork: [
            ...extraLinks,
            ...SOCIAL_PLATFORMS.flatMap(({ code }) =>
              values.links[code] ? [{ code, title: values.links[code] }] : [],
            ),
          ],
          image_src: profile.image_src ?? undefined,
          profileSkills: values.skills.map(String),
        },
      }).unwrap();

      navigate(`/profile?profile=${profile.id}`);
    } catch (err) {
      setError("root.server", { type: "server", message: describeError(err) });
    }
  };

  return (
    <form className="profile-edit" onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate>
      <h1 className="profile-edit__title">Редактирование профиля</h1>

      <div className="profile-edit__tabs" role="tablist" aria-label="Разделы профиля">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`tab-${item.id}`}
            aria-selected={tab === item.id}
            aria-controls={`panel-${item.id}`}
            className={`profile-edit__tab ${tab === item.id ? "profile-edit__tab--active" : ""}`}
            onClick={() => setTab(item.id)}
          >
            {item.label}
          </button>
        ))}
        {COMING_SOON_TABS.map((label) => (
          <button
            key={label}
            type="button"
            disabled
            title="Скоро"
            className="profile-edit__tab profile-edit__tab--disabled"
          >
            {label}
          </button>
        ))}
      </div>

      {errors.root?.server && (
        <p className="profile-edit__alert" role="alert">
          {errors.root.server.message}
        </p>
      )}

      <div
        role="tabpanel"
        id="panel-personal"
        aria-labelledby="tab-personal"
        hidden={tab !== "personal"}
        className="profile-edit__panel"
      >
        <div className="profile-edit__row">
          <div className="profile-edit__label">
            <span className="profile-edit__label-title">Фото профиля</span>
            <span className="profile-edit__label-hint">
              Поделитесь своим профилем в других соц. сетях
            </span>
          </div>

          <Controller
            name="newAvatar"
            control={control}
            render={({ field }) => (
              <ImageUploader
                value={field.value ?? user.avatarUrl ?? null}
                onChange={field.onChange}
                removable={field.value !== null}
                requireSquare={false}
                maxSizeKb={AVATAR_MAX_KB}
                placeholderIcon={<FiUser aria-hidden="true" size={40} />}
                hints={[`JPG, PNG, JPEG (до ${AVATAR_MAX_KB} КБ)`]}
              />
            )}
          />
        </div>

        <div className="profile-edit__row">
          <div className="profile-edit__label">
            <span className="profile-edit__label-title">Специализация</span>
            <span className="profile-edit__label-hint">
              Переключайтесь между профилями или добавьте новую специализацию
            </span>
          </div>

          <div className="profile-edit__spec">{specializationSlot}</div>
        </div>

        <div className="profile-edit__row">
          <div className="profile-edit__label">
            <span className="profile-edit__label-title">Персональная информация</span>
            <span className="profile-edit__label-hint">Расскажите немного о себе</span>
          </div>

          <div className="profile-edit__fields">
            <TextField
              label="Никнейм *"
              autoComplete="username"
              error={errors.username?.message}
              {...register("username")}
            />
            <TextField
              label="Страна"
              placeholder="Напр. Россия"
              autoComplete="country-name"
              error={errors.country?.message}
              {...register("country")}
            />
            <TextField
              label="Город"
              placeholder="Напр. Санкт-Петербург"
              autoComplete="address-level2"
              error={errors.city?.message}
              {...register("city")}
            />
          </div>
        </div>

        <div className="profile-edit__row">
          <div className="profile-edit__label">
            <span className="profile-edit__label-title">Личные ссылки</span>
            <span className="profile-edit__label-hint">
              Поделитесь своими профилями в других соц. сетях
            </span>
          </div>

          <div className="profile-edit__fields">
            {SOCIAL_PLATFORMS.map(({ code, label }) => (
              <TextField
                key={code}
                label={label}
                type="url"
                placeholder="Ссылка"
                error={errors.links?.[code]?.message}
                {...register(`links.${code}` as const)}
              />
            ))}
          </div>
        </div>
      </div>

      <div
        role="tabpanel"
        id="panel-about"
        aria-labelledby="tab-about"
        hidden={tab !== "about"}
        className="profile-edit__panel"
      >
        <div className="profile-edit__label">
          <label htmlFor="profile-about" className="profile-edit__label-title">
            Обо мне
          </label>
          <span className="profile-edit__label-hint">Расскажите о своём опыте и интересах</span>
        </div>

        <div className="profile-edit__textarea-wrap">
          <textarea
            id="profile-about"
            placeholder="Расскажите о себе"
            maxLength={ABOUT_MAX}
            className={`profile-edit__textarea ${errors.description ? "profile-edit__textarea--error" : ""}`}
            aria-invalid={Boolean(errors.description)}
            {...register("description")}
          />
          <span className="profile-edit__counter">
            {descriptionLength}/{ABOUT_MAX}
          </span>
        </div>

        {errors.description && (
          <span className="profile-edit__error" role="alert">
            {errors.description.message}
          </span>
        )}
      </div>

      <div
        role="tabpanel"
        id="panel-skills"
        aria-labelledby="tab-skills"
        hidden={tab !== "skills"}
        className="profile-edit__panel"
      >
        <div className="profile-edit__row">
          <div className="profile-edit__label">
            <span className="profile-edit__label-title">Твои навыки</span>
            <span className="profile-edit__label-hint">
              Покажи что ты умеешь и в чём ты действительно хорошо
            </span>
          </div>

          <Controller
            name="skills"
            control={control}
            render={({ field }) => {
              const selected = field.value
                .map((id) => skillOptions.find((option) => option.id === id))
                .filter((option): option is SkillOption => Boolean(option));
              const available = skillOptions.filter((option) => !field.value.includes(option.id));

              const placeholder = isSkillsLoading
                ? "Загрузка..."
                : available.length === 0
                  ? "Все навыки выбраны"
                  : "Выбери навык из списка";

              return (
                <div className="profile-edit__skills">
                  <div className="profile-edit__select-field">
                    <label htmlFor="skill-select" className="profile-edit__select-label">
                      Навык
                    </label>
                    <div className="profile-edit__select-wrap">
                      <select
                        id="skill-select"
                        className="profile-edit__select"
                        value=""
                        disabled={available.length === 0}
                        onChange={(e) => {
                          const id = Number(e.target.value);
                          if (id) field.onChange([...field.value, id]);
                        }}
                      >
                        <option value="" disabled>
                          {placeholder}
                        </option>
                        {available.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.title}
                          </option>
                        ))}
                      </select>
                      <FiChevronDown className="profile-edit__select-icon" aria-hidden="true" />
                    </div>
                  </div>

                  <div className="profile-edit__selected">
                    <p className="profile-edit__selected-title">Выбранные навыки</p>

                    {selected.length === 0 ? (
                      <p className="profile-edit__hint">Пока ничего не выбрано</p>
                    ) : (
                      <ul className="profile-edit__tags">
                        {selected.map((skill) => (
                          <li key={skill.id} className="profile-edit__tag">
                            {skill.imageSrc && (
                              <img
                                src={skill.imageSrc}
                                alt=""
                                className="profile-edit__tag-icon"
                                onError={hideBrokenImage}
                              />
                            )}
                            {skill.title}
                            <button
                              type="button"
                              className="profile-edit__tag-remove"
                              aria-label={`Убрать навык ${skill.title}`}
                              onClick={() =>
                                field.onChange(field.value.filter((id) => id !== skill.id))
                              }
                            >
                              <FiX aria-hidden="true" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            }}
          />
        </div>
      </div>

      <div className="profile-edit__footer">
        {isLastTab ? (
          <button key="save" type="submit" className="profile-edit__next" disabled={isSubmitting}>
            {isSubmitting ? "Сохраняем..." : "Сохранить"}
          </button>
        ) : (
          <button
            key="next"
            type="button"
            className="profile-edit__next"
            onClick={() => setTab(TABS[tabIndex + 1].id)}
          >
            Далее
            <FiArrowRight aria-hidden="true" />
          </button>
        )}
      </div>
    </form>
  );
};
