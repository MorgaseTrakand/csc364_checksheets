export function combineMajors(majors, temp=1) {
    let res = ""
    if (!majors) {
        return res
    }

    for (let i = 0; i < majors.length; i++) {
        if (i+1 < majors.length) {
            res+=majors[i].major_abbreviation+", "
        }
        else {
            res+=majors[i].major_abbreviation
        }
    }
    if (temp == 0) {
        console.log(res)
    }
    return res
}

export const isActive = (value) => value === 1;