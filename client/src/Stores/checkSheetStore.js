import { defineStore } from "pinia";

export const useStore = defineStore("store", {
    state: () => ({
        checksheet: null,
        classesMap: null,
        prereqMap: {},
        currentYearSemester: null,
        errorMessage: null,
        classes: { major: [], minor: [], core: [], elective: [] },
    }),
    actions: {
        checkPrereqs(prereqs) {
            for (let i = 0; i < prereqs.length; i++) {
                if (!(prereqs[i].course_code in this.classesMap)) {
                    this.errorMessage = `Prereq course ${prereqs[i].course_code} not taken`;
                    return false
                } else if (this.classesMap[prereqs[i].course_code].classYearSem > this.currentYearSemester) {
                    this.errorMessage = `Prereq course ${prereqs[i].course_code} is planned after current semester, please take prereq first.`
                    return false
                } else if (this.classesMap[prereqs[i].course_code].classYearSem == this.currentYearSemester) {
                    this.errorMessage = `Prereq course ${prereqs[i].course_code} is planned during this semester, please take prereq first.`
                    return false
                }
            } 
            return true
        },
        async addOrUpdateClass(id, classObject) {
            let course_ID = classObject.course_id;
            let course_name = classObject.class;
            let pk_ID = classObject.pk_id;

            if (!this.checkPrereqs(this.prereqMap[course_name])) {
                return false
            }

            const [yearPrefix, semesterPrefix] = this.currentYearSemester.split('S');
            const year = parseInt(yearPrefix.slice(1));
            const semester = parseInt(semesterPrefix);

            if (this.classesMap && course_name in this.classesMap) {
                try {
                    await fetch('https://checksheets.cscprof.com/studentcourses', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-token': `${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify({
                            course_student_id: pk_ID,
                            year: year,
                            semester_id: semester
                        })
                    });
                    this.filterCheckSheetValue(classObject.class, this.classesMap[classObject.class].classYearSem)
                    return true
                } catch (e) {
                    console.error(e);
                    this.setErrorMessage("Failed to update class");
                    return false
                }
            } else {
                try {
                    let response = await fetch('https://checksheets.cscprof.com/studentcourses', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-token': `${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify({
                            student_id: id,
                            course_id: course_ID,
                            year: year,
                            semester_id: semester,
                            grade: "Planned"
                        })
                    });
                    let course_student_id = -1
                    if (response.ok) {
                        course_student_id = await response.json()
                    }
                    this.classesMap[course_name] = {course_student_id: course_student_id, classYearSem: this.currentYearSemester};
                    return true
                } catch (e) {
                    console.error(e);
                    this.setErrorMessage("Failed to assign class");
                }
            }
        },

        async fetchClasses(major, minor) {
            try {
                let majorClasses = await this.fetchMajorClasses(major);
                let minorClasses = await this.fetchMinorClasses(minor);
                let coreClasses = await this.fetchCoreClasses();

                let allCourses = await this.fetchClassData('https://checksheets.cscprof.com/courses', 'elective');
                let requiredCourses = new Set();

                for (let i = 0; i < majorClasses.length; i++) {
                    requiredCourses.add(majorClasses[i].class);
                }
                for (let i = 0; i < minorClasses.length; i++) {
                    requiredCourses.add(minorClasses[i].class);
                }
                for (let i = 0; i < coreClasses.length; i++) {
                    requiredCourses.add(coreClasses[i].class);
                }

                let electives = [];
                for (let i = 0; i < allCourses.length; i++) {
                    if (!requiredCourses.has(allCourses[i].class)) {
                        electives.push(allCourses[i]);
                    }
                }
                this.classes.elective = electives;
            } catch (e) {
                console.error(e);
                this.setErrorMessage("Failed to load elective classes");
            }
        },

        async buildCheckSheet(id, major, minor) {
            try {
                let checksheet = { Y0S0: [], Y1S1: [], Y1S2: [], Y2S1: [], Y2S2: [], Y3S1: [], Y3S2: [], Y4S1: [], Y4S2: [] };

                let response = await fetch(`https://checksheets.cscprof.com/studentcourses/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-token': `${localStorage.getItem('token')}`
                    },
                });

                if (response.ok) {
                    let responseData = await response.json();
                    let classesMap = {};

                    for (let i = 0; i < responseData.length; i++) {
                        let key = `Y${responseData[i].year}S${responseData[i].semester_id}`;
                        classesMap[responseData[i].course.course_code] = {course_student_id: responseData[i].course_student_id, classYearSem: key};
                        checksheet[key].push(responseData[i]);
                    }

                    this.setClassesMap(classesMap);
                    this.setCheckSheet(checksheet);
                    await this.fetchClasses(major, minor);
                }
            } catch (error) {
                console.error('Error: ', error);
            }
        },

        setClasses(classesKey, courses) {
            this.classes[classesKey] = courses;
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
                    let classes = await response.json();
                    let tempClasses = [];

                    if (type !== 'core' && type !== 'elective') {
                        classes = classes[0].courses;
                    }

                    for (let i = 0; i < classes.length; i++) {
                        if (type === 'core') {
                            classes[i] = classes[i].course;
                        }
                        let course = {
                            class: classes[i].course_code,
                            credits: classes[i].credits,
                            course_id: classes[i].course_id,
                            taken: this.classesMap?.[classes[i].course_code] ? 1 : 0,
                            type: type,
                            pk_id: this.classesMap?.[classes[i].course_code] ? this.classesMap[classes[i].course_code].course_student_id : null
                        };
                        this.prereqMap[classes[i].course_code] = classes[i].prereqs
                        tempClasses.push(course);
                    }
                    this.setClasses(type, tempClasses);
                    return tempClasses;
                }
            } catch (e) {
                console.error(e);
                this.setErrorMessage(`Failed to load ${type} classes.`);
            }
        },

        async fetchMajorClasses(major) {
            let major_id = major[0].major_id
            return await this.fetchClassData(`https://checksheets.cscprof.com/courses/major/${major_id}`, 'major');
        },

        async fetchMinorClasses(minor) {
            let minor_id = minor[0].minor_id
            return await this.fetchClassData(`https://checksheets.cscprof.com/courses/minor/${minor_id}`, 'minor');
        },

        async fetchCoreClasses() {
            return await this.fetchClassData('https://checksheets.cscprof.com/courses/core', 'core');
        },

        setClassToUntaken(course) {  
            for (const key in this.classes) {
                for (let i = 0; i < this.classes[key].length; i++) {
                    if (this.classes[key][i].class === course) {
                        this.classes[key][i].taken = 0;
                    }
                }
            }
        },

        setCheckSheet(checksheet) {
            this.checksheet = checksheet;
        },

        appendCheckSheetClass(courseKey, value) {
            this.checksheet[courseKey].push(value);
        },

        async removeCheckSheetValue(courseKey, courseObject) {
            let value = courseObject.course.course_code
            let pk_ID = courseObject.course_student_id
            
            try {
                let response = await fetch(`https://checksheets.cscprof.com/studentcourses/${pk_ID}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-token': `${localStorage.getItem('token')}`
                    },
                });
                this.filterCheckSheetValue(value, courseKey)
            } catch (e) {
                console.error(e)
                this.setErrorMessage("Unable to delete class")
            }
        },
        filterCheckSheetValue(value, courseKey) {
            this.checksheet[courseKey] = this.checksheet[courseKey].filter(item => {
                return item.course.course_code !== value;
            });
        },
        clearCheckSheet() {
            this.checksheet = null;
        },

        setClassesMap(classesMap) {
            this.classesMap = classesMap;
        },

        removeElementFromClassesMap(value) {
            delete this.classesMap[value];
        },

        setCurrentYearSemester(yearSemester) {
            this.currentYearSemester = yearSemester;
        },

        clearCurrentYearSemester() {
            this.currentYearSemester = null;
        },

        setErrorMessage(errorMessage) {
            this.errorMessage = errorMessage;
        },
        clearErrorMessage() {
            this.errorMessage = null;
        },
        async updateCourseGrade(course_student_id, newGrade) {
            try {
                await fetch('https://checksheets.cscprof.com/studentcourses', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-token': `${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        course_student_id,
                        grade: newGrade
                    })
                });
            } catch (e) {
                console.error(e);
                this.setErrorMessage("Failed to update grade");
            }
        },
        async setStudentMajor(studentID, majorID) {
            try {
                await fetch('https://checksheets.cscprof.com/majorstudents', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-token': `${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        "student_id": studentID, 
                        "major_id": majorID
                    })
                });
            } catch (e) {
                console.error(e)
            }
        },
        async setStudentMinor(studentID, minorID) {
            try {
                await fetch('https://checksheets.cscprof.com/minorstudents', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-token': `${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        "student_id": studentID, 
                        "minor_id": minorID
                    })
                });
            } catch (e) {
                console.error(e)
            }
        }
    }
});
