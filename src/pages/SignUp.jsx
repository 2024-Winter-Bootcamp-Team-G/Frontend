import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../components/Background.jsx';
import Window from '../components/Window.jsx';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailExists, setEmailExists] = useState(null); // 이메일 확인 결과 상태

  // 이메일 중복 확인 함수
  const checkEmail = async () => {
    if (!email) {
      alert('이메일을 입력하세요.');
      return;
    }

    // 이메일 형식 검사
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert('제대로 된 이메일 형식을 작성해주세요.');
      return;
    }

    try {
      // query parameter로 데이터 전송
      const response = await axios.get(
        `http://localhost:8000/auth/check-email?email=${email}`
      );
      if (response.data.exists) {
        setEmailExists(true);
        alert('이미 존재하는 이메일입니다.');
      } else {
        setEmailExists(false);
        alert('사용 가능한 이메일입니다.');
      }
    } catch (error) {
      console.error('이메일 확인 오류:', error);
      alert('이메일 확인 중 오류가 발생했습니다.');
    }
  };

  // 회원가입 함수
  const signup = async () => {
    if (!email || !username || !password || !confirmPassword) {
      alert('모든 필드를 채워주세요.');
      return;
    }

    // 이메일 형식 검사
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert('제대로 된 이메일 형식을 작성해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (emailExists) {
      alert(
        '이미 사용 중인 이메일입니다. 이메일을 변경하거나 확인 버튼을 다시 눌러주세요.'
      );
      return;
    } else if (emailExists === null) {
      alert('이메일 중복 확인을 해주세요');
    }

    try {
      const userData = {
        email: email,
        password: password,
        user_name: username,
      };

      const response = await axios.post(
        'http://localhost:8000/auth/signup',
        userData
      );
      alert('회원가입 성공');
      navigate('/login');
    } catch (error) {
      console.error('회원가입 오류:', error);
      alert('회원가입 실패');
    }
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
          {/* 오른쪽: 회원가입 텍스트 및 입력 */}
          <div className="w-[60%]">
            <h1 className="text-[4rem] mb-4 text-left">Sign Up</h1>
            <p className="text-[1.5rem] mb-8 text-left">
              사용자의 정보를 입력하여 주십시오.
            </p>

            {/* 이름 입력 */}
            <div className="flex items-center mb-6">
              <label
                htmlFor="username"
                className="text-[32px] mr-4 flex-shrink-0 text-right"
              >
                이&nbsp;&nbsp;&nbsp;&nbsp;름 :
              </label>
              <Input
                name="username"
                width="70%"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>

            {/* 이메일 입력 */}
            <div className="flex items-center mb-6">
              <label
                htmlFor="email"
                className="text-[32px] mr-4 flex-shrink-0 text-right"
              >
                이 메 일 :
              </label>
              <Input
                name="email"
                width="50%"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <Button type="ok" onClick={checkEmail} className="ml-2">
                확인하기
              </Button>
            </div>

            {/* 비밀번호 입력 */}
            <div className="flex items-center mb-6">
              <label
                htmlFor="password"
                className="text-[32px] mr-4 flex-shrink-0 text-right"
              >
                비밀번호 :
              </label>
              <Input
                name="password"
                width="70%"
                type="password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>

            {/* 비밀번호 확인 입력 */}
            <div className="flex items-center mb-6">
              <label
                htmlFor="confirmPassword"
                className="text-[32px] mr-4 flex-shrink-0 text-right"
              >
                비밀번호 확인 :
              </label>
              <Input
                name="confirmPassword"
                width="58%"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div
          className="absolute bottom-[5.5rem] left-10 w-[90%] h-[3px] bg-[#868A8E] 
               shadow-[0_3px_0_#FFFFFF,0_-3px_0_#929598]"
        ></div>
        {/* 오른쪽 아래 버튼 */}
        <div className="absolute bottom-4 right-4 flex gap-4">
          <Button type="default" onClick={() => navigate('/login')}>
            &lt; 뒤로(B)
          </Button>
          <Button type="default" onClick={signup}>
            완료하기
          </Button>
        </div>
      </Window>
    </Background>
  );
};

export default SignUp;
