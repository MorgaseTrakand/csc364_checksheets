<script setup>
import RequiredClasses from './RequiredClasses/RequiredClasses.vue';
import SemesterView from './SemesterView/SemesterView.vue';
import { useRoute} from 'vue-router';
import { useStore } from '@/piniaStore';

const route = useRoute();
const store = useStore();

store.setID(route.query.id);
let checksheet = {
  Y1S1: [],
  Y1S2: [],
  Y2S1: [],
  Y2S2: [],
  Y3S1: [],
  Y3S2: [],
  Y4S1: [],
  Y4S2: []
};

function buildClassesSet(classesArr) {

}

async function buildCheckSheet() {
  try {
      let response = await fetch(`https://checksheets.cscprof.com/studentcourses/${store.id}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'x-token': `${localStorage.getItem('token')}`
          },
      });
      if (response.ok) {
          let responseData = await response.json()
          let classesSet = new Set();

          for (let i = 0; i < responseData.length; i++) {
            let key = `Y${responseData[i].year}S${responseData[i].course.semester_id}`
            classesSet.add(responseData[i].course.course_code)
            checksheet[key] = [responseData[i]]
          }
          store.setClassesSet(classesSet);
          store.setCheckSheet(checksheet);
      }
    } catch (error) {
        console.error('Error: ', error)
    }
}
buildCheckSheet();
</script>

<template>
  <div class="edit-student-classes-container">
    <RequiredClasses></RequiredClasses>
    <SemesterView></SemesterView>
  </div>
</template>

<style scoped>
  .edit-student-classes-container {
    height: 100%;
    width: 100%;
    display: flex;
    gap: 1em;
  }
</style>