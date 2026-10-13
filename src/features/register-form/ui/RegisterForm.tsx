import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMutation } from "@/entities/session/api/authApi";
import { SocialAuth } from "@/features/social-auth/ui/SocialAuth";
import { getErrorMessage } from "@/shared/lib/getErrorMessage";
import { CheckboxField } from "@/shared/ui/form/CheckboxField";
import { PasswordField } from "@/shared/ui/form/PasswordField";
import { TextField } from "@/shared/ui/form/TextField";
import { registerSchema, type RegisterFormValues } from "../model/schema";
import "@/shared/ui/form/auth-form.scss";

export const RegisterForm = () => {
  const [registerUser] = useRegisterMutation();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
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
        username: values.username,
        email: values.email,
        password: values.password,
      }).unwrap();
    } catch (err) {
      const status = (err as { status?: number }).status;

      let message = getErrorMessage(err);
      if (status === 409) message = "Пользователь с таким никнеймом или почтой уже существует";
      if (status === 400) message = "Проверьте правильность введённых данных";

      setError("root.server", { type: "server", message });
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextField
        label="Никнейм"
        autoComplete="username"
        placeholder="Введите никнейм"
        error={errors.username?.message}
        {...register("username")}
      />

      <TextField
        label="Электронная почта"
        type="email"
        autoComplete="email"
        placeholder="Введите электронную почту"
        error={errors.email?.message}
        {...register("email")}
      />

      <PasswordField
        label="Пароль"
        autoComplete="new-password"
        placeholder="Введите пароль"
        error={errors.password?.message}
        {...register("password", { deps: ["confirmPassword"] })}
      />

      <PasswordField
        label="Подтвердить пароль"
        autoComplete="new-password"
        placeholder="Введите пароль"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      {errors.root?.server && (
        <p className="auth-form__error" role="alert">
          {errors.root.server.message}
        </p>
      )}

      <button type="submit" className="auth-form__submit" disabled={isSubmitting}>
        {isSubmitting ? "Регистрируем..." : "Зарегистрироваться"}
      </button>

      <p className="auth-form__hint">Проставив галочку («✓») и нажимая «Зарегистрироваться»:</p>

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
          {...register("personalDataConsent")}
        />
        <CheckboxField
          label="Я подтверждаю что ознакомился(-ась) с Договором-офертой"
          error={errors.offerConsent?.message}
          {...register("offerConsent")}
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
