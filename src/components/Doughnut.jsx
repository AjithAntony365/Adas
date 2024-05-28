import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const DoughnutChart = ({ data }) => {
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(chartContainer.current, {
        type: 'doughnut',
        data: {
          labels: data.labels,
          datasets: [{
            data: data.values,
            backgroundColor: data.colors,
          }],
        },
        options: {
          onClick: (event, chartElement) => {
            if (chartElement && chartElement.length > 0) {
              const index = chartElement[0].index;
              // Enlarge the clicked slice
              chartInstance.options.elements.arc.borderWidth = 2;
              chartInstance.options.elements.arc.borderColor = data.colors[index];
              chartInstance.update();
            }
          },
        },
      });

      setChartInstance(newChartInstance);
    }
  }, [chartContainer, data, chartInstance]);

  return <canvas ref={chartContainer} />;
};

export default DoughnutChart;
