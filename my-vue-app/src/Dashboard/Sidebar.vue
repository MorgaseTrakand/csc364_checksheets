<script setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// Function to handle logout
async function handleLogout() {
  try {
    const response = await fetch('http://checksheets.cscprof.com/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
      });
      if (response.ok) {
        sessionStorage.clear();
        router.push('/');
      }
  } catch (error) {
    console.error('Error:', error);
  }
}
</script>

<template>
  <div class="sidebar">
    <div class="sidebar-heading">
      <a href="/"><h1>Check<span class="yellow-highlight">Sheets</span></h1></a>
    </div>
    <div class="sidebar-body">
      <div class="sidebar-body-container">
        <h2>MENU</h2>
        <a href="/dashboard">
          <div :class="['sidebar-button', { 'active': route.path === '/dashboard' }]">
            <h1>Dashboard</h1>
          </div>
        </a>
        <a href="/dashboard/students">
          <div :class="['sidebar-button', { 'active': route.path.startsWith('/dashboard/students') }]" >
            <h1>Students</h1>
          </div>
        </a>
        <a href="/dashboard/notes">
          <div :class="['sidebar-button', { 'active': route.path === '/dashboard/notes' }]">
            <h1>Notes</h1>
          </div>
        </a>
      </div>
    </div>
    <div class="sidebar-footer">
      <div class="sidebar-footer-container">
        <a class="half-width-button" href="/settings">
          <div :class="['sidebar-button', { 'active': route.path === '/settings'}]">
            <h1>Settings</h1>
          </div>
        </a>
        <a class="half-width-button">
          <div class="sidebar-button" @click="handleLogout()">
            <h1>Logout</h1>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  height: 100%;
  width: 20%;
  background-color: white;
}
.sidebar-heading, .sidebar-footer {
  border: 1px solid #A2A2A2;
}
.sidebar-heading {
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.sidebar-heading h1 {
  font-size: 2em;
}
.sidebar-body {
  height: 80%;
  border-right: 1px solid #A2A2A2;
  border-left: 1px solid #A2A2A2;
  display: flex;
  justify-content: center;
  padding: 2em 0;
}
.sidebar-body-container {
  width: 80%;
}
.sidebar-body-container h2 {
  font-size: 0.75em;
  color: #565656;
  margin-bottom: 0.25em;
}
.sidebar-footer {
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.sidebar-footer-container {
  width: 80%;
  display: flex;
  justify-content: space-between;
}
.half-width-button {
  width: 45%;
}
.sidebar-heading h1 {
  color: var(--blue);
}
.sidebar-button {
  border-radius: 8px;
  border: 1px solid #A2A2A2;
  padding: 1em;
  margin-bottom: 0.5em;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}
.sidebar-button h1 {
  font-size: 1em;
}
.sidebar-button.active {
  background-color: var(--blue  );
  color: white;
}
</style>