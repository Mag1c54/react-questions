import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { MainLayout } from "./Layout";
import { AdminLayout } from "@/widgets/admin-layout/ui/AdminLayout";
import { AdminRoute, GuestRoute, ProtectedRoute } from "./RouteGuards";
import { Suspense } from "react";

const PageLoader = () => (
  <div className="flex justify-center items-center h-screen">Загрузка...</div>
);

const router = createBrowserRouter([
  {
    element: <GuestRoute />,
    children: [
      {
        path: "/login",
        lazy: async () => ({ Component: (await import("@/pages/login/ui/LoginPage")).LoginPage }),
      },
      {
        path: "/register",
        lazy: async () => ({
          Component: (await import("@/pages/register/ui/RegisterPage")).RegisterPage,
        }),
      },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "/collections",
        lazy: async () => ({
          Component: (await import("@/pages/collections/ui/CollectionsPage")).CollectionsPage,
        }),
      },
      {
        path: "/collections/:id",
        lazy: async () => ({
          Component: (await import("@/pages/collection/ui/CollectionPage")).CollectionPage,
        }),
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/questions",
            lazy: async () => ({
              Component: (await import("../../pages/questions/ui/QuestionsPage")).QuestionsPage,
            }),
          },
          {
            path: "/interview",
            lazy: async () => ({ Component: (await import("@/pages/quiz/QuizPage")).QuizPage }),
          },
          {
            path: "/interview/questions",
            lazy: async () => ({
              Component: (await import("@/pages/quiz-questions/ui/QuizQuestionsPage"))
                .QuizQuestionsPage,
            }),
          },
          {
            path: "/profile",
            lazy: async () => ({
              Component: (await import("@/pages/profile/ui/ProfilePage")).ProfilePage,
            }),
          },
          {
            path: "/profile/edit",
            lazy: async () => ({
              Component: (await import("@/pages/proflie-edit/ui/ProfileEditPage")).ProfileEditPage,
            }),
          },
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
          {
            path: "/admin/specializations",
            lazy: async () => ({
              Component: (await import("@/pages/admin-specializations/ui/AdminSpecializationsPage"))
                .AdminSpecializationsPage,
            }),
          },
          {
            path: "/admin/specializations/create",
            lazy: async () => ({
              Component: (
                await import("@/pages/admin-specialization-create/ui/AdminSpecializationCreatePage")
              ).AdminSpecializationCreatePage,
            }),
          },
          {
            path: "/profiles/:id",
            lazy: async () => ({
              Component: (await import("@/pages/user-profile/ui/UserProfilePage")).UserProfilePage,
            }),
          },
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
  return (
    <Suspense fallback={<PageLoader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};
