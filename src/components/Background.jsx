import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router 사용
import startIcon from '../assets/start-icon.png';
import loginIcon from '../assets/login-icon.svg';

// 랜덤 별 생성 함수
const generateRandomStars = (count) => {
  const stars = [];
  for (let i = 0; i < count; i++) {
    const topPosition = Math.random() * 100;

    // 언더바 위치(90% ~ 100%)에는 별을 생성하지 않음
    if (topPosition >= 90) {
      continue;
    }

    stars.push({
      size: `${Math.random() * 0.2 + 0.1}vw`, // 크기: 0.2vw ~ 0.3vw
      top: `${topPosition}%`, // 위치: 0% ~ 95% (상단)
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
          className="w-[30px] h-[30px] mr-2"
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
  const [stars, setStars] = useState([]);
  useEffect(() => {
    const initialStars = generateRandomStars(30);
    setStars(initialStars);
  }, []);
  const navigate = useNavigate(); // React Router의 네비게이션 함수

  return (
    <div className="relative h-screen w-screen bg-[#202020]">
      {/* SVG 버튼 */}
      <button
        className="absolute top-4 left-4 p-2 bg-transparent"
        onClick={() => navigate('/login')} // /login 경로로 이동
      >
        <img src={loginIcon} alt="Login Icon" className="w-[100px] h-[100px]" />
      </button>
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
