<script setup>
import ClassDropdown from '@/Components/ClassDropdown.vue';

let dropdownTitles = ["Major Requirements", "Minor Requirements", "Core Requirements", "Electives"];
let majorClasses = [];
let minorClasses = [];
let coreClasses = [];
let electiveClasses = [];

async function getClasses() {
  try {
        let response = await fetch('https://checksheets.cscprof.com/courses/core', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-token': `${localStorage.getItem('token')}`
            },
        });
        if (response.ok) {
            let classes = await response.json()
            for (let i = 0; i < classes.length; i++) {
              let course = {
                "class": classes[i].course.course_code,
                "credits": classes[i].course.credits,
                "course_id": classes[i].course.course_id
              }
              coreClasses.push(course)
            }
        }
        response = await fetch('https://checksheets.cscprof.com/courses/major/1', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-token': `${localStorage.getItem('token')}`
            },
        });
        if (response.ok) {
            let classes = await response.json()
            classes = classes[0].courses
            for (let i = 0; i < classes.length; i++) {
              let course = {
                "class": classes[i].course_code,
                "credits": classes[i].credits,
                "course_id": classes[i].course_id
              }
              majorClasses.push(course)
            }
        }
        response = await fetch('https://checksheets.cscprof.com/courses/minor/1', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-token': `${localStorage.getItem('token')}`
            },
        });
        if (response.ok) {
            let classes = await response.json()
            classes = classes[0].courses
            for (let i = 0; i < classes.length; i++) {
              let course = {
                "class": classes[i].course_code,
                "credits": classes[i].credits,
                "course_id": classes[i].course_id
              }
              minorClasses.push(course)
            }
        }
    } catch (error) {
        console.error('Error: ', error)
    }
}
getClasses();

</script>

<template>
  <div class="required-classes-container bento">
    <div class="title-container">
      <h1>Required Classes</h1>
    </div>
    <div class="required-classes-body">
      <div class="row">
        <ClassDropdown :title="dropdownTitles[0]" :classes="majorClasses" ></ClassDropdown>
        <ClassDropdown :title="dropdownTitles[1]" :classes="minorClasses" ></ClassDropdown>
      </div>
      <div class="row">
        <ClassDropdown :title="dropdownTitles[2]" :classes="coreClasses" ></ClassDropdown>
        <ClassDropdown :title="dropdownTitles[3]" ></ClassDropdown>
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