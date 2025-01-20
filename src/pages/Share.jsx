import React, { useState } from 'react';
import Button from '../components/Button';
import Background from '../components/Background';
import ShareIcon from '../assets/algo.png';
import RadarChartComponent from '../components/RadarChartComponent';
import VennDiagram from '../components/VennDiagram';
import Select from '../components/Select';

const Share = ({ onClose }) => {
  const [isSelectionComplete, setIsSelectionComplete] = useState(false); // 선택창 완료 상태
  const [selectedValue, setSelectedValue] = useState(''); // 선택창에서 입력된 값

  // 선택창 완료 시 호출되는 함수
  const handleSelectionComplete = (value) => {
    setSelectedValue(value);
    setIsSelectionComplete(true);
  };

  return (
    <Background>
      {/* 선택창이 완료되지 않았다면 선택창을 표시 */}
      {!isSelectionComplete && <Select onComplete={handleSelectionComplete} />}

      {/* 선택창이 완료되면 기존 UI를 렌더링 */}
      {isSelectionComplete && (
        <div
          className="absolute right-[5rem] top-[1rem] bg-[#c3c7cb] leading-none shadow-[inset_5px_5px_0px_#FFFFFF,inset_-5px_-5px_0px_#ffffff] overflow-hidden"
          style={{
            width: 'min(80%, 1644px)',
            height: 'min(90%, 980px)',
          }}
        >
          {/* 상단 파란색 사각형과 X 버튼 컨테이너 */}
          <div className="absolute top-2 left-[7px] right-[8px] w-[calc(100%-17px)] h-[39px] z-10 bg-[#0000aa]">
            <p className="text-white text-xl absolute top-1 left-2">
              http://www.알고리즘분석.com
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

          {/* Share 아이콘 및 텍스트 */}
          <div className="relative top-[1rem] -left-5">
            <img src={ShareIcon} alt="share" className="w-40 h-40" />
          </div>
          <p className="relative -top-[5rem] left-[6.5rem] text-black text-2xl">
            A님과 B님의 알고리즘 일치율
          </p>
          <p className="absolute top-[8.5rem] left-[6.5rem]">
            해당 페이지에서는 두 분의 알고리즘에 대한 분석을 확인해볼 수
            있습니다.
            <br />
            <br />
            차트를 클릭하시면 보다 세부적인 내용 확인이 가능합니다.
          </p>

          {/* A님과 B님의 색상 표시 */}
          <div className="relative -right-[53rem] -top-[6.8rem] w-[3rem] h-[1.5rem] bg-[#ed8b67] " />
          <p className="relative -top-[8.4rem] left-[57rem] text-black text-xl">
            A님의 알고리즘
          </p>
          <div className="relative -right-[53rem] -top-[7.5rem] w-[3rem] h-[1.5rem] bg-[#36abd1] " />
          <p className="relative -top-[9.1rem] left-[57rem] text-black text-xl">
            B님의 알고리즘
          </p>

          {/* Radar 차트 및 카테고리별 비율 텍스트 */}
          <div className="relative -top-[6.5rem] left-[19rem] w-full h-[55vh]">
            <p className="text-center text-[#3E3E3E] text-xl mb-4">
              [각 카테고리별 비율]
            </p>
            <RadarChartComponent />
          </div>
          <div className="absolute top-[40%] left-10 w-[46%] aspect-[2/1]">
            <VennDiagram />
          </div>
        </div>
      )}
    </Background>
  );
};

export default Share;
