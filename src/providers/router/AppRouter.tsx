import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QuestionsPage } from "../../pages/questions/ui/QuestionsPage";
import { MainLayout } from "./Layout";
import { QuizPage } from "@/pages/quiz/QuizPage";
import { CollectionPage } from "@/pages/collection/ui/CollectionPage";
import { CollectionsPage } from "@/pages/collections/ui/CollectionsPage";
import { GuestRoute } from "./RouteGuards";
import { ProtectedRoute } from "./RouteGuards";
import { LoginPage } from "@/pages/login/ui/LoginPage";
import { RegisterPage } from "@/pages/register/ui/RegisterPage";
import { QuizQuestionsPage } from "@/pages/quiz-questions/ui/QuizQuestionsPage";

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
            path: "/interview",
            element: <QuizPage />,
          },
          {
            path: "/interview/questions",
            element: <QuizQuestionsPage />,
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
  return <RouterProvider router={router} />;
};
