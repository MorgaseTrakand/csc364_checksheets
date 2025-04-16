<script setup>
import RequiredClasses from './RequiredClasses.vue';
import SemesterView from './SemesterView.vue';

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