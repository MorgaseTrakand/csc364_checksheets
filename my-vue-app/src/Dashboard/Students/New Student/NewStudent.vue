<script setup>
// try {
//     const response = await fetch('http://checksheets.cscprof.com/students', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'x-token': `${sessionStorage.getItem('token')}`
//           },
//       });
//       if (response.ok) {
//         console.log(response)
//       }
//   } catch (error) {
//     console.error('Error:', error);
// }
</script>

<template>
  <div class="class-list-component bento">
  </div>
  <div class="semester-list-component bento"></div>
</template>

<style scoped>
    .class-list-component, .semester-list-component {
        height: 100%;
        width: calc(50% - 0.5em);
    }
</style>