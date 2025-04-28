<script setup>
import ClassDropdown from '@/Components/ClassDropdown.vue';
import { useStore } from '@/Stores/piniaStore';
import { onMounted } from 'vue';

const store = useStore();

let dropdownTitles = ["Major Requirements", "Minor Requirements", "Core Requirements", "Electives"];

onMounted(() => {
  store.fetchCoreClasses();
  store.fetchMinorClasses();
  store.fetchMajorClasses();
})

</script>

<template>
  <div class="required-classes-container bento">
    <div class="title-container">
      <h1>Required Classes</h1>
    </div>
    <div class="required-classes-body">
      <div class="row">
        <ClassDropdown :title="dropdownTitles[0]" :classesKey="'major'" ></ClassDropdown>
        <ClassDropdown :title="dropdownTitles[1]" :classesKey="'minor'" ></ClassDropdown>
      </div>
      <div class="row">
        <ClassDropdown :title="dropdownTitles[2]" :classesKey="'core'" ></ClassDropdown>
        <!-- <ClassDropdown :title="dropdownTitles[3]" :classes="[]"></ClassDropdown> -->
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