const Window = () => {
  return (
    <div className="relative w-[1131px] h-[674px]">
      {' '}
      {/* 상대적 위치 지정을 위한 컨테이너 */}
      {/* 창 컴포넌트 */}
      <div
        className="w-full h-full bg-[#c3c7cb]"
        style={{
          boxShadow:
            '7px 7px 0px 1px rgba(0, 0, 0, 0.90), inset 8px 8px 0px 0px rgba(255, 255, 255, 0.90)',
        }}
      >
        {/* 창 내용을 여기에 추가할 수 있습니다. */}
      </div>
      {/* 상단 파란색 사각형과 X 버튼을 묶은 컨테이너 */}
      <div
        className="absolute"
        style={{
          top: '8px', // 창 컴포넌트 위로 겹치도록 조정
          left: '50%', // 가로 중앙 정렬
          transform: 'translateX(-50%)', // 정확한 중앙 정렬
          zIndex: 10, // 상단 사각형과 버튼이 창 컴포넌트 위로 오도록 설정
        }}
      >
        {/* 상단 사각형 */}
        <div className="w-[1117px] h-[39px] bg-[#0000aa]" />

        {/* X 버튼 */}
        <button
          className="absolute w-[29px] h-[27px] bg-[#c3c7cb] flex items-center justify-center border-r-[1px] border-b-[1px] border-[#000] shadow-[inset_1px_1px_0_#FFF,inset_-2px_-2px_0_#808080,inset_2px_2px_0_#DFDFDF] cursor-pointer active:border-r-[1px] active:border-b-[1px] active:border-[#FFF] active:shadow-[inset_1px_1px_0_#000,inset_-2px_-2px_0_#DFDFDF,inset_2px_2px_0_#808080] text-black font-main text-center"
          style={{
            top: '7px', // 상단 사각형 위에 배치
            left: '98%', // 가로 중앙 정렬
            transform: 'translateX(-50%)',
          }}
        >
          <div className="text-black text-xl font-normal leading-none">x</div>
        </button>
      </div>
    </div>
  );
};

export default Window;
