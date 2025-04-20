<script setup>
import { ref } from 'vue';

const newPassword1 = ref('');
const newPassword2 = ref('');

const passwordError1 = ref('');
const passwordError2 = ref('');
const generalError = ref('');
const message = ref('');

async function handleSubmit() {
    passwordError1.value = '';
    passwordError2.value = '';
    generalError.value = '';


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

    if (!passwordError1.value && !passwordError2.value && !generalError.value) {
        try {
            let response = await fetch(`https://checksheets.cscprof.com/auth/passwordreset`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-token': `${localStorage.getItem('token')}`
                },
                body: JSON.stringify({"username": localStorage.getItem('username'), "password": newPassword1.value})
            });
            if (response.ok) {
                message.value = "Password successfully changed";
            }
        } catch (error) {
            console.error('Error: ', error)
        }
    }
}
</script>

<template>
    <h1 class="settings-title">Change Password</h1>
    <div class="settings-mini-container">
        <form class="" @submit.prevent="handleSubmit">
            <p v-if="generalError" class="error-text">{{ generalError }}</p>
            <p v-if="message" class="message">{{ message }}</p>

            <input v-model="newPassword1" className='password-input' type='password' placeholder='New Password' :class="{'input-error': passwordError1}" />
            <p v-if="passwordError1" class="error-text">{{ passwordError1 }}</p>

            <input v-model="newPassword2" className='password-input' type='password' placeholder='Confirm New Password' :class="{'input-error': passwordError2}" />
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
.message {
    color: green;
    font-size: 0.8em;
}
</style>