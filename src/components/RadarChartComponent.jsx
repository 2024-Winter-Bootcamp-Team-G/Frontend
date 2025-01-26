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

        const { board1_category_ratio, board2_category_ratio } = response.data;

        // 카테고리 이름 배열 (예시로 임의의 이름 사용)
        const categories = [
          '카테고리 1',
          '카테고리 2',
          '카테고리 3',
          '카테고리 4',
        ];

        // 레이더 차트 데이터 설정
        setChartData({
          labels: categories, // 카테고리 이름
          datasets: [
            {
              label: '보드 1',
              data: board1_category_ratio, // 보드 1의 카테고리별 비율
              borderColor: '#ed8b67',
              backgroundColor: 'rgba(237, 139, 103, 0.5)',
              pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',
            },
            {
              label: '보드 2',
              data: board2_category_ratio, // 보드 2의 카테고리별 비율
              borderColor: '#36abd1',
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',
            },
          ],
        });
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
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          font: {
            family: 'NeoDunggeunmo',
          },
          stepSize: 20,
          callback: (value) => `${value}`,
          backdropColor: 'rgba(195, 199, 203, 1)',
          color: '#717171',
        },
        pointLabels: {
          font: {
            family: 'NeoDunggeunmo',
            size: 13,
            weight: 'bold',
          },
          color: '#666666',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            family: 'NeoDunggeunmo',
            size: 14,
            weight: 'bold',
          },
          color: '#666666',
        },
      },
      title: {
        display: true,
        text: '각 카테고리별 비율',
        font: {
          family: 'NeoDunggeunmo',
          size: 16,
          weight: 'bold',
        },
        color: '#000000',
        align: 'center',
        position: 'top',
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      tooltip: {
        enabled: true,
        mode: 'nearest',
        intersect: false,
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
    hover: {
      mode: 'index',
      intersect: false,
    },
  };

  if (!chartData) {
    return <div>Loading...</div>; // 데이터 로딩 중 표시
  }

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Radar data={chartData} options={options} />
    </div>
  );
};

export default RadarChartComponent;
