import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../components/Background';
import MiniHomp from '../components/MiniHomp';
import Mbutton from '../components/Mbutton';

const Board = () => {
  const navigate = useNavigate();
  const [isWindowOpen, setIsWindowOpen] = useState(true);
  // 창을 닫는 함수
  const handleCloseWindow = () => {
    console.log('창을 닫습니다.');
    setIsWindowOpen(false);
  };

  return (
    <Background>
      {isWindowOpen && ( // isWindowOpen이 true일 때만 창을 렌더링
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
            className="text-black text-left mx-4 ml-11 mb-6"
          >
            (Ai가 만들어준 칭호)
          </div>

          {/* 보드판 */}
          <div className="grid grid-cols-3 px-12 w-full h-full mt-5">
            {/* 이미지 컨테이너 */}
            <div className="relative mt-[-30px] ml-[3%] w-[90%] h-[60%] bg-[#d9d9d9] rounded-[20px]">
              <div className="absolute top-[5px] left-[5px] w-[calc(100%-10px)] h-[calc(100%-10px)] rounded-[20px] border-[3px] border-dashed border-white">
                ai이미지
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-2">
              {/* 2등 컨테이너 */}
              <div className="relative mt-[-50px] ml-[20%] w-[100%] h-[40%] bg-[#aedcea] rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                <div className="absolute top-[5px] left-[5px] w-[calc(100%-10px)] h-[calc(100%-10px)] rounded-[20px] border-[3px] border-dashed border-white"></div>
              </div>

              {/* 1등 컨테이너 */}
              <div className="relative mt-2 ml-[20%] w-[100%] h-[60%] bg-[#4cb2d2] rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                <div className="absolute top-[5px] left-[5px] w-[calc(100%-10px)] h-[calc(100%-10px)] rounded-[20px] border-[3px] border-dashed border-white"></div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-2">
              {/* 3등 컨테이너 */}
              <div className="relative mt-[-50px] w-[70%] h-[55%] bg-[#79c6de] rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                <div className="absolute top-[5px] left-[5px] w-[calc(100%-10px)] h-[calc(100%-10px)] rounded-[20px] border-[3px] border-dashed border-white"></div>
              </div>

              {/* 4등 컨테이너 */}
              <div className="relative mt-2 w-[70%] h-[45%] bg-[#c3dee7] rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                <div className="absolute top-[5px] left-[5px] w-[calc(100%-10px)] h-[calc(100%-10px)] rounded-[20px] border-[3px] border-dashed border-white"></div>
              </div>
            </div>
          </div>
        </MiniHomp>
      )}
    </Background>
  );
};
export default Board;
