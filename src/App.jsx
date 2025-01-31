import './styles/index.css';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import MiniH from './pages/MiniH';
import Notice from './pages/Notice';
import Board from './pages/Board';
import Share from './pages/Share';
import './styles/scrollbar.css';
import './styles/cursor.css';
import Start from './pages/Start';

const App = () => {
  useEffect(() => {
    document.title = 'Algorify';
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/homep" element={<MiniH />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/board" element={<Board />} />
        <Route path="/board/:boardId" element={<Board />} />
        <Route path="/share" element={<Share />} />
        <Route path="/start" element={<Start />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
