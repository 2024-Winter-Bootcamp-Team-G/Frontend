import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../components/Background';
import MiniHomp from '../components/MiniHomp';
import BoardHelp from '../assets/board-help.svg';
import LoginHelp from '../assets/login-help.svg';
import SubHelp from '../assets/sub-help.svg';
import BoardEx from '../assets/boardhome.png';

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
          {/* 제목 */}
          <div className="px-8">
            <div className="text-[#79C6DE] ml-4 text-left mt-7 text-[2rem]">
              How to use?
            </div>

            {/* 실선 */}
            <div className="border-t border-[#6C6C6C] w-[100%] mx-auto mt-3 mb-5"></div>

            {/* 공지 글씨 */}
            <div className="text-black text-left mx-4 mb-3 text-[1.5rem]">
              [공지] 서비스 이용 안내{' '}
              <p className="text-sm inline">
                (화면이 작을 시, 스크롤로 확인 가능합니다.)
              </p>
            </div>

            {/* 실선 */}
            <div className="border-t border-[#6C6C6C] w-[100%] mx-auto"></div>

            {/* 서비스 이용 방법 */}
            <div className="text-black text-left mx-4 mt-4 text-[1.25rem]">
              <p style={{ lineHeight: '1.3' }}>
                안녕하세요 저희 서비스를 이용해주셔서 감사합니다.
                <br />
                나만의 알고리즘 보드를 만드는 방법은 다음과 같습니다.
              </p>
            </div>
            <div className="flex items-center justify-between mt-5 mr-0">
              <div className="text-black text-[1.25rem]">
                1. 왼쪽 하단의 버튼을 클릭합니다.
              </div>
              <div className="text-black text-[1.25rem]">
                2-1. 유튜브 로그인 창을 들어가 로그인
              </div>
            </div>
            <div className="flex justify-between items-center mt-3 mx-12">
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
            <div className="flex items-center justify-between mr-3">
              <div className="text-black text-[1.25rem]">
                2-2. 구독 채널 최대 10개를 선택합니다.
              </div>
              <div className="text-black text-[1.25rem]">
                3. 보드판에 보드가 생성됩니다.
              </div>
            </div>
            <div className="flex justify-between items-center mt-3 mx-12">
              <img
                src={SubHelp}
                alt="Sub Help"
                className="w-[50%] max-w-[300px]"
              />
              <img
                src={BoardEx}
                alt="board example"
                className="w-[50%] max-w-[300px] sm:w-[50%] lg:w-[50%]"
              />
            </div>
            <div className="flex items-start mt-10 mb-3">
              <p
                className="text-black text-[1.25rem]"
                style={{ lineHeight: '1.5' }}
              >
                4. 공유하기를 누르면 알고리즘 일치율 분석보드로 이동할 수 있는
                코드가 복사됩니다.
                <br />
                <br />
                해당 코드를 왼쪽의 Match Chart 아이콘을 눌러 입력창에 입력하면
                상대방과의 일치율 분석보드를 확인할 수 있습니다.
                <br />
                <br />
                <br />
                5. 왼쪽 하단에 End 버튼을 누르면 로그아웃됩니다.
              </p>
            </div>
          </div>
        </MiniHomp>
      )}
    </Background>
  );
};
export default MiniH;
