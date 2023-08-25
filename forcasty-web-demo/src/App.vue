<template>
  <ChartTest />
</template>
<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const ChartTest = defineAsyncComponent(() => import('./components/ChartTest.vue'))
</script>
