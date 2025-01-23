import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from './Button.jsx';
import pageTri from '../assets/page.svg';
import Mbutton from './Mbutton.jsx';
import Mpopup from './Mpopup.jsx';
import api from '../api/axios_config'; // axios 설정 파일 import
import { getCookie } from '../utils/cookie'; // 쿠키 함수 import

const MiniHomp = ({ children, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [popupVariant, setPopupVariant] = useState(null);
  const [position, setPosition] = useState({ x: 7, y: 0 }); // 초기 위치
  const [profileImage, setProfileImage] = useState(null); // 프로필 이미지 상태

  const buttons = [
    { name: '홈', path: '/homep' },
    { name: '보드판', path: '/board' },
    { name: '게시판', path: '/notice' },
  ];

  // 프로필 이미지 가져오기
  const fetchProfileImage = async () => {
    try {
      const user_id = getCookie('user_id'); // 쿠키에서 user_id 가져오기
      const response = await api.get(`/profile/${user_id}`, {
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

  // 컴포넌트가 마운트될 때와 팝업이 닫힐 때 이미지 가져오기
  useEffect(() => {
    fetchProfileImage();
  }, [popupVariant]); // popupVariant가 변경될 때마다 실행

  const handleButtonClick = (variant) => {
    setPopupVariant(variant); // 팝업의 variant 설정
  };

  const closePopup = () => {
    setPopupVariant(null); // 팝업 닫기
  };

  const handleMove = (x, y) => {
    setPosition({ x, y });
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
          <Mpopup variant={popupVariant} onClose={closePopup} />
        </div>
      )}

      {/* 창 컴포넌트 */}
      <div
        className="relative bg-[#c3c7cb] leading-none shadow-[inset_7px_7px_0px_#FFFFFF,inset_-8px_-8px_0px_#000000]"
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
            http://www.Gteam.com
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
                        이름을 입력하세요
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
                        key={button.path}
                        className={`w-[90px] h-[60px] border-y-[5px] border-r-[5px] border-black text-black text-[20px] mr-[-55px] rounded-r-xl ${
                          location.pathname === button.path
                            ? 'bg-white' // 현재 경로면 흰색
                            : 'bg-[#238BA7]'
                        }`}
                        onClick={() => navigate(button.path)}
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
