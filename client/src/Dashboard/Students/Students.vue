<script setup>
import StudentTable from './Student Table/StudentTable.vue';

</script>

<template>
  <div class="student-dashboard-container bento" >
    <div class="heading">
        <h1>Student Dashboard</h1>
    </div>
    <div class="student-body">
      <StudentTable/>
    </div>
  </div>
</template>

<style scoped>
.student-dashboard-container {
  width: auto;
  padding: 1.5em 2em;
}
.student-body {
  padding: 2em 0;
}
@media (min-width: 1500px) {
  .student-dashboard-container {
    min-width: 100%;
  }
}
</style>