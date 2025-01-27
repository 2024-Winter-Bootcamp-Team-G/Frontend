import React, { useState } from 'react';
import Window from '../components/Window';
import Button from '../components/Button';
import startImage from '../assets/start_img.png';
import Background from '../components/Background';

const Start = () => {
  const [isWindowVisible, setIsWindowVisible] = useState(true);

  const handleCloseWindow = () => {
    setIsWindowVisible(false);
  };

  return (
    <Background>
      {isWindowVisible && (
        <Window
          onClose={handleCloseWindow}
          className="relative transition-opacity duration-300 opacity-100"
        >
          <div className="p-4">
            <h1
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              }}
              className="absolute top-20 left-6 font-nomal"
            >
              로그인 하셨나요?
            </h1>
            <div
              className="absolute top-[9rem] left-6 w-[90%] h-[3px] bg-[#868A8E] 
               shadow-[0_3px_0_#FFFFFF,0_-3px_0_#929598]"
            ></div>
            <div className="leading-none">
              <img
                src={startImage}
                alt="Start"
                className="absolute bottom-[5%] left-[2%] max-w-[95%] h-auto object-contain"
              />
            </div>
          </div>
          {/* 닫기 버튼 */}
          <Button
            type="default"
            onClick={handleCloseWindow}
            className="absolute bottom-4 right-4 w-[9rem] h-[3rem] leading-none"
          >
            닫기
          </Button>
        </Window>
      )}
    </Background>
  );
};

export default Start;
