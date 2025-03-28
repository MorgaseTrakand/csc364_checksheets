  <script setup>
  import { defineProps, defineEmits, ref, watch } from 'vue';
  import { ChevronDown } from 'lucide-vue-next';

  const props = defineProps({
    majors: Array
  });

  const localMajors = ref([]);
  const majorData = ref([]);
  const newMajors = ref([]);

  watch(() => props.majors,
    (newVal) => {
      localMajors.value = [...newVal]
  })

  function addMajor() {
    newMajors.value.push(1)
  }

  async function grabMajorData() {
      try {
          const response = await fetch('https://checksheets.cscprof.com/majors', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              },
          });
          if (response.ok) {
              const result = await response.json();
              
              majorData.value = result; 
          }
      } catch (error) {
          console.error('Error:', error);
      }
  }

  grabMajorData();
  </script>

  <template>
    <div class="majors-container">
      <div v-for="(major, index) in localMajors" :key="index" >
        <input class="major-input" v-model="localMajors[index].major_abbreviation" :size="localMajors[index]?.length || 1"/>
      </div>
      <!-- <o-dropdown>
          <template #trigger>
              <button class="dropdown-trigger">
                <div class="dropdown-button-container">
                  <ChevronDown :size="20" :stroke-width="3" />
                  <h1>Choose Major</h1>
                </div>
              </button>
          </template>
          <o-dropdown-item label="Action" />
      </o-dropdown> -->
      <div v-for="(newMajor, index) in newMajors" :key="index" >
        <o-dropdown>
          <template #trigger>
              <button class="dropdown-trigger">
                <div class="dropdown-button-container">
                  <ChevronDown :size="20" :stroke-width="3" />
                  <h1>Choose Major</h1>
                </div>
              </button>
          </template>
          <o-dropdown-item label="Action" />
        </o-dropdown>
      </div>
      <button @click="addMajor" class="add-major-button">Add Major</button>
    </div>
  </template>

  <style scoped>
  .majors-container {
      width: 100%;
      display: flex;
      justify-content: space-between;
  }
  .major-input {
      margin: 0 !important;
      width: fit-content;
      padding: 0 1em;
  }
  .add-major-button {
    border: 2px solid rgb(244, 244, 2);
    background-color: rgb(255, 255, 214);
    color: black;
  }
  .dropdown-trigger { 
    height: 100%;
    padding: 0.5em 0.75em;
    background-color: white;
    border: 2px solid #E0E0E0;
    color: black;
  }
  .dropdown-trigger h1 {
    font-size: 1em;
  }
  .dropdown-button-container {
    display: flex;
    gap: 0.1em;
  }
  </style>