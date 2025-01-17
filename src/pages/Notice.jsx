import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../components/Background';
import MiniHomp from '../components/MiniHomp';

const Notice = () => {
  const navigate = useNavigate();
  const [isWindowOpen, setIsWindowOpen] = useState(true);
  // 창을 닫는 함수
  const handleCloseWindow = () => {
    console.log('창을 닫습니다.');
    setIsWindowOpen(false);
  };

  return (
    <Background>
      {isWindowOpen && ( // isWindowOpen이 true일 때만 창을 렌더링
        <MiniHomp onClose={handleCloseWindow}>
          {/* Make my board */}
          <div
            style={{ fontSize: 'clamp(16px, 2vw, 32px)' }}
            className="text-[#79C6DE] text-left mt-7 ml-14"
          >
            Make my board
          </div>

          {/* 실선 */}
          <div className="border-t border-[#6C6C6C] w-[90%] mx-auto mt-3 mb-5"></div>
        </MiniHomp>
      )}
    </Background>
  );
};
export default Notice;
