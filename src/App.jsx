import './styles/index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import MiniH from './pages/MiniH';
import TestPage from './pages/TestPage';
import Notice from './pages/Notice';
import Board from './pages/Board';
import Share from './pages/Share';
import './styles/scrollbar.css';
import './styles/cursor.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/homep" element={<MiniH />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/board" element={<Board />} />
        <Route path="/share" element={<Share />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
