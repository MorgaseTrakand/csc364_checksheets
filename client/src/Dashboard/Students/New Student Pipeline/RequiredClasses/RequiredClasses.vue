<script setup>
import ClassDropdown from '@/Components/ClassDropdown.vue';
</script>

<template>
  <div class="required-classes-container bento">
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