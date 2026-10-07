import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QuestionsPage } from "../../pages/question-page/ui/QuestionsPage";
import { Layout } from "./Layout";
import { QuizPage } from "@/pages/quiz-page/QuizPage";
import { CollectionPage } from "@/pages/collection-page/ui/CollectionPage";

const router = createBrowserRouter([
  {

    element: <Layout />,

    children: [
      {
        path: "/questions",
        element: <QuestionsPage />,
      },
      {
        path: "/trainer",
        element: <QuizPage />,
      },
      {
        path: "/collections",
        element: <CollectionPage/>
      }
    ],
  },
  {
      path: "/",
      element: <div>test</div>
  }
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
