<template>
    <button type="button" class="btn btn-outline btn-error" @click="openModal">
        <slot>Delete</slot>
        <teleport to="body">
            <input type="checkbox" class="modal-toggle" v-model="isModalOpen" />
            <div class="modal cursor-pointer">
                <label class="modal-box realtive" for="" ref="modal">
                    <h3 class="font-bold text-lg">Confirm delete?</h3>
                    <p class="py-4">This can not be undone!</p>
                    <div class="flex gap-2">
                        <input type="checkbox" v-model="canClickYesButton" class="checkbox" />
                        <p>Unlock Yes Button</p>
                    </div>
                    <div class="modal-action">
                        <button class="btn btn-error" :disabled="!canClickYesButton" @click="onYes">Yes</button>
                        <button @click="closeModal" class="btn btn-secondary">No</button>
                    </div>
                </label>
            </div>
        </teleport>
    </button>
</template>
<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core';
import { ref } from 'vue';

const emit = defineEmits<{
    (e: 'delete'): void
}>()

const modal = ref(null)

const isModalOpen = ref(false)
const canClickYesButton = ref(false)

const openModal = () => {
    canClickYesButton.value = false
    isModalOpen.value = true
}

const closeModal = () => {
    isModalOpen.value = false
    canClickYesButton.value = false
}

const onYes = () => {
    closeModal()
    emit('delete')
}

onClickOutside(modal, () => closeModal())
</script>