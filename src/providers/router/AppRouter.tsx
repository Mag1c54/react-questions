import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QuestionsPage } from "../../pages/questions/ui/QuestionsPage";
import { MainLayout } from "./Layout";
import { QuizPage } from "@/pages/quiz/QuizPage";
import { CollectionPage } from "@/pages/collection/ui/CollectionPage";
import { CollectionsPage } from "@/pages/collections/ui/CollectionsPage";
import { GuestRoute, ProtectedRoute } from "./RouteGuards";
import { LoginPage } from "@/pages/login/ui/LoginPage";
import { RegisterPage } from "@/pages/register/ui/RegisterPage";

const router = createBrowserRouter([
  {
    element: <GuestRoute />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    element: <MainLayout />,

    children: [
      {
        path: "/collections",
        element: <CollectionsPage />,
      },
      {
        path: "/collections/:id",
        element: <CollectionPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/questions",
            element: <QuestionsPage />,
          },
          {
            path: "/trainer",
            element: <QuizPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <div>test</div>,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
