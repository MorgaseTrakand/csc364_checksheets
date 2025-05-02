<script setup>
import ClassDropdown from '@/Components/ClassDropdown.vue';
import ChangeMajorMinorDropdown from '../../../../Components/ChangeMajorMinorDropdown.vue';
import { useStore } from '@/Stores/checkSheetStore';
import { useUserStore } from '../../../../Stores/userStore';

const store = useStore();
const userStore = useUserStore();
</script>

<template>
  <div class="required-classes-container bento">
    <div v-if="!store.checksheet" class="loading-cover">
      <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
    <div v-else>
      <div class="title-container">
        <h1>Required Classes</h1>
      </div>
      <div class="required-classes-body">
        <div class="row">
          <ClassDropdown :title="'Major Requirements'" :classesKey="'major'" ></ClassDropdown>
          <ClassDropdown :title="'Minor Requirements'" :classesKey="'minor'" ></ClassDropdown>
        </div>
        <div class="row">
          <ClassDropdown :title="'Core Requirements'" :classesKey="'core'" ></ClassDropdown>
          <ClassDropdown :title="'Electives'" :classesKey="'elective'"></ClassDropdown>
        </div>
      </div>
      <div class="title-container adjusted-title-container">
        <h1>Change Major / Minor</h1>
      </div>
      <div class="major-minor-container">
        <div class="major-minor-divider">
          <h2>Current Major: {{ userStore.userData.majors[0].major_name }}</h2>
          <ChangeMajorMinorDropdown :type="'major'"/>
        </div>
        <div class="major-minor-divider">
          <h2>Current Minor: {{ userStore.userData.minors[0].minor_name }}</h2>
          <ChangeMajorMinorDropdown :type="'minor'"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading-cover {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.required-classes-container {
  height: 100%;
  width: calc(50% - 0.5em);
  padding: 1em;
  overflow-y: auto;
}
.title-container {
  height: 6em;
  flex-direction: column;
}
.title-container h1 {
  font-size: 1.5em;
  color: var(--font-color);
  text-align: center;
}
.required-classes-body {
  display: flex;
  flex-direction: column;
  gap: 1em;
}
.row {
  display: flex;
  gap: 1em;
} 
.major-minor-container {
  display: flex;
  gap: 1em;
}
.adjusted-title-container {
  margin-bottom: -1em;
}
.major-minor-divider {
  width: calc(50% - 0.5em);
}
.major-minor-divider h2 {
  color: #565656;
  font-weight: 500;
  font-size: 0.8em;
}
.lds-ring,
.lds-ring div {
  box-sizing: border-box;
}
.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  color: #ccc;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid currentColor;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: currentColor transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>