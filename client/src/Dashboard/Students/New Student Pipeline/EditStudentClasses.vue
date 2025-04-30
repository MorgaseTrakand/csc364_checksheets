<script setup>
import RequiredClasses from './RequiredClasses/RequiredClasses.vue';
import SemesterView from './SemesterView/SemesterView.vue';
import { useStore } from '@/Stores/checkSheetStore';
import { useUserStore } from '@/Stores/userStore';
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';


const store = useStore();
const userStore = useUserStore();
const route = useRoute();

const firstName = computed(() => userStore.firstName);
const lastName = computed(() => userStore.lastName);

onMounted(async () => {
  let studentData = await userStore.fetchUserData(route.query.id)
  let majors = studentData.majors
  let minors = studentData.minors
  store.buildCheckSheet(userStore.id, majors, minors)
})
</script>

<template>
  <div class="edit-student-classes-container">
    <RequiredClasses></RequiredClasses>
    <SemesterView :firstName="firstName" :lastName="lastName"></SemesterView>
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