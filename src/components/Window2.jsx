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
        className="relative bg-[#c3c7cb] leading-none pt-10"
        style={{
          width: 'min(82%, 1644px)', // 최대 1131px, 화면 크기에 따라 축소
          height: 'min(93%, 980px)', // 최대 674px, 화면 크기에 따라 축소
          boxShadow: `
      inset 7px 7px 0px #FFFFFF, /* 위쪽, 왼쪽 흰색 그림자 */
      inset -8px -8px 0px #000000 /* 아래쪽, 오른쪽 검은색 그림자 */
    `,
          bottom: '2%',
          transform: `translateX(${position.x}%) translateY(${position.y}%)`,
        }}
      >
        {/* 컴포넌트에 위치 지정 */}
        <div className="relative w-full h-full">{children}</div>

        {/* 상단 파란색 사각형과 X 버튼 컨테이너 */}
        <div
          className="relative"
          style={{
            position: 'absolute',
            top: '8px', // 창 컴포넌트보다 10px 아래로 내려옴
            left: '0.5%',
            width: '99%',
            height: '39px',
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
