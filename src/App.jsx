import './styles/index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Button from './components/Button';
import Window from './components/Window';
import Background from './components/Background';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Window2 from './components/Window2';
import MiniH from './pages/MiniH';
import TestPage from './pages/TestPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/homep" element={<MiniH />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
