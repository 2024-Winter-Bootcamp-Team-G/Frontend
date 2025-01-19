import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

// Chart.js에 필요한 컴포넌트 등록
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

// 데이터 설정
const labels = [
  '음악',
  'category2',
  'category3',
  'category4',
  'category5',
  'category6',
  'category7',
  'category8',
];

const data = {
  labels: labels,
  datasets: [
    {
      label: 'A님',
      data: [65, 59, 80, 81, 56, 55, 40, 33],
      borderColor: '#ed8b67',
      backgroundColor: 'rgba(237, 139, 103, 0.5)', // rgba로 투명도 설정
      pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)', // 호버 시 배경색
    },
    {
      label: 'B님',
      data: [28, 48, 40, 19, 86, 27, 90, 22],
      borderColor: '#36abd1',
      backgroundColor: 'rgba(54, 162, 235, 0.5)', // rgba로 투명도 설정
      pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)', // 호버 시 배경색
    },
  ],
};

// 차트 옵션 설정
const options = {
  responsive: true, // 반응형 활성화
  maintainAspectRatio: false, // 종횡비 유지 비활성화
  scales: {
    r: {
      angleLines: {
        display: true,
      },
      suggestedMin: 0, // 최솟값
      suggestedMax: 100, // 최댓값
      ticks: {
        font: {
          family: 'NeoDunggeunmo',
        },
        stepSize: 10, // 기준치 간격
        callback: (value) => `${value}`, // 기준치 텍스트 커스터마이징
        backdropColor: 'rgba(195, 199, 203, 1)',
        color: '#717171',
      },
      pointLabels: {
        font: {
          family: 'NeoDunggeunmo',
          size: 13, // 폰트 크기
          weight: 'bold', // 폰트 두께
        },
        color: '#666666', // 레이블 글씨 색상
      },
    },
  },
  plugins: {
    legend: {
      labels: {
        font: {
          family: 'NeoDunggeunmo', // 레전드(legend) 폰트 설정
          size: 14,
          weight: 'bold',
        },
        color: '#666666', // 레전드 글씨 색상
      },
    },
    title: {
      display: true,
      text: '각 카테고리별 비율',
      font: {
        family: 'NeoDunggeunmo', // 제목 폰트 설정
        size: 16,
        weight: 'bold',
      },
      color: '#000000', // 제목 글씨 색상
      align: 'center', // 제목 중앙 정렬
      position: 'top', // 제목 상단 배치
      padding: {
        top: 10, // 상단 패딩
        bottom: 30, // 하단 패딩
      },
    },
    // 툴팁 설정 추가
    tooltip: {
      enabled: true, // 툴팁 활성화
      mode: 'index', // 호버 시 모든 데이터 포인트 표시
      intersect: false, // 호버 영역을 정확히 지정하지 않아도 툴팁 표시
      callbacks: {
        label: function (context) {
          // 툴팁에 표시할 내용 커스터마이징
          return `${context.dataset.label}: ${context.raw}`;
        },
      },
    },
  },
  // 호버 설정 추가
  hover: {
    mode: 'index', // 호버 시 모든 데이터 포인트 표시
    intersect: false, // 호버 영역을 정확히 지정하지 않아도 툴팁 표시
  },
};

// Radar Chart 컴포넌트
const RadarChartComponent = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Radar data={data} options={options} />
    </div>
  );
};

export default RadarChartComponent;
