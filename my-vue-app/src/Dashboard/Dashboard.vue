<script setup>
import Sidebar from './Sidebar.vue';
</script>

<template>
  <div class="dashboard-hero">
    <Sidebar></Sidebar>
    <div class="dashboard-right">
      <div class="dashboard-heading">
        <div>
          <h1>Ethan Snyder</h1>
          <h2>Welcome Back!</h2>
        </div>
        <div></div>
      </div>
      <div class="dashboard-body">
        <div class="dashboard-bento bento"></div>
        <div class="dashboard-bento bento"></div>
        <div class="dashboard-bento bento"></div>
        <div class="dashboard-bento bento twice-width-bento"></div>
        <div class="dashboard-bento bento"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-hero {
  height: 100vh;
  width: 100%;
  background-color: #F6F6FF;
  display: flex;
}
.dashboard-right {
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column  ;
}
.dashboard-body {
  padding: 1em;
  display: flex;
  flex-wrap: wrap;
  height: 90%;
  width: 100%;
  gap: 1em;
}
.dashboard-bento {
  height: calc(50% - 0.5em);
  width: calc(33.33% - 0.67em);
}
.twice-width-bento {
  width: calc(66.66% - 0.33em);
}
.dashboard-heading {
  height: 10%;
  width: 100%;
  background-color: white;
  border-bottom: 2px solid #A2A2A2;
  border-top: 2px solid #A2A2A2;
  border-right: 2px solid #A2A2A2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1em;
}
.dashboard-heading h1 {
  font-size: 1.5em;
  font-weight: 800;
}
.dashboard-heading h2 {
  font-size: 0.8em;
  color: #636363;
}
</style>