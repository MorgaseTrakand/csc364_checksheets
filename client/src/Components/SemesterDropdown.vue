<script setup>
import { ChevronRight, ChevronLeft, XIcon, CalendarPlus2 } from 'lucide-vue-next';
import { ref, computed } from 'vue';
import { useStore } from '@/Stores/checkSheetStore';
import StatusDropdown from './StatusDropdown.vue';

const store = useStore();
const props = defineProps({
  title: String,
  courses: Array,
  courseKey: String
})

function gradeClass(grade) {
  if (!grade) return '';

  grade = grade.toLowerCase();

  switch (grade) {
    case 'planned':
      return 'status-planned';
    case 'in_progress':
      return 'status-in-progress';
    case 'completed':
      return 'status-passed';
    case 'failed':
      return 'status-failed';
    default:
      return 'status-unknown';
  }
}

const open = ref(false)
const classesTitles = ["CLASS 1", "CLASS 2", "CLASS 3", "CLASS 4", "CLASS 5", "CLASS 6"]

const emptyRows = computed(() => {
  return props.courses ? Math.max(6 - props.courses.length, 0) : 6;
})

function openDropdown() {
  store.setCurrentYearSemester(props.courseKey)
  open.value = true
}

function closeDropdown() {
  store.clearCurrentYearSemester()
  open.value = false
}

function removeClass(course) {
  store.removeElementFromClassesMap(course.course.course_code)
  store.removeCheckSheetValue(props.courseKey, course)
  store.setClassToUntaken(course.course.course_code)
}
</script>

<template>
<div v-if="open" class="position-absolute bento">
  <div class="title-container">
      <div class="back-button bento" @click="closeDropdown">
        <ChevronLeft size="28"></ChevronLeft>
      </div>
      <h1>{{ props.title }}</h1>
      <div></div>
  </div>
  <div class="modal-body">
    <div v-for="(course, index) in props.courses" :key="index" class="one-em-margin" >
      <div class="justify-space-between">
        <label>{{ classesTitles[index] }}</label>
        <StatusDropdown 
          :index="index" 
          :classObject="course"   
          :courseGrade="course.grade"
          @update-grade="(newGrade) => course.grade = newGrade"
        />
      </div>
      <div class="position-relative">
        <input :value="course.course.course_code" type="text" placeholder="Course Name" :class="gradeClass(course.grade)"/>
        <div class="icon-container">
          <XIcon class="x-icon" @click="removeClass(course)" :size="20"></XIcon>
        </div>
      </div>
    </div>
    
    <div v-for="n in emptyRows" :key="'empty-' + n" class="one-em-margin">
      <label>{{ classesTitles[props.courses.length + n - 1] }}</label>
      <input type="text" placeholder="Course Name" />
    </div>
  </div>
</div>
<div class="class-dropdown bento" >
  <div class="dropdown-title-container" @click="openDropdown" >
    <h1 class="dropdown-title">{{ props.title }}</h1>
    <ChevronRight />
  </div>
</div>
</template>

<style scoped>
  input {
    height: 3.5em;
    margin: 0 !important;
  }
  .justify-space-between {
    display: flex;
    justify-content: space-between;
    align-items: end;
    position: relative;
    height: 1.5em;
  }
  .x-icon {
    cursor: pointer;
    margin-left: 0.5em;
  }
  .position-relative {
    position: relative;
  }
  .one-em-margin {
    margin-bottom: 0.5em;
  }
  label {
    color: #565656;
    font-weight: 400;
  }
  .class-dropdown {
    height: min-content;
    width: calc(50% - 0.5em);
    border-radius: 6px;
  }
  .dropdown-title-container {
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
  .position-absolute {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border: none;
    z-index: 9;
    padding: 1em;
    display: flex;
    flex-direction: column;
  }
  .title-container {
    height: 6em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2em;
  }
  .title-container h1 {
    font-size: 1.5em;
    color: var(--font-color);
    text-align: center;
  }
  .back-button {
    height: 3em;
    width: 3em;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid rgb(218, 218, 218);
    cursor: pointer;
  }
  .modal-body {
    flex: 1;
    width: 100%;
    padding: 0 2em;
  }
  .icon-container {
    height: 100%;
    position: absolute;
    top: 50%;
    right: 0.5em;
    transform: translateY(-50%);  
    display: flex;
    align-items: center;
  }
  .status-planned {
    background-color: rgb(210, 255, 251);
    border: 1px solid turquoise
  }
  .status-in-progress {
    background-color: rgb(255, 255, 230);
    border: 1px solid yellow
  }
  .status-passed {
    background-color: #e2ffe2;
    border: 1px solid green
  }
  .status-failed {
    background-color: rgb(252, 230, 230);
    border: red 1px solid;
  }
</style>