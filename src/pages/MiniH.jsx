import { useState } from 'react';
import Window2 from '../components/Window2';
import HompImage from '../assets/mini_homp.jpg';
import Background from '../components/Background';
const MiniH = () => {
  const [isWindowOpen, setIsWindowOpen] = useState(true);
  // 창을 닫는 함수
  const handleCloseWindow = () => {
    console.log('창을 닫습니다.');
    setIsWindowOpen(false);
  };

  const getCurrentYear = () => {
    const today = new Date();
    return today.getFullYear();
  };
  const getTodayDate = () => {
    const today = new Date(); // 현재 날짜 가져오기
    const year = String(today.getFullYear()).slice(-2); // 연도
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 월 (0부터 시작하므로 +1, 2자리로 포맷)
    const day = String(today.getDate()).padStart(2, '0'); // 일 (2자리로 포맷)
    return `${year}${month}${day}`; // YYYYMMDD 형식으로 반환
  };

  const currentYear = getCurrentYear();
  const todayDate = getTodayDate();

  return (
    <Background>
      {isWindowOpen && ( // isWindowOpen이 true일 때만 창을 렌더링
        <Window2 onClose={handleCloseWindow}>
          {/* 이미지를 감싸는 컨테이너 */}
          <div className="relative w-full h-full leading-none overflow-hidden">
            {' '}
            {/* overflow-hidden 추가 */}
            {/* 이미지 */}
            <img
              src={HompImage}
              alt="Homp"
              className="absolute right-[0.5%] bottom-[1.8%] w-[99%] h-[96%] object-contain"
            />
            <div className="absolute top-[11%] left-[11.5%] text-black font-main text-x">
              TODAY <span style={{ color: '#ff4b4b' }}>{currentYear}</span> |
              TOTAL {todayDate}
            </div>
          </div>
        </Window2>
      )}
    </Background>
  );
};
export default MiniH;
