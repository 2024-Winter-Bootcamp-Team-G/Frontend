import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../components/Background';
import Window from '../components/Window';
import Input from '../components/Input';
import Button from '../components/Button';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // 에러 메시지 상태

  const login = async (email, password) => {
    try {
      // JSON 형식으로 전송
      const response = await axios.post(
        'http://localhost:8000/auth/login',
        {
          username: email, // 서버가 username 필드를 기대함
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded', // JSON 형식 전송을 위한 헤더
          },
        }
      );

      console.log('Login successful:', response.data);

      // Access Token 및 Refresh Token 저장
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);

      // 로그인 성공 시 메인 페이지로 이동
      navigate('/');
    } catch (error) {
      if (error.response && error.response.data.detail) {
        // 유효성 검사 오류 처리
        setError('이메일 또는 비밀번호가 잘못되었습니다.'); // 사용자에게 에러 메시지 표시
      } else {
        // 기타 오류 처리
        setError('로그인에 실패했습니다. 다시 시도해주세요.'); // 사용자에게 에러 메시지 표시
      }
      console.error(
        'Login failed:',
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleLogin = () => {
    login(email, password);
  };

  const handleSignUp = () => {
    // 회원가입 창으로 이동
    navigate('/signup');
  };

  return (
    <Background>
      <Window>
        <div className="p-6 pt-12 flex">
          {/* 왼쪽: 이미지 박스 */}
          <div
            className="w-[20rem] h-[28em] bg-[#FFFFCA] flex items-center justify-center mr-12"
            style={{
              boxShadow: 'inset -3px -3px 0px #FFF, inset 3px 3px 0px #808080',
            }}
          >
            <p className="text-gray-500 text-center text-[1rem]">
              이미지를 여기에 추가하세요
            </p>
          </div>
          {/* 오른쪽: 로그인 텍스트 및 입력 */}
          <div className="w-[60%]">
            <h1 className="text-[4rem] mb-4 text-left">Login</h1>
            <p className="text-[1.5rem] mb-8 text-left">
              사용자의 이메일과 비밀번호를 입력하여 주십시오.
            </p>

            {/* 이메일 입력 */}
            <div className="flex items-center mb-6">
              <label htmlFor="email" className="text-[2rem] mr-4">
                이 메 일 :
              </label>
              <Input
                name="email"
                width="60%"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* 비밀번호 입력 */}
            <div className="flex items-center mb-6">
              <label htmlFor="password" className="text-[2rem] mr-4">
                비밀번호 :
              </label>
              <Input
                name="password"
                width="60%"
                type="password"
                onChange={(e) => setPassword(e.target.value)} // setPassword로 수정
              />
            </div>

            {/* 에러 메시지 표시 */}
            {error && <p className="text-red-500 text-[1.5rem]">{error}</p>}
          </div>
          <div
            className="absolute bottom-[5.5rem] left-10 w-[90%] h-[3px] bg-[#868A8E] 
               shadow-[0_3px_0_#FFFFFF,0_-3px_0_#929598]"
          ></div>
        </div>
        {/* 오른쪽 아래 버튼 */}
        <div className="absolute bottom-4 right-4 flex gap-4">
          {/* 회원가입 버튼 */}
          <Button type="default" onClick={handleSignUp}>
            회원가입
          </Button>

          {/* 로그인 버튼 */}
          <Button type="default" onClick={handleLogin}>
            로그인
          </Button>
        </div>
      </Window>
    </Background>
  );
};

export default Login;
