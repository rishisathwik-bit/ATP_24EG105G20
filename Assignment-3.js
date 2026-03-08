/*Assignment 3: Student Marks List
--------------------------------
Scenario : You receive marks from an exam system.

Test data:
const marks = [78, 92, 35, 88, 40, 67];

Tasks:
    1. filter() marks ≥ 40 (pass marks)
    2. map() to add 5 grace marks to each student
    3. reduce() to find highest mark
    4. find() first mark below 40
    5. findIndex() of mark 92    */

const marks = [78, 92, 35, 88, 40, 67];

let marks1=marks.filter(marks => marks>=40)
console.log("Marks above 40:",marks1)

let marks2=marks.map(marks => marks+5)
console.log("New Marks: ",marks2);

let marks3=marks.reduce((acc,marks)=> acc > marks?acc:marks)
console.log("Highest Marks: ",marks3)

let findMarks=marks.find(courses=> courses<40)
console.log(findMarks)

let Marksindex=marks.findIndex(courses=>courses==92)
console.log(Marksindex)