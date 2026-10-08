import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QuestionsPage } from "../../pages/questions/ui/QuestionsPage";
import { Layout } from "./Layout";
import { QuizPage } from "@/pages/quiz/QuizPage";
import { CollectionPage } from "@/pages/collection/ui/CollectionPage";
import { CollectionsPage } from "@/pages/collections/ui/CollectionsPage";

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
        element: <CollectionsPage />,
      },
      {
        path: "/collections/:id",
        element: <CollectionPage />, 
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
