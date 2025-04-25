import { defineStore } from "pinia";

export const useStore = defineStore("store", {
    state: () => ({
        id: null,
        checksheet: null,
        classesSet: null,
        currentYearSemester: null,
        errorMessage: null,
        majorClasses: null,
    }),
    actions: {
        setID(newID) {
            this.id = newID
        },
        clearID() {
            this.id = null;
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