import { useState } from 'react';
import Window2 from '../components/Window2';
import HompImage from '../assets/mini_homp.jpg';

const MiniH = () => {
  const [isWindowOpen, setIsWindowOpen] = useState(true);

  // 창을 닫는 함수
  const handleCloseWindow = () => {
    console.log('창을 닫습니다.');
    setIsWindowOpen(false);
  };

  return (
    <>
      {isWindowOpen && ( // isWindowOpen이 true일 때만 창을 렌더링
        <Window2 onClose={handleCloseWindow}>
          {/* 이미지를 감싸는 컨테이너 */}
          <div className="relative w-full h-full leading-none overflow-hidden">
            {' '}
            {/* overflow-hidden 추가 */}
            {/* 이미지 */}
            <img
              src={HompImage}
              alt="Homp"
              className="absolute right-[0.5%] bottom-[1.8%] w-[99%] h-[96%] object-contain"
            />
          </div>
        </Window2>
      )}
    </>
  );
};

export default MiniH;
