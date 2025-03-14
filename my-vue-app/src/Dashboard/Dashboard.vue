<script setup>
</script>

<template>
  <div class="dashboard-bento bento">
    <div class="bento-heading">
      <h1 class="bento-heading-text">Students by Major</h1>
    </div>
  </div>
  <div class="dashboard-bento bento">
    <div class="bento-heading">
      <h1 class="bento-heading-text">Students by Year</h1>
    </div>
  </div>
  <div class="dashboard-bento bento">
    <div class="bento-heading">
      <h1 class="bento-heading-text">Quick Actions</h1>
    </div>
    <div class="bento-body">
      <div class="button-container">
        <a href="/dashboard/students/new-student">
          <button class="quick-action-button blue-button">Add Student</button>
        </a>
        <a>
          <button class="quick-action-button yellow-button">Change Major</button>
        </a>
      </div>
    </div>
  </div>
  <div class="dashboard-bento bento full-width-bento">
    <div class="bento-heading">
      <h1 class="bento-heading-text">Recent Students</h1>
    </div>
  </div>
</template>

<style scoped>
.dashboard-bento {
  height: calc(50% - 0.5em);
  width: calc(33.33% - 0.67em);
}
.full-width-bento {
  width: 100%;
}
.bento-heading {
  width: 100%;
  height: 20%;
  padding: 1em;
}
.bento-heading-text {
  color: #323232;
  font-size: 1.5em;
  border-bottom: 1px solid #DADADA;
  line-height: 2;
}
.bento-body {
  height: 80%;
  width: 100%;
  display: flex;
  align-items: end;
  padding: 0 1em;
  padding-bottom: 1.5em;
}
.button-container {
  width: 100%;
  height: fit-content;
}
.quick-action-button {
  width: calc(50% - 0.25em);
  height: 3.5em;
}
.blue-button {
  background-color: var(--blue);
  margin-right: 0.5em
}
.yellow-button {
  background-color: var(--yellow);
}
</style>