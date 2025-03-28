<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue';
import StudentMajors from './StudentMajors.vue';
import { isActive } from '../../../utils/utils';

const props = defineProps({
  isModalActive: Boolean,
  modalData: Object
});

const emit = defineEmits(['update:isModalActive']);

let localIsModalActive = ref(props.isModalActive);
let localModalData = ref({ ...props.modalData });

watch(
  () => props.isModalActive,
  (newVal) => {
    localIsModalActive.value = newVal;
  }
);
watch(localIsModalActive, (newVal, oldVal) => {
    emit('update:isModalActive', newVal);
});


watch(
  () => props.modalData,
  (newVal) => {
    localModalData.value = { ...newVal };
  },
  { deep: true, immediate: true }
);


const closeModal = () => {
  localIsModalActive.value = false;
  emit('update:isModalActive', false);
};

</script>

<template>
    <o-modal v-model:active="localIsModalActive" :fullScreen="false" :width="1000" >
        <div class="modal-container">
            <div class="input-container">
                <h1>Edit Student Details</h1>
                <div class="input-row">
                    <div class="input-left">
                        <h2>First Name</h2>
                        <input type="text" v-model="localModalData.firstname" placeholder="First Name" />
                    </div>
                    <div class="input-right">
                        <h2>Last Name</h2>
                        <input type="text" v-model="localModalData.lastname" placeholder="Last Name" />
                    </div>
                </div>
                <h2>Majors</h2>
                <StudentMajors :majors="localModalData.majors" />
                <!--<input type="text" v-model="majors" placeholder="Majors" />-->
                <div class="input-row">
                    <div class="input-left">
                        <h2>Preferred Name</h2>
                        <input type="text" v-model="localModalData.preferred_name" placeholder="Preferred Name" />
                    </div>
                    <div class="input-right">
                        <h2>Email</h2>
                        <input type="text" v-model="localModalData.email" placeholder="Email" />
                    </div>
                </div>
                <div class="switch-container">
                    <div>
                        <h2>Math Proficiency</h2>
                        <o-switch v-model="localModalData.math_proficient" :model-value="isActive(localModalData.math_proficient)"></o-switch>
                    </div>
                    <div>
                        <h2>Reading Proficiency</h2>
                        <o-switch v-model="localModalData.reading_proficient" :model-value="isActive(localModalData.reading_proficient)"></o-switch>
                    </div>
                    <div>
                        <h2>Foreign Language</h2>
                        <o-switch v-model="localModalData.foreign_language" :model-value="isActive(localModalData.foreign_language)"></o-switch>
                    </div>
                </div>

            </div>
            <div class="button-container">
                <button>Submit</button>
                <button @click="closeModal">Close</button>
            </div>
        </div>
    </o-modal>
</template>

<style scoped>
.modal-container {
    width: 60vw;
    max-width: 650px;
    height: fit-content;
    background-color: white;
    padding: 2em 1.5em 1em 1.5em;
    gap: 4em;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
}
.modal-container h1 {
    margin-bottom: 1em;
    font-size: 2em;
    color: var(--font-color);
    text-align: center;
}
.input-container {
    width: 100%;
    height: fit-content;
}
.button-container {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 1em;
}
.switch-container {
    display: flex;
    justify-content: space-between;
    margin-top: 1em;
}
h2 {
    font-size: 1em;
}
.input-row {
    display: flex;
    gap: 1em;
}
.input-left, .input-right {
    width: 50%;
}
@media (max-width: 1025px) {
    .modal-container {
        width: 100%;
        max-width: 100%;
    }
}
</style>