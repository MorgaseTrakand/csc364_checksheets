<script setup>
</script>

<template>
  <div class="dashboard-bento bento">
    <div class="bento-heading">
      <h1 class="bento-heading-text">Students by Major</h1>
    </div>
    <div class="filter-button-body">
      <a class="dashboard-filter-a">
        <div class="dashboard-filter-button">
          <h1>Computer Science</h1>
        </div>
      </a>
      <a class="dashboard-filter-a">
        <div class="dashboard-filter-button">
          <h1>Cyber Security</h1>
        </div>
      </a>
    </div>
  </div>
  <div class="dashboard-bento bento">
    <div class="bento-heading">
      <h1 class="bento-heading-text">Students by Year</h1>
    </div>
    <div class="filter-button-body">
      <a class="dashboard-filter-a">
        <div class="dashboard-filter-button">
          <h1>Freshman</h1>
        </div>
      </a>
      <a class="dashboard-filter-a">
        <div class="dashboard-filter-button">
          <h1>Sophomore</h1>
        </div>
      </a>
      <a class="dashboard-filter-a">
        <div class="dashboard-filter-button">
          <h1>Junior</h1>
        </div>
      </a>
      <a class="dashboard-filter-a">
        <div class="dashboard-filter-button">
          <h1>Senior</h1>
        </div>
      </a>
    </div>
  </div>
  <div class="dashboard-bento bento">
    <div class="bento-heading">
      <h1 class="bento-heading-text">Quick Actions</h1>
    </div>
    <div class="bento-body">
      <div class="button-container">
        <a href="/dashboard/students/new-student?redirectURL=/dashboard">
          <button class="quick-action-button blue-button">Add Student</button>
        </a>
        <a href="/dashboard/students/change-major">
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
@media (max-width: 1300px) {
  .button-container {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }
  .quick-action-button {
    font-size: 0.75em;
  }
}
@media (max-width: 1100px) {
  .quick-action-button {
    width: 100%;
  }
}
.blue-button {
  background-color: var(--blue);
  margin-right: 0.5em
}
.yellow-button {
  background-color: var(--yellow);
}

.filter-button-body {
  height: 80%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5em 1em;
}
.dashboard-filter-button {
  height: 100%;
  border: 1px solid #A2A2A2;
  border-radius: 8px;
  padding: 0.75em;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.dashboard-filter-button h1 {
  font-size: 0.8em;
  font-weight: 600;
  font-family: "DM Sans";
}
.dashboard-filter-a {
  position: relative;
  min-height: 2.5em;
  height: 15%;
  min-width: 100%;
}
</style>