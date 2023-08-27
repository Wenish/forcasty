<template>
    <div class="grid gap-2">
        <div class="form-control w-full max-w-md">
            <label class="label">
                <span class="label-text">Project Name</span>
            </label>
            <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-md" :value="name" @input="$emit('update:name', ($event.target as HTMLInputElement).value)" :disabled="disabled" />
        </div>
        <h2 class="font-bold pt-4">Timeline</h2>
        <div class="alert">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span><b>Effort</b> is the sum of your full Backlog of Stories at that moment of time. This value goes up if you add new Stories to the Backlog and down if you remove Stories from the Backlog.</span>
        </div>
        <div class="alert">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span><b>Done</b> is the sum of all closed Stories at that moment of time. So this value should generally increase after each Sprint.</span>
        </div>
        <div class="grid gap-4">
            <div v-for="(item, index) in timeline" :key="index">
                <h3 class="font-bold">Sprint {{ index }}</h3>
                <div class="flex gap-4 w-full max-w-md">
                    <div class="form-control w-full">
                        <label class="label">
                            <span class="label-text">Effort</span>
                        </label>
                        <input type="number" placeholder="Type here" class="input input-bordered w-full max-w-xs" v-model="item.effort" :disabled="disabled" />
                    </div>
                    <div class="form-control w-full">
                        <label class="label">
                            <span class="label-text">Done</span>
                        </label>
                        <input type="number" placeholder="Type here" class="input input-bordered w-full max-w-xs" v-model="item.done" :disabled="disabled" />
                    </div>
                </div>
            </div>
        </div>
        
        <div class="flex gap-2">
            <button class="btn btn-sm btn-error" :disabled="!canRemoveTimelineRow || disabled" @click="removeLastTimelineRow">Remove Sprint</button>
            <button class="btn btn-sm btn-success" :disabled="disabled" @click="addTimelineRow">Add Sprint</button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { Timeline } from '../api/forcasty.api';

const props = defineProps<{
    name: string
    timeline: Timeline[]
    disabled: boolean
}>()

defineEmits<{
    (e: 'update:name', name: typeof props.name): void,
    (e: 'update:timeline', timeline: typeof props.timeline): void
}>()

const canRemoveTimelineRow = computed(() => {
    return props.timeline.length > 1
})

const removeLastTimelineRow = () => {
    props.timeline.splice(-1)
}

const addTimelineRow = () => {
    props.timeline.push({
        effort: props.timeline[props.timeline.length - 1].effort,
        done: props.timeline[props.timeline.length - 1].done
    })
}
</script>