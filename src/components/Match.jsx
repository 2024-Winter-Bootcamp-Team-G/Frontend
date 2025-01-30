import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위해 useNavigate 추가
import Button from './Button';
import matchIcon from '../assets/share.png';
import Input from './Input'; // Input 컴포넌트 추가
import api from '../api/axios_config'; // API 요청을 위한 axios 인스턴스
import { setCookie } from '../utils/cookie';

const Match = ({ onClose }) => {
  const [code, setCode] = useState(''); // 유효코드 입력값 상태
  const [error, setError] = useState(''); // 오류 메시지 상태
  const navigate = useNavigate(); // 페이지 이동 훅

  // 완료 버튼 클릭 시 실행되는 함수
  const handleComplete = async () => {
    if (!code) {
      setError('유효코드를 입력해주세요.');
      return;
    }

    try {
      // API 요청: 공유된 보드 정보 가져오기
      const response = await api.get(`/boards/shared/${code}`);
      const sharedBoardId = response.data.shared_board.id;

      setCookie('shared_board_id', sharedBoardId, 1);

      console.log('공유된 보드 정보:', response.data);

      // share 페이지로 이동
      navigate('/share', {
        state: {
          boardUuid: code,
          boardName: response.data.shared_board.board_name,
        },
      });
    } catch (error) {
      console.error('API 요청 실패:', error);

      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('유효코드가 잘못되었습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative -top-10">
        {/* 상단 파란색 바 */}
        <div className="w-[879px] h-11 bg-[#0000aa] relative top-[6rem] left-[0.5rem] z-20" />

        {/* 제목 */}
        <h2 className="text-white text-[32px] font-normal relative z-30 top-[3.2rem] left-6">
          Match Chart
        </h2>

        {/* 메인 창 */}
        <div className="relative w-[889px] h-[506px] bg-[#c3c7cb] shadow-[5px_5px_0px_1px_rgba(0,0,0,0.90),inset_8px_8px_0px_0px_rgba(255,255,255,0.90)] z-10">
          {/* 텍스트를 하단에 배치 */}
          <p className="absolute bottom-[6rem] left-[2.5rem] text-black text-lg">
            유효코드를 입력하신 후 완료버튼을 누르면 <br /> 알고리즘 일치율
            보드판을 보실 수 있습니다.
          </p>

          {/* 입력 칸과 오류 메시지를 포함한 컨테이너 (오른쪽 중앙에 고정) */}
          <div className="absolute top-1/2 right-[2rem] transform -translate-y-1/2 z-[999] flex flex-col items-end">
            <div className="flex items-center mb-6 justify-end w-full">
              <label
                htmlFor="code"
                className="text-[1.5rem] w-[150px] text-right mr-4"
              >
                유효코드 :
              </label>
              <Input
                id="code"
                name="code"
                type="text"
                placeholder="유효코드를 입력하세요"
                width="300px" // 너비 고정
                value={code} // 입력값 상태 연결
                onChange={(e) => setCode(e.target.value)} // 입력값 상태 업데이트
              />
            </div>
            {error && (
              <p className="text-red-500 text-[1.5rem] mb-4 text-right">
                {error}
              </p>
            )}
          </div>

          {/* 완료 버튼을 오른쪽 하단에 배치 */}
          <div className="absolute bottom-[1.5rem] right-[1.5rem]">
            <Button
              type="popup"
              onClick={handleComplete} // 완료 버튼 클릭 시 handleComplete 실행
              className="w-[155px] h-[46px]"
            >
              완료
            </Button>
          </div>
        </div>

        {/* 닫기 버튼 */}
        <Button
          type="x"
          className="relative -top-[31rem] -right-[53rem] text-black text-2xl cursor-pointer z-30"
          onClick={onClose} // 창 닫기
        >
          X
        </Button>

        {/* 아이콘 */}
        <img
          src={matchIcon}
          alt="match Icon"
          className="absolute top-[7rem] left-[1rem] z-40 w-[25rem] h-[25rem]"
        />
      </div>
    </div>
  );
};

export default Match;
