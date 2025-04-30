<script setup>
import { computed } from 'vue';
import { useRouter, useRoute} from 'vue-router';
import MajorMinorDropdown from '../../../Components/MajorMinorDropdown.vue';
import { useUserStore } from '../../../Stores/userStore';
import { useStore } from '../../../Stores/checkSheetStore';

const userStore = useUserStore();
const store = useStore();
const router = useRouter();

let newStudentData = {
  "firstname": "",
  "lastname": "",
  "preferred_name": "",
  "email": "",
  "math_proficient": 0,
  "reading_proficient": 0,
  "foreign_language": 0
}

const closeModal = () => { emit('update:isModalActive', false) };

const mathBool = computed({
    get() {
      return newStudentData["math_proficient"] === 1;
    },
    set(value) {
      newStudentData["math_proficient"] = value ? 1 : 0;
    }
});
const readBool = computed({
    get() {
      return newStudentData["reading_proficient"] === 1;
    },
    set(value) {
      newStudentData["reading_proficient"] = value ? 1 : 0;
    }
});
const lanBool = computed({
    get() {
      return newStudentData["foreign_language"] === 1;
    },
    set(value) {
      newStudentData["foreign_language"] = value ? 1 : 0;
    }
});

async function submitModal() {
  let majorID = userStore.major_id;
  let minorID = userStore.minor_id;
  if (!majorID) {
    
    return;
  }
  if (!minorID) {

  }
  try {
    const response = await fetch('https://checksheets.cscprof.com/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-token': `${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newStudentData)
      });
      if (response.ok) {
        const studentID = await response.json();
        await Promise.all([
          store.setStudentMajor(studentID, majorID),
          store.setStudentMinor(studentID, minorID)
        ]);
        router.push(`/dashboard/students/edit-student-classes?id=${studentID}`)
      }
  } catch (error) {
    console.error('Error:', error);
  }  
}
</script>

<template>
    <div class="new-student-form-container bento">
      <div class="heading">
          <h1>New Student Form</h1>
      </div>
      <div class="form-container">
        <div>
          <div class="input-row">
            <div class="input-left">
                <h2>First Name</h2>
                <input type="text" v-model="newStudentData.firstname" placeholder="First Name" />
            </div>
            <div class="input-right">
                <h2>Last Name</h2>
                <input type="text" v-model="newStudentData.lastname" placeholder="Last Name" />
            </div>
          </div>
          <div class="input-row">
              <div class="input-left">
                  <h2>Preferred Name</h2>
                  <input type="text" v-model="newStudentData.preferred_name" placeholder="Preferred Name" />
              </div>
              <div class="input-right">
                  <h2>Email</h2>
                  <input type="text" v-model="newStudentData.email" placeholder="Email" />
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
          <div class="major-minor-container">
            <MajorMinorDropdown :type="'major'" :isInvalid="!userStore.major_id" />
            <MajorMinorDropdown :type="'minor'" :isInvalid="!userStore.minor_id" />
          </div>
        </div>
        <div class="button-container">
            <button class="submit-button" @click="submitModal" >Submit</button>
            <button class="close-button" @click="closeModal">Close</button>
        </div>
      </div>
    </div>
</template>

<style scoped>
    .class-semester-components {
      width: 100%;
    }
    .new-student-form-container {
      padding: 1.5em 2em;
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
    }
    .class-list-component, .semester-list-component {
        height: 100%;
        width: calc(50% - 0.5em);
    }
    .onboarding {
      width: 100%;
      height: 100%;
      padding: 1em;
      display: flex;
      flex-direction: column;
    }
    .form-container {
      border-radius: 12px;
      border: 1px solid #A2A2A2;
      padding: 1.5em 2em;
      flex: 1;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      flex: 1;
    }
    .heading {
      margin-bottom: 2em;
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
    .switch-container {
      display: flex;
      justify-content: space-between;
      margin: 1em 0;
      flex-wrap: wrap;
      gap: 1em;
  }
  .button-container {
      width: 100%;
      display: flex;
      justify-content: center;
      gap: 1em;
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
  .major-minor-container {
    display: flex;
    gap: 1em;
  }
</style>