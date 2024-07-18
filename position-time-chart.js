let chart; // Declare chart variable globally

function initializeGraph() {
    const ctx = document.getElementById('chart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [
                {
                    label: 'Car 1',
                    data: [],
                    borderColor: 'rgb(38, 147, 209)',
                    fill: false
                },
                {
                    label: 'Car 2',
                    data: [],
                    borderColor: 'rgb(252, 209, 42)',
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'Time (s)'
                    },
                    min: 0,
                    max: 10
                },
                y: {
                    title: {
                        display: true,
                        text: 'Position (px)'
                    },
                    min: 0,
                    max: 800
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
        }
    });
}

function updateGraph(carLabel, x, y) {
    chart.data.datasets.forEach(dataset => {
        if (dataset.label === carLabel) {
            dataset.data.push({x: parseFloat(x), y: parseFloat(y)});
        }
    });
    chart.update();
}

function resetGraph() {
    chart.data.datasets[0].data = [];
    chart.data.datasets[1].data = [];
    chart.update();
}
