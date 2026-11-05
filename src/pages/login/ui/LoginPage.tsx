import { LoginForm } from "@/features/login-form";
import { AuthLayout } from "@/widgets/auth-layout";

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
