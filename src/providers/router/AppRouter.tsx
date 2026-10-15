import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { QuestionsPage } from "../../pages/questions/ui/QuestionsPage";
import { MainLayout } from "./Layout";
import { QuizPage } from "@/pages/quiz/QuizPage";
import { CollectionPage } from "@/pages/collection/ui/CollectionPage";
import { CollectionsPage } from "@/pages/collections/ui/CollectionsPage";
import { AdminRoute, GuestRoute, ProtectedRoute } from "./RouteGuards";
import { LoginPage } from "@/pages/login/ui/LoginPage";
import { RegisterPage } from "@/pages/register/ui/RegisterPage";
import { QuizQuestionsPage } from "@/pages/quiz-questions/ui/QuizQuestionsPage";
import { ProfilePage } from "@/pages/profile/ui/ProfilePage";
import { AdminSpecializationsPage } from "@/pages/admin-specializations/ui/AdminSpecializationsPage";
import { AdminLayout } from "@/widgets/admin-layout/ui/AdminLayout";
import { AdminSpecializationCreatePage } from "@/pages/admin-specialization-create/ui/AdminSpecializationCreatePage";
import { ProfileEditPage } from "@/pages/proflie-edit/ui/ProfileEditPage";
import { UserProfilePage } from "@/pages/user-profile/ui/UserProfilePage";

const router = createBrowserRouter([
  {
    element: <GuestRoute />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      { path: "/collections", element: <CollectionsPage /> },
      { path: "/collections/:id", element: <CollectionPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/questions", element: <QuestionsPage /> },
          { path: "/interview", element: <QuizPage /> },
          { path: "/interview/questions", element: <QuizQuestionsPage /> },
          { path: "/profile", element: <ProfilePage /> },
          { path: "/profile/edit", element: <ProfileEditPage /> },
        ],
      },
    ],
  },
  {
    element: <AdminRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: "/admin", element: <Navigate to="/admin/specializations" replace /> },
          { path: "/admin/specializations", element: <AdminSpecializationsPage /> },
          { path: "/admin/specializations/create", element: <AdminSpecializationCreatePage /> },
          { path: "/users/:id", element: <UserProfilePage /> },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <>MAIN</>,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
