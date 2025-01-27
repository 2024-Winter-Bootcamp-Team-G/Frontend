const Button = ({ type = 'default', onClick, children, className }) => {
  // 버튼 타입별 크기와 스타일
  const styles = {
    default: 'w-[16vw] h-[6vh] min-w-[170px] min-h-[45px] text-[32px]',
    x: 'w-[clamp(20px,5vh,30px)] h-[clamp(20px,5vh,30px)] aspect-square text-[16px]',
    popup: 'w-[10vw] h-[5vh] min-w-[100px] min-h-[40px] text-[32px]',
    ok: 'w-[9vw] h-[4vh] min-w-[90px] min-h-[30px] text-[20px]',
  };

  return (
    <button
      onClick={onClick}
      className={`
            ${styles[type] || styles.default} // 타입에 따라 동적으로 클래스 적용
            bg-[#C0C0C0]
            border-r-[1px] border-b-[1px] border-[#000]
            shadow-[inset_2px_2px_0_#FFF,inset_-2px_-2px_0_#808080,inset_2px_2px_0_#DFDFDF]
            cursor-pointer
            active:border-r-[1px] active:border-b-[1px] active:border-[#FFF]
            active:shadow-[inset_1px_1px_0_#000,inset_-2px_-2px_0_#DFDFDF,inset_2px_2px_0_#808080]
            text-black font-main text-center // 기본 폰트와 중앙 정렬
            ${className || ''} // 부모 컴포넌트에서 전달된 추가 클래스 병합
          `}
    >
      {children}
    </button>
  );
};

export default Button;
