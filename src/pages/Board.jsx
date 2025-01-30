import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Background from '../components/Background';
import MiniHomp from '../components/MiniHomp';
import Mbutton from '../components/Mbutton';
import Retry from '../assets/retry.png';
import api from '../api/axios_config'; // axios_config 파일에서 api 가져오기
import { getCookie, setCookie } from '../utils/cookie';
import { getBoardDetail, regenImage, regenKeywords } from '../api/board';
import html2canvas from 'html2canvas';

const Board = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isWindowOpen, setIsWindowOpen] = useState(true);
  const [board, setBoard] = useState(null);
  // 보드 ID 추출
  const pathSegments = location.pathname.split('/');
  const boardId = pathSegments[pathSegments.length - 1];

  // 유튜브 로그인 후 -> url에서 data_id 뽑아서 쿠키에 저장
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const dataId = queryParams.get('data_id');

    // 현재 쿠키의 data_id 값 확인
    const existingDataId = getCookie('data_id');

    // URL에서 가져온 data_id가 있고, 현재 쿠키와 다른 경우에만 저장
    if (dataId && dataId !== existingDataId) {
      setCookie('data_id', dataId, {
        path: '/',
        secure: true,
        sameSite: 'Strict',
        expires: new Date(Date.now() + 3600000), // 현재 시간 기준으로 1시간 후 만료
      });
      console.log('새로운 data_id가 쿠키에 저장되었습니다:', dataId);
    }
  }, [location, navigate]);

  // 보드 정보 가져오는 함수
  useEffect(() => {
    const fetchBoard = async () => {
      // 경로에서 boardId 추출
      const pathSegments = location.pathname.split('/');
      const boardId = pathSegments[pathSegments.length - 1]; // 마지막 세그먼트가 boardId

      if (!boardId) {
        console.log('현재 보드판이 비어있습니다.');
        setBoard(null);
        return;
      }

      try {
        const response = await getBoardDetail(boardId);
        if (response.status === 200) {
          setBoard(response.data.result.board);
        }
      } catch (error) {
        console.log('보드 정보를 가져오는 데 실패했습니다.: ', error);
        setBoard(null);
      }
    };

    fetchBoard();
  }, [location]);

  // 공유하기 버튼 함수
  const shareBoard = async () => {
    const boardID = getCookie('board_id'); // 쿠키에서 board_id 가져오기

    if (!boardID) {
      alert('공유할 보드 ID가 없습니다. 먼저 보드를 생성해주세요.');
      return;
    }

    try {
      const response = await api.post('/boards/share', null, {
        params: {
          board_id: parseInt(boardID, 10), // board_id를 query parameter로 전달
        },
        headers: {
          Authorization: `Bearer ${getCookie('access_token')}`, // 인증 토큰 추가
        },
        timeout: 10000, // 타임아웃 설정
      });

      if (response.status === 200) {
        console.log(response.data.message); // 성공 메시지 출력
        const sharedLink = response.data.result.shared_url;
        navigator.clipboard
          .writeText(sharedLink)
          .then(() => {
            alert('보드 공유 성공! 링크가 클립보드에 복사되었습니다.');
          })
          .catch((err) => {
            console.error('클립보드 복사 실패:', err);
            alert(`보드 공유 성공! 아래 링크를 복사하세요:\n${sharedLink}`);
          });
      }
    } catch (error) {
      if (error.response?.data?.detail) {
        console.error('보드 공유 실패:', error.response.data.detail);
        alert(`보드 공유 실패: ${error.response.data.detail}`);
      } else {
        console.error('보드 공유 실패:', error.message);
        alert('보드 공유 실패: 알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  const handleScreenshot = async () => {
    // 캡처할 div 요소 선택
    const element = document.querySelector('.minihomp-container'); // 캡처할 div에 클래스 추가

    if (!element) {
      alert('캡처할 요소를 찾을 수 없습니다.');
      return;
    }

    try {
      // html2canvas로 캡처 (ignoreElements 사용)
      const canvas = await html2canvas(element, {
        scale: 2, // 해상도 높이기
        useCORS: true, // CORS 문제 해결
        allowTaint: true, // taint된 이미지 허용
        logging: true, // 로그 출력 (디버깅용)
        ignoreElements: (el) => {
          // 버튼들만 캡처에서 제외
          return el.classList.contains('screenshot-hide');
        },
      });

      // 캡처된 이미지를 Blob으로 변환
      canvas.toBlob(async (blob) => {
        if (blob) {
          try {
            // 클립보드에 이미지 복사
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob }),
            ]);
            alert('스크린샷이 클립보드에 저장되었습니다!');
          } catch (error) {
            console.error('클립보드 복사 실패:', error);
            alert('클립보드에 저장하는 데 실패했습니다.');
          }
        } else {
          console.error('Blob 생성 실패');
          alert('이미지를 생성하는 데 실패했습니다.');
        }
      }, 'image/png');
    } catch (error) {
      console.error('스크린샷 실패:', error);
      alert('스크린샷을 찍는 데 실패했습니다.');
    }
  };

  // 창을 닫는 함수
  const handleCloseWindow = () => {
    console.log('창을 닫습니다.');
    setIsWindowOpen(false);
  };

  // board가 null 또는 undefined인 경우 기본값 설정
  const {
    board_name,
    image_url,
    category_ratio: ratiosArray, // 배열로 받음
    keywords,
  } = board || {
    board_name: '현재 보드판이 비어 있습니다.',
    image_url: '',
    category_ratio: {},
    keywords: {},
  };

  // 회전 아이콘 컴포넌트
  const RotatingIcon = ({
    boardId,
    category,
    onImageRegen,
    onKeywordsRegen,
  }) => {
    const [rotateDegree, setRotateDegree] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    // 클릭 시 360도 회전 및 API 호출
    const handleClick = async () => {
      setRotateDegree((prev) => prev + 360);
      setIsLoading(true);

      // 이미지 재생성 호출
      if (onImageRegen) {
        try {
          const newImageUrl = await onImageRegen(boardId);

          // 새로운 이미지 URL로 상태 업데이트
          const updatedImageUrl = `${newImageUrl}?cachebuster=${new Date().getTime()}`;
          setBoard((prevBoard) => ({
            ...(prevBoard || {}),
            image_url: updatedImageUrl, // 캐시 우회 URL로 업데이트
          }));
        } catch (error) {
          console.error('이미지 재생성 실패:', error);
          alert('이미지 재생성에 실패했습니다.');
        }
      }

      // 키워드 재생성 호출
      if (onKeywordsRegen && category) {
        try {
          const newKeywords = await onKeywordsRegen(boardId, category);
          console.log(`카테고리 [${category}]의 새 키워드:`, newKeywords);

          // 새로운 키워드로 상태 업데이트
          const updatedKeywords = `${newKeywords}?cachebuster=${new Date().getTime()}`;
          setBoard((prevBoard) => ({
            ...prevBoard,
            keywords: {
              ...prevBoard.keywords,
              [category]: updatedKeywords,
            },
          }));
        } catch (error) {
          console.error('키워드 재생성 실패:', error);
          alert('키워드 재생성에 실패했습니다.');
        }
      }
      setIsLoading(false);
    };

    return (
      <button
        type="button"
        className="w-6 h-6 cursor-pointer focus:outline-none absolute bottom-2 right-2"
        style={{
          transform: `rotate(${rotateDegree}deg)`,
          transition: 'transform 0.5s ease',
        }}
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="loader"></div> // 로딩 스피너 표시
        ) : (
          <img src={Retry} alt="retry" className="w-full h-full" />
        )}
      </button>
    );
  };

  // 카테고리 이름 배열 (백엔드에서 제공된 순서대로)
  const categoryNames = Object.keys(keywords);

  // 카테고리 이름과 비율을 매핑한 객체 생성
  const ratios = categoryNames.reduce((acc, category, index) => {
    acc[category] = ratiosArray[index]; // 배열의 인덱스에 해당하는 비율을 할당
    return acc;
  }, {});

  // 카테고리를 비율에 따라 정렬
  const sortedCategories = Object.keys(ratios).sort(
    (a, b) => ratios[b] - ratios[a]
  );

  // 키워드를 포맷팅하는 함수
  const formatKeywords = (keywords) => {
    if (typeof keywords === 'string') {
      keywords = keywords.split(',');
    }

    if (!Array.isArray(keywords) || keywords.length === 0) {
      return <div>키워드가 없습니다.</div>; // 기본 메시지 반환
    }

    // 쿼리 파라미터 제거 처리
    return keywords.slice(0, 3).map((keyword, index) => {
      const cleanedKeyword = keyword.split('?')[0]; // `?` 이후 제거
      return (
        <div key={index}>
          {index === 0 && '① '}
          {index === 1 && '② '}
          {index === 2 && '③ '}
          {cleanedKeyword}
        </div>
      );
    });
  };

  return (
    <Background>
      {isWindowOpen && (
        <MiniHomp onClose={handleCloseWindow}>
          {/* Let's make my board */}
          <div className="text-[#79C6DE] text-left mt-7 ml-12 text-[2rem]">
            Let`s make my board
          </div>
          {/* 실선 */}
          <div className="border-t border-[#6C6C6C] w-[90%] mx-auto mt-3 mb-5"></div>
          <div className="flex items-center justify-between text-black text-left mx-11 mb-5 text-[1.5rem]">
            {board_name}
            <div className="flex space-x-1">
              <Mbutton
                text="완료하기"
                className="text-sm screenshot-hide"
                variant="board"
                onClick={() => navigate('/notice')}
              />
              <Mbutton
                text="공유하기"
                className="text-sm screenshot-hide"
                variant="board"
                onClick={shareBoard}
              />
              <Mbutton
                text="스크린샷"
                className="text-sm screenshot-hide"
                variant="board"
                onClick={handleScreenshot}
              />
            </div>
          </div>
          {/* 보드판 */}
          <div className="grid grid-cols-3 px-10 pb-5 w-full h-full">
            <div className="relative flex flex-col">
              {/* 이미지 컨테이너 */}
              <div className="relative w-[90%] bg-[#d9d9d9] rounded-[20px] aspect-[9/16]">
                <div className="absolute top-[0.3125rem] left-[0.3125rem] w-[calc(100%-0.625rem)] h-[calc(100%-0.625rem)] rounded-[20px] border-[3px] border-dashed border-white flex items-center justify-center">
                  {/* Retry 아이콘 */}
                  <RotatingIcon boardId={boardId} onImageRegen={regenImage} />
                </div>
                {image_url && (
                  <img
                    src={image_url}
                    alt="보드 이미지"
                    className="w-full h-full object-cover rounded-[20px]"
                  />
                )}
              </div>
            </div>

            <div className="justify-items-center">
              {/* 1등 컨테이너 */}
              <div className="relative mb-[4%] w-[90%] h-[48%] bg-[#aedcea] rounded-[1.25rem] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                <div className="absolute top-[0.3125rem] left-[0.3125rem] w-[calc(100%-0.625rem)] h-[calc(100%-0.625rem)] rounded-[1.25rem] border-[0.1875rem] border-dashed border-white flex justify-center">
                  {/* 카테고리 텍스트 */}
                  {sortedCategories[2] && (
                    <span className="text-black text-xl p-2">
                      {sortedCategories[2]} {ratios[sortedCategories[2]]}%
                    </span>
                  )}
                  {/* 키워드 텍스트 */}
                  <div className="absolute top-[35%] left-0 pl-4 text-black text-lg font-normal text-left">
                    {formatKeywords(keywords[sortedCategories[2]])}
                  </div>
                  {/* Retry 아이콘 */}
                  <RotatingIcon
                    boardId={boardId} // 보드 ID 전달
                    category={sortedCategories[2]}
                    onKeywordsRegen={regenKeywords} // 키워드 재생성 함수
                  />
                </div>
              </div>

              {/* 2등 컨테이너 */}
              <div className="relative w-[90%] h-[48%] bg-[#80D3ED] rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                <div className="absolute top-[0.3125rem] left-[0.3125rem] w-[calc(100%-0.625rem)] h-[calc(100%-0.625rem)] rounded-[20px] border-[3px] border-dashed border-white flex justify-center">
                  {/* 카테고리 텍스트 */}
                  {sortedCategories[1] && (
                    <span className="text-black text-xl p-2">
                      {sortedCategories[1]} {ratios[sortedCategories[1]]}%
                    </span>
                  )}
                  {/* 키워드 텍스트 */}
                  <div className="absolute top-[35%] left-0 pl-4 text-black text-lg font-normal text-left">
                    {formatKeywords(keywords[sortedCategories[1]])}
                  </div>
                  {/* Retry 아이콘 */}
                  <RotatingIcon
                    boardId={boardId} // 보드 ID 전달
                    category={sortedCategories[1]}
                    onKeywordsRegen={regenKeywords} // 키워드 재생성 함수
                  />
                </div>
              </div>
            </div>

            <div className="justify-items-center">
              {/* 3등 컨테이너 */}
              <div className="relative mb-[4%] w-[95%] h-[48%] bg-[#86E1FD] rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                <div className="absolute top-[5px] left-[5px] w-[calc(100%-10px)] h-[calc(100%-10px)] rounded-[20px] border-[3px] border-dashed border-white flex justify-center">
                  {/* 카테고리 텍스트 */}
                  {sortedCategories[0] && (
                    <span className="text-black text-xl p-2">
                      {sortedCategories[0]} {ratios[sortedCategories[0]]}%
                    </span>
                  )}
                  {/* 키워드 텍스트 */}
                  <div className="absolute top-[35%] left-0 pl-4 text-black text-lg font-normal text-left">
                    {formatKeywords(keywords[sortedCategories[0]])}
                  </div>
                  {/* Retry 아이콘 */}
                  <RotatingIcon
                    boardId={boardId} // 보드 ID 전달
                    category={sortedCategories[0]}
                    onKeywordsRegen={regenKeywords} // 키워드 재생성 함수
                  />
                </div>
              </div>

              {/* 4등 컨테이너 */}
              <div className="relative w-[95%] h-[48%] bg-[#c3dee7] rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                <div className="absolute top-[5px] left-[5px] w-[calc(100%-10px)] h-[calc(100%-10px)] rounded-[20px] border-[3px] border-dashed border-white flex justify-center">
                  {/* 카테고리 텍스트 */}
                  {sortedCategories[3] && (
                    <span className="text-black text-xl p-2">
                      {sortedCategories[3]} {ratios[sortedCategories[3]]}%
                    </span>
                  )}
                  {/* 키워드 텍스트 */}
                  <div className="absolute top-[35%] left-0 pl-4 text-black text-lg font-normal text-left">
                    {formatKeywords(keywords[sortedCategories[3]])}
                  </div>
                  {/* Retry 아이콘 */}
                  <RotatingIcon
                    boardId={boardId} // 보드 ID 전달
                    category={sortedCategories[3]}
                    onKeywordsRegen={regenKeywords} // 키워드 재생성 함수
                  />
                </div>
              </div>
            </div>
          </div>
        </MiniHomp>
      )}
    </Background>
  );
};

export default Board;
