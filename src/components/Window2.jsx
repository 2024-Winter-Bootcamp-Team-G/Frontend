import { useState } from 'react';
import Button from './Button.jsx';

const Window2 = ({ children, onClose }) => {
  const [position, setPosition] = useState({ x: 7, y: 0 }); // 초기 위치

  const handleMove = (x, y) => {
    setPosition({ x, y });
  };
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      {/* 창 컴포넌트 */}
      <div
        className="relative bg-[#c3c7cb] leading-none shadow-[inset_5px_5px_0px_white, inset_-5px_-5px_0px_white] b-[2%]"
        style={{
          width: 'min(82%, 1644px)', // 최대 1131px, 화면 크기에 따라 축소
          height: 'min(93%, 980px)', // 최대 674px, 화면 크기에 따라 축소
          transform: `translateX(${position.x}%) translateY(${position.y}%)`,
        }}
      >
        {/* 컴포넌트에 위치 지정 */}
        <div className="relative w-full h-full">{children}</div>

        {/* 상단 파란색 사각형과 X 버튼 컨테이너 */}
        <div
          className="relative w-[99%] h-[40px] t-[8px] l-[0.5%]"
          style={{
            zIndex: 10,
          }}
        >
          <div className="relative w-full h-full bg-[#0000aa]">
            <p className="text-white text-xl absolute top-1 left-2">
              http://www.Gteam.com
            </p>
            {/* X 버튼 */}
            <Button
              type="x"
              onClick={onClose}
              className="absolute top-1/2 right-2 transform -translate-y-1/2"
            >
              X
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Window2;
