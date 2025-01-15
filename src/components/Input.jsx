import React from 'react';

const Input = ({ width = '80%', onChange }) => {
  return (
    <input
      type="text" // type 고정
      onChange={onChange}
      className="
        h-[4vh]
        min-h-[30px]
        bg-white /* 배경색: 흰색 */
        text-black
        text-[1.6vw]
        min-text-[20px]
        shadow-[inset_-1px_-1px_0px_#FFF,inset_1px_1px_0px_#808080,inset_-2px_-2px_0px_#DFDFDF,inset_2px_2px_0px_#000]
        border-none
        outline-none /* 클릭 시 아웃라인 제거 */
        px-2 /* 입력 칸 안쪽 여백 추가 */
      "
      style={{
        width: `min(${width}, 100%)`, // 반응형: 주어진 너비와 100% 중 작은 값 선택
      }}
    />
  );
};

export default Input;
