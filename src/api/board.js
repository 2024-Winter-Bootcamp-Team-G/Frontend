import api from './axios_config'; // axios 설정 파일
import { getCookie } from '../utils/cookie';

/**
 * 모든 보드 목록을 가져오는 API
 * @returns {Promise} - 보드 목록 데이터
 */
export const getBoards = async () => {
  try {
    const response = await api.get('/boards');
    return response.data;
  } catch (error) {
    console.error('보드 목록 가져오기 실패:', error);
    throw error;
  }
};

/**
 * 특정 보드의 상세 정보를 가져오는 API
 * @param {number} boardId - 보드 ID
 * @returns {Promise} - 보드 상세 정보 데이터
 */
export const getBoardDetail = async (boardId) => {
  try {
    const response = await api.get(`/boards/${boardId}`);
    return response;
  } catch (error) {
    console.error('보드 상세 정보 가져오기 실패:', error);
    throw error;
  }
};

/**
 * 보드를 공유하는 API
 * @param {number} boardId - 보드 ID
 * @returns {Promise} - 공유 링크 데이터
 */
export const shareBoard = async (boardId) => {
  try {
    const response = await api.post('/boards/share', null, {
      params: { board_id: boardId },
      headers: {
        Authorization: `Bearer ${getCookie('access_token')}`, // 인증 토큰 추가
      },
    });
    return response.data;
  } catch (error) {
    console.error('보드 공유 실패:', error);
    throw error;
  }
};

/**
 * 보드의 이미지를 재생성하는 API
 * @param {number} boardId - 보드 ID
 * @returns {Promise} - 새로운 이미지 URL 데이터
 */
export const regenImage = async (boardId) => {
  try {
    const response = await api.put(`/boards/${boardId}/image`, null, {
      headers: {
        Authorization: `Bearer ${getCookie('access_token')}`, // 인증 토큰 추가
      },
      timeout: 30000, // 타임아웃 시간을 30초로 늘림
    });

    if (response.status === 200) {
      return response.data.new_image_url;
    }
  } catch (error) {
    console.error('이미지 재생성 실패:', error);
    throw error;
  }
};

/**
 * 보드 키워드를 재생성하는 API
 * @param {number} boardId - 보드 ID
 * @param {string} categoryName - 카테고리 이름
 * @returns {Promise} - 새로 생성된 키워드 데이터
 */
export const regenKeywords = async (boardId, categoryName) => {
  try {
    console.log(
      'API 요청:',
      `/boards/${boardId}/keywords?category_name=${encodeURIComponent(categoryName)}`
    );

    const response = await api.put(
      `/boards/${boardId}/keywords`,
      null, // Body 없음
      {
        params: {
          category_name: categoryName,
        },
        headers: {
          Authorization: `Bearer ${getCookie('access_token')}`,
        },
      }
    );

    return response.data.result.new_keywords[categoryName];
  } catch (error) {
    if (error.response) {
      console.error('응답 데이터:', error.response.data);
    } else {
      console.error('요청 실패:', error.message);
    }
    throw error;
  }
};
