<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();

</script>

<template>
  <div class="settings-container bento">
    <div class="settings-heading">
        <h1>Settings</h1> 
        <div class="settings-options-container">
            <a href="/settings/account">
                <h2 :class="[{ 'active': route.path === '/settings/account' }]">Account</h2>
            </a>
            <a href="/settings/theme">
                <h2 :class="[{ 'active': route.path === '/settings/theme' }]">Theme</h2>
            </a>
        </div>
    </div>
    <div class="settings-body">
        <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.settings-container {
    width: 100%;
    height: 100%;
    padding: 1.5em 2em;
}
.settings-heading {
    width: 100%;
    height: fit-content;
    border-bottom: 1px solid #DADADA;
}
.settings-heading h1 {
    color: var(--font-color);
    font-size: 2em;
    line-height: 2em;
}
.settings-options-container {
    display: flex;
    gap: 1em;
}
.settings-options-container h2 {
    font-size: 1em;
    font-weight: 600;
    line-height: 2em;
    border-radius: 4px;
    color: #797979;
    margin-bottom: 0.5em;
}
.active {
    background-color: #e7e7e7;
    color: var(--font-color) !important;
    padding: 0.1em 0.5em;
}
.settings-body {
    width: 100%;
    height: fit-content;
    padding: 1em 0;
}
</style>