<script setup>
import { defineEmits, ref, watch, computed } from 'vue';
import StudentMajors from './StudentMajors.vue';


let majors = ref([]);

const props = defineProps(['modalData', 'isModalActive']);
const emit = defineEmits(['update:isModalActive', 'update:modalData']);

let localModalData = ref({ ...props.modalData });
const modalData = defineModel('modalData', { type: Object });
const isModalActive = defineModel('isModalActive', { type: Boolean });

watch(
  () => modalData.value,
  (newVal) => {
    if (newVal) {
        localModalData.value = { ...newVal };
        majors.value = newVal.majors;
    }
  },
  { deep: true, immediate: true }
);

const mathBool = computed({
    get() {
      return Boolean(localModalData.value.math_proficient);
    },
    set(value) {
      localModalData.value.math_proficient = value ? 1 : 0;
    }
});
const readBool = computed({
    get() {
      return Boolean(localModalData.value.reading_proficient);
    },
    set(value) {
      localModalData.value.reading_proficient = value ? 1 : 0;
    }
});
const lanBool = computed({
    get() {
      return Boolean(localModalData.value.foreign_language);
    },
    set(value) {
      localModalData.value.foreign_language = value ? 1 : 0;
    }
});

const submitModal = async () => {
    try {
        const response = await fetch('https://checksheets.cscprof.com/students', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-token': `${localStorage.getItem('token')}`
            },
            body: JSON.stringify(localModalData.value)
        });
        if (response.ok) {
            console.log(localModalData.value)
            emit('update:modalData', localModalData.value);
            emit('update:isModalActive', false);
        }
    } catch (error) {
        console.error('Error: ', error)
    }
}

const closeModal = () => { emit('update:isModalActive', false) };

</script>

<template>
    <o-modal v-model:active="isModalActive" :fullScreen="false" :width="1000" mobileBreakpoint="550px" append-to-body="false">
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
                <StudentMajors :majors="majors" :id="localModalData.student_id"/>
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
                        <o-switch v-model="mathBool" ></o-switch>
                    </div>
                    <div>
                        <h2>Reading Proficiency</h2>
                        <o-switch v-model="readBool"></o-switch>
                    </div>
                    <div>
                        <h2>Foreign Language</h2>
                        <o-switch v-model="lanBool" ></o-switch>
                    </div>
                </div>

            </div>
            <div class="button-container">
                <button class="submit-button" @click="submitModal" >Submit</button>
                <button class="close-button" @click="closeModal">Close</button>
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
    flex-wrap: wrap;
    gap: 1em;
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
.submit-button {
    border: 2px solid green;
    background-color: rgb(202, 255, 202);
    color: green;
}
.close-button {
    border: 2px solid red;
    background-color: rgb(255, 210, 210);
    color: red;
}
</style>