<script setup>
import { ref } from 'vue';
import { Check, X } from 'lucide-vue-next';

const data = ref([]);
let loading = ref(true);

const isActive = (value) => value === 1;

function combineMajors(majors) {
    let res = ""
    for (let i = 0; i < majors.length; i++) {
        if (i+1 < majors.length) {
            res+=majors[i].major_abbreviation+", "
        }
        else {
            res+=majors[i].major_abbreviation
        }
    }
    return res
}

// Fetch student data and set it to the 'data' ref
async function grabStudentData() {
    try {
        const response = await fetch('http://checksheets.cscprof.com/students', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-token': `${sessionStorage.getItem('token')}`
            },
        });
        if (response.ok) {
            const result = await response.json();  // Get the actual data from the response
            data.value = result;  // Assign the data to the reactive variable
            console.log(result)
            loading.value = false;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

grabStudentData();
</script>

<template>
    <div class="full-width-bento bento">
        <o-table :data="data" class="student-table" :bordered="true" :loading="loading" >
            <o-table-column class="border-radius-left" field="student_id" label="Id" width="40" numeric sortable />
            <o-table-column field="firstname" label="First Name" sortable />
            <o-table-column field="majors" label="Majors" sortable >
                <template #default="{ row }">
                    {{ combineMajors(row.majors) }}
                </template>
            </o-table-column>
            <o-table-column field="lastname" label="Last Name" sortable />
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
                    <Check v-if="row.reading_proficient === 1" color="green" stroke-width="3px" size="1.75em"/>
                    <X v-if="row.reading_proficient === 0" color="red" stroke-width="3px" size="1.75em" />
                </template>
            </o-table-column>
            <o-table-column field="is_active" label="Active" >
                <template #default="{ row }">
                    <o-switch :model-value="isActive(row.is_active)"></o-switch>
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
    padding: 1.5em;
}
.student-table {
    border-radius: 20px;
}
</style>