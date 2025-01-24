import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from './Button.jsx';
import pageTri from '../assets/page.svg';
import Mbutton from './Mbutton.jsx';
import Mpopup from './Mpopup.jsx';
import api from '../api/axios_config'; // axios 설정 파일 import
import { getCookie } from '../utils/cookie'; // 쿠키 함수 import
import { getBoards } from '../api/board.js';

const MiniHomp = ({ children, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [popupVariant, setPopupVariant] = useState(null);
  const [position, setPosition] = useState({ x: 7, y: 0 }); // 초기 위치
  const [profileImage, setProfileImage] = useState(null); // 프로필 이미지 상태
  const [username, setUsername] = useState(''); // 이름 상태 추가

  // 보드 클릭 핸들러
  const handleBoardClick = async () => {
    try {
      // 모든 보드 목록 가져오기
      const boardsData = await getBoards();

      if (boardsData.result?.board?.length) {
        // 최신 보드 ID 가져오기
        const latestBoard = boardsData.result.board.at(-1); // 배열의 마지막 요소
        const latestBoardId = latestBoard.id;

        // 최신 보드 상세 페이지로 이동
        navigate(`/board/${latestBoardId}`);
      } else {
        alert('생성된 보드가 없습니다.');
      }
    } catch (error) {
      console.error('보드 가져오기 실패:', error);
      alert('보드 정보를 가져오는 데 실패했습니다. 다시 시도해주세요.');
    }
  };

  // buttons 배열
  const buttons = [
    { name: '홈', path: '/homep' },
    { name: '보드판', onClick: handleBoardClick }, // 보드판 버튼에 클릭 핸들러 추가
    { name: '게시판', path: '/notice' },
  ];

  // 프로필 이미지 가져오기
  const fetchProfileImage = async () => {
    try {
      const user_id = getCookie('user_id'); // 쿠키에서 user_id 가져오기
      const response = await api.get(`/profiles/{user_id}`, {
        headers: {
          Authorization: `Bearer ${getCookie('access_token')}`,
        },
      });

      if (response.data.url) {
        // url 키를 사용
        setProfileImage(response.data.url); // 상태 업데이트
      } else {
        console.error('프로필 이미지 URL이 없습니다.');
      }
    } catch (error) {
      console.error('프로필 이미지 가져오기 실패:', error);
    }
  };

  // 이름 가져오기 (초기 로딩 시에만 사용)
  const fetchUsername = async () => {
    try {
      const response = await api.get('/profiles/get-name', {
        headers: {
          Authorization: `Bearer ${getCookie('access_token')}`,
        },
      });

      if (response.data.name) {
        // 'name' 키로 이름을 가져옴
        setUsername(response.data.name); // 상태 업데이트
      } else {
        console.error('서버 응답에 name이 없습니다:', response.data);
      }
    } catch (error) {
      console.error('이름 가져오기 오류:', error);
    }
  };

  // 이름 변경 핸들러
  const handleNameChange = (newName) => {
    console.log('새로운 이름:', newName); // 디버깅 로그
    setUsername(newName); // 상태 업데이트
  };

  // 이미지 업로드 후 콜백 함수
  const handleImageUpload = (newImageUrl) => {
    setProfileImage(newImageUrl); // 새로운 이미지 URL로 상태 업데이트
  };

  // 컴포넌트가 마운트될 때 프로필 이미지와 이름 가져오기
  useEffect(() => {
    fetchProfileImage();
    fetchUsername(); // 초기 로딩 시에만 이름 가져오기
  }, []); // 빈 배열: 컴포넌트 마운트 시에만 실행

  // username 상태가 변경될 때마다 로그 출력
  useEffect(() => {
    console.log('username 상태 업데이트:', username);
  }, [username]);

  const handleButtonClick = (variant) => {
    if (variant === 'profile') {
      setPopupVariant('profile'); // variant가 'profile'이면 'profile'로 설정
    } else {
      const dataId = getCookie('data_id'); // 쿠키에서 data_id 가져오기

      if (!dataId) {
        // data_id가 없거나 유효기간이 지난 경우
        console.log('data_id가 없거나 유효기간이 지났습니다.');
        setPopupVariant('youlogin'); // 'youlogin' 팝업 표시
      } else {
        // data_id가 유효한 경우
        console.log('data_id가 유효합니다.');
        setPopupVariant('subscribe'); // 'subscribe' 팝업 표시
      }
    }
  };

  const closePopup = () => {
    setPopupVariant(null); // 팝업 닫기
  };

  // 오늘 날짜 가져오기
  const today = new Date();
  const formattedDate = `${String(today.getFullYear()).slice(2)}${String(
    today.getMonth() + 1
  ).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;

  return (
    <div className="flex items-center justify-center h-screen w-screen overflow-hidden">
      {/* 팝업 렌더링 */}
      {popupVariant && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Mpopup
            variant={popupVariant}
            onClose={closePopup}
            onNameChange={handleNameChange}
            onImageUpload={handleImageUpload}
          />
        </div>
      )}

      {/* 창 컴포넌트 */}
      <div
        className="relative bg-[#c3c7cb] leading-none shadow-[inset_7px_7px_0px_#FFFFFF,inset_-7px_-7px_0px_#ffffff]"
        style={{
          width: 'min(82%, 1644px)',
          height: 'min(93%, 980px)',
          bottom: '2.5%',
          transform: `translateX(${Math.max(0, Math.min(position.x, 100 - 82))}%) translateY(${Math.max(0, Math.min(position.y, 100 - 93))}%)`,
        }}
      >
        {/* 상단 파란색 사각형과 X 버튼 컨테이너 */}
        <div className="absolute top-2 left-[7px] right-[8px] w-[calc(100%-17px)] h-[39px] z-10 bg-[#0000aa]">
          <p className="text-white text-xl absolute top-1 left-2">
            http://www.Algo.com
          </p>
          {/* X 버튼 */}
          <Button
            type="x"
            onClick={onClose}
            className="absolute top-1/2 right-2 transform -translate-y-1/2"
          >
            X
          </Button>
        </div>
        {/* 파란 창 아래 홈피 컨테이너 */}
        <div className="absolute top-[55px] left-[10px] right-[10px] w-[calc(100%-30px)] h-[calc(100%-70px)] rounded-[50px] bg-[#79C6DE] mx-auto min-w-[300px] min-h-[200px]">
          {/* 역삼각형 */}
          <div className="absolute left-[31.5%] -translate-y-[40%] w-0 h-0 border-l-[22.5px] border-r-[22.5px] border-t-[27px] border-l-transparent border-r-transparent border-t-[#c3c7cb]"></div>
          {/* 삼각형 */}
          <div className="absolute bottom-0 left-[31.5%] -translate-y-[-27%] w-0 h-0 border-l-[22.5px] border-r-[22.5px] border-b-[27px] border-l-transparent border-r-transparent border-b-[#c3c7cb]"></div>
          {/* 점선 컨테이너 */}
          <div className="absolute inset-7 flex items-center justify-center w-[calc(100%-50px)] h-[calc(100%-60px)] rounded-[50px] border-[3px] border-dashed border-white">
            {/* 흰 바탕 컨테이너 */}
            <div className="absolute inset-3 flex items-center justify-center w-[calc(100%-20px)] h-[calc(100%-20px)] rounded-[50px] border-[5px] bg-white border-black">
              {/* 역삼각형 */}
              <div className="absolute top-[-11.6px] left-[30%]">
                <img
                  src={pageTri}
                  alt="Upside Down Triangle"
                  className="w-[45px] h-[27px]"
                />
              </div>

              {/* 삼각형 */}
              <div className="absolute bottom-[-11.6px] left-[30%]">
                <img
                  src={pageTri}
                  alt="Triangle"
                  className="w-[45px] h-[27px] rotate-180"
                />
              </div>

              {/* 가로로 3:7 비율 컨테이너 */}
              <div className="flex w-[95%] h-[93%] gap-4 pt-6">
                {/* 왼쪽 3 비율 컨테이너 */}
                <div className="relative flex-[3] w-full rounded-[30px] bg-white border-[5px] border-black mx-1 flex flex-col items-center">
                  {/* TODAY 텍스트 */}
                  <div className="absolute top-[-1.8rem] left-1/2 -translate-x-1/2 w-fit flex justify-center whitespace-nowrap">
                    <p className="text-center text-black text-[clamp(12px,2vw,20px)]">
                      TODAY | {formattedDate}
                    </p>
                  </div>
                  {/* 이미지 컨테이너 */}
                  <div className="flex justify-center w-full h-full mt-5">
                    <div className="w-[85%] h-[40%] max-w-[300px] max-h-[260px] bg-[#D9D9D9] rounded-[20px] overflow-hidden">
                      {/* 이미지 삽입 */}
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt="Profile"
                          className="w-full h-full object-cover"
                          style={{ display: 'block' }}
                          onError={(e) => {
                            e.target.style.display = 'none'; // 이미지 로드 실패 시 숨기기
                            console.error('이미지 로드 실패:', profileImage); // 에러 로그 출력
                          }}
                          onLoad={() =>
                            console.log('이미지 로드 성공:', profileImage)
                          } // 이미지 로드 성공 시 로그
                        />
                      ) : (
                        <p className="text-center text-gray-500">
                          프로필 이미지가 없습니다.
                        </p>
                      )}
                    </div>
                  </div>
                  {/* 이름과 버튼 컨테이너 */}
                  <div className="absolute top-[47%] left-1/2 transform -translate-x-1/2 flex items-center justify-between w-[85%] max-w-[306px]">
                    {/* 이름 컨테이너 */}
                    <div className="w-[85%] max-w-[174px] h-[50px] bg-[#D9D9D9] rounded-[10px] flex items-center justify-center overflow-hidden">
                      <p className="text-black text-[clamp(12px, 1.5vw, 16px)] font-bold truncate">
                        {username || '이름을 불러오는 중...'}
                      </p>
                    </div>

                    {/* 버튼 컴포넌트 */}
                    <Mbutton
                      onClick={() => handleButtonClick('profile')}
                      variant="edit"
                    />
                  </div>
                  {/* 문구 컨테이너 */}
                  <div className="absolute top-[58%] left-1/2 transform -translate-x-1/2 w-[85%] max-w-[306px] text-left overflow-hidden">
                    <p className="text-[clamp(14px, 2vw, 18px)] font-medium text-black leading-relaxed whitespace-nowrap">
                      그저 멍하니
                      <br />
                      지금 너의
                      <br />
                      사진만 바라봐..
                    </p>
                  </div>
                  {/* bgm 컨테이너 */}
                  <div className="absolute top-[75%] left-1/2 transform -translate-x-1/2 w-[85%] max-w-[302px] h-[50px] bg-[#D9D9D9] rounded-[10px] flex justify-center items-center overflow-hidden">
                    <p className="text-black text-[clamp(12px, 1.5vw, 16px)] font-bold truncate">
                      BGM ???
                    </p>
                  </div>
                  {/* 보드 만들기 컨테이너 */}
                  <div className="absolute top-[88%] left-1/2 transform -translate-x-1/2 w-[85%] max-w-[300px] flex justify-center items-center">
                    <div className="flex-shrink-0 w-[90%] max-w-[260px]">
                      <Mbutton
                        onClick={() => handleButtonClick('youlogin')}
                        variant="create"
                      ></Mbutton>
                    </div>
                  </div>
                </div>
                {/* 오른쪽 7 비율 컨테이너 */}
                <div className="flex flex-[7] rounded-[30px] bg-white border-[5px] border-black mx-1 relative">
                  <div className="absolute inset-0 flex flex-col w-full h-full px-4">
                    {children}
                  </div>
                  {/* 버튼 그룹 */}
                  <div className="absolute top-[15%] right-[-35px] flex flex-col">
                    {buttons.map((button) => (
                      <button
                        key={button.name}
                        className={`w-[90px] h-[60px] border-y-[5px] border-r-[5px] border-black text-black text-[20px] mr-[-55px] rounded-r-xl ${
                          location.pathname === button.path ||
                          (button.name === '보드판' &&
                            location.pathname.startsWith('/board'))
                            ? 'bg-white' // 현재 경로면 흰색
                            : 'bg-[#238BA7]'
                        }`}
                        onClick={
                          button.onClick || (() => navigate(button.path))
                        }
                      >
                        {button.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniHomp;
