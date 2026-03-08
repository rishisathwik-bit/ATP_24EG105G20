/*Assignment 2: Online Course Name Processor
------------------------------------------
Scenario : You are preparing a course list for display on a website.

Test data:
const courses = ["javascript", "react", "node", "mongodb", "express"];


Tasks:
    1. filter() courses with name length > 5
    2. map() to convert course names to uppercase
    3. reduce() to generate a single string:
              "JAVASCRIPT | REACT | NODE | MONGODB | EXPRESS"

    4. find() the course "react"
    5. findIndex() of "node"
*/

const courses = ["javascript", "react", "node", "mongodb", "express"];

let courseLen=courses.filter(courses=>courses.length>5)
console.log("Courses length greater then 5:", courseLen);

let CourseUpper=courses.map(courses=> courses.toUpperCase())
console.log("courseUpper case: ",CourseUpper)

const  result=courses.reduce((acc,courses)=> acc.toUpperCase()+"|"+courses.toUpperCase())
console.log(result)

let index=courses.find(courses=> courses=='react')
console.log(index)

let index2=courses.findIndex(courses=>courses=='node')
console.log(index2)