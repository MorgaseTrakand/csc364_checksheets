<script setup>
import { ChevronDown, ChevronUp } from 'lucide-vue-next';
import { ref } from 'vue';
const open = ref(false)

const props = defineProps({
  index: Number,
  classObject: Object
});

function toggleDropdown() {
  open.value = !open.value
}
const emit = defineEmits(['update-grade']);

function onClick(status) {
  emit('update-grade', status.toLowerCase().replace(' ', '_')); // send the new grade up
}

const statuses = ["Completed", "Failed", "Planned", "In Progress"]
</script>

<template>
<div class="position-relative" :style="{ zIndex: 100 - props.index }">
  <div class="status-dropdown bento" >
    <div class="courses-title-container" @click="toggleDropdown" >
      <h1 class="dropdown-title">CLASS STATUS</h1>
      <ChevronDown v-if="open" />
      <ChevronUp v-else />
    </div>
    <div class="dropdown-body" v-if="open">
      <div class="dropdown-item" v-for="(status, index) in statuses" :key="index" @click="onClick(status, index)">
        <h1>{{ status }}</h1>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
  .position-relative {
    position: relative;
    width: 50%;
    height: 100%;
    margin-bottom: 0.25em;
  }
  .status-dropdown {
    height: min-content;
    border-radius: 6px;
    position: absolute;
    width: 100%;
  }
  .courses-title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding: 0 0.25em;
    gap: 1em;
  }
  .status-dropdown h1 {
    font-size: 0.8em;
    color: #565656;
    font-weight: 400;
  }
  .dropdown-body {
    padding: 0em 0.5em 0.2em 0.5em;
    max-height: 200px;
    overflow-y: auto;
    scrollbar-width: thin; /* Firefox */
    width: 100%;
  }
  .dropdown-item {
    height: 2.5em;
    border-top: 1px solid #A2A2A2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    background-color: white;
  }
  .dropdown-item h1 {
    font-size: 0.8em;
    font-weight: 500;
  }
</style>