<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue';

const props = defineProps({
  majors: Array
});

watch(() => props.majors,
  (newVal) => {
    console.log(newVal[0]);
})

</script>

<template>
  <div class="majors-container">
    <div v-for="(major, index) in props.majors" :key="index">
      <input class="major-input" v-model="props.majors[index]" />
    </div>
  </div>
</template>

<style scoped>
.majors-container {
    width: 100%;
    display: flex;
}
.major-input {
    margin: 0 !important;
    width: fit-content;
}
</style>