import './styles/index.css'; // Tailwind CSS 파일 경로를 정확히 지정
import Button from './components/Button';
import Card from './components/Card';

function App() {
  return (
    <>
      <Button type="x" onClick={() => {}}>
        x
      </Button>
      <Button type="default" onClick={() => alert('Button clicked!')}>
        닫기
      </Button>
    </>
  );
}

export default App;
