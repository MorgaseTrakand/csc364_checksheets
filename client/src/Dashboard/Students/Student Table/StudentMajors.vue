  <script setup>
  import { defineProps, ref, watch } from 'vue';

  const props = defineProps({
    majors: Array,
    id: Number
  });

  const localMajors = ref([]);

  watch(() => props.majors,
    (newVal) => {
      localMajors.value = [...newVal]
  })

  </script>

  <template>
    <div class="main-container">
      <div class="majors-container" v-for="(major, index) in localMajors" :key="index" >
        <input class="major-input" v-model="localMajors[index].major_abbreviation" :size="localMajors[index]?.length || 1"/>
      </div>
      <div class="button-container">
        <a :href="`/dashboard/students/edit-student-classes?id=${props.id}`">
          <button class="change-major-button">Change Majors</button>
        </a>
      </div>
    </div>
  </template>

  <style scoped>
  input, button {
    height: 3em;
  }
  .main-container {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 1em;
  }
  .majors-container {
    display: flex;
    gap: 0.5em;
    flex-wrap: wrap;
  }
  .major-input {
      margin: 0 !important;
      width: fit-content;
      padding: 0 1em;
  }
  .change-major-button {
    border: 2px solid rgb(244, 244, 2);
    background-color: rgb(255, 255, 214);
    color: black;
  }
  .button-container {
    display: flex;
    gap: 0.5em;
  }
  </style>