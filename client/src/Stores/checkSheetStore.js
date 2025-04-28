import { defineStore } from "pinia";

export const useStore = defineStore("store", {
    state: () => ({
        checksheet: null,
        classesSet: null,
        currentYearSemester: null,
        errorMessage: null,
        classes: {"major": [], "minor": [], "core": [], "elective": []},
    }),
    actions: {
        async fetchClasses() {
            try {
                let majorClasses = await this.fetchMajorClasses();
                let minorClasses = await this.fetchMinorClasses();
                let coreClasses = await this.fetchCoreClasses();

                let allCourses = await this.fetchClassData('https://checksheets.cscprof.com/courses', 'elective')
                let requiredCourses = new Set()
                for (let i = 0; i < majorClasses.length; i++) {
                    requiredCourses.add(majorClasses[i].class)
                }
                for (let i = 0; i < minorClasses.length; i++) {
                    requiredCourses.add(minorClasses[i].class)
                }
                for (let i = 0; i < coreClasses.length; i++) {
                    requiredCourses.add(coreClasses[i].class)
                }
                
                let electives = [];
                for (let i = 0; i < allCourses.length; i++) {
                    if (!requiredCourses.has(allCourses[i].class)) {
                        electives.push(allCourses[i])
                    }
                }
                this.classes["elective"] = electives
            } catch (e) {
                console.error(e)
                this.setErrorMessage("Failed to load elective classes")
            }
        },
        async buildCheckSheet(id) {
            try {
                let checksheet = { Y1S1: [], Y1S2: [], Y2S1: [], Y2S2: [], Y3S1: [], Y3S2: [], Y4S1: [], Y4S2: [] };

                let response = await fetch(`https://checksheets.cscprof.com/studentcourses/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-token': `${localStorage.getItem('token')}`
                    },
                });
                if (response.ok) {
                    let responseData = await response.json()
                    let classesSet = new Set();
          
                    for (let i = 0; i < responseData.length; i++) {
                      let key = `Y${responseData[i].year}S${responseData[i].course.semester_id}`
                      classesSet.add(responseData[i].course.course_code)
                      checksheet[key].push(responseData[i])
                    }
                    this.setClassesSet(classesSet);
                    this.setCheckSheet(checksheet);
                }
              } catch (error) {
                  console.error('Error: ', error)
              }
        },
        setClasses(classesKey, courses) {
            this.classes[classesKey] = courses
        },
        async fetchClassData(endpoint, type) {
            try {
                let response = await fetch(endpoint, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-token': `${localStorage.getItem('token')}`
                    },
                });
                if (response.ok) {
                    let classes = await response.json()
                    let tempClasses = []

                    if (type != 'core' && type != 'elective') {
                        classes = classes[0].courses
                    }
                    for (let i = 0; i < classes.length; i++) {
                      if (type == 'core') {
                        classes[i] = classes[i].course
                      }
                      let course = {
                        "class": classes[i].course_code,
                        "credits": classes[i].credits,
                        "course_id": classes[i].course_id,
                        taken: this.classesSet?.has(classes[i].course_code) ? 1 : 0,
                        "type": type
                      }
                      tempClasses.push(course)
                    }
                    this.setClasses(type, tempClasses)
                    return tempClasses
                }
            } catch (e) {
                console.error(e)
                this.setErrorMessage(`Failed to load ${type} classes.`);
            }
        },
        async fetchMajorClasses() {
            return await this.fetchClassData('https://checksheets.cscprof.com/courses/major/1', 'major')
        },
        async fetchMinorClasses() {
            return await this.fetchClassData('https://checksheets.cscprof.com/courses/minor/1', 'minor')
        },
        async fetchCoreClasses() {
            return await this.fetchClassData('https://checksheets.cscprof.com/courses/core', 'core')
        },
        removeClass(course) {
            for (const key in this.classes) {
                for (let i = 0; i < this.classes[key].length; i++) {
                    if (this.classes[key][i].class == course) {
                        this.classes[key][i].taken = 0;
                    }
                }
            }
        },
        
        setCheckSheet(checksheet) {
            this.checksheet = checksheet
        },
        appendCheckSheetClass(courseKey, value) {
            this.checksheet[courseKey].push(value)
        },
        removeCheckSheetValue(courseKey, value) {
            this.checksheet[courseKey] = this.checksheet[courseKey].filter(item => {
                return item.course.course_code != value
            })
        },
        clearCheckSheet() {
            this.checksheet = null
        },

        setClassesSet(classesSet) {
            this.classesSet = classesSet
        },
        appendClassesSet(value) {
            this.classesSet.add(value)
        },
        removeElementFromClassesSet(value) {
            this.classesSet.delete(value)
        },
        clearClassesSet() {
            this.classesSet = null
        },

        setCurrentYearSemester(yearSemester) {
            this.currentYearSemester = yearSemester
        },
        clearCurrentYearSemester() {
            this.currentYearSemester = null
        },

        setErrorMessage(errorMessage) {
            this.errorMessage = errorMessage
        },
        clearErrorMessage() {
            this.errorMessage = null
        }
    }
})