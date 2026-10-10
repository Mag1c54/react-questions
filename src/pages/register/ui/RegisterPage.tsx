import { RegisterForm } from "@/features/register-form/ui/RegisterForm";
import { AuthLayout } from "@/widgets/auth-layout/ui/AuthLayout";

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