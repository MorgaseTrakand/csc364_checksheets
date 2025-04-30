import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
    state: () => ({
        id: null,
        firstName: null,
        lastName: null
    }),
    actions: {
        async fetchUserData(id) {
          this.id = id;
          try {
            const response = await fetch(`https://checksheets.cscprof.com/students/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-token': `${localStorage.getItem('token')}`
                },
              });
              if (response.ok) {
                let studentData = await response.json();
                this.firstName = studentData.firstname;
                this.lastName = studentData.lastname;
                return studentData
              }
          } catch (error) {
            console.error('Error:', error);
          }  
        }
    }
})