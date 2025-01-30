import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import Background from '../components/Background';
import ShareIcon from '../assets/algo.png';
import RadarChartComponent from '../components/RadarChartComponent';
import VennDiagram from '../components/VennDiagram';
import Select from '../components/Select';
import api from '../api/axios_config'; // API 모듈 import
import { getCookie } from '../utils/cookie'; // 쿠키 유틸리티 import

const Share = ({ onClose }) => {
  const [isSelectionComplete, setIsSelectionComplete] = useState(false); // 선택창 완료 여부
  const [selectedValue, setSelectedValue] = useState(''); // 선택된 보드 값
  const [matchData, setMatchData] = useState({
    similarity_score: 0, // 일치율 (기본값)
    user1_keywords: [], // 사용자1 키워드
    user2_keywords: [], // 사용자2 키워드
    match_keywords: [], // 공통 키워드
    user1_category_ratio: [], // 사용자1 카테고리 비율
    user2_category_ratio: [], // 사용자2 카테고리 비율
    new_categories: [], // 카테고리 이름
  });
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(''); // 오류 메시지

  // API 요청 함수
  const fetchMatchRatio = async (selectedBoard) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await api.post('/boards/match-ratio', null, {
        params: {
          board_id1: selectedBoard, // 선택한 보드 ID
          board_id2: getCookie('board_id'), // 쿠키에서 가져온 보드 ID
        },
        headers: {
          Authorization: `Bearer ${getCookie('access_token')}`, // 인증 토큰
        },
      });

      // API 응답이 성공적일 경우 데이터 업데이트
      if (response.status === 200) {
        const { result } = response.data;

        setMatchData({
          similarity_score: parseFloat(result.similarity_score) || 0, // 일치율
          user1_keywords: result.user1_keywords || [], // 사용자1 키워드
          user2_keywords: result.user2_keywords || [], // 사용자2 키워드
          match_keywords: result.match_keywords || [], // 공통 키워드
          user1_category_ratio: result.user1_category_ratio || [], // 사용자1 카테고리 비율
          user2_category_ratio: result.user2_category_ratio || [], // 사용자2 카테고리 비율
          new_categories: result.new_categories || [], // 카테고리 이름
        });
      }
    } catch (error) {
      console.error('API 요청 실패:', error);
      setError('데이터를 불러오지 못했습니다.');
      setMatchData({
        similarity_score: 0,
        user1_keywords: [],
        user2_keywords: [],
        match_keywords: [],
        user1_category_ratio: [],
        user2_category_ratio: [],
        new_categories: [],
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 선택창 완료 시 호출되는 함수
  const handleSelectionComplete = (selectedBoard) => {
    setSelectedValue(selectedBoard);
    setIsSelectionComplete(true);
    fetchMatchRatio(selectedBoard); // API 호출
  };

  return (
    <Background>
      {/* 선택창 표시 (완료 전) */}
      {!isSelectionComplete && <Select onComplete={handleSelectionComplete} />}

      {/* 선택창 완료 후 UI 렌더링 */}
      {isSelectionComplete && (
        <div
          className="absolute right-[5rem] top-[1rem] bg-[#c3c7cb] leading-none shadow-[inset_5px_5px_0px_#FFFFFF,inset_-5px_-5px_0px_#ffffff] overflow-hidden"
          style={{
            width: 'min(80%, 1644px)',
            height: 'min(90%, 980px)',
          }}
        >
          {/* 상단 파란색 바 */}
          <div className="absolute top-2 left-[7px] right-[8px] w-[calc(100%-17px)] h-[39px] z-10 bg-[#0000aa]">
            <p className="text-white text-xl absolute top-1 left-2">
              http://www.알고리즘분석.com
            </p>
            {/* 닫기 버튼 */}
            <Button
              type="x"
              onClick={onClose}
              className="absolute top-1/2 right-2 transform -translate-y-1/2"
            >
              X
            </Button>
          </div>

          {/* 아이콘 및 텍스트 */}
          <div className="relative top-[2rem] -left-5">
            <img src={ShareIcon} alt="share" className="w-40 h-40" />
          </div>
          <p className="relative -top-[4rem] left-[6.5rem]  text-3xl">
            우리의 알고리즘 일치율
          </p>
          <p className="absolute top-[9.9rem] left-[6.5rem] text-gray-700 text-xl">
            해당 페이지에서는 두 분의 알고리즘에 대한 분석 확인이 가능합니다.
            <br />
            차트에 마우스를 가져다대면 자세한 내용을 확인할 수 있습니다.
            <br />
            <br />
            우측 차트에서는 두 분의 키워드를 바탕으로 카테고리를 만들어
            <br /> 그에 대한 비율을 나타냅니다.
          </p>

          {/* 알고리즘 색상 레전드 */}
          <div className="relative -right-[53rem] -top-[6.8rem] w-[3rem] h-[1.5rem] bg-[#ed8b67]" />
          <p className="relative -top-[8.4rem] left-[57rem] text-black text-xl">
            나의 알고리즘
          </p>
          <div className="relative -right-[53rem] -top-[7.5rem] w-[3rem] h-[1.5rem] bg-[#36abd1]" />
          <p className="relative -top-[9.1rem] left-[57rem] text-black text-xl">
            친구의 알고리즘
          </p>

          {/* Radar 차트 및 카테고리 구성 */}
          <div className="relative -top-[5.5rem] left-[22rem] w-full h-[55vh]">
            {/* 제목 */}
            <p className="text-center text-[#3E3E3E] text-xl mb-4">
              [각 카테고리별 비율]
            </p>

            {/* 로딩 중 표현 */}
            {isLoading ? (
              <p className="text-center text-gray-500 mt-4">
                데이터를 불러오는 중입니다...
              </p>
            ) : (
              /* 레이더 차트 */
              <RadarChartComponent
                data={{
                  labels: matchData.new_categories,
                  datasets: [
                    {
                      label: '나',
                      data: matchData.user1_category_ratio,
                      backgroundColor: 'rgba(237, 139, 103, 0.5)',
                      borderColor: '#ed8b67',
                      borderWidth: 2,
                    },
                    {
                      label: '친구',
                      data: matchData.user2_category_ratio,
                      backgroundColor: 'rgba(54, 162, 235, 0.5)',
                      borderColor: '#36abd1',
                      borderWidth: 2,
                    },
                  ],
                }}
              />
            )}
          </div>

          {/* Venn 다이어그램 */}
          <div className="absolute top-[50%] left-10 w-[46%] aspect-[2/1]">
            {isLoading ? (
              <p>데이터를 불러오는 중입니다...</p>
            ) : (
              <VennDiagram
                matchRatio={matchData.similarity_score}
                user1Keywords={matchData.user1_keywords}
                user2Keywords={matchData.user2_keywords}
                matchKeywords={matchData.match_keywords}
              />
            )}
          </div>

          {/* 오류 메시지 */}
          {error && (
            <p className="text-red-500 text-xl text-center mt-4">{error}</p>
          )}
        </div>
      )}
    </Background>
  );
};

export default Share;
