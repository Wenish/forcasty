<template>
    <div>
        Page Home
        <ChartTest />
    </div>
</template>
<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const ChartTest = defineAsyncComponent(() => import('../components/ChartTest.vue'))
</script>