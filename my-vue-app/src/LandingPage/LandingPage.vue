<script setup>
import Header from '../Header/Header.vue';
import { ref } from 'vue';

let showLogin = ref(true)
const token = sessionStorage.getItem('token');

if (token) {
  showLogin.value = false
}

</script>

<template>
  <div className='landing-page-hero'>
    <Header :showLogin="showLogin"></Header>
    <div class="landing-page-container">
      <div>
        <h1 class="heading-blue">Think, plan and track</h1>
        <h1 class="heading-yellow">all in one place</h1>
        <h2>Efficiently track and manage your student’s college schedules </h2>
        <div class="CTA-button-container">
          <button class="CTA-button">Get Started</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.landing-page-hero {
  height: 100vh;
  width: 100%;
  background-color: white;
  display: flex;
  align-items: end;
}
.landing-page-container {
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.landing-page-container h1 {
  font-size: 5em;
  text-align: center;
}
.landing-page-container h2 {
  color: var(--secondary-font-color);
  font-weight: 300;
  text-align: center;
  font-size: 1.2em;
}
.heading-blue {
  color: var(--blue);
}
.heading-yellow {
  color: var(--yellow);
  margin-bottom: 0.2em;
}
.CTA-button {
  background-color: var(--blue);
  padding-top: 0.8em;
  padding-bottom: 0.8em;
  border-radius: 8px;
}
.CTA-button-container {
  margin-top: 2em;
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>