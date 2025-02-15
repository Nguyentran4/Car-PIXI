
// ChartJS custom plugin for  color behind chart
const plugin = {
    id: 'customCanvasBackgroundColor',
    beforeDraw: (chart, args, options) => {
      const {ctx} = chart;
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = options.color || '#f6f6f6';
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    }
  };

let chart; // Declare chart variable globally

function initializeGraph() {
    const ctx = document.getElementById('chart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Car 1',
                data: [],
                borderColor: 'rgb(38, 147, 209)',
                fill: false,
                showLine: true,
                spanGaps: true
            },
            {
                label: 'Car 2',
                data: [],
                borderColor: 'rgb(252, 209, 42)',
                fill: false,
                showLine: true,
                spanGaps: true
                
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 1    // 
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Position-Time Chart',
                    font: {
                        size: 30, 
                        family: 'Arial', 
                        weight: 'bold' 
                    },
                    padding: {
                        top: 20,
                        bottom: 5
                    },
                    color: 'black' 
                },
            },
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'Time (sec)',
                        font: {
                            size: 18,
                            family: 'Arial', 
                            weight: 'bold' 
                        },
                        padding: {
                            top: 20,
                            bottom: 20
                        },
                        color: 'black' 
                    },
                    min: 0,
                    max: 10,
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 20
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Position (px)',
                        font: {
                            size: 18, 
                            family: 'Arial', 
                            weight: 'bold' 
                        },
                        padding: {
                            bottom: 10,
                            top: 20
                        },
                        color: 'black' 
                    },
                    min: 0,
                    max: 800,
                    beginAtZero: false  // Ensuring the graph does not automatically reset to zero
                }
            },
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        const carLabel = data.datasets[tooltipItem.datasetIndex].label;
                        const position = tooltipItem.yLabel;
                        const time = tooltipItem.xLabel;
                        return `${carLabel}: Position: ${position}px, Time: ${time}s`;
                    }
                }
            }
        },
        plugins: [plugin],
    });
}

function updateGraph(carLabel, timeInSeconds, newPosition) {
    const dataset = chart.data.datasets.find(dataset => dataset.label === carLabel);
    if (dataset) {
        dataset.data.push({ x: parseFloat(timeInSeconds), y: parseFloat(newPosition) });
        chart.update();
    }
}


function resetGraph() {
    chart.data.datasets[0].data = [];
    chart.data.datasets[1].data = [];
    chart.update();
}
