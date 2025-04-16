<script setup>
import ClassDropdown from '../../../Components/ClassDropdown.vue';

let MajorTitle = "Major Requirements";
let MajorClasses = [{"class": "Frontend Applications", "credits": "3"}, {"class": "Senior Project", "credits": "3"}, {"class": "Frontend Applications", "credits": "3"}, {"class": "Senior Project", "credits": "3"}]
</script>

<template>
  <div class="required-classes-container bento">
    <div class="title-container">
      <h1>Required Classes</h1>
    </div>
    <div class="required-classes-body">
      <div class="row">
        <ClassDropdown :title="MajorTitle" :classes="MajorClasses"></ClassDropdown>
        <ClassDropdown ></ClassDropdown>
      </div>
      <div class="row">
        <ClassDropdown ></ClassDropdown>
        <ClassDropdown ></ClassDropdown>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .required-classes-container {
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
  .required-classes-body {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
  .row {
    display: flex;
    gap: 1em;
  }
</style>