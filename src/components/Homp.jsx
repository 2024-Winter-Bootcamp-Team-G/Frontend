import Background from './Background';
import Window2 from './Window2';
import HompImage from '../assets/mini_homp.jpg';

const Homp = () => {
  return (
    <Background>
      <Window2>
        {/* 이미지를 감싸는 컨테이너 */}
        <div className="relative w-full h-full">
          {/* 이미지 */}
          <img
            src={HompImage}
            alt="Homp"
            className="absolute bottom-[5%] left-[2%] w-[55%] h-[65%] object-cover"
          />
        </div>
      </Window2>
    </Background>
  );
};

export default Homp;
