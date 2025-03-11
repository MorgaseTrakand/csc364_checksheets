<script setup>
import Header from '../Header/Header.vue';
import { ref } from 'vue';

const username = ref('');
const password = ref('');
const usernameError = ref('');
const passwordError = ref('');

function handleSubmit() {
  usernameError.value = '';
  passwordError.value = '';

  if (!username.value) {
    usernameError.value = "Username is required";
  } else if (username.value.length < 3) {
    usernameError.value = "Username must be at least three characters long";
  } else if (/\s/.test(username.value)) {
    usernameError.value = "Username must not contain spaces";
  }

  if (!password.value) {
    passwordError.value = "Password is required";
  } else if (password.value.length < 5) {
    passwordError.value = "Password must be at least five characters long";
  } else if (/\s/.test(password.value)) {
    passwordError.value = "Password must not container spaces";
  }
  
  if (!usernameError.value && !passwordError.value) {
    console.log('form submitted')
  }
}
</script>

<template>
  <div className='login-hero'>
    <div className='login-left'>
      <Header></Header>
      <div className='form-center'>
        <div className='form-container'>
          <div className='login-header'>
            <h1>Signup</h1>
            <h2>Sign up to continue</h2>
          </div>
          <form @submit.prevent="handleSubmit">
            <input v-model="username" type='text' placeholder='Username' :class="{'input-error': usernameError}" />
            <p v-if="usernameError" class="error-text">{{ usernameError }}</p>

            <input v-model="password" className='password-input' type='password' placeholder='Password' :class="{'input-error': passwordError}" />
            <p v-if="passwordError" class="error-text">{{ passwordError }}</p>
            
            <h2 className='reset-password'>Reset password</h2>
            <button className='form-button'>Signup</button>
            <h2 className='signup-prompt'>Already a member? <a href='/login'><span>Login</span></a></h2>
          </form>
        </div>
      </div>
    </div>
    <div className='login-right-container'>
      <div class="login-right">

      </div>
    </div>  
  </div>
</template>

<style scope>

</style>