<script setup>
import Header from '../Header/Header.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();

if (localStorage.getItem('token')) {
  router.push('./dashboard') 
}

const username = ref('');
const password = ref('');
const usernameError = ref('');
const passwordError = ref('');
const generalError = ref('');

function handleSubmit() {
  usernameError.value = '';
  passwordError.value = '';
  generalError.value = '';

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
    sendPost()
  }

  async function sendPost() {
    try {
      const response = await fetch('https://checksheets.cscprof.com/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username.value,
            password: password.value
          })
      });

      if (!response.ok) {
          if (response.status == 401) {
            generalError.value = "Either your password or username is incorrect";
          } else {
            generalError.value = "Something when wrong, please try again";
          }
      } else {
        var data = await response.json();
        data = data[0]
        localStorage.setItem('token', data.user_guid)
        localStorage.setItem('username', data.username)
        localStorage.setItem('firstname', data.firstname)
        localStorage.setItem('lastname', data.lastname)
        router.push('./dashboard') 
      }
    } catch(error) {
      console.error('Error:', error);
    }
  }
}

let showLogin = ref(true)
const token = localStorage.getItem('token');

if (token) {
  showLogin.value = false
}
let loginPage = ref('login');

</script>

<template>
  <div className='login-hero'>
    <div className='login-left'>
      <Header :showLogin="showLogin" :loginPage="loginPage"></Header>
      <div className='form-center'>
        <div className='form-container'>
          <div className='login-header'>
            <h1>Login</h1>
            <h2>Welcome Back!</h2>
          </div>
          <form @submit.prevent="handleSubmit">
            <p v-if="generalError" class="error-text">{{ generalError }}</p>
            <input v-model="username" type='text' placeholder='Username' :class="{'input-error': usernameError}" />
            <p v-if="usernameError" class="error-text">{{ usernameError }}</p>

            <input v-model="password" className='password-input' type='password' placeholder='Password' class="password-input" :class="{'input-error': passwordError}" />
            <p v-if="passwordError" class="error-text">{{ passwordError }}</p>

            <h2 className='reset-password'>Reset password</h2>
            <button className='form-button'>Signin</button>
            <h2 className='signup-prompt'>Don't have an account? <a href='/signup'><span>Sign up</span></a></h2>
          </form>
        </div>
      </div>
    </div>
    <div className='login-right-container'>
      <div class="login-right"></div>
    </div>  
  </div>
</template>

<style scoped>
form {
    width: 100%;
  }
  .login-hero {
    height: 100vh;
    width: 100%;
    display: flex;
    background: linear-gradient(to bottom left, #FFFFFF, #F1F1F1, #F1F1F1, #d3d2d2);
  }
  .login-left, .login-right-container {
    height: 100vh;
    width: 50%;
  }
  .login-right-container {
    padding: 0.5em;
  }
  .login-right {
    height: 100%;
    width: 100%;
    border-radius: 0.5em;
  }
  .login-right {
    background-color: var(--blue);
    background: linear-gradient(to top right, #003B74, #00509D, #0082FF);
  }
  .login-left {
    position: relative;
  }
  .form-center {
    height: calc(100% - 105px);
    width: 100%;
    margin-top: 105px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .form-container {
    border-radius: 14px;
    background: #FFF;
    box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.1);
    height: 70%;
    max-height: 500px;
    width: 50%;
    max-width: 360px;
    padding: 50px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    color: var(--font-color);
  }
  .login-header {
    color: var(--font-color);
    font-family: 'DM sans', sans-serif;
    height: auto;
  }
  .login-header h1 {
    margin: 0;
    font-size: 32px;  
    text-align: center;
  }
  .login-header h2 {
    margin: 0;
    font-size: 14px;
    font-weight: 400;
  
  }
  .password-input {
    margin-bottom: 0px;
    margin-top: 0.4em;
  }
  .form-button {
    width: 100%;
    padding: 0.7em 1em;
    background-color: var(--blue);
    margin-bottom: 4px;
  }
  .reset-password {
    font-size: 12px;
    margin-bottom: 15px;
    cursor: pointer;
    display: inline-block;
  }
  .signup-prompt {
    font-size: 12px;
    font-weight: 400;
    text-align: center;
  }
  .signup-prompt span {
    text-decoration: underline;
    font-weight: 600;
    cursor: pointer;
  }
  @media screen and (max-width: 1250px) {
    .form-container {
      width: 60%;
    }
  }
  @media screen and (max-width: 1100px) {
    .login-left {
      width: 100%;
    }
    .login-right {
      display: none;
    }
  }
</style>