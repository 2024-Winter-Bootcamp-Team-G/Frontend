import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../components/Background';
import Window from '../components/Window';
import Input from '../components/Input';
import Button from '../components/Button';
import api from '../api/axios_config';
import { setCookie } from '../utils/cookie';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const login = async () => {
    try {
      const data = new URLSearchParams();
      data.append('username', email);
      data.append('password', password);

      const response = await api.post('/auth/login', data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Login 요청에서만 변경
        },
      });

      console.log('Login successful:', response.data);

      setCookie('access_token', response.data.access_token, {
        expires: 7,
        path: '/',
        secure: true,
        sameSite: 'Strict',
      });

      setCookie('refresh_token', response.data.refresh_token, {
        expires: 30,
        path: '/',
        secure: true,
        sameSite: 'Strict',
      });

      navigate('/start');
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      setError('로그인 요청이 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleLogin = () => {
    login();
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <Background>
      <Window>
        <div className="p-6 pt-12 flex">
          <div
            className="w-[20rem] h-[28em] bg-[#FFFFCA] flex items-center justify-center mr-12"
            style={{
              boxShadow: 'inset -3px -3px 0px #FFF, inset 3px 3px 0px #808080',
            }}
          >
            <p className="text-gray-500 text-center text-[1rem]">
              여기에 이미지를 추가하세요.
            </p>
          </div>
          <div className="w-[60%]">
            <h1 className="text-[4rem] mb-4 text-left">Login</h1>
            <p className="text-[1.5rem] mb-8 text-left">
              이메일과 비밀번호를 입력해 주세요.
            </p>

            <div className="flex items-center mb-6">
              <label htmlFor="email" className="text-[2rem] mr-4">
                이메일:
              </label>
              <Input
                name="email"
                width="60%"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex items-center mb-6">
              <label htmlFor="password" className="text-[2rem] mr-4">
                비밀번호:
              </label>
              <Input
                name="password"
                width="60%"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-red-500 text-[1.5rem]">{error}</p>}
          </div>
          <div className="absolute bottom-4 right-4 flex gap-4">
            <Button type="default" onClick={handleSignUp}>
              회원가입
            </Button>
            <Button type="default" onClick={handleLogin}>
              로그인
            </Button>
          </div>
        </div>
      </Window>
    </Background>
  );
};

export default Login;
