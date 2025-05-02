<script setup>
import { ChevronDown, ChevronUp } from 'lucide-vue-next';
import { ref } from 'vue'
import { useStore } from '@/Stores/checkSheetStore';
import { useUserStore } from '@/Stores/userStore';
import { onMounted } from 'vue';

const store = useStore();
const userStore = useUserStore();
const selectedValue = ref('');
const newMajorMinorID = ref(-1);

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
    selectedValue.value = majorMinor.major_name
    newMajorMinorID.value = majorMinor.major_id
  } else {
    selectedValue.value = majorMinor.minor_name
    newMajorMinorID.value = majorMinor.minor_id
  }
  open.value = false;
}

function handleChange() {
  if (props.type == 'major') {
    userStore.changeMajor(newMajorMinorID.value)
  } else {
    userStore.changeMinor(newMajorMinorID.value)
  }
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
  <button class="change-mm-button" @click="handleChange()" :class="{ 'disabled-button': !selectedValue }" >Change Minor</button>
</template>

<style scoped>
  .loading {
    pointer-events: none;
    opacity: 0.5;
  }
  .class-dropdown {
    height: min-content;
    width: 100%;
    border-radius: 6px;
    margin-bottom: 0.5em;
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
  .change-mm-button {
    border: 2px solid rgb(244, 244, 2);
    background-color: rgb(255, 255, 214);
    color: black;
  }
  .disabled-button {
    opacity: 0.4;
    pointer-events: none;
  }
</style>