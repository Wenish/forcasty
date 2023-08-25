<template>
    <div>
        <VueApexCharts 
            width="500"
            type="bar"
            :options="chartOptions"
            :series="series"
        />
    </div>
</template>
<script setup lang="ts">
import VueApexCharts from "vue3-apexcharts";

const chartOptions = {
    chart: {
        id: "vuechart-example",
    },
    xaxis: {
        categories: [
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
            'Sprint 11',
            'Sprint 12',
            'Sprint 13',
        ],
    },
}

const series = [
    {
        name: "Complexity",
        data: [90, 92, 93, 95, 100, 102, 104, 105],
    },
    {
        name: "Done",
        data: [7, 11, 15, 20, 24, 30, 35, 39],
    },
]

</script>