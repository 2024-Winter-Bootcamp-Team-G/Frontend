import React from 'react';
import Button from './Button';
import LoadingImage from '../assets/loading.png';

const Loading = () => {
  // 애니메이션 정의
  const progressBarAnimation = `
    @keyframes appearBar {
      0% {
        visibility: hidden;
      }
      100% {
        visibility: visible;
      }
    }
  `;

  return (
    <div className="flex items-center justify-center h-screen font-normal">
      {/* Global Style for Animation */}
      <style>{progressBarAnimation}</style>

      {/* 창 외곽 */}
      <div className="w-[733px] h-[447px] bg-[#c0c0c0] shadow-[3px_3px_0px_1px_rgba(117,117,117,1.00),inset_3px_3px_0px_0px_rgba(255,255,255,0.90)] relative">
        {/* 로딩 이미지 */}
        <img
          src={LoadingImage}
          alt="loading_C"
          className="w-[283px] h-[262px] absolute left-[-3.5%] top-[13%]"
        />

        {/* 창 상단 바 */}
        <div className="relative left-[0.8%] top-[1.3%] w-[724px] h-9 bg-[#0000aa]">
          <div className="absolute top-[1.5px] left-4 text-white">
            <span className="font-normal text-2xl text-white">
              Making your board..
            </span>
          </div>
          <div className="relative top-[8%] left-[95%] z-10">
            <Button
              type="x"
              onClick={() => {}}
              className="w-[18px] h-[18px] text-center font-normal"
            >
              X
            </Button>
          </div>
        </div>

        {/* 창 본문 */}
        <div className="absolute top-[27%] left-[54%] transform -translate-x-1/2 text-center">
          <h2 className="text-6xl font-normal mb-6">Loading..</h2>
          <p className="mb-4 text-2xl">
            보드가 만들어지고 있어요! <br /> 잠시만 기다려주세요.
          </p>
        </div>

        {/* 로딩 바 */}
        <div className="absolute bottom-[22%] left-[7%] w-[627px] h-[33px] bg-[#d9d9d9] shadow-[2px_2px_0px_0px_rgba(255,255,255,1.00),inset_2px_2px_4px_0px_rgba(0,0,0,0.60)] overflow-hidden">
          {/* 바들을 포함한 트랙 */}
          <div className="flex justify-start items-center h-full">
            {/* 개별 바 */}
            {[...Array(30)].map((_, index) => (
              <div
                key={index}
                className="h-7 w-[19px] bg-[#04066d] shadow-[1px_1px_0px_0px_rgba(0,0,0,0.25)]"
                style={{
                  visibility: 'hidden', // 초기 상태는 숨김
                  animation: 'appearBar 0.5s ease-in-out forwards', // 애니메이션 적용
                  animationDelay: `${index * 0.8}s`, // 순차적 애니메이션 지연
                  marginRight: '2px', // 사각형 사이 간격
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
