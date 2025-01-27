import React from 'react';
import triangle from '../assets/triangle.svg';

const Mbutton = ({
  onClick,
  className,
  variant = 'default',
  text = '정보수정',
}) => {
  // 공통 스타일
  const baseStyle = `bg-white rounded-[10px] border-2 border-[#919191] relative shadow-[2px_3px_0px_0px_rgba(0,0,0,0.25)] before:absolute before:inset-0 before:rounded-[10px] before:shadow-[inset_4px_4px_2px_0px_rgba(255,255,255,0.25)] cursor-pointer
    active:shadow-[inset_3px_3px_1px_0px_rgba(0,0,0,0.25)]`;

  const styles = {
    edit: `w-[115px] h-[47px] ${baseStyle}`,
    board: `w-[7rem] h-[3rem] max-w-[60%] max-h-[15%] ${baseStyle}`,
    create: `max-w-[262px] h-[50px] bg-[#BFCFEF] border-4 border-[#5C5C5C]/70 flex items-center justify-center pr-9 truncate relative`,
  };

  // variant에 따라 스타일 선택 (edit, create, default)
  const buttonStyle = styles[variant] || styles.default;

  return (
    <div className={`${buttonStyle} ${className} transition-all duration-100`}>
      {/* edit 버튼의 글자 */}
      {(variant === 'edit' || variant === 'board') && (
        <>
          <button
            className="absolute inset-0 rounded-[10px] cursor-pointer flex items-center justify-center text-black
text-md"
            onClick={onClick} // edit 버튼은 클릭 가능
          >
            {text}
          </button>
        </>
      )}
      {/* create 버튼의 글자 및 내부 버튼 */}
      {variant === 'create' && (
        <>
          나의 보드 만들기
          <button
            onClick={onClick} // 작은 사각형만 클릭 가능
            className="w-9 h-9 bg-white cursor-pointer absolute top-1/2 -right-3.5 transform -translate-x-1/2 -translate-y-1/2
            flex items-center justify-center shadow-[2px_2px_1px_0px_rgba(0,0,0,0.25)] active:shadow-[inset_4px_3px_0px_0px_rgba(181,181,181,0.70)]"
          >
            {/* CSS 삼각형 */}
            <img
              src={triangle}
              alt="triangle"
              className="w-4 h-4 transform rotate-270 object-contain" // 크기 및 회전 적용
            />
          </button>
        </>
      )}
    </div>
  );
};
export default Mbutton;
