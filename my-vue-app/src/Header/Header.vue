<script setup>

</script>

<template>
  <header>
      <a href='/'><h1 className='logo'>Check<span className='yellow-highlight'>Sheets</span></h1></a>
      <div className='right'>
        <a href='/login'><button className='login-button'>Login</button></a>
        <a href='/signup'><button className='signup-button'>Signup</button></a>
      </div>
    </header>
</template>

<style scoped>
header {
  width: 95%;
  height: 65px;
  margin: 20px 2.5%;
  border-radius: 14px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: 0px 1px 4px 1px rgba(0, 0, 0, 0.1);
}
.logo {
  color: var(--blue);
  font-family: "DM Sans";
  font-size: 1.8em;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  letter-spacing: -0.96px;
  cursor: pointer;
}
button {
  font-family: 'DM Sans';
  font-size: 1em;
}
.login-button {
  background-color: white;
  border: 1px solid rgb(159, 159, 159);
  margin-right: 10px;
  color: var(--font-color);
}
.login-button:focus {
  outline: var(--blue) 2px solid;
  border: none;
}
.login-button:hover {
  outline: none;
}
.signup-button {
  background-color: var(--blue);
}
.signup-button:focus {
  border: none;
  outline: none;
}
</style>
