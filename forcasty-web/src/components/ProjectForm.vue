<template>
    <div class="grid gap-2">
        <div class="form-control w-full max-w-md">
            <label class="label">
                <span class="label-text">Project Name</span>
            </label>
            <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-md" :value="name" @input="$emit('update:name', ($event.target as HTMLInputElement).value)" :disabled="disabled" />
        </div>
        <h2 class="font-bold pt-4">Timeline</h2>
        
        <div v-for="(item, index) in timeline" :key="index" class="flex gap-4 w-full max-w-md" >
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
        
        <div class="flex gap-2">
            <button class="btn btn-sm btn-error" :disabled="!canRemoveTimelineRow || disabled" @click="removeLastTimelineRow">Remove</button>
            <button class="btn btn-sm btn-success" :disabled="disabled" @click="addTimelineRow">Add</button>
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