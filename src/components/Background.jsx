import { useEffect, useState } from 'react';
import startIcon from '../assets/start-icon.png';

// 랜덤 별 생성
const generateRandomStars = (count) => {
  const stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      size: `${Math.random() * 0.2 + 0.1}vw`, // 크기: 0.2vw ~ 0.3vw
      top: `${Math.random() * 100}%`, // 위치: 0% ~ 100% (상단)
      left: `${Math.random() * 100}%`, // 위치: 0% ~ 100% (좌측)
    });
  }
  return stars;
};

// 언더바
const Underbar = () => {
  const [time, setTime] = useState('');

  // 현재 시간을 업데이트하는 함수
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedTime = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
      setTime(formattedTime);
    };

    updateTime();
    const timer = setInterval(updateTime, 10000); // 10초마다 업데이트

    return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, []);

  return (
    <div className="fixed bottom-0 left-0 h-[5vh] min-h-[35px] w-full bg-[#C0C0C0] shadow-[0_-1px_0_#000] flex items-center justify-between px-4">
      {/* Start 버튼 */}
      <button
        className="
          inline-flex items-center justify-center
          bg-[#C0C0C0]
          shadow-[inset_2px_2px_0_#FFF,inset_-2px_-2px_0_#808080,inset_2px_2px_0_#DFDFDF]
          text-black font-main
          text-[min(2vw,16px)]
          px-[1vw] py-[0.5vh]
          cursor-pointer
          active:border-r-[1px] active:border-b-[1px] active:border-[#FFF]
          active:shadow-[inset_1px_1px_0_#000,inset_-2px_-2px_0_#DFDFDF,inset_2px_2px_0_#808080]
        "
        onClick={() => {}}
      >
        <img
          src={startIcon}
          alt="Start Icon"
          className="w-[2.5vw] h-[2.5vh] mr-2"
        />
        Start
      </button>

      {/* 시간 표시 박스 */}
      <div
        className="
          inline-flex items-center justify-center
          bg-[#C0C0C0] 
          shadow-[inset_-2px_-2px_0_#FFF,inset_2px_2px_0_#808080]
          text-black font-main
          text-[min(2vw,16px)]   /* 폰트 크기 반응형: 최대 16px */
          px-[1vw] py-[0.5vh]    /* 패딩 반응형: 너비 1vw, 높이 0.5vh */
        "
      >
        {time}
      </div>
    </div>
  );
};

// 배경화면
const Background = ({ children }) => {
  const stars = generateRandomStars(30); // 작은 별 30개 생성

  return (
    <div className="relative h-screen w-screen bg-[#202020]">
      {/* 랜덤 별 렌더링 */}
      {stars.map((star, index) => (
        <div
          key={index}
          className="absolute bg-white rounded-full"
          style={{
            width: star.size,
            height: star.size,
            top: star.top,
            left: star.left,
          }}
        ></div>
      ))}
      {/* children 렌더링 */}
      <div>{children}</div>
      {/* 언더바 */}
      <Underbar />
    </div>
  );
};

export default Background;
