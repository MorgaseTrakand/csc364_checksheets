import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
    state: () => ({
        id: null,
        firstName: null,
        lastName: null,
        major_student_id: null,
        minor_student_id: null
    }),
    actions: {
        async changeMajor(newMajorID) {
          let response = '';
          try {
            if (this.minor_student_id) {
              response = await fetch(`https://checksheets.cscprof.com/majorstudents/${this.major_student_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-token': `${localStorage.getItem('token')}`
                },
              })
              if (response.ok) {
                console.log("major deleted")
              }
            }
            
            response = await fetch(`https://checksheets.cscprof.com/majorstudents`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'x-token': `${localStorage.getItem('token')}`
              },
              body: JSON.stringify({"student_id": this.id, "major_id": newMajorID})
            })
            if (response.ok) {
              console.log("new major added")
            }
            
          } catch (e) {

          }
        },
        setMajorStudentID(id) {
          this.major_id = id
        }, 
        setMinorStudentID(id) {
          this.minor_id = id
        },
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
                if (studentData.majors[0]) {
                  this.major_student_id = studentData.majors[0].pivot.major_student_id;
                }
                if (studentData.minors[0]) {
                  this.minor_student_id = studentData.minors[0].pivot.minor_student_id;
                }
                return studentData
              }
          } catch (error) {
            console.error('Error:', error);
          }  
        }
    }
})