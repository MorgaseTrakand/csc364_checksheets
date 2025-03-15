<script setup>
import { ref } from 'vue';

const oldPassword = ref('');
const newPassword1 = ref('');
const newPassword2 = ref('');
const usernameError = ref('');
const passwordError = ref('');
const generalError = ref('');

async function handleSubmit() {
    
}
</script>

<template>
    <h1 class="settings-title">Change Password</h1>
    <div class="settings-mini-container">
        <form class="" @submit.prevent="handleSubmit">
            <p v-if="generalError" class="error-text">{{ generalError }}</p>

            <input v-model="oldPassword" type='password' placeholder='Old Password' :class="{'input-error': usernameError}" />
            <p v-if="oldPasswordError" class="error-text">{{ oldPasswordError }}</p>

            <input v-model="newPassword1" className='password-input' type='password' placeholder='Password' :class="{'input-error': passwordError}" />
            <p v-if="passwordError" class="error-text">{{ passwordError }}</p>

            <input v-model="newPassword2" className='password-input' type='password' placeholder='Password' :class="{'input-error': passwordError}" />


            <button className='form-button'>Change Password</button>
        </form>
    </div>
</template>

<style scoped>
.settings-title {
    font-size: 1.2em;
    margin-bottom: 0.5em;
}
.settings-mini-container {
    width: 100%;
    height: fit-content;
    border: 1px solid #DADADA;
    border-radius: 8px;
    padding: 0.5em;
}
</style>