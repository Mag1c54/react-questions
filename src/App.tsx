import { BrowserRouter } from 'react-router-dom';
import { QuestionsPage } from './pages/question-page/ui/QuestionsPage';
import './styles/global.scss';
import ErrorBoundary from "@/shared/ui/ErrorBoundary"

function App() {
  return (
    <BrowserRouter>
    <ErrorBoundary>
      <QuestionsPage />
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;