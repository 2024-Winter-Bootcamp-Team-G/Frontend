import axios from 'axios';
import { getCookie } from '../utils/cookie.js';

export const BASE_URL =
  import.meta.env.VITE_BASE_URL || 'http://localhost:8000';

// 기본 Axios 인스턴스 생성
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 20000, // 요청 대기 시간 10초 제한
  headers: {
    'Content-Type': 'application/json', // 기본 Content-Type 설정
  },
  withCredentials: true, // 모든 요청에 쿠키 포함
});

// 요청 인터셉터: 요청을 보내기 전에 실행되는 로직
api.interceptors.request.use(
  (config) => {
    const token = getCookie('access_token'); // 쿠키에서 access_token 가져오기
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Authorization 헤더에 토큰 추가
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response, // 성공적인 응답은 그대로 반환
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 무한 루트 방지
      try {
        const refreshToken = getCookie('refresh_token'); // 쿠키에서 refresh_token 가져오기
        const res = await axios.post(`${BASE_URL}/auth/refresh`, {
          refresh: refreshToken,
        });
        const newAccessToken = res.data.access_token;

        // 쿠키에 새 Access Token 저장
        document.cookie = `access_token=${newAccessToken}; path=/; secure; samesite=Strict`;

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest); // 갱신된 토큰으로 요청 재시도
      } catch (refreshError) {
        // 갱신 실패 시 쿠키 삭제 및 로그아웃 처리
        document.cookie =
          'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie =
          'refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;
