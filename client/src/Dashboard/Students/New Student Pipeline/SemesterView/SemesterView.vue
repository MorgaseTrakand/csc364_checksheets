<script setup>
import SemesterDropdown from '@/Components/SemesterDropdown.vue';
import { useStore } from '@/Stores/checkSheetStore';

const props = defineProps({
  firstName: String,
  lastName: String,
})

const store = useStore();

const titles = ["Transfer Credits", "Freshman Fall", "Freshman Spring", "Sophomore Fall", "Sophomore Spring", "Junior Fall", "Junior Spring", "Senior Fall", "Senior Spring"]
const courseKeys = ["Y0S0", "Y1S1", "Y1S2", "Y2S1", "Y2S2", "Y3S1", "Y3S2", "Y4S1", "Y4S2"]
</script>
 
<template>
  <div v-if="store.checksheet" class="semester-view bento">
    <div class="title-container">
      <h1>{{ props.firstName }} {{ props.lastName }}'s</h1>
      <h1>Student Course Outline</h1>
    </div>
    <div class="semester-view-body">
      <div class="transfer-semester-container">
        <SemesterDropdown :title="titles[0]" :courses='store.checksheet["Y0S0"]' :courseKey="courseKeys[0]"></SemesterDropdown>
      </div>
      <div class="row">
        <SemesterDropdown :title="titles[1]" :courses='store.checksheet["Y1S1"]' :courseKey="courseKeys[1]" ></SemesterDropdown>
        <SemesterDropdown :title="titles[2]" :courses='store.checksheet["Y1S2"]' :courseKey="courseKeys[2]" ></SemesterDropdown>
      </div>
      <div class="row">
        <SemesterDropdown :title="titles[3]" :courses='store.checksheet["Y2S1"]' :courseKey="courseKeys[3]" ></SemesterDropdown>
        <SemesterDropdown :title="titles[4]" :courses='store.checksheet["Y2S2"]' :courseKey="courseKeys[4]" ></SemesterDropdown>
      </div>
      <div class="row">
        <SemesterDropdown :title="titles[5]" :courses='store.checksheet["Y3S1"]' :courseKey="courseKeys[5]" ></SemesterDropdown>
        <SemesterDropdown :title="titles[6]" :courses='store.checksheet["Y3S2"]' :courseKey="courseKeys[6]" ></SemesterDropdown>
      </div>
      <div class="row">
        <SemesterDropdown :title="titles[7]" :courses='store.checksheet["Y4S1"]' :courseKey="courseKeys[7]" ></SemesterDropdown>
        <SemesterDropdown :title="titles[8]" :courses='store.checksheet["Y4S2"]' :courseKey="courseKeys[8]" ></SemesterDropdown>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .semester-view {
    height: 100%;
    width: calc(50% - 0.5em);
    padding: 1em;
    position: relative;
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
  .semester-view-body {
    display: flex;
    gap: 2.2em;
    flex-direction: column;
    height: calc(100% - 14em);
  }
  .transfer-semester-container {
    display: flex;
    justify-content: center;
  }
  .row {
    display: flex;
    gap: 1em;
  }
  .button-container {
    height: 4em;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .delete-button {
    border: 2px solid red;
    background-color: rgb(255, 210, 210);
    color: red;
  }
  .edit-button {
    border: 2px solid rgb(244, 244, 2);
    background-color: rgb(255, 255, 214);
    color: black;
  }
</style>