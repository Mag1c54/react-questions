import type { ReactNode } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FiUser } from "react-icons/fi";
import { SOCIAL_PLATFORMS } from "@/entities/profile/config/platforms";
import type { AuthUser } from "@/entities/session/model/types";
import { FormRow, ImageUploader, TextField } from "@/shared/ui";
import type { ProfileEditValues } from "../../model/schema";

const AVATAR_MAX_KB = 500;

interface PersonalInfoTabProps {
  user: AuthUser;
  specializationSlot: ReactNode;
}

export const PersonalInfoTab = ({ user, specializationSlot }: PersonalInfoTabProps) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<ProfileEditValues>();

  return (
    <>
      <FormRow title="Фото профиля" hint="Поделитесь своим профилем в других соц. сетях">
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
      </FormRow>

      <FormRow
        title="Специализация"
        hint="Переключайтесь между профилями или добавьте новую специализацию"
      >
        {specializationSlot}
      </FormRow>

      <FormRow title="Персональная информация" hint="Расскажите немного о себе">
        <div className="profile-edit__fields">
          <TextField
            variant="outline"
            label="Никнейм *"
            autoComplete="username"
            error={errors.username?.message}
            {...register("username")}
          />
          <TextField
            variant="outline"
            label="Страна"
            placeholder="Напр. Россия"
            autoComplete="country-name"
            error={errors.country?.message}
            {...register("country")}
          />
          <TextField
            variant="outline"
            label="Город"
            placeholder="Напр. Санкт-Петербург"
            autoComplete="address-level2"
            error={errors.city?.message}
            {...register("city")}
          />
        </div>
      </FormRow>

      <FormRow title="Личные ссылки" hint="Поделитесь своими профилями в других соц. сетях">
        <div className="profile-edit__fields">
          {SOCIAL_PLATFORMS.map(({ code, label }) => (
            <TextField
              key={code}
              variant="outline"
              label={label}
              type="url"
              placeholder="Ссылка"
              error={errors.links?.[code]?.message}
              {...register(`links.${code}` as const)}
            />
          ))}
        </div>
      </FormRow>
    </>
  );
};
