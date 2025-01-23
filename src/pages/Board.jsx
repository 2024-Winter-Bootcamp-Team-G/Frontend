import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../components/Background';
import MiniHomp from '../components/MiniHomp';
import Mbutton from '../components/Mbutton';
import Retry from '../assets/retry.png';
import api from '../api/axios_config'; // axios_config 파일에서 api 가져오기
import { getCookie } from '../utils/cookie';

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

  // 보드 생성 함수
  const createBoard = async () => {
    const channelIds = ['UCHXH4PWrMwHcxxMzML-S0Ig'];
    const access_token = getCookie('access_token');
    console.log('쿠키에서 읽은 토큰:', access_token);

    try {
      if (!access_token) {
        alert('로그인이 필요합니다.');
        navigate('/login');
        return;
      }

      const response = await api.post('/boards', null, {
        params: {
          channel_ids: channelIds.join(','), // 채널 ID 배열 전달
        },
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        timeout: 30000,
      });

      if (response.status === 200) {
        console.log(response.data.message); // "보드가 성공적으로 생성되었습니다."
        const boardId = response.data.result.board.id;
        alert(`보드가 성공적으로 생성되었습니다.`);
        navigate('/notice'); // 완료 후 공지사항 페이지로 이동
      }
    } catch (error) {
      console.error('보드 생성 실패:', error.response?.data || error.message);

      // 서버 응답에서 detail 배열 확인
      if (error.response?.data?.detail) {
        let errorMessage;
        if (Array.isArray(error.response.data.detail)) {
          // detail이 배열인 경우
          errorMessage = error.response.data.detail.join(', ');
        } else {
          // detail이 문자열인 경우
          errorMessage = error.response.data.detail;
        }
        alert(`보드 생성에 실패했습니다: ${errorMessage}`);
      } else {
        alert('보드 생성에 실패했습니다: 알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  return (
    <Background>
      {isWindowOpen && (
        <MiniHomp onClose={handleCloseWindow}>
          {/* Let's make my board */}
          <div className="text-[#79C6DE] text-left mt-7 ml-12 text-[2rem]">
            Let`s make my board
          </div>

          {/* 실선 */}
          <div className="border-t border-[#6C6C6C] w-[90%] mx-auto mt-3 mb-5"></div>

          <div className="text-black text-left ml-11 mb-6 text-[1.5rem]">
            (Ai가 만들어준 칭호)
          </div>

          {/* 보드판 */}
          <div className="grid grid-cols-3 px-10 pb-5 w-full h-full">
            <div className="relative flex flex-col">
              {/* 이미지 컨테이너 */}
              <div className="relative w-[90%] bg-[#d9d9d9] rounded-[20px] aspect-square">
                <div className="absolute top-[0.3125rem] left-[0.3125rem] w-[calc(100%-0.625rem)] h-[calc(100%-0.625rem)] rounded-[20px] border-[3px] border-dashed border-white flex items-center justify-center"></div>
              </div>
              <Mbutton
                text="완료하기"
                className="absolute w-[7rem] h-[2.7rem] mt-[10%]"
                variant="edit"
                onClick={createBoard} // 보드 생성 함수 호출
              />
              <Mbutton
                text="공유하기"
                className="absolute w-[7rem] h-[2.7rem] mt-2"
                variant="edit"
              />
            </div>

            <div className="justify-items-center">
              {/* 3등 컨테이너 */}
              <div className="relative w-[92%] h-[41%] bg-[#aedcea] rounded-[1.25rem] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
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
              <div className="relative mt-[3%] w-[92%] h-[56%] bg-[#4cb2d2] rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
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
              <div className="relative mb-[3%] w-[95%] h-[60%] bg-[#79c6de] rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
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
              <div className="relative w-[95%] h-[37%] bg-[#c3dee7] rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
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
