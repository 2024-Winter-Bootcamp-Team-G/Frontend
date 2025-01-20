import React, { useState } from 'react';

const VennDiagram = () => {
  const overlap = 30; // 겹치는 정도 (%).
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0 });

  // 겹치는 영역 크기와 위치 계산
  const overlapStyle = {
    width: `${overlap / 2}%`, // 겹치는 정도에 따라 너비 설정
    height: `${overlap > 50 ? overlap : overlap * 2}%`,
    top: '50%',
    transform: 'translateY(-50%)', // 수직 중앙 정렬
  };

  // 왼쪽 원의 불일치 영역 스타일 계산
  const leftUnmatchedStyle = {
    width: `${50 - overlap / 2}%`,
    height: '100%',
    left: `${0 + (overlap / 100) * 25}%`,
  };

  // 오른쪽 원의 불일치 영역 스타일 계산
  const rightUnmatchedStyle = {
    width: `${50 - overlap / 2}%`,
    height: '100%',
    right: `${0 + (overlap / 100) * 25}%`,
  };

  const handleMouseEnter = (event, type) => {
    const rect = event.target.getBoundingClientRect();
    const tooltipPosition = {
      match: { x: rect.left + rect.width / 2, y: rect.top - 20 },
      'left-unmatch': { x: rect.left - 10, y: rect.top + rect.height / 2 },
      'right-unmatch': { x: rect.right + 10, y: rect.top + rect.height / 2 },
    };

    setTooltip({
      visible: true,
      x: tooltipPosition[type]?.x || 0,
      y: tooltipPosition[type]?.y || 0,
      type, // 추가 정보: 일치/불일치 구분
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ visible: false, x: 0, y: 0, type: null });
  };

  const getTooltipContent = (type) => {
    switch (type) {
      case 'match':
        return {
          title: '일치 알고리즘',
          category: '음악, 예술',
          keyword: '창의성, 감성',
        };
      case 'left-unmatch':
        return {
          title: '불일치 알고리즘',
          category: '문학, 역사',
          keyword: '감성, 서사',
        };
      case 'right-unmatch':
        return {
          title: '불일치 알고리즘',
          category: '공학, 수학',
          keyword: '논리, 분석',
        };
      default:
        return { title: '', category: '', keyword: '' };
    }
  };

  const tooltipContent = getTooltipContent(tooltip.type);

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
          opacity: 0.5,
        }}
      ></div>

      {/* 두 번째 원 */}
      <div
        className="absolute w-[50%] aspect-square rounded-full transition-all duration-300"
        style={{
          left: `${50 - (overlap / 100) * 25}%`,
          backgroundColor: '#36abd1',
          opacity: 0.5,
        }}
      ></div>

      {/* 겹치는 영역 */}
      <div
        className="absolute bg-transparent"
        style={overlapStyle}
        onMouseEnter={(e) => handleMouseEnter(e, 'match')}
        onMouseLeave={handleMouseLeave}
      ></div>

      {/* 왼쪽 원의 불일치 영역 */}
      <div
        className="absolute bg-transparent"
        style={leftUnmatchedStyle}
        onMouseEnter={(e) => handleMouseEnter(e, 'left-unmatch')}
        onMouseLeave={handleMouseLeave}
      ></div>

      {/* 오른쪽 원의 불일치 영역 */}
      <div
        className="absolute bg-transparent"
        style={rightUnmatchedStyle}
        onMouseEnter={(e) => handleMouseEnter(e, 'right-unmatch')}
        onMouseLeave={handleMouseLeave}
      ></div>

      {/* 툴팁 */}
      {tooltip.visible && (
        <div
          className="absolute w-48 p-4 bg-white border border-gray-300 rounded-lg shadow-md text-black text-sm"
          style={{
            transform:
              tooltip.type === 'left-unmatch'
                ? 'translate(-120%, -60%)'
                : tooltip.type === 'right-unmatch'
                  ? 'translate(120%, -60%)'
                  : 'translate(60%, -60%)',
          }}
        >
          <div className="text-lg font-bold mb-2 text-center">
            {tooltipContent.title}
          </div>
          <ul className="list-disc list-inside">
            <li>카테고리: {tooltipContent.category}</li>
            <li>키워드: {tooltipContent.keyword}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default VennDiagram;
