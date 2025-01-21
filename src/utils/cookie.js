// 옵션 설명
// path: '/' : 모든 경로에서 유효하다는 뜻. 보통 '/' 많이 사용
// secure: true : HTTPS 환경에서만 전송
// sameSite: 'Strict' : 크로스 사이트 요청 제한
// expires: 7 : 쿠키를 7일 동안 유지

// setCookie 사용법
// setCookie('쿠키 이름', response.data.데이터명, 옵션) -> 데이터를 쿠키에 저장

/**
 * 쿠키 설정 함수: 쿠키에 내용을 저장할 때 사용!
 * @param {string} name - 쿠키 이름
 * @param {string} value - 쿠키 값
 * @param {Object} options - 옵션 (예: expires, path, domain, secure)
 */
export const setCookie = (name, value, options = {}) => {
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (options.expires) {
    if (typeof options.expires === 'number') {
      const date = new Date();
      date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000);
      cookieString += `; expires=${date.toUTCString()}`;
    } else if (options.expires instanceof Date) {
      cookieString += `; expires=${options.expires.toUTCString()}`;
    }
  }

  if (options.path) {
    cookieString += `; path=${options.path}`;
  }

  if (options.domain) {
    cookieString += `; domain=${options.domain}`;
  }

  if (options.secure) {
    cookieString += `; secure`;
  }

  if (options.sameSite) {
    cookieString += `; samesite=${options.sameSite}`;
  }

  document.cookie = cookieString;
};

// getCookie 사용법
// getCookie('쿠키 이름') -> 저장된 데이터 읽음

/**
 * 쿠키 가져오기 함수: 쿠키 안에 내용을 읽을 때 사용!
 * @param {string} name - 가져올 쿠키의 이름
 * @returns {string|null} - 쿠키 값 또는 null
 */
export const getCookie = (name) => {
  const cookies = document.cookie.split('; ');
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=');
    if (decodeURIComponent(cookieName) === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
};

/**
 * 쿠키 삭제 함수: 로그아웃 시 쿠키 삭제
 * @param {string} name - 삭제할 쿠키 이름
 * @param {Object} options - 삭제할 옵션 (path, domain)
 */
export const deleteCookie = (name, options = {}) => {
  setCookie(name, '', {
    expires: -1,
    path: options.path,
    domain: options.domain,
  });
};
