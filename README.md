# Frontend

## 📂 프로젝트 구조

```
src/
├── api/                # API 호출 관련 파일 (예: Axios 설정 파일 등)
├── assets/             # 정적 파일 (이미지, 아이콘 등)
├── components/         # 재사용 가능한 UI 컴포넌트
├── pages/              # 페이지 단위 컴포넌트
├── styles/             # Tailwind 및 글로벌 CSS 설정
├── utils/              # 공용 함수 및 유틸리티
├── App.jsx             # 루트 컴포넌트
├── main.jsx            # ReactDOM 진입점
```

## 🚀 시작하기

### 필수 사항

- **Node.js**: Node.js가 설치되어 있어야 합니다. [Node.js 공식 사이트](https://nodejs.org/)에서 다운로드할 수 있습니다.
- **Yarn**: Yarn이 설치되어 있지 않은 경우, 아래 명령어로 글로벌 설치하세요:
  ```bash
  npm install --global yarn
  ```

## 💻 개발 환경 설정

1. **의존성 설치**

   아래 명령어로 프로젝트의 필요한 패키지를 설치하세요:

   ```bash
   yarn
   ```

2. **개발 서버 실행**

   Vite 개발 서버를 실행하세요:

   ```bash
   yarn dev
   ```

3. **브라우저에서 열기**

   아래 URL로 접속하여 프로젝트를 확인하세요:

   ```
   http://localhost:5173
   ```

## 📦 프로덕션 빌드

최적화된 프로덕션 빌드를 생성하려면 다음 명령어를 실행하세요:

```bash
yarn build
```

빌드된 파일은 `dist` 디렉터리에 생성됩니다.

## ⚙️ 프로젝트 설정

### Tailwind CSS

Tailwind CSS로 스타일링되었으며, 필요하면 `tailwind.config.js` 파일을 수정해 설정을 커스터마이징할 수 있습니다:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {}, // 추가적인 테마 설정 가능
  },
  plugins: [], // 필요한 플러그인 추가 가능
};
```

## 🛠️ 문제 해결

만약 문제가 발생하면 아래 단계를 참고하세요:

1. **`node_modules` 삭제 후 재설치**

   ```bash
   rm -rf node_modules yarn.lock
   yarn
   ```

2. **Node.js와 Yarn 버전 확인**
   ```bash
   node -v
   yarn -v
   ```
