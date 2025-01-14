import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../components/Background.jsx';
import Window from '../components/Window.jsx';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleBack = () => {
    navigate('/login');
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
                onChange={handleChange('username')}
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
                onChange={handleChange('email')}
              />
              <Button type="ok" onClick={() => {}} className="ml-2">
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
                onChange={handleChange('password')}
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
                onChange={handleChange('confirmPassword')}
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
          <Button type="default" onClick={handleBack}>
            &lt; 뒤로(B)
          </Button>
          <Button type="default" onClick={() => {}}>
            완료하기
          </Button>
        </div>
      </Window>
    </Background>
  );
};

export default SignUp;
