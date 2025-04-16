<script setup>

</script>

<template>
  <div class="semester-view bento">
    <div class="title-container">
      <h1>Semester View</h1>
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
</style>