import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../components/Background';
import MiniHomp from '../components/MiniHomp';
import Mbutton from '../components/Mbutton';
import Retry from '../assets/retry.png';

const Board = () => {
  const navigate = useNavigate();
  const [isWindowOpen, setIsWindowOpen] = useState(true);

  // 창을 닫는 함수
  const handleCloseWindow = () => {
    console.log('창을 닫습니다.');
    setIsWindowOpen(false);
  };

  // 회전 아이콘 컴포넌트
  const RotatingIcon = () => {
    const [rotateDegree, setRotateDegree] = useState(0);

    // 클릭 시 360도 회전
    const handleClick = () => {
      setRotateDegree((prev) => prev + 360);
    };

    return (
      <img
        src={Retry}
        alt="retry"
        className="w-6 h-6 cursor-pointer"
        style={{
          transform: `rotate(${rotateDegree}deg)`,
          transition: 'transform 0.5s ease',
        }}
        onClick={handleClick}
      />
    );
  };

  return (
    <Background>
      {isWindowOpen && (
        <MiniHomp onClose={handleCloseWindow}>
          {/* Let's make my board */}
          <div
            style={{ fontSize: 'clamp(16px, 2vw, 32px)' }}
            className="text-[#79C6DE] text-left mt-7 ml-12"
          >
            Let`s make my board
          </div>

          {/* 실선 */}
          <div className="border-t border-[#6C6C6C] w-[90%] mx-auto mt-3 mb-5"></div>

          <div
            style={{ fontSize: 'clamp(16px, 2vw, 28px)' }}
            className="text-black text-left ml-11 mb-6"
          >
            (Ai가 만들어준 칭호)
          </div>

          {/* 보드판 */}
          <div className="grid grid-cols-3 px-10 pb-5 w-full h-full">
            <div>
              {/* 이미지 컨테이너 */}
              <div className="relative w-[90%] h-[65%] bg-[#d9d9d9] rounded-[20px] aspect-square">
                <div className="absolute top-[0.3125rem] left-[0.3125rem] w-[calc(100%-0.625rem)] h-[calc(100%-0.625rem)] rounded-[20px] border-[3px] border-dashed border-white flex items-center justify-center"></div>
              </div>
              <Mbutton
                text="완료하기"
                className="absolute mt-[3%] w-12 h-[15%] max-w-[7rem] max-h-[3rem]"
                variant="edit"
              />
              <Mbutton
                text="공유하기"
                className="absolute mt-[2%] w-12 h-[15%] max-w-[7rem] max-h-[3rem]"
                variant="edit"
              />
            </div>

            <div className="justify-items-center">
              {/* 3등 컨테이너 */}
              <div className="relative w-[95%] h-[40%] bg-[#aedcea] rounded-[1.25rem] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                <div className="absolute top-[0.3125rem] left-[0.3125rem] w-[calc(100%-0.625rem)] h-[calc(100%-0.625rem)] rounded-[1.25rem] border-[0.1875rem] border-dashed border-white flex items-center justify-center">
                  {/* 3등 컨테이너 텍스트 */}
                  <span className="absolute top-[10%] left-[45%] transform -translate-x-1/2 text-black text-xl font-nomal">
                    3위
                  </span>
                  {/* Retry 아이콘 */}
                  <div className="absolute top-[10%] left-[60%] transform -translate-x-1/2">
                    <RotatingIcon />
                  </div>
                </div>
              </div>

              {/* 2등 컨테이너 */}
              <div className="relative mt-[3%] w-[95%] h-[57%] bg-[#4cb2d2] rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                <div className="absolute top-[0.3125rem] left-[0.3125rem] w-[calc(100%-0.625rem)] h-[calc(100%-0.625rem)] rounded-[20px] border-[3px] border-dashed border-white flex items-center justify-center">
                  {/* 2등 컨테이너 텍스트 */}
                  <span className="absolute top-[10%] left-[45%] transform -translate-x-1/2 text-black text-xl font-nomal">
                    2위
                  </span>
                  {/* Retry 아이콘 */}
                  <div className="absolute top-[10%] left-[60%] transform -translate-x-1/2">
                    <RotatingIcon />
                  </div>
                </div>
              </div>
            </div>

            <div className="justify-items-center">
              {/* 1등 컨테이너 */}
              <div className="relative mb-[3%] w-[95%] h-[62%] bg-[#79c6de] rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                <div className="absolute top-[5px] left-[5px] w-[calc(100%-10px)] h-[calc(100%-10px)] rounded-[20px] border-[3px] border-dashed border-white">
                  {/* "1위" 텍스트 (가운데 정렬) */}
                  <span className="absolute top-[8%] left-[45%] transform -translate-x-1/2 text-black text-xl font-normal">
                    1위
                  </span>
                  {/* Retry 아이콘 */}
                  <div className="absolute top-[8%] left-[65%] transform -translate-x-1/2">
                    <RotatingIcon />
                  </div>
                  {/* 숫자들 (왼쪽 정렬) */}
                  <div className="absolute top-[20%] left-0 pl-4 text-black text-xl font-normal text-left">
                    ①<br />②<br />③
                  </div>
                </div>
              </div>

              {/* 4등 컨테이너 */}
              <div className="relative w-[95%] h-[35%] bg-[#c3dee7] rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                <div className="absolute top-[5px] left-[5px] w-[calc(100%-10px)] h-[calc(100%-10px)] rounded-[20px] border-[3px] border-dashed border-white">
                  <span className="absolute top-[8%] left-[45%] transform -translate-x-1/2 text-black text-xl font-nomal">
                    4위
                  </span>
                  {/* Retry 아이콘 */}
                  <div className="absolute top-[8%] left-[65%] transform -translate-x-1/2">
                    <RotatingIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MiniHomp>
      )}
    </Background>
  );
};

export default Board;
