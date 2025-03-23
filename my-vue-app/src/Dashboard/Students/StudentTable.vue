<script setup>
import { ref } from 'vue';

const data = ref([]);  // Define your reactive data variable

// Fetch student data and set it to the 'data' ref
async function grabStudentData() {
    try {
        const response = await fetch('http://checksheets.cscprof.com/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-token': `${sessionStorage.getItem('token')}`
            },
        });
        if (response.ok) {
            const result = await response.json();  // Get the actual data from the response
            data.value = result;  // Assign the data to the reactive variable
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

//grabStudentData();
</script>

<template>
  <section>
    <o-table :data="data">
      <o-table-column field="id" label="Id" width="40" numeric sortable />
      <o-table-column field="first_name" label="First Name" sortable />
      <o-table-column field="last_name" label="Last Name" sortable />
      <o-table-column field="preferred-name" label="Preferred Name" sortable />
      <o-table-column field="email" label="Email" sortable />
      <o-table-column field="math-proficient" label="Math Proficient" />
      <o-table-column field="reading-proficient" label="Reading Proficient" />
      <o-table-column field="foreign-language" label="Foreign Language" />
      <o-table-column field="is-active" label="Active" />
    </o-table>
  </section>
</template>

<style scoped>

</style>