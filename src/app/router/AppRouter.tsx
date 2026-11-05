import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { MainLayout } from "./Layout";
import { AdminLayout } from "@/widgets/admin-layout";
import { AdminRoute, GuestRoute, ProtectedRoute, PageLoader } from "./RouteGuards";
import { Suspense } from "react";
import { NotFoundPage } from "@/pages/not-found";

const router = createBrowserRouter([
  {
    element: <GuestRoute />,
    children: [
      {
        path: "/login",
        lazy: async () => ({ Component: (await import("@/pages/login")).LoginPage }),
      },
      {
        path: "/register",
        lazy: async () => ({
          Component: (await import("@/pages/register")).RegisterPage,
        }),
      },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        lazy: async () => ({
          Component: (await import("@/pages/home")).HomePage,
        }),
      },
      {
        path: "/collections",
        lazy: async () => ({
          Component: (await import("@/pages/collections")).CollectionsPage,
        }),
      },
      {
        path: "/collections/:id",
        lazy: async () => ({
          Component: (await import("@/pages/collection")).CollectionPage,
        }),
      },
      {
        path: "/interview",
        lazy: async () => ({ Component: (await import("@/pages/quiz")).QuizPage }),
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/questions",
            lazy: async () => ({
              Component: (await import("@/pages/questions")).QuestionsPage,
            }),
          },
          {
            path: "/interview/questions",
            lazy: async () => ({
              Component: (await import("@/pages/quiz-questions")).QuizQuestionsPage,
            }),
          },
          {
            path: "/profile",
            lazy: async () => ({
              Component: (await import("@/pages/profile")).ProfilePage,
            }),
          },
          {
            path: "/profile/edit",
            lazy: async () => ({
              Component: (await import("@/pages/profile-edit")).ProfileEditPage,
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
              Component: (await import("@/pages/admin-specializations")).AdminSpecializationsPage,
            }),
          },
          {
            path: "/admin/specializations/create",
            lazy: async () => ({
              Component: (await import("@/pages/admin-specialization-create"))
                .AdminSpecializationCreatePage,
            }),
          },
          {
            path: "/profiles/:id",
            lazy: async () => ({
              Component: (await import("@/pages/user-profile")).UserProfilePage,
            }),
          },
        ],
      },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export const AppRouter = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};
