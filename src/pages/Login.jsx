import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router 사용
import Background from '../components/Background';
import Window from '../components/Window';
import Input from '../components/Input';
import Button from '../components/Button';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // 서버로 이메일과 비밀번호 보내기
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        // 로그인 성공
        if (data.success) {
          console.log('로그인 성공');
          navigate('/start'); // 시작하기 창으로 이동
        } else {
          // 로그인 실패 메시지
          alert('입력하신 아이디 또는 비밀번호를 찾을 수 없습니다.');
        }
      } else {
        alert('서버와의 통신 중 문제가 발생했습니다.');
      }
    } catch (error) {
      console.error('로그인 요청 중 오류 발생:', error);
      alert('로그인 요청 중 오류가 발생했습니다.');
    }
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
            <h1 className="text-[4rem] font-bold mb-4 text-left">Login</h1>
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
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
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
