import { RegisterForm } from "@/features/register-form";
import { AuthLayout } from "@/widgets/auth-layout";

export const RegisterPage = () => (
  <AuthLayout
    title="Регистрация"
    switchText="Уже есть аккаунт?"
    switchLinkText="Войти"
    switchTo="/login"
  >
    <RegisterForm />
  </AuthLayout>
);
