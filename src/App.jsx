import './styles/index.css'; // Tailwind CSS 파일 경로를 정확히 지정
import Button from './components/Button';
import Window from './components/Window';

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
