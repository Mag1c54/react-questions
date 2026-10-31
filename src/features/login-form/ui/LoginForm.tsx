import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "@/entities/session/api/authApi";
import { SocialAuth } from "@/features/social-auth/ui/SocialAuth";
import { getErrorMessage } from "@/shared/lib/getErrorMessage";
import { Alert, Button, PasswordField, TextField } from "@/shared/ui";
import { loginSchema, type LoginFormValues } from "../model/schema";
import "@/shared/ui/form/auth-form.scss";

export const LoginForm = () => {
  const [login] = useLoginMutation();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await login({ username: values.email, password: values.password }).unwrap();
    } catch (err) {
      const status = (err as { status?: number }).status;
      setError("root.server", {
        type: "server",
        message:
          status === 401 || status === 400 ? "Неверная почта или пароль" : getErrorMessage(err),
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
        {...register("email")}
      />

      <div className="auth-form__password">
        <PasswordField
          label="Пароль"
          autoComplete="current-password"
          placeholder="Введите пароль"
          error={errors.password?.message}
          {...register("password")}
        />
        <Link to="/forgot-password" className="auth-form__forgot">
          Забыли пароль?
        </Link>
      </div>

      {errors.root?.server && <Alert>{errors.root.server.message}</Alert>}

      <Button type="submit" size="lg" fullWidth isLoading={isSubmitting} loadingText="Входим...">
        Вход
      </Button>

      <SocialAuth />
    </form>
  );
};
