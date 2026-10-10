import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "@/entities/session/api/authApi";
import { SocialAuth } from "@/features/social-auth/ui/SocialAuth";
import { getErrorMessage } from "@/shared/lib/getErrorMessage";
import { PasswordField } from "@/shared/ui/form/PasswordField";
import { TextField } from "@/shared/ui/form/TextField";
import "@/shared/ui/form/auth-form.scss";

const EMAIL_REGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface LoginFormValues {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const [login] = useLoginMutation();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ defaultValues: { email: "", password: "" } });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await login({ username: values.email.trim(), password: values.password }).unwrap();
    } catch (err) {
      const status = (err as { status?: number }).status;
      setError("root.server", {
        type: "server",
        message:
          status === 401 || status === 400
            ? "Неверная почта или пароль"
            : getErrorMessage(err),
      });
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
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

      <div className="auth-form__password">
        <PasswordField
          label="Пароль"
          autoComplete="current-password"
          placeholder="Введите пароль"
          error={errors.password?.message}
          {...register("password", { required: "Введите пароль" })}
        />
        <Link to="/forgot-password" className="auth-form__forgot">
          Забыли пароль?
        </Link>
      </div>

      {errors.root?.server && (
        <p className="auth-form__error" role="alert">
          {errors.root.server.message}
        </p>
      )}

      <button type="submit" className="auth-form__submit" disabled={isSubmitting}>
        {isSubmitting ? "Входим..." : "Вход"}
      </button>

      <SocialAuth />
    </form>
  );
};