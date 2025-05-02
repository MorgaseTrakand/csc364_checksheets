import { defineStore } from "pinia";
import { useStore } from "./checkSheetStore";

export const useUserStore = defineStore("userStore", {
    state: () => ({
        id: null,
        firstName: null,
        lastName: null,
        major_student_id: null,
        minor_student_id: null,
        major_id: null, 
        minor_id: null,
        userData: null
    }),
    actions: {
        async changeMinor(newMinorID) {
          try {
            if (this.minor_student_id) {
              await fetch(`https://checksheets.cscprof.com/minorstudents/${this.minor_student_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-token': `${localStorage.getItem('token')}`
                },
              })
            }

            let response = await fetch(`https://checksheets.cscprof.com/minorstudents`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'x-token': `${localStorage.getItem('token')}`
              },
              body: JSON.stringify({"student_id": this.id, "minor_id": newMinorID})
            })
            if (response.ok) {
              this.deleteOldClasses()
            }

          } catch (e) {
            console.error(e)
          }
        },
        async changeMajor(newMajorID) {
          try {
            if (this.major_student_id) {
              await fetch(`https://checksheets.cscprof.com/majorstudents/${this.major_student_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-token': `${localStorage.getItem('token')}`
                },
              })
            }
            
            let response = await fetch(`https://checksheets.cscprof.com/majorstudents`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'x-token': `${localStorage.getItem('token')}`
              },
              body: JSON.stringify({"student_id": this.id, "major_id": newMajorID})
            })
            if (response.ok) {
              this.deleteOldClasses()
            }
            
          } catch (e) {
            console.error(e)
          }
        },
        async deleteOldClasses() {
          const mainStore = useStore();
          let oldMajorClassesDict = mainStore.classes["major"];
          let oldMinorClassesDict = mainStore.classes["minor"];
          const oldMajorClassCodes = new Set(oldMajorClassesDict.map(cls => cls.class));
          const oldMinorClassCodes = new Set(oldMinorClassesDict.map(cls => cls.class));

          mainStore.checksheet = null;
          let studentData = await this.fetchUserData(this.id);

          await mainStore.buildCheckSheet(this.id, studentData.majors, studentData.minors)


          let checksheet = mainStore.checksheet;
          let classesMap = mainStore.classesMap;
          let majorClassesDict = mainStore.classes["major"];
          let minorClassesDict = mainStore.classes["minor"];

          const majorClassCodes = new Set(majorClassesDict.map(cls => cls.class));
          const minorClassCodes = new Set(minorClassesDict.map(cls => cls.class));

          for (const key in checksheet) {
            for (let i = 0; i < checksheet[key].length; i++) {   
              let class_code = checksheet[key][i].course.course_code  
              if ((oldMajorClassCodes.has(class_code) || oldMinorClassCodes.has(class_code)) && !majorClassCodes.has(class_code) && !minorClassCodes.has(class_code) && checksheet[key][i].grade == "Planned") {
                mainStore.removeCheckSheetValue(classesMap[class_code]["classYearSem"], checksheet[key][i])
                mainStore.removeElementFromClassesMap(class_code)
                mainStore.setClassToUntaken(class_code)
              }
            }
          }
        },
        setMajorStudentID(id) {
          this.major_student_id = id
        }, 
        setMinorStudentID(id) {
          this.minor_student_id = id
        },
        setMajor(id) {
          this.major_id = id
        },
        setMinor(id) {
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
                this.userData = studentData
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