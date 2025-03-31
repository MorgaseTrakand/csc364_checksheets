<script setup>
import { ref } from 'vue';

const studentCreated = ref(false);


// try {
//     const response = await fetch('https://checksheets.cscprof.com/students', {
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
    <template v-if="studentCreated == true">
      <div class="class-list-component bento">

      </div>
      <div class="semester-list-component bento">

      </div>
    </template>
    <div v-else class="onboarding bento">

    </div>
</template>

<style scoped>
    .class-semester-components {
      width: 100%;
    }
    .class-list-component, .semester-list-component {
        height: 100%;
        width: calc(50% - 0.5em);
    }
    .onboarding {
      width: 100%;
      height: 100%;
    }
</style>