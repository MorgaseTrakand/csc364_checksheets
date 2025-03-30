  <script setup>
  import { defineProps, defineEmits, ref, watch } from 'vue';
  import { ChevronDown } from 'lucide-vue-next';
  import { CirclePlus, CircleMinus } from 'lucide-vue-next';

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
    if (newMajors.value.length < 2) {
      newMajors.value.push(1)
    }
  }
  function removeMajor() {
    newMajors.value.pop()
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
    <div class="main-container">
      <div class="majors-container" v-for="(major, index) in localMajors" :key="index" >
        <input class="major-input" v-model="localMajors[index].major_abbreviation" :size="localMajors[index]?.length || 1"/>
        <div class="dropdown-container" v-for="(newMajor, index) in newMajors" :key="index" >
          <o-dropdown>
            <template #trigger>
                <button class="dropdown-trigger">
                  <div class="dropdown-button-container">
                    <h1>Choose Major</h1>
                    <ChevronDown :size="20" :stroke-width="3" />
                  </div>
                </button>
            </template>
            <o-dropdown-item v-for="(majorName, index) in majorData.value" :key="index" label="Action" />
          </o-dropdown>
        </div>
      </div>
      <div class="button-container">
        <button @click="addMajor" class="add-major-button"><CirclePlus :size="20" /></button>
        <button @click="removeMajor" class="remove-major-button"><CircleMinus :size="20" /></button>
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
  .add-major-button, .remove-major-button {
    color: var(--font-color);
    display: flex;
    align-items: center;
  }
  .add-major-button {
    border: 2px solid rgb(244, 244, 2);
    background-color: rgb(255, 255, 214);
  }
  .remove-major-button {
    border: 2px solid red;
    background-color: rgb(255, 181, 181);
  }
  .dropdown-trigger { 
    padding: 0.5em 0.75em;
    background-color: white;
    border: 2px solid #E0E0E0;
    color: var(--font-color);
  }
  .dropdown-trigger h1 {
    font-weight: 500;
  }
  .dropdown-trigger h1 {
    font-size: 1em;
  }
  .dropdown-button-container {
    display: flex;
    gap: 0.1em;
  }
  .dropdown-container {
    width: 100%;
  }
  .button-container {
    display: flex;
    gap: 0.5em;
  }
  </style>