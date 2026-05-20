/*let person ={}
let student={}
let car={}
let college={}
*/

class Student{
    sno;   //# is a private modifier in java script
    name;    //properties
    email;

    constructor(sno,name,email){
        this.sno=sno;
        this.name=name;
        this.email=email;
    }
    getStudentName(){
        return this.name;
    }
}

let stud1=new Student(10,'ravi','ravi@gmail.com')
let stud2=new Student(102,'Akhil','Akhil@MediaList.com')

console.log(stud1)
console.log(stud2)