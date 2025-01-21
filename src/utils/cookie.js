/**
 * 쿠키 설정 함수
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

/**
 * 쿠키 가져오기 함수
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
 * 쿠키 삭제 함수
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
