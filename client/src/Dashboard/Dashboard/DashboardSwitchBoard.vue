<script setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import Sidebar from '../../Components/Sidebar.vue';

const route = useRoute();
const path = ref(route.path);
const name = localStorage.getItem('firstname') + ' ' + localStorage.getItem('lastname');

</script>

<template>
  <div class="dashboard-hero">
    <Sidebar></Sidebar>
    <div class="dashboard-right">
      <div class="dashboard-heading">
        <div>
          <h1>{{ name }}</h1>
          <h2>Welcome Back!</h2>
        </div>
        <div></div>
      </div>
      <div class="dashboard-body">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-hero {
  height: 100vh;
  width: 100%;
  background-color:rgb(233, 233, 241);
  display: flex;
}
.dashboard-right {
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column  ;
}
@media (max-width: 750px) {
  .dashboard-right {
    width: calc(100vw - 5em);
  }
}
.dashboard-body {
  padding: 1em;
  display: flex;
  flex-wrap: wrap;
  height: 90%;
  width: 100%;
  gap: 1em;
  overflow-y: auto;
  position: relative;
}
.dashboard-heading {
  height: 10%;
  width: 100%;
  background-color: white;
  border-bottom: 1px solid #A2A2A2;
  border-top: 1px solid #A2A2A2;
  border-right: 1px solid #A2A2A2;
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