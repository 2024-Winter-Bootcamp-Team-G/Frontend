import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBoards } from '../api/board';
import Background from '../components/Background';
import MiniHomp from '../components/MiniHomp';

const Notice = () => {
  const navigate = useNavigate();
  const [isWindowOpen, setIsWindowOpen] = useState(true);
  const [boards, setBoards] = useState([]); // 보드 목록 상태 추가
  const [loading, setLoading] = useState(false); // 로딩 상태 추가

  // 보드 목록 가져오기
  useEffect(() => {
    const fetchBoards = async () => {
      setLoading(true);
      try {
        const data = await getBoards(); // API 호출
        setBoards(data.result.board);
      } catch (error) {
        console.error('보드 목록 가져오기 실패:', error);
        alert('보드 목록을 가져오는 중 문제가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchBoards();
  }, []);

  // 보드 클릭 시 보드 페이지로 이동
  const handleBoardClick = (boardId) => {
    navigate(`/board/${boardId}`);
  };

  // 창을 닫는 함수
  const handleCloseWindow = () => {
    console.log('창을 닫습니다.');
    setIsWindowOpen(false);
  };

  return (
    <Background>
      {isWindowOpen && ( // isWindowOpen이 true일 때만 창을 렌더링
        <MiniHomp onClose={handleCloseWindow}>
          <div className="overflow-y-auto scrollbar-hide">
            <div
              style={{ fontSize: 'clamp(16px, 2vw, 32px)' }}
              className="text-[#79C6DE] text-left mt-7 ml-14"
            >
              Make my board
            </div>

            {/* 실선 */}
            <div className="border-t border-[#6C6C6C] w-[90%] mx-auto mt-3 mb-5"></div>

            {/* 보드 목록 */}
            <div className="w-[90%] mx-auto">
              {loading ? (
                <p className="text-center text-gray-500">
                  보드를 불러오는 중입니다...
                </p>
              ) : boards.length > 0 ? (
                boards
                  .slice() // 원본 배열을 복사하여 수정
                  .reverse() // 배열을 역순으로 정렬
                  .map((board, index) => (
                    <div
                      key={board.id}
                      className="text-2xl text-left text-black mx-3 my-8 border-b border-[#b4b4b4]"
                      onClick={() => handleBoardClick(board.id)}
                    >
                      {`${index + 1}. ${new Date(board.created_at).toLocaleDateString()} ${board.board_name}`}
                    </div>
                  ))
              ) : (
                <p className="text-center text-gray-500">
                  등록된 보드가 없습니다.
                </p>
              )}
            </div>
          </div>
        </MiniHomp>
      )}
    </Background>
  );
};
export default Notice;
