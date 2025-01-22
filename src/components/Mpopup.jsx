import React, { useState } from 'react';
import Button from './Button';
import youtubeImage from '../assets/youtube_icon.png';
import Input from '../components/Input';
import api from '../api/axios_config';
import { getCookie } from '../utils/cookie'; // 쿠키 함수 import

const Mpopup = ({ className, variant = 'default', onClose }) => {
  const styles = {
    subscribe: `w-[889px] h-[506px] bg-[#c3c7cb] shadow-[5px_5px_0px_1px_rgba(0,0,0,0.90),inset_8px_8px_0px_0px_rgba(255,255,255,0.90)]`,
    profile: `w-[889px] h-[506px] bg-[#c3c7cb] shadow-[5px_5px_0px_1px_rgba(0,0,0,0.90),inset_8px_8px_0px_0px_rgba(255,255,255,0.90)]`,
    youlogin: `w-[402px] h-[209px] bg-[#c3c7cb] border-4 border-black`,
    default: '',
  };

  const handleGoogleLogin = () => {
    // Google OAuth 인증 요청을 리다이렉트하는 부분 추가
    window.location.href = 'http://localhost:8000/googleauth/login';
  };

  const handleSubscribeClick = () => {};
  const handleYouLoginClick = () => {};

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [preview, setPreview] = useState(null); // 이미지 미리보기 상태
  const [file, setFile] = useState(null); // 실제 파일 저장 상태
  const [profileImageUrl, setProfileImageUrl] = useState(null); // 서버에서 받은 프로필 이미지 URL

  const handleProfileImageUpload = async () => {
    if (!file) {
      alert('업로드할 파일을 선택하세요.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file); // FastAPI는 'file' 필드를 기대함

    try {
      const response = await api.put('/profile/upload', formData, {
        headers: {
          Authorization: `Bearer ${getCookie('access_token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.profile_img_url) {
        setProfileImageUrl(response.data.profile_img_url); // 상태 업데이트
        alert('프로필 이미지가 성공적으로 업로드되었습니다.');
        onClose();
      } else {
        alert('프로필 이미지 업로드에 실패했습니다. 다시 시도하세요.');
      }
    } catch (error) {
      console.error('에러 발생:', error);
      if (error.response) {
        console.error('서버 응답 데이터:', error.response.data);
        console.error('서버 응답 상태:', error.response.status);
      }
      alert('프로필 이미지 업로드 중 오류가 발생했습니다. 다시 시도하세요.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      {/* 구독 창 */}
      {variant === 'subscribe' && (
        <div className={`${styles.subscribe} ${className} p-8 relative`}>
          <div className="w-[875px] h-11 bg-[#0000aa] absolute top-3 left-3" />
          <h2 className="text-white text-[32px] font-normal relative z-10 mt-2 -top-7 left-[8%]">
            <img
              src={youtubeImage} // 이미지 경로
              alt="Youtube_icon"
              className="w-13 h-11 absolute left-[-7.5%] top-0" // 이미지 크기 및 오른쪽 여백
            />
            구독 채널 선택(최대 10개)
          </h2>
          <div
            className="w-[820px] h-[0px] shadow-[4px_4px_4px_0px_rgba(255,255,255,1.00),inset_0px_-4px_4px_0px_rgba(0,0,0,0.25)] border-2 border-[#868a8e] 
          relative -top-2 left-1/2 transform -translate-x-1/2"
          />

          {/* 오른쪽에 스크롤 가능한 영역 추가 */}
          <div className="absolute right-[1.5%] top-[20%] w-[850px] h-[300px] overflow-y-scroll scrollbar-thumb scrollbar-track">
            <div className="h-[1500px] w-full p-3 flex flex-col gap-5">
              {/* 스크롤 가능한 작은 사각형들 */}
              {[...Array(20)].map((_, index) => (
                <div
                  key={index}
                  className="w-12 h-12 bg-white border border-[#c3c7cb] 
                          shadow-[inset_4px_4px_0px_0px_rgba(0,0,0,0.50)]"
                />
              ))}
            </div>
          </div>

          <div className="w-[820px] h-[0px] shadow-[4px_4px_4px_0px_rgba(255,255,255,1.00),inset_0px_-4px_4px_0px_rgba(0,0,0,0.25)] border-2 border-[#868a8e] absolute bottom-20 left-1/2 transform -translate-x-1/2" />

          <div className="absolute bottom-3 right-3 flex gap-2">
            <Button
              type="popup"
              onClick={onClose}
              className="w-[155px] h-[46px]"
            >
              취소
            </Button>
            <Button
              type="popup"
              onClick={() => {
                console.log('저장 버튼 클릭');
                handleProfileImageUpload();
              }}
              className="w-[155px] h-[46px] z-50 relative"
            >
              저장
            </Button>
          </div>
          <div className="absolute bottom-[90.5%] right-[1%] z-10">
            <Button
              type="x"
              onClick={onClose}
              className="w-[27px] h-[27px] flex justify-center items-center text-3xl font-normal"
            >
              X
            </Button>
          </div>
        </div>
      )}

      {/* 로그인 창 */}
      {variant === 'youlogin' && (
        <div className={`${styles.youlogin} ${className} p-8 relative`}>
          <h2 className="text-center text-2xl font-bold mb-4 -mt-2">
            유튜브 로그인
          </h2>
          <p className="text-center text-black text-x1 font-normal mb-8 -mt-2">
            보드를 만들기 위해서는
            <br />
            유튜브 로그인이 필요합니다. <br />
            로그인 하시겠습니까?
          </p>
          <div className="absolute bottom-3 right-[35%]">
            <Button
              type="popup"
              onClick={handleGoogleLogin}
              className="w-[120px] h-[40px] text-base font-normal bg-[#bfcfef]"
            >
              로그인 하기
            </Button>
          </div>
          <div className="absolute top-[2%] right-[1%]">
            <Button
              type="x"
              onClick={onClose}
              className="w-[23px] h-[23px] flex justify-center items-center text-3xl font-normal"
            >
              X
            </Button>
          </div>
        </div>
      )}

      {/* 정보수정 창 */}
      {variant === 'profile' && (
        <div className={`${styles.profile} ${className} p-8 relative`}>
          <div className="w-[875px] h-11 bg-[#0000aa] absolute top-3 left-3" />
          <h2 className="text-white text-[32px] font-normal relative z-10 mt-2 -top-7 -left-2">
            내 정보 수정
          </h2>
          <div className="flex">
            <div className="flex flex-col">
              {/* 프로필 이미지 업로드 영역 */}
              <div
                className="w-[18.75rem] h-[16.25rem] bg-[#ffffff] flex items-center justify-center mr-12 relative overflow-hidden"
                style={{
                  boxShadow:
                    'inset -3px -3px 0px #FFF, inset 3px 3px 0px #808080',
                }}
              >
                {/* 업로드된 이미지 미리보기 */}
                {preview || profileImageUrl ? (
                  <img
                    src={profileImageUrl || preview}
                    alt="Uploaded Preview"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  // 기본 배경
                  <p className="text-gray-500 text-center text-[1rem]">
                    이미지를 여기에 추가하세요
                  </p>
                )}
                {/* 파일 선택 입력 */}
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      // 미리보기 이미지로 표시
                      const imageUrl = URL.createObjectURL(file);
                      setPreview(imageUrl);
                      setFile(file); // 실제 파일 저장
                    }
                  }}
                />
              </div>
              <div className="pl-16">
                <Button
                  type="popup"
                  onClick={() => {
                    document.getElementById('fileInput').click(); // 파일 입력 필드 트리거
                  }}
                  className="w-[155px] h-[46px] text-xl font-normal mt-4"
                >
                  프로필 변경
                </Button>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="flex items-center mb-6">
                <label
                  htmlFor="email"
                  className="text-[2rem] w-[200px] text-right"
                >
                  이&nbsp;&nbsp;&nbsp;&nbsp;름 :
                </label>
                <Input
                  id="name"
                  name="name"
                  value={name}
                  className="flex-1"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* 비밀번호 입력 */}
              <div className="flex items-center mb-6">
                <label
                  htmlFor="password"
                  className="text-[2rem] w-[200px] text-righ"
                >
                  비밀번호 :
                </label>
                <Input
                  id="password"
                  name="password"
                  className="flex-1"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="w-[820px] h-[0px] shadow-[4px_4px_4px_0px_rgba(255,255,255,1.00),inset_0px_-4px_4px_0px_rgba(0,0,0,0.25)] border-2 border-[#868a8e] absolute bottom-20 left-1/2 transform -translate-x-1/2" />
          <div className="absolute bottom-3 right-3 flex gap-2">
            <Button
              type="popup"
              onClick={onClose}
              className="w-[155px] h-[46px]"
            >
              취소
            </Button>
            <Button
              type="popup"
              onClick={() => {
                handleProfileImageUpload();
              }}
              className="w-[155px] h-[46px]"
            >
              저장
            </Button>
          </div>
          <div className="absolute bottom-[90.5%] right-[1%] z-10">
            <Button
              type="x"
              onClick={onClose}
              className="w-[27px] h-[27px] flex justify-center items-center text-3xl font-normal"
            >
              X
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mpopup;
