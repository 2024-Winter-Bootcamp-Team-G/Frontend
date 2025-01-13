const Button = ({ type = 'default', onClick, children }) => {
  // 버튼 타입별 크기와 스타일
  const styles = {
    default: 'w-[300px] h-[60px] text-[32px]', // 기본 버튼 크기와 글씨 크기
    x: 'w-[30px] h-[30px] text-[20px]', // X 버튼 크기와 글씨 크기
    popup: 'w-[155px] h-[46px] text-[32px]', // 팝업 버튼 크기와 글씨 크기
  };

  return (
    <button
      onClick={onClick}
      className={`
            ${styles[type]} // 타입에 따라 동적으로 클래스 적용
            bg-[#C3C7CB]
            border-r-[1px] border-b-[1px] border-[#000]
            shadow-[inset_1px_1px_0_#FFF,inset_-2px_-2px_0_#808080,inset_2px_2px_0_#DFDFDF]
            cursor-pointer
            active:border-r-[1px] active:border-b-[1px] active:border-[#FFF]
            active:shadow-[inset_1px_1px_0_#000,inset_-2px_-2px_0_#DFDFDF,inset_2px_2px_0_#808080]
            text-black font-main text-center // 기본 폰트와 중앙 정렬
          `}
    >
      {children}
    </button>
  );
};

export default Button;
