import React from 'react';
import triangle from '../assets/triangle.svg';

const Mbutton = ({ onClick, className, variant = 'default' }) => {
  const styles = {
    edit: `w-[119px] h-[49px] bg-white rounded-[10px] border-2 border-[#919191] relative shadow-[2px_3px_0px_0px_rgba(0,0,0,0.25)] before:absolute before:inset-0 before:rounded-[10px] before:shadow-[inset_4px_4px_2px_0px_rgba(255,255,255,0.25)] cursor-pointer
active:shadow-[inset_3px_3px_1px_0px_rgba(0,0,0,0.25)]`,
    create: `w-[262px] h-[51px] bg-[#bfcfef] border-4 border-[#5c5c5c]/70 relative flex items-center justify-start pl-3`,
    default: '',
  };

  // variant에 따라 스타일 선택 (edit, create, default)
  const buttonStyle = styles[variant] || styles.default;

  return (
    <div
      className={`${buttonStyle} ${className} transition-all duration-100`}
      onClick={onClick}
    >
      {/* edit 버튼의 글자 */}
      {variant === 'edit' && (
        <div
          className="absolute inset-0 rounded-[10px] cursor-pointer flex items-center justify-center text-black
text-2xl
font-normal"
        >
          정보수정
        </div>
      )}
      {/* create 버튼의 글자 및 내부 버튼 */}
      {variant === 'create' && (
        <>
          <div className="text-black text-2xl font-nomal">나의 보드 만들기</div>
          <div
            onClick={onClick}
            className="w-9 h-9 bg-white cursor-pointer absolute top-1/2 -right-3.5 transform -translate-x-1/2 -translate-y-1/2 
            flex items-center justify-center shadow-[2px_2px_1px_0px_rgba(0,0,0,0.25)] active:shadow-[inset_4px_3px_0px_0px_rgba(181,181,181,0.70)]"
          >
            {/* CSS 삼각형 */}
            <img
              src={triangle}
              alt="triangle"
              className="w-4 h-4 transform rotate-270" // 크기 및 회전 적용
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Mbutton;
