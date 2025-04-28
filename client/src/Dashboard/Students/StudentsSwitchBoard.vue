<script setup>
import { computed } from 'vue';
import { useStore } from '@/Stores/checkSheetStore';
import { XIcon } from 'lucide-vue-next';

const store = useStore();

const errorMessage = computed(() => store.errorMessage)

function closeErrorModal() {
  store.clearErrorMessage()
}
</script>

<template>
    <div class="student-error-message" v-if="errorMessage">
      <h1>{{ errorMessage }}</h1>
      <x-icon class="x-icon" @click="closeErrorModal" :size="20"></x-icon>
    </div>
    <router-view></router-view>
</template>

<style scoped>
  .student-container {
    min-width: 100%;
    width: auto;
    height: 100%;
    height: auto;
    padding: 1em;
    position: relative;
  }
  .student-error-message {
    position: absolute;
    width: calc(100% - 2em);
    height: auto;
    border: 1px solid red;
    border-radius: 8px;
    background-color: rgb(255, 203, 203);
    z-index: 10;
    padding: 1em;
    display: flex;
    justify-content: space-between;
  }
  .student-error-message h1 {
    font-size: 1em;
    color: black;
    font-weight: 400;
  }
  .x-icon {
    cursor: pointer;
  }
</style>