//Spread operators (Create copies of arrays & objects)

//deep copy
let person={
    name:'ravi',
    address:{
        city:'hyd',
        pincode:54545
    }
}

//create deep copy
// let copyperson = structureClone(person)

let copyPerson = structuredClone(person)

//change name and city and find observations
person.name="Akhil"
person.address.city='chennai'

console.log(person)
console.log(copyPerson)

//add elements /properties while copying

let arr=[1,2,3]
let cpyarr=[...arr,10]
console.log(arr)
console.log(cpyarr)


//write a function that recieves any no of args and return their sum

const findsum=(...numbers)=>{
return numbers.reduce((sum,el)=>sum+el)
}
let result=findsum(10,20,30,40,50)
console.log(result)
findsum(10,20,30,40,24,14,50);
