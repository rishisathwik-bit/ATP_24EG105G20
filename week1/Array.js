//Array is ordered collection

let marks=[20,50,70,80]
let names=['ravi','rahul','akhil']
for(let x of marks){
console.log(x);
}
//object is unordered  collection
let student={
    sno:20,
    name:'Rakesh',
    age:'20',
    course:'Btech'
}
console.log(student.name)

//we can Iterate an object f(for in loop)

for(let x in student){
    console.log(student[x])
}
