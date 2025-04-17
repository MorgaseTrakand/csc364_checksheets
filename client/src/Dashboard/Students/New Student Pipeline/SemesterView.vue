<script setup>
import SemesterDropdown from '../../../Components/SemesterDropdown.vue';

const firstName = localStorage.getItem('firstname');
const lastName = localStorage.getItem('lastname');

const titles = ["Transfer", "Freshman Fall", "Freshman Spring"]
</script>

<template>
  <div class="semester-view bento">
    <div class="single-semester-view">
      <div class="title-container">
        <h1>{{titles[1]}}</h1>
      </div>
    </div>
    <div class=""></div>
    <div class="title-container">
      <h1>{{ firstName }} {{ lastName }}'s</h1>
      <h1>Student Course Outline</h1>
    </div>
    <div class="semester-view-body">
      <div class="transfer-semester-container">
        <SemesterDropdown :title="titles[1]"></SemesterDropdown>
      </div>
      <div class="row">
        <SemesterDropdown :title="titles[1]"></SemesterDropdown>
        <SemesterDropdown :title="titles[1]"></SemesterDropdown>
      </div>
      <div class="row">
        <SemesterDropdown :title="titles[1]"></SemesterDropdown>
        <SemesterDropdown :title="titles[1]"></SemesterDropdown>
      </div>
      <div class="row">
        <SemesterDropdown :title="titles[1]"></SemesterDropdown>
        <SemesterDropdown :title="titles[1]"></SemesterDropdown>
      </div>
      <div class="row">
        <SemesterDropdown :title="titles[1]"></SemesterDropdown>
        <SemesterDropdown :title="titles[1]"></SemesterDropdown>
      </div>
    </div>
    <div class="button-container">
      <button>Edit</button>
      <button>Delete</button>
    </div>
  </div>
</template>

<style scoped>
  .semester-view {
    height: 100%;
    width: calc(50% - 0.5em);
    padding: 1em;
  }
  .title-container {
    height: 6em;
    display: flex;
    justify-content: start;
    align-items: center;
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
    height: calc(100% - 10em);
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
</style>