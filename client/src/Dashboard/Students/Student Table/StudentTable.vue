<script setup>
import { ref, computed, reactive } from 'vue';
import { Check, X } from 'lucide-vue-next';
import { combineMajors, isActive } from '../../../utils/utils';
import EditStudentModal from './EditStudentModal.vue';

const data = ref([]);
let loading = ref(true);
let showActiveStudents = ref(false);
let isModalActive = ref(false);
let modalData = ref({});

const toggleModal = (row) => {
    isModalActive.value = !isModalActive.value;
    modalData.value = row;
};

const updateStudentData = (updatedData) => {
    const index = data.value.findIndex(student => student.student_id === updatedData.student_id);
    if (index !== -1) {
        data.value[index] = updatedData;  // Update the student in data with the new values
    }
};

const filteredData = computed(() => { return showActiveStudents.value ? data.value : data.value.filter(student => student.is_active === 1); });

const updateStudentStatus = async (row, event) => {
    const id = row.student_id;
    let is_active = event ? 1 : 0;

    try {
        const response = await fetch('https://checksheets.cscprof.com/students', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-token': `${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ student_id: id, is_active: is_active })
        });
        if (response.ok) {
            row.is_active = is_active; 
        }
    } catch (error) {
        console.error('Error: ', error)
    }
}

async function grabStudentData() {
    try {
        const response = await fetch('https://checksheets.cscprof.com/students', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-token': `${localStorage.getItem('token')}`
            },
        });
        if (response.ok) {
            const result = await response.json();
            
            data.value = result; 
            console.log(data.value[0])
            loading.value = false;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

grabStudentData();
</script>

<template>
    <div class="full-width-bento">
        <EditStudentModal v-model:modalData="modalData" v-model:isModalActive="isModalActive"  @update:modalData="updateStudentData" />
        <h1 class="sub-heading">Student Table</h1>
        <div class="table-options-bar">
            <div>
                <h2>Sort By:</h2>
            </div>
            <div class="slider-container">
                <h2 v-if="showActiveStudents" >Hide inactive students</h2>
                <h2 v-else >Show inactive students</h2>
                <o-switch class="remove-margin"
                    :model-value="false"
                    v-model="showActiveStudents"
                ></o-switch>
            </div>
        </div>
        <o-table :data="filteredData" class="student-table" :bordered="true" :loading="loading" :paginated="true" per-page="5">
            <o-table-column class="border-radius-left" field="student_id" label="Id" width="40" numeric sortable />
            <o-table-column field="firstname" label="First Name" sortable />
            <o-table-column field="lastname" label="Last Name" sortable />
            <o-table-column field="majors" label="Majors" sortable >
                <template #default="{ row }">
                    {{ combineMajors(row.majors) }}
                </template>
            </o-table-column>
            <o-table-column field="preferred_name" label="Preferred Name" sortable />
            <o-table-column field="email" label="Email" sortable />
            <o-table-column field="math_proficient" label="Math Proficient" >
                <template #default="{ row }">
                    <Check v-if="row.math_proficient === 1" color="green" stroke-width="3px" size="1.75em"/>
                    <X v-if="row.math_proficient === 0" color="red" stroke-width="3px" size="1.75em" />
                </template>
            </o-table-column>
            <o-table-column field="reading_proficient" label="Reading Proficient" >
                <template #default="{ row }">
                    <Check v-if="row.reading_proficient === 1" color="green" stroke-width="3px" size="1.75em"/>
                    <X v-if="row.reading_proficient === 0" color="red" stroke-width="3px" size="1.75em" />
                </template>
            </o-table-column>
            <o-table-column field="foreign_language" label="Foreign Language" >
                <template #default="{ row }">
                    <Check v-if="row.foreign_language === 1" color="green" stroke-width="3px" size="1.75em"/>
                    <X v-if="row.foreign_language === 0" color="red" stroke-width="3px" size="1.75em" />
                </template>
            </o-table-column>
            <o-table-column field="is_active" label="Active" >
                <template #default="{ row }">
                    <o-switch 
                        @update:model-value="updateStudentStatus(row, $event)"
                        :model-value="isActive(row.is_active)"
                    ></o-switch>                
                </template>
            </o-table-column>
            <o-table-column field="edit-student" label="Edit Student">
                <template #default="{ row }">
                    <button class="edit-student-button" @click="toggleModal(row)">Edit</button>
                </template>
            </o-table-column>
        </o-table>
    </div>
</template>

<style scoped>
.full-width-bento {
    width: 100%;
    height: 100%;
    height: auto;
    padding: 0em;
}
.table-options-bar {
    width: 100%;
    min-height: 4em;
    border-radius: 10px;
    border: 1px solid #dbdbdb;
    margin: 1em 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1em;
}
.slider-container {
    display: flex;
    align-items: center;
}
h2 {
    font-size: 1em;
    margin-right: 1em;
}
.edit-student-button {
    background-color: rgb(252, 252, 67);
    padding: inherit 3em;
    color: var(--font-color);
    border: 1px solid rgb(219, 219, 219);
}
</style>