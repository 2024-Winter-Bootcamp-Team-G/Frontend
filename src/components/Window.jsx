import Button from './Button.jsx';

const Window = ({ children }) => {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      {/* 창 컴포넌트 */}
      <div
        className="relative bg-[#c3c7cb] pt-10 p-2"
        style={{
          width: 'min(90%, 1130px)', // 최대 1131px, 화면 크기에 따라 축소
          height: 'min(85%, 674px)', // 최대 674px, 화면 크기에 따라 축소
          boxShadow: `
      inset 5px 5px 0px #FFFFFF, /* 위쪽, 왼쪽 흰색 그림자 */
      inset -5px -5px 0px #000000 /* 아래쪽, 오른쪽 검은색 그림자 */
    `,
        }}
      >
        {/* 컴포넌트에 위치 지정 */}
        {children}

        {/* 상단 파란색 사각형과 X 버튼 컨테이너 */}
        <div
          className="relative"
          style={{
            position: 'absolute',
            top: '8px', // 창 컴포넌트보다 10px 아래로 내려옴
            left: '0.5%',
            width: '99%',
            height: 'clamp(30px, 5vh, 39px)', // 최소 30px, 최대 39px, 화면 세로 크기에 따라 반응형
            zIndex: 10,
          }}
        >
          <div className="relative w-full h-full bg-[#0000aa]">
            {/* X 버튼 */}
            <Button
              type="x"
              onClick={() => {}}
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

export default Window;
