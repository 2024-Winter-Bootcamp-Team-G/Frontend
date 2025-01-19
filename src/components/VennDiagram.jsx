import React from 'react';

const VennDiagram = () => {
  const overlap = 40; // 겹치는 정도 (%).

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* 일치율 텍스트 */}
      <div className="absolute top-[-2rem] left-1/2 transform -translate-x-1/2 text-black text-2xl">
        일치율: {overlap}%
      </div>

      {/* 첫 번째 원 */}
      <div
        className="absolute w-[50%] aspect-square rounded-full transition-all duration-300"
        style={{
          left: `${0 + (overlap / 100) * 25}%`,
          backgroundColor: '#ed8b67',
          opacity: 0.5, // 투명도 설정
        }}
      ></div>

      {/* 두 번째 원 */}
      <div
        className="absolute w-[50%] aspect-square rounded-full transition-all duration-300"
        style={{
          left: `${50 - (overlap / 100) * 25}%`,
          backgroundColor: '#36abd1',
          opacity: 0.5, // 투명도 설정
        }}
      ></div>
    </div>
  );
};

export default VennDiagram;
