import './styles/index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Button from './components/Button';
import Window from './components/Window';
import Background from './components/Background';
import Home from './pages/Home';
import Login from './pages/Login';
import Window2 from './components/Window2';
import MiniH from './pages/MiniH';

const App = () => {
  return (
    <div>
      <MiniH />;
    </div>
  );
};

export default App;
