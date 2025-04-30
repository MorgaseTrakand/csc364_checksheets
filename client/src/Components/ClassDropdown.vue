<script setup>
import { ChevronDown, ChevronUp } from 'lucide-vue-next';
import { ref, watch, computed } from 'vue'
import { useStore } from '@/Stores/checkSheetStore';
import { useUserStore } from '@/Stores/userStore';

const store = useStore();
const userStore = useUserStore();

const disabled = ref(false);

const props = defineProps({
  title: String,
  classesKey: String,
})

let localClasses = computed(() => store.classes[props.classesKey]);

const open = ref(false)

function toggleDropdown() {
  open.value = !open.value
}

async function onClick(course, index) {
  if (disabled.value) return;

  disabled.value = true;

  if (store.currentYearSemester == null) {
    store.setErrorMessage('Please select a semester to insert class into.')
  } else {
    const alreadyExists = store.checksheet[store.currentYearSemester].some(
      item => item.course.course_code === course.class
    );
    if (alreadyExists) {
      store.setErrorMessage('Class already set for this semester')
    } else {
      let value = await store.addOrUpdateClass(userStore.id, localClasses.value[index]) 
      if(value) {
        store.appendCheckSheetClass(store.currentYearSemester, {"course": {"course_code": course.class}})
        localClasses.value[index].taken = 1;
      }
    }
  }
  disabled.value = false
}
</script>

<template>
<div class="class-dropdown bento" >
  <div class="courses-title-container" @click="toggleDropdown" >
    <h1 class="dropdown-title">{{ props.title }}</h1>
    <ChevronDown v-if="open" />
    <ChevronUp v-else />
  </div>
  <div class="dropdown-body" v-if="open" :class="{ 'loading': disabled }" >
    <div class="h2-container">
      <h2>Class</h2>
      <h2>Credits</h2>
    </div>
    <div class="dropdown-item" :class="{ 'taken-class': c.taken == 1 }" v-for="(c, index) in localClasses" :key="index" @click="onClick(c, index)">
      <h1>{{ c["class"] }}</h1>
      <h1>{{ c["credits"] }}</h1>
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
  .taken-class {
    position: relative;
  }
  .taken-class h1 {
    opacity: 0.25;
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
  .h2-container {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #A2A2A2;
    align-items: center;
    height: 2em;
  }
  .class-dropdown h2 {
    font-size: 0.75em;
    color: #565656;
    font-weight: 500;
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