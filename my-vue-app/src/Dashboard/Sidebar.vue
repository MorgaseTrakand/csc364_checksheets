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
      <a href="/" class="logo"><h1>Check<span class="yellow-highlight">Sheets</span></h1></a>
      <a href="/" class="hidden-logo"><h1>C<span class="yellow-highlight">S</span></h1></a>
    </div>
    <div class="sidebar-body">
      <div class="sidebar-body-container">
        <h2>MENU</h2>
        <a href="/dashboard">
          <div :class="['sidebar-button', { 'active': route.path === '/dashboard' }]">
            <img v-if="route.path === '/dashboard'" class="sidebar-svg" src="../assets/homeWhite.svg" alt="Home Icon" />
            <img v-else class="sidebar-svg" src="../assets/homeBlack.svg" alt="Home Icon" />
            <h1>Dashboard</h1>
          </div>
        </a>
        <a href="/dashboard/students">
          <div :class="['sidebar-button', { 'active': route.path.startsWith('/dashboard/students') }]" >
            <img v-if="route.path.startsWith('/dashboard/students')" class="sidebar-svg" src="../assets/studentWhite.svg" alt="Home Icon" />
            <img v-else class="sidebar-svg" src="../assets/studentBlack.svg" alt="Home Icon" />
            <h1>Students</h1>
          </div>
        </a>
        <a href="/dashboard/notes">
          <div :class="['sidebar-button', { 'active': route.path === '/dashboard/notes' }]">
            <img v-if="route.path.startsWith('/dashboard/notes')" class="sidebar-svg" src="../assets/noteWhite.svg" alt="Home Icon" />
            <img v-else class="sidebar-svg" src="../assets/noteBlack.svg" alt="Home Icon" />
            <h1>Notes</h1>
          </div>
        </a>
      </div>
    </div>
    <div class="sidebar-footer">
      <div class="sidebar-footer-container">
        <a class="half-width-button" href="/settings/account">
          <div :class="['sidebar-button', { 'active': route.path.startsWith('/settings')}]">
            <img class="sidebar-svg" src="../assets/settings.svg" alt="Home Icon" />
            <h1>Settings</h1>
          </div>
        </a>
        <a class="half-width-button">
          <div class="sidebar-button" @click="handleLogout()">
            <img class="sidebar-svg" src="../assets/logout.svg" alt="Home Icon" />
            <h1>Logout</h1>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hidden-logo {
  display: none;
}
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
  width: 48%;
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
  display: flex;
  align-items: center;
}
.sidebar-button h1 {
  font-size: 1em;
}
.sidebar-button.active {
  background-color: var(--blue  );
  color: white;
}
.sidebar-svg {
  margin-right: 0.4em;
  height: 1em;
}

@media (max-width: 1500px) {
  .sidebar-footer-container {
    width: 90%;
  }
  .sidebar h1 {
    font-size: 0.8em;
  }
  .sidebar-svg {
    height: 0.8em;
  }
  .sidebar-heading h1 {
    font-size: 1.5em;
  }
}
@media (max-width: 1150px) {
  .sidebar-footer-container {
    flex-wrap: wrap;
    justify-content: center;
  }
  .half-width-button {
    width: 90%;
  }
  .sidebar-heading h1 {
    font-size: 1.2em;
  }
  .sidebar-footer {
    padding-top: 2em;
    padding-bottom: 1.5em;
  }
}
@media (max-width: 750px) {
  .sidebar-body h1, .sidebar-footer-container h1 {
    display: none;
  }
  .sidebar-svg {
    height: 1em;
    margin-right: 0px;
  }
  .sidebar-button {
    width: fit-content;
  }
  .logo {
    display: none;
  }
  .hidden-logo {
    display: block;
  }
  .sidebar {
    width: fit-content;
  }
  .half-width-button {
    width: fit-content;
  }
  .sidebar-body-container {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
}
</style>