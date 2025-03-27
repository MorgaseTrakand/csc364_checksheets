<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue';

const props = defineProps({
  isModalActive: Boolean,
  modalData: Object
});

const emit = defineEmits(['update:isModalActive']);

let localIsModalActive = ref(props.isModalActive);


watch(
  () => props.isModalActive,
  (newVal) => {
    localIsModalActive.value = newVal;
  }
);

watch(localIsModalActive, (newVal, oldVal) => {
    emit('update:isModalActive', newVal);
});

const closeModal = () => {
  localIsModalActive.value = false;
  emit('update:isModalActive', false);
};

</script>

<template>
    <o-modal v-model:active="localIsModalActive" :width="10000">
        <div class="modal-container">
            <button>Submit</button>
            <button @click="closeModal">Close</button>
        </div>
    </o-modal>
</template>

<style scoped>
.modal-container {
    width: 60vw;
    height: 60vh;
    background-color: white;
}
</style>