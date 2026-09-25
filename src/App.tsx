import { BrowserRouter } from 'react-router-dom';
import { QuestionsPage } from './pages/question-page/ui/QuestionsPage';
import './styles/global.scss';

function App() {
  return (
    <BrowserRouter>
      <QuestionsPage />
    </BrowserRouter>
  );
}

export default App;