import './styles/index.css';
import Button from './components/Button';
import Window from './components/Window';
import Background from './components/Background';


function App() {
  return (
    <>
      <Button type="x" onClick={() => {}}>
        x
      </Button>
      <Button type="default" onClick={() => alert('Button clicked!')}>
        닫기
      </Button>
      <Window className="flex justify-center items-center h-screen bg-gray-200">
        <Window />
      </Window>
    </>
  );
}

export default App;
