import { useForm } from "react-hook-form";
import { useRegisterMutation } from "@/entities/session/api/authApi";
import { SocialAuth } from "@/features/social-auth/ui/SocialAuth";
import { getErrorMessage } from "@/shared/lib/getErrorMessage";
import { CheckboxField } from "@/shared/ui/form/CheckboxField";
import { PasswordField } from "@/shared/ui/form/PasswordField";
import { TextField } from "@/shared/ui/form/TextField";
import "@/shared/ui/form/auth-form.scss";

const EMAIL_REGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  personalDataConsent: boolean;
  offerConsent: boolean;
  marketingConsent: boolean;
}

export const RegisterForm = () => {
  const [registerUser] = useRegisterMutation();
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      personalDataConsent: false,
      offerConsent: false,
      marketingConsent: false,
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      await registerUser({
        username: values.username.trim(),
        email: values.email.trim(),
        password: values.password,
      }).unwrap();
    } catch (err) {
      const status = (err as { status?: number }).status;
      setError("root.server", {
        type: "server",
        message:
          status === 409
            ? "Пользователь с таким никнеймом или почтой уже существует"
            : getErrorMessage(err),
      });
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextField
        label="Никнейм"
        autoComplete="username"
        placeholder="Введите никнейм"
        error={errors.username?.message}
        {...register("username", {
          required: "Введите никнейм",
          minLength: { value: 3, message: "Минимум 3 символа" },
        })}
      />

      <TextField
        label="Электронная почта"
        type="email"
        autoComplete="email"
        placeholder="Введите электронную почту"
        error={errors.email?.message}
        {...register("email", {
          required: "Введите почту",
          pattern: { value: EMAIL_REGEXP, message: "Введите корректную почту" },
        })}
      />

      <PasswordField
        label="Пароль"
        autoComplete="new-password"
        placeholder="Введите пароль"
        error={errors.password?.message}
        {...register("password", {
          required: "Введите пароль",
          minLength: { value: 6, message: "Минимум 6 символов" },
          deps: ["confirmPassword"],
        })}
      />

      <PasswordField
        label="Подтвердить пароль"
        autoComplete="new-password"
        placeholder="Введите пароль"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword", {
          required: "Повторите пароль",
          validate: (value) => value === getValues("password") || "Пароли не совпадают",
        })}
      />

      {errors.root?.server && (
        <p className="auth-form__error" role="alert">
          {errors.root.server.message}
        </p>
      )}

      <button type="submit" className="auth-form__submit" disabled={isSubmitting}>
        {isSubmitting ? "Регистрируем..." : "Зарегистрироваться"}
      </button>

      <p className="auth-form__hint">
        Проставив галочку («✓») и нажимая «Зарегистрироваться»:
      </p>

      <div className="auth-form__consents">
        <CheckboxField
          label={
            <>
              Даю согласие на{" "}
              <a href="/privacy" target="_blank" rel="noopener noreferrer">
                обработку ПД
              </a>
              , в соответствии с{" "}
              <a href="/privacy" target="_blank" rel="noopener noreferrer">
                Политикой в отношении ПД
              </a>
            </>
          }
          error={errors.personalDataConsent?.message}
          {...register("personalDataConsent", { required: "Нужно согласие на обработку ПД" })}
        />
        <CheckboxField
          label="Я подтверждаю что ознакомился(-ась) с Договором-офертой"
          error={errors.offerConsent?.message}
          {...register("offerConsent", { required: "Нужно подтвердить ознакомление" })}
        />
        <CheckboxField
          label="Даю согласие на получение рекламных и информационных рассылок"
          {...register("marketingConsent")}
        />
      </div>

      <SocialAuth />
    </form>
  );
};