<script setup>
import RequiredClasses from './RequiredClasses/RequiredClasses.vue';
import SemesterView from './SemesterView/SemesterView.vue';
import { useStore } from '@/Stores/checkSheetStore';
import { useUserStore } from '@/Stores/userStore';
import { onMounted } from 'vue';

const store = useStore();
const userStore = useUserStore();

onMounted(() => {
  store.buildCheckSheet(userStore.id)
})
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