<template>
    <div>
        <VueApexCharts width="100%" height="500" type="line" :options="chartOptions" :series="series" />
    </div>
</template>
<script setup lang="ts">
import VueApexCharts from "vue3-apexcharts";

const chartOptions = {
    chart: {
        type: 'line',
        stacked: false,
        zoom: {
            enabled: false
        }
    },
    dataLabels: {
        enabled: true,
        enabledOnSeries: [0, 1],
        style: {
            fontSize: '0.75rem',
            fontWeight: 'bold',
        },
    },
    tooltip: {
        enabled: false,
    },
    stroke: {
        width: 1
    },
    legend: {
        show: false
    },
    title: {
        text: 'Project Forcasty',
        align: 'left'
    },
    xaxis: {
        categories: [
            'Sprint 0',
            'Sprint 1',
            'Sprint 2',
            'Sprint 3',
            'Sprint 4',
            'Sprint 5',
            'Sprint 6',
            'Sprint 7',
            'Sprint 8',
            'Sprint 9',
            'Sprint 10',
        ],
    },
    yaxis: [
        {
            labels: {
                style: {
                    colors: '#008FFB',
                }
            },
            title: {
                text: "Complexity",
                style: {
                    color: '#008FFB',
                }
            }
        },
    ],
    plotOptions: {
        bar: {
            columnWidth: 10
        }
    },
    colors: ['#06b6d4', '#22c55e']
}

const series = [{
    name: 'Complexity',
    type: 'column',
    data: [70, 71, 72, 73, 74]
}, {
    name: 'Done',
    type: 'column',
    data: [null, 10, 21, 29, 40]
}, {
    name: 'Scope',
    type: 'line',
    data: [70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80]
},
{
    name: 'Progress',
    type: 'line',
    data: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
}
]
</script>