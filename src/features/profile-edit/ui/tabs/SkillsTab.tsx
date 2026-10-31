import { useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { Profile } from "@/entities/profile/model/types";
import { useGetSkillsQuery } from "@/entities/skill/api/skillApi";
import { Field, FormRow, Select, Tag } from "@/shared/ui";
import type { ProfileEditValues } from "../../model/schema";

interface SkillOption {
  id: number;
  title: string;
  imageSrc: string | null;
}

export const SkillsTab = ({ profile }: { profile: Profile }) => {
  const { control } = useFormContext<ProfileEditValues>();
  const { data, isLoading } = useGetSkillsQuery({ specializations: [profile.specializationId] });

  const options = useMemo(() => {
    const map = new Map<number, SkillOption>();
    profile.profileSkills.forEach((skill) => map.set(skill.id, skill));
    data?.data.forEach((skill) => map.set(skill.id, skill));
    return Array.from(map.values());
  }, [profile.profileSkills, data]);

  return (
    <FormRow title="Твои навыки" hint="Покажи что ты умеешь и в чём ты действительно хорошо">
      <Controller
        name="skills"
        control={control}
        render={({ field }) => {
          const selected = field.value
            .map((id) => options.find((option) => option.id === id))
            .filter((option): option is SkillOption => Boolean(option));
          const available = options.filter((option) => !field.value.includes(option.id));

          const placeholder = isLoading
            ? "Загрузка..."
            : available.length === 0
              ? "Все навыки выбраны"
              : "Выбери навык из списка";

          return (
            <div className="profile-edit__skills">
              <Field label="Навык" htmlFor="skill-select" className="profile-edit__select-field">
                <Select
                  id="skill-select"
                  variant="filled"
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
                </Select>
              </Field>

              <div className="profile-edit__selected">
                <p className="profile-edit__selected-title">Выбранные навыки</p>

                {selected.length === 0 ? (
                  <p className="profile-edit__hint">Пока ничего не выбрано</p>
                ) : (
                  <ul className="profile-edit__tags">
                    {selected.map((skill) => (
                      <li key={skill.id}>
                        <Tag
                          iconSrc={skill.imageSrc}
                          removeLabel={`Убрать навык ${skill.title}`}
                          onRemove={() =>
                            field.onChange(field.value.filter((id) => id !== skill.id))
                          }
                        >
                          {skill.title}
                        </Tag>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        }}
      />
    </FormRow>
  );
};
