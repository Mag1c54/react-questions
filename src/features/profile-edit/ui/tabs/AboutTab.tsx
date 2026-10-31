import { useFormContext, useWatch } from "react-hook-form";
import { CharacterCounter, FormRow, Textarea } from "@/shared/ui";
import { ABOUT_MAX, type ProfileEditValues } from "../../model/schema";

const DescriptionCounter = () => {
  const { control } = useFormContext<ProfileEditValues>();
  const value = useWatch({ control, name: "description" });

  return <CharacterCounter length={(value ?? "").length} max={ABOUT_MAX} />;
};

export const AboutTab = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProfileEditValues>();

  return (
    <FormRow
      stacked
      title="Обо мне"
      hint="Расскажите о своём опыте и интересах"
      htmlFor="profile-about"
      error={errors.description?.message}
    >
      <Textarea
        id="profile-about"
        placeholder="Расскажите о себе"
        maxLength={ABOUT_MAX}
        rows={8}
        hasError={Boolean(errors.description)}
        aria-describedby={errors.description ? "profile-about-error" : undefined}
        counter={<DescriptionCounter />}
        {...register("description")}
      />
    </FormRow>
  );
};
