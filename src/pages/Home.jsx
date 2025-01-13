import React, { useState } from 'react';
import Window from '../components/Window';
import Button from '../components/Button';
import introImage from '../assets/intro.png';

const Home = () => {
  const [isWindowVisible, setIsWindowVisible] = useState(true);

  const handleCloseWindow = () => {
    setIsWindowVisible(false);
  };

  return (
    <div>
      {isWindowVisible && (
        <Window
          onClose={handleCloseWindow}
          className="transition-opacity duration-300 opacity-100"
        >
          <div className="p-4">
            <h1 className="absolute top-20 left-6 text-5xl font-nomal">
              ~~~에 오신것을 환영합니다.
            </h1>
            <div className="leading-none">
              <img
                src={introImage}
                alt="Intro"
                className="absolute bottom-[5%] left-[2%] w-[55%] h-[65%]"
              />
            </div>
          </div>
        </Window>
      )}
      {isWindowVisible && (
        <Button
          type="default"
          onClick={handleCloseWindow}
          className="absolute bottom-[18.5%] right-[19%] w-[20vw] h-[8vh] leading-none"
        >
          닫기
        </Button>
      )}
    </div>
  );
};

export default Home;
