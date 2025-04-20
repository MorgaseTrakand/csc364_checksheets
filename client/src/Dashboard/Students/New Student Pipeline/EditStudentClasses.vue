<script setup>
import RequiredClasses from './RequiredClasses/RequiredClasses.vue';
import SemesterView from './SemesterView/SemesterView.vue';
import { useRoute} from 'vue-router';
import { useStore } from '@/piniaStore';

const route = useRoute();
const store = useStore();

store.setID(route.query.id);

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
          let checksheet = await response.json()
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