<script setup>
import { ChevronRight } from 'lucide-vue-next';
import { ref } from 'vue'

const props = defineProps({
  title: String
})
const open = ref(false)

function toggleDropdown() {
  open.value = !open.value
}
</script>

<template>
<div class="class-dropdown bento" >
  <div class="title-container" @click="toggleDropdown" >
    <h1 class="dropdown-title">{{ props.title }}</h1>
    <ChevronRight />
  </div>
</div>
</template>

<style>
  .class-dropdown {
    height: min-content;
    width: calc(50% - 0.5em);
    border-radius: 6px;
  }
  .title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding: 0.75em 0.5em 0.75em 0.5em;
  }
  .class-dropdown h1 {
    font-size: 1em;
    color: var(--font-color);
    font-weight: 600;
  }
</style>