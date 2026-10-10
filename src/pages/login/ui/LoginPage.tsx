import { LoginForm } from "@/features/login-form/ui/LoginForm";
import { AuthLayout } from "@/widgets/auth-layout/ui/AuthLayout";

export const LoginPage = () => (
  <AuthLayout
    title="Вход в личный кабинет"
    switchText="Нет аккаунта?"
    switchLinkText="Зарегистрироваться"
    switchTo="/register"
  >
    <LoginForm />
  </AuthLayout>
);