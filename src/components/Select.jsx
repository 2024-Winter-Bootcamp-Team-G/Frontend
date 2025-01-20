import React, { useState } from 'react';
import Button from './Button';
import SelectIcon from '../assets/select.png';

const Select = ({ onComplete }) => {
  const handleSubmit = () => {
    onComplete(); // 부모 컴포넌트에 완료 신호 전달
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* 큰 사각형 */}
      <div className="w-[889px] h-[506px] bg-[#c3c7cb] shadow-[5px_5px_0px_0px_rgba(255,255,255,0.90),inset_5px_5px_0px_0px_rgba(255,255,255,0.90)] relative">
        {/* 파란색 사각형 (상단에 고정) */}
        <div className="w-full h-9 bg-[#0000aa] absolute top-1 left-1">
          {/* 텍스트를 파란색 사각형 위에 배치 */}
          <h2 className="text-xl text-white z-10 pl-4 pt-1">보드판 선택창</h2>
        </div>

        {/* 스크롤 가능한 영역 */}
        <div className="absolute right-[1.5%] top-[12%] w-[850px] h-[300px] overflow-y-scroll scrollbar-thumb scrollbar-track">
          <div className="h-[1500px] w-full p-3 flex flex-col gap-5">
            {/* 스크롤 가능한 작은 사각형들 */}
            {[...Array(20)].map((_, index) => (
              <div
                key={index}
                className="w-12 h-12 bg-white border border-[#c3c7cb] 
                          shadow-[inset_4px_4px_0px_0px_rgba(0,0,0,0.50)]"
              />
            ))}
          </div>
        </div>
        <img
          src={SelectIcon} // 이미지 경로
          alt="select_icon"
          className="w-[8rem] h-[8rem] absolute -left-[1rem] bottom-[1rem]"
        />

        {/* 텍스트를 완료 버튼 라인의 왼쪽 끝에 배치 */}
        <p className="absolute bottom-[1rem] left-[10%] text-xl">
          상대방과 일치율을 분석할 보드판을 한 가지 고른 후, <br />
          완료버튼을 눌러주세요.
          <br />
          (일치율 보드판 생성은 최대 10초까지 걸릴 수 있습니다.)
        </p>

        {/* 완료 버튼 */}
        <div className="w-[155px] h-[46px] absolute bottom-[0.5rem] right-[1.5%]">
          <Button
            onClick={handleSubmit}
            type="popup"
            className="w-[155px] h-[46px]"
          >
            완료
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Select;
