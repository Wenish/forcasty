<template>
    <div class="grid gap-4">
        <div class="flex justify-end">
            <div class="bg-base-200 p-4 inline-flex font-bold text-xs gap-4 items-center" :class="{
                'bg-success': canProjectBeFinished,
                'text-success-content': canProjectBeFinished,
                'bg-error': !canProjectBeFinished,
                'text-error-content': !canProjectBeFinished
            }">
                <div>
                    <div v-if="canProjectBeFinished">
                        <IconCheckCircle class="h-8 w-8" />
                    </div>
                    <div v-if="!canProjectBeFinished">
                        <IconAlert class="h-8 w-8" />
                    </div>
                </div>
                <div>
                    <div>Average Effort Increase: {{ dataEffortAverageIncrease }}</div>
                    <div>Average Done Increase: {{ dataDoneAverageIncrease }}</div>
                </div>
            </div>
        </div>
        <div class="p-4 w-full overflow-hidden">
            <VueApexCharts width="100%" height="500" type="line" :options="chartOptions" :series="series" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, defineAsyncComponent } from "vue";
import VueApexCharts from "vue3-apexcharts";

const IconCheckCircle = defineAsyncComponent(() => import('./IconCheckCircle.vue'))
const IconAlert = defineAsyncComponent(() => import('./IconAlert.vue'))

const props = defineProps<{
    data: {
        effort: number
        done: number
    }[]
}>()

const dataEffort = computed(() => {
    return props.data.map(value => value.effort)
})

const dataEffortAverageIncrease = computed(() => {
    return round(calculateAverageIncrease(dataEffort.value), 1)
})

const dataDone = computed(() => {
    return props.data.map(value => value.done)
})

const dataDoneAverageIncrease = computed(() => {
    return round(calculateAverageIncrease(dataDone.value), 1)
})

const canProjectBeFinished = computed(() => {
    return dataEffortAverageIncrease.value < dataDoneAverageIncrease.value
})

const dataPrediction = computed(() => {
    const prediction: {
        effort: number
        done: number
    }[] = []

    if (!canProjectBeFinished.value) return prediction
    prediction.push({
        effort: dataEffort.value[0],
        done: dataDone.value[0]
    })


    const generatePrediction = () => {
        const lastPrediction = prediction[prediction.length - 1]
        prediction.push({
            effort: round(lastPrediction.effort + dataEffortAverageIncrease.value, 1),
            done: round(lastPrediction.done + dataDoneAverageIncrease.value, 1)
        })
    }

    while (prediction[prediction.length - 1].done < prediction[prediction.length - 1].effort) {
        generatePrediction()
    }

    generatePrediction()
    generatePrediction()
    generatePrediction()

    return prediction
})

const categories = computed(() => {
    const countCategoriesToCreate = dataPrediction.value.length || props.data.length
    let categories = []
    for (let i = 0; i < countCategoriesToCreate; i++) {
        categories.push(`Sprint ${i}`)
    }
    return categories
})

const dataEffortPrediction = computed(() => {
    return dataPrediction.value.map(value => value.effort)
})

const dataDonePrediction = computed(() => {
    return dataPrediction.value.map(value => value.done)
})
const chartOptions = computed(() => {
    return {
        chart: {
            type: 'line',
            stacked: false,
            zoom: {
                enabled: false
            },
            foreColor: 'currentColor'
        },
        dataLabels: {
            enabled: true,
            enabledOnSeries: [0, 1],
            style: {
                fontSize: '0.75rem',
                fontWeight: 'bold'
            },
        },
        tooltip: {
            enabled: false,
        },
        stroke: {
            width: 1
        },
        legend: {
            show: true,
            horizontalAlign: 'left',
            position: 'bottom',
            onItemClick: {
                toggleDataSeries: false
            },
        },
        xaxis: {
            categories: categories.value,
        },
        yaxis: [
            {
                title: {
                    text: "Effort",
                    style: {
                        fontSize: '0.75rem',
                        fontWeight: 'bold'
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
})

const series = computed(() => {
    return [{
        name: 'Effort',
        type: 'column',
        data: dataEffort.value
    }, {
        name: 'Done',
        type: 'column',
        data: dataDone.value
    }, {
        name: 'Scope',
        type: 'line',
        data: dataEffortPrediction.value
    },
    {
        name: 'Progress',
        type: 'line',
        data: dataDonePrediction.value
    }
    ]
})

function calculateAverageIncrease(data: number[]): number {
    let totalIncrease = 0;

    for (let i = 1; i < data.length; i++) {
        totalIncrease += data[i] - data[i - 1];
    }

    const averageIncrease = totalIncrease / (data.length - 1);
    return averageIncrease;
}

function round(value: number, precision: number) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}
</script>