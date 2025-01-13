import './styles/index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Button from './components/Button';
import Window from './components/Window';
import Background from './components/Background';
import Home from './pages/Home';
import Login from './pages/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
