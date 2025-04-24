import { defineStore } from "pinia";

export const useStore = defineStore("store", {
    state: () => ({
        id: null,
        checksheet: null,
        classesSet: null,
        currentYearSemester: null,
        errorMessage: null,
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
        clearCheckSheet() {
            this.checksheet = null
        },

        setClassesSet(classesSet) {
            this.classesSet = classesSet
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