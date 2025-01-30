import React, { useEffect, useState } from 'react';
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
import api from '../api/axios_config';

// Chart.js에 필요한 컴포넌트 등록
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChartComponent = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [maxValue, setMaxValue] = useState(10); // 데이터 최댓값 상태 관리

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.post('/boards/match-ratio', null, {
          params: {
            board_id1: 1,
            board_id2: 2,
          },
        });
        console.log('API 응답 데이터:', response.data); // 응답 데이터 확인

        const { result } = response.data;

        // 카테고리 이름 배열 및 사용자별 카테고리 비율 가져오기
        const categories = result.new_categories; // 카테고리 라벨들
        const user1Ratios = result.user1_category_ratio; // 사용자1 데이터
        const user2Ratios = result.user2_category_ratio; // 사용자2 데이터

        // 최대값 계산 (user1과 user2 데이터의 최대값 중 큰 값)
        const calculatedMaxValue = Math.max(...user1Ratios, ...user2Ratios);

        // 최댓값을 올림 (ex: 7.3이면 8로)
        const roundedMaxValue = Math.ceil(calculatedMaxValue);

        // 차트에 반영할 데이터와 최대값 설정
        setChartData({
          labels: categories, // 카테고리 라벨
          datasets: [
            {
              label: '나',
              data: user1Ratios, // 사용자의 카테고리별 비율
              borderColor: '#ed8b67',
              backgroundColor: 'rgba(237, 139, 103, 0.5)',
              pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',
            },
            {
              label: '친구',
              data: user2Ratios, // 친구의 카테고리별 비율
              borderColor: '#36abd1',
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',
            },
          ],
        });
        setMaxValue(roundedMaxValue); // 최댓값 업데이트
      } catch (error) {
        console.error('Error fetching match ratio:', error);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0, // 최소 값
        suggestedMax: maxValue, // 동적으로 계산된 최대값
        ticks: {
          display: false, // 기준 숫자 비활성화 (화면에 안 보이게 설정)
          stepSize: maxValue / 10, // 동적으로 계산된 틱 간격 (계산에는 여전히 사용)
        },
        pointLabels: {
          font: {
            size: 13,
            weight: 'bold',
          },
          color: '#333', // 카테고리 제목 색상
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14,
            weight: 'bold',
          },
          color: '#333',
        },
      },
      title: {
        display: true,
        text: '사용자 간 카테고리 비율 비교',
        font: {
          size: 16,
          weight: 'bold',
        },
        align: 'center',
      },
      tooltip: {
        // 툴팁 연결
        enabled: true, // 툴팁 활성화
        mode: 'nearest', // 마우스 근처에서만 동작
        intersect: false, // 포인트 위에서만 동작 (더 민감하게 설정)
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}%`;
          },
        },
      },
    },
  };

  if (!chartData.labels.length) {
    return <div>로딩 중...</div>; // 데이터 로딩 중 표시
  }

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Radar data={chartData} options={options} />
    </div>
  );
};

export default RadarChartComponent;
