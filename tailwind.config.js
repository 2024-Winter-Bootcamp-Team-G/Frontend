/** @type {import('tailwindcss').Config} */
import scrollbarHide from 'tailwind-scrollbar-hide';

export default {
  content: ['./index.html', './src/**/*.{js,jsx}', './src/styles/index.css'],
  theme: {
    extend: {
      fontFamily: {
        main: ['NeoDunggeunmo', 'sans-serif'], // 사용자 정의 폰트 추가
      },
    },
  },
  plugins: [scrollbarHide],
};
