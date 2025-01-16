import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../components/Background';
import MiniHomp from '../components/MiniHomp';
import BoardHelp from '../assets/board-help.svg';
import LoginHelp from '../assets/login-help.svg';
import SubHelp from '../assets/sub-help.svg';

const MiniH = () => {
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
          {/* How to use? */}
          <div
            style={{ fontSize: 'clamp(16px, 2vw, 32px)' }}
            className="text-[#79C6DE] text-left mt-7 ml-14"
          >
            How to use?
          </div>

          {/* 실선 */}
          <div className="border-t border-[#6C6C6C] w-[90%] mx-auto mt-3 mb-5"></div>

          {/* 공지 글씨 */}
          <div
            style={{ fontSize: 'clamp(16px, 2vw, 28px)' }}
            className="text-black text-left mx-4 ml-14"
          >
            [공지] 서비스 이용 안내
          </div>

          {/* 실선 */}
          <div className="border-t border-[#6C6C6C] w-[90%] mx-auto my-3"></div>
          <div
            style={{ fontSize: 'clamp(14px, 1.5vw, 20px)' }}
            className="text-black text-left mx-4 ml-14 mt-6"
          >
            <p style={{ lineHeight: '1.3' }}>
              안녕하세요 저희 서비스를 이용해주셔서 감사합니다.
              <br />
              나만의 알고리즘 보드를 만드는 방법은 다음과 같습니다.
            </p>
          </div>
          <div className="flex items-center gap-4 mx-4 ml-14 mt-4">
            <div
              style={{ fontSize: 'clamp(14px, 1.5vw, 24px)' }}
              className="text-black"
            >
              1. 왼쪽 하단의 버튼을 클릭합니다.
            </div>
            <div
              style={{ fontSize: 'clamp(14px, 1.5vw, 24px)' }}
              className="text-black"
            >
              2. 유튜브 로그인 창을 들어가 로그인
            </div>
          </div>
          <div className="flex justify-center items-center gap-[4vw] mt-3">
            <img
              src={BoardHelp}
              alt="Board Help"
              className="w-[45%] max-w-[260px]"
            />
            <img
              src={LoginHelp}
              alt="Login Help"
              className="w-[45%] max-w-[200px]"
            />
          </div>
          <div className="flex items-center gap-4 ml-14">
            <div
              style={{ fontSize: 'clamp(14px, 1.5vw, 24px)' }}
              className="text-black"
            >
              3. 구독 채널 최대 10개를 선택합니다.
            </div>
            <div
              style={{ fontSize: 'clamp(14px, 1.5vw, 24px)' }}
              className="text-black"
            >
              4. 보드판에 보드가 생성됩니다.
            </div>
          </div>
          <div className="flex mt-3 ml-24">
            <img
              src={SubHelp}
              alt="Sub Help"
              className="w-[50%] max-w-[300px]"
            />
          </div>
          {/* 버튼 그룹 */}
          <div className="absolute flex flex-col top-[20%] right-[-35px]">
            <button
              className="w-[min(80px,10vw)] h-[min(65px,6vw)] bg-white border-y-[5px] border-r-[5px] border-black text-black text-[20px]"
              onClick={() => {}}
            >
              홈
            </button>
            <button
              className="w-[min(80px,10vw)] h-[min(65px,6vw)] bg-[#238BA7] border-y-[5px] border-r-[5px] border-black text-black text-[20px]"
              onClick={() => navigate('/board')}
            >
              보드판
            </button>
            <button
              className="w-[min(80px,10vw)] h-[min(65px,6vw)] bg-[#238BA7] border-y-[5px] border-r-[5px] border-black text-black text-[20px]"
              onClick={() => navigate('/notice')}
            >
              게시판
            </button>
          </div>
        </MiniHomp>
      )}
    </Background>
  );
};
export default MiniH;
