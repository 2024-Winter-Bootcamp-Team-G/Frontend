import React, { useState } from 'react';
import Button from './Button';
import SelectIcon from '../assets/select.png';

const Select = ({ onComplete }) => {
  const [selectedBoard, setSelectedBoard] = useState(null); // 선택된 보드 상태 (단일 ID 관리)

  // 보드 선택 함수
  const handleSelectBoard = (index) => {
    console.log('Selected Board Index:', index); // 선택된 보드 인덱스 확인
    setSelectedBoard(index); // 선택된 보드 ID 설정
  };

  // 완료 버튼 클릭 시 호출
  const handleSubmit = () => {
    if (selectedBoard === null) {
      // 선택된 보드 없으면 경고
      alert('반드시 하나의 보드를 선택해주세요.');
      return;
    }
    onComplete(selectedBoard); // 선택된 보드 ID를 부모 컴포넌트로 전달
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* 큰 사각형 */}
      <div className="w-[700px] h-[506px] bg-[#c3c7cb] shadow-[5px_5px_0px_0px_rgba(255,255,255,0.90),inset_5px_5px_0px_0px_rgba(255,255,255,0.90)] relative">
        {/* 파란색 사각형 (상단에 고정) */}
        <div className="w-full h-9 bg-[#0000aa] absolute top-1 left-1">
          <h2 className="text-xl text-white z-10 pl-4 pt-1">보드판 선택창</h2>
        </div>

        {/* 스크롤 가능한 영역 */}
        <div className="absolute right-[1.5%] top-[12%] w-[670px] h-[350px] overflow-y-scroll scrollbar-thumb scrollbar-track">
          <div className="p-3 flex flex-col items-center justify-center gap-5">
            {/* 세로로 정렬된 체크 가능한 작은 사각형들 */}
            {[...Array(20)].map((_, index) => (
              <div
                key={index}
                className={`w-[80%] h-[50px] ${selectedBoard === index ? '!bg-[#b3e5fc] !border-[#0000aa] !border-2' : 'bg-white border border-[#c3c7cb]'} flex items-center justify-center
                          shadow-[inset_4px_4px_0px_0px_rgba(0,0,0,0.50)]
                          cursor-pointer`}
                onClick={() => handleSelectBoard(index)} // 보드 선택
              >
                {/* 보드 이름 표시 (예시로 번호) */}
                <span className="text-sm font-medium text-black">
                  보드 #{index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        <img
          src={SelectIcon} // 이미지 경로
          alt="select_icon"
          className="w-[8rem] h-[8rem] absolute -left-[1rem] -bottom-[1rem]"
        />

        {/* 텍스트를 완료 버튼 라인의 왼쪽 끝에 배치 */}
        <p className="absolute bottom-[1.5rem] left-[13%] text-sm text-center">
          반드시 단 하나의 보드를 고른 후 완료 버튼을 눌러주세요. <br />
          (보드 선택 후 일치율 분석은 최대 10초 소요됩니다.)
        </p>

        {/* 완료 버튼 */}
        <div className="w-[155px] h-[46px] flex justify-end absolute bottom-[1rem] right-[1.5%]">
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
