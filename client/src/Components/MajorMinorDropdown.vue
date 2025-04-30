<script setup>
import { ChevronDown, ChevronUp } from 'lucide-vue-next';
import { ref } from 'vue'
import { useStore } from '@/Stores/checkSheetStore';
import { useUserStore } from '@/Stores/userStore';
import { onMounted } from 'vue';

const store = useStore();
const userStore = useUserStore();
const selectedValue = ref('');

const props = defineProps({
  type: String,
  isInvalid: Boolean
})

const major_minor_arr = ref([]);
const open = ref(false)

onMounted(async () => {
  try {
    let response = await fetch(`https://checksheets.cscprof.com/${props.type}s`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-token': `${localStorage.getItem('token')}`
        },
    });
    if (response.ok) {
      major_minor_arr.value = await response.json()
    }
  } catch (e) {
    console.error(e)
    store.setErrorMessage(`Failed to get ${props.type}`)
  }
})

function toggleDropdown() {
  open.value = !open.value
}

async function onClick(majorMinor, index) {
  if (props.type == 'major') {
    userStore.setMajor(majorMinor.major_id)
    selectedValue.value = majorMinor.major_name
  } else {
    userStore.setMinor(majorMinor.minor_id)
    selectedValue.value = majorMinor.minor_name
  }
  open.value = false;
}
</script>

<template>
<div class="class-dropdown bento" :class="{ 'error-border': props.isInvalid }">
  <div class="courses-title-container" @click="toggleDropdown" >
    <h1 v-if="!selectedValue" class="dropdown-title">Select {{ props.type }}</h1>
    <h1 v-else>{{ selectedValue }}</h1>
    <ChevronDown v-if="open" />
    <ChevronUp v-else />
  </div>
  <div class="dropdown-body" v-if="open" >
    <div class="dropdown-item"v-for="(c, index) in major_minor_arr" :key="index" @click="onClick(c, index)">
      <h1 v-if="c['major_name']">{{ c["major_name"] }}</h1>
      <h1 v-if="c['minor_name']">{{ c["minor_name"] }}</h1>
    </div>
  </div>
</div>
</template>

<style scoped>
  .loading {
    pointer-events: none;
    opacity: 0.5;
  }
  .class-dropdown {
    height: min-content;
    width: calc(50% - 0.5em);
    border-radius: 6px;
  }
  .courses-title-container {
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
  .dropdown-body {
    padding: 0em 0.5em 0.2em 0.5em;
    max-height: 200px;
    overflow-y: auto;
    scrollbar-width: thin; /* Firefox */
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
  .error-border {
    border: 1px solid red;
  }
</style>