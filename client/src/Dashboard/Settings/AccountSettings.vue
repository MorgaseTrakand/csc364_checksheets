<script setup>
import { ref } from 'vue';

const oldPassword = ref('');
const newPassword1 = ref('');
const newPassword2 = ref('');

const oldPasswordError = ref('');
const passwordError1 = ref('');
const passwordError2 = ref('');
const generalError = ref('');

async function handleSubmit() {
    oldPasswordError.value = '';
    passwordError1.value = '';
    passwordError2.value = '';
    generalError.value = '';

    if (!oldPassword.value) {
        oldPasswordError.value = "Previous password is required."
    } 


    if (!newPassword1.value) {
        passwordError1.value = "New password is required";
    }


    if (!newPassword2.value) {
        passwordError2.value = "New password is required";
    }

    if (newPassword1.value != newPassword2.value) {
        generalError.value = "New passwords must match";
        passwordError1.value = " ";
        passwordError2.value = " ";
    }


    if (!oldPasswordError && !passwordError1 && !passwordError2 && !generalError) {
        console.log('password changed');
    }
}
</script>

<template>
    <h1 class="settings-title">Change Password</h1>
    <div class="settings-mini-container">
        <form class="" @submit.prevent="handleSubmit">
            <p v-if="generalError" class="error-text">{{ generalError }}</p>

            <input v-model="oldPassword" type='password' placeholder='Old Password' :class="{'input-error': oldPasswordError}" />
            <p v-if="oldPasswordError" class="error-text">{{ oldPasswordError }}</p>

            <input v-model="newPassword1" className='password-input' type='password' placeholder='Password' :class="{'input-error': passwordError1}" />
            <p v-if="passwordError1" class="error-text">{{ passwordError1 }}</p>

            <input v-model="newPassword2" className='password-input' type='password' placeholder='Password' :class="{'input-error': passwordError2}" />
            <p v-if="passwordError2" class="error-text">{{ passwordError2 }}</p>


            <button className='form-button'>Change Password</button>
        </form>
    </div>
</template>

<style scoped>
.settings-title {
    font-size: 1.5em;
    margin-bottom: 0.75em;
}
.settings-mini-container {
    width: 100%;
    height: fit-content;
    border: 1px solid #DADADA;
    box-shadow: offset-x offset-y blur-radius spread-radius color;
    box-shadow: 0 0 5px 0.5px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    padding: 2em;
}
</style>