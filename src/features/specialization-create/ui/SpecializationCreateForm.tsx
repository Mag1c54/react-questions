import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiArrowLeft } from "react-icons/fi";
import { useCreateSpecializationMutation } from "@/entities/specialization/api/specializationApi";
import { getApiErrorCode } from "@/shared/lib/getApiErrorCode";
import { getErrorMessage } from "@/shared/lib/getErrorMessage";
import { ImageUploader } from "@/shared/ui/image-uploader/ImageUploader";
import {
  DESCRIPTION_MAX,
  specializationSchema,
  type SpecializationFormValues,
} from "../model/schema";
import "./CreateSpecializationForm.scss";

const LIST_PATH = "/admin/specializations";

// сервер ждёт чистый base64, без префикса "data:image/png;base64,"
const stripDataUrlPrefix = (dataUrl: string) => dataUrl.slice(dataUrl.indexOf(",") + 1);

const describeError = (error: unknown, code: string | null): string => {
  if (code === "auth.roles.admin") return "Нужны права администратора";
  if (code === "auth.user.verified") return "Подтвердите почту, чтобы создавать специализации";
  if (code === "specialization.user.not_found") return "Пользователь не найден, войдите заново";
  if ((error as { status?: number } | null)?.status === 400) {
    return "Сервер не принял данные. Попробуйте другую картинку";
  }
  return getErrorMessage(error);
};

export const CreateSpecializationForm = () => {
  const navigate = useNavigate();
  const [createSpecialization] = useCreateSpecializationMutation();

  const {
    register,
    control,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SpecializationFormValues>({
    resolver: zodResolver(specializationSchema),
    defaultValues: { title: "", description: "", image: "" },
  });

  const descriptionLength = watch("description").length;

  const onSubmit = async (values: SpecializationFormValues) => {
    if (!values.image) return; // maybe dont need makes image necessary

    try {
      await createSpecialization({
        title: values.title,
        description: values.description,
        specializationImage: stripDataUrlPrefix(values.image),
      }).unwrap();

      navigate(LIST_PATH);
    } catch (err) {
      const code = getApiErrorCode(err);

      if (code === "specialization.specialization.title.conflict") {
        setError("title", {
          type: "server",
          message: "Специализация с таким названием уже существует",
        });
        return;
      }

      setError("root.server", { type: "server", message: describeError(err, code) });
    }
  };

  return (
    <form className="specialization-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="specialization-form__bar">
        <Link to={LIST_PATH} className="specialization-form__back" aria-label="Назад к списку">
          <FiArrowLeft aria-hidden="true" />
        </Link>

        <button type="submit" className="specialization-form__save" disabled={isSubmitting}>
          {isSubmitting ? "Сохраняем..." : "Сохранить"}
        </button>
      </div>

      {errors.root?.server && (
        <p className="specialization-form__alert" role="alert">
          {errors.root.server.message}
        </p>
      )}

      <section className="specialization-form__card">
        <h1 className="specialization-form__title">Специализация</h1>

        <div className="specialization-form__row">
          <div className="specialization-form__label">
            <label htmlFor="specialization-title" className="specialization-form__label-title">
              Название специализации
            </label>
            <span className="specialization-form__label-hint">Добавьте название специализации</span>
          </div>

          <div className="specialization-form__control">
            <input
              id="specialization-title"
              type="text"
              placeholder="Название специализации"
              className={`specialization-form__input ${errors.title ? "specialization-form__input--error" : ""}`}
              aria-invalid={Boolean(errors.title)}
              {...register("title")}
            />
            {errors.title && (
              <span className="specialization-form__error" role="alert">
                {errors.title.message}
              </span>
            )}
          </div>
        </div>

        <div className="specialization-form__row">
          <div className="specialization-form__label">
            <span className="specialization-form__label-title">Картинка специализации</span>
            <span className="specialization-form__label-hint">Добавьте картинку специализации</span>
          </div>

          <div className="specialization-form__control">
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <ImageUploader
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.image?.message}
                />
              )}
            />
          </div>
        </div>

        <div className="specialization-form__block">
          <div className="specialization-form__label">
            <label
              htmlFor="specialization-description"
              className="specialization-form__label-title"
            >
              Описание специализации
            </label>
            <span className="specialization-form__label-hint">
              Добавьте развёрнутое описание для специализации
            </span>
          </div>

          <div className="specialization-form__textarea-wrap">
            <textarea
              id="specialization-description"
              placeholder="Развёрнутое описание для специализации"
              maxLength={DESCRIPTION_MAX}
              className={`specialization-form__textarea ${errors.description ? "specialization-form__textarea--error" : ""}`}
              aria-invalid={Boolean(errors.description)}
              {...register("description")}
            />
            <span className="specialization-form__counter">
              {descriptionLength}/{DESCRIPTION_MAX}
            </span>
          </div>

          {errors.description && (
            <span className="specialization-form__error" role="alert">
              {errors.description.message}
            </span>
          )}
        </div>
      </section>
    </form>
  );
};
