import { Controller, useForm, useWatch, type Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiArrowLeft } from "react-icons/fi";
import {
  Alert,
  Button,
  ButtonLink,
  Card,
  CharacterCounter,
  FormRow,
  ImageUploader,
  Input,
  Textarea,
} from "@/shared/ui";
import { resolveSpecializationError } from "../model/errors";
import {
  DESCRIPTION_MAX,
  specializationSchema,
  type SpecializationFormValues,
} from "../model/schema";
import "./SpecializationForm.scss";

const DescriptionCounter = ({ control }: { control: Control<SpecializationFormValues> }) => {
  const value = useWatch({ control, name: "description" });
  return <CharacterCounter length={(value ?? "").length} max={DESCRIPTION_MAX} />;
};

interface SpecializationFormProps {
  backTo: string;
  onSubmit: (values: SpecializationFormValues) => Promise<void>;
  defaultValues?: Partial<SpecializationFormValues>;
  submitLabel?: string;
}

export const SpecializationForm = ({
  backTo,
  onSubmit,
  defaultValues,
  submitLabel = "Сохранить",
}: SpecializationFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SpecializationFormValues>({
    resolver: zodResolver(specializationSchema),
    defaultValues: { title: "", description: "", image: "", ...defaultValues },
  });

  const submit = handleSubmit(async (values) => {
    try {
      await onSubmit(values);
    } catch (error) {
      const { field, message } = resolveSpecializationError(error);

      if (field) setError(field, { type: "server", message });
      else setError("root.server", { type: "server", message });
    }
  });

  return (
    <form className="specialization-form" onSubmit={submit} noValidate>
      <div className="specialization-form__bar">
        <ButtonLink
          to={backTo}
          variant="outline"
          size="sm"
          iconOnly
          round
          aria-label="Назад к списку"
        >
          <FiArrowLeft aria-hidden="true" />
        </ButtonLink>

        <Button type="submit" isLoading={isSubmitting} loadingText="Сохраняем...">
          {submitLabel}
        </Button>
      </div>

      {errors.root?.server && <Alert>{errors.root.server.message}</Alert>}

      <Card as="section" padding="lg" className="specialization-form__card">
        <h1 className="specialization-form__title">Специализация</h1>

        <FormRow
          title="Название специализации"
          hint="Добавьте название специализации"
          htmlFor="specialization-title"
          error={errors.title?.message}
        >
          <Input
            id="specialization-title"
            placeholder="Название специализации"
            hasError={Boolean(errors.title)}
            aria-describedby={errors.title ? "specialization-title-error" : undefined}
            wrapperClassName="specialization-form__input"
            {...register("title")}
          />
        </FormRow>

        <FormRow title="Картинка специализации" hint="Добавьте картинку специализации">
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <ImageUploader
                value={field.value || null}
                onChange={(dataUrl) => field.onChange(dataUrl ?? "")}
                error={errors.image?.message}
              />
            )}
          />
        </FormRow>

        <FormRow
          stacked
          title="Описание специализации"
          hint="Добавьте развёрнутое описание для специализации"
          htmlFor="specialization-description"
          error={errors.description?.message}
        >
          <Textarea
            id="specialization-description"
            placeholder="Развёрнутое описание для специализации"
            maxLength={DESCRIPTION_MAX}
            hasError={Boolean(errors.description)}
            aria-describedby={errors.description ? "specialization-description-error" : undefined}
            counter={<DescriptionCounter control={control} />}
            {...register("description")}
          />
        </FormRow>
      </Card>
    </form>
  );
};
