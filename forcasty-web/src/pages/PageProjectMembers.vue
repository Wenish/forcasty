<template>
    <div>Project Memebers {{ id }}</div>
</template>
<script setup lang="ts">
defineProps<{
    id: string
}>()
</script>