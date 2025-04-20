<script setup>
import SemesterDropdown from '@/Components/SemesterDropdown.vue';
import { useStore } from '@/piniaStore';
import { ref } from 'vue';

let firstName = ref("First");
let lastName = ref("Last");
let studentData = {};
const store = useStore();

async function getStudentData() {
  try {
    const response = await fetch(`https://checksheets.cscprof.com/students/${store.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-token': `${localStorage.getItem('token')}`
        },
      });
      if (response.ok) {
        studentData = await response.json();
        firstName.value = studentData.firstname;
        lastName.value = studentData.lastname;
      }
  } catch (error) {
    console.error('Error:', error);
  }  
}
getStudentData()

const titles = ["Transfer Credits", "Freshman Fall", "Freshman Spring", "Sophomore Fall", "Sophomore Spring", "Junior Fall", "Junior Spring", "Senior Fall", "Senior Spring"]
</script>
 
<template>
  <div v-if="store.checksheet" class="semester-view bento">
    <div class="title-container">
      <h1>{{ firstName }} {{ lastName }}'s</h1>
      <h1>Student Course Outline</h1>
    </div>
    <div class="semester-view-body">
      <div class="transfer-semester-container">
        <SemesterDropdown :title="titles[0]" ></SemesterDropdown>
      </div>
      <div class="row">
        <SemesterDropdown :title="titles[1]" :courses='store.checksheet["Y1S1"]' ></SemesterDropdown>
        <SemesterDropdown :title="titles[2]" :courses='store.checksheet["Y1S2"]' ></SemesterDropdown>
      </div>
      <div class="row">
        <SemesterDropdown :title="titles[3]" :courses='store.checksheet["Y2S1"]' ></SemesterDropdown>
        <SemesterDropdown :title="titles[4]" :courses='store.checksheet["Y2S2"]' ></SemesterDropdown>
      </div>
      <div class="row">
        <SemesterDropdown :title="titles[5]" :courses='store.checksheet["Y3S1"]' ></SemesterDropdown>
        <SemesterDropdown :title="titles[6]" :courses='store.checksheet["Y3S2"]' ></SemesterDropdown>
      </div>
      <div class="row">
        <SemesterDropdown :title="titles[7]" :courses='store.checksheet["Y4S1"]' ></SemesterDropdown>
        <SemesterDropdown :title="titles[8]" :courses='store.checksheet["Y4S2"]' ></SemesterDropdown>
      </div>
    </div>
    <div class="button-container">
      <button>Edit</button>
      <button>Delete</button>
    </div>
  </div>
</template>

<style scoped>
  .semester-view {
    height: 100%;
    width: calc(50% - 0.5em);
    padding: 1em;
    position: relative;
  }
  .title-container {
    height: 6em;
    flex-direction: column;
  }
  .title-container h1 {
    font-size: 1.5em;
    color: var(--font-color);
    text-align: center;
  }
  .semester-view-body {
    display: flex;
    gap: 2.2em;
    flex-direction: column;
    height: calc(100% - 14em);
  }
  .transfer-semester-container {
    display: flex;
    justify-content: center;
  }
  .row {
    display: flex;
    gap: 1em;
  }
  .button-container {
    height: 4em;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>