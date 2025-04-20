import { defineStore } from "pinia";

export const useStore = defineStore("store", {
    state: () => ({
        id: null,
        checksheet: null
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
        }
    }
})