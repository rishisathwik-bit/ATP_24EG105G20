const Employees=[
    {
        eno: 101,
        name: "Ravi",
        marks:[78,82,91],
    },
    {
        eno:102,
        name:"Bhanu",
        marks:[65,70,68],
    },
    {
        eno:103,
        name:"sneha",
        marks:[88,92,95],
    },
    {
        eno:104,
        name:"kiran",
        marks:[55,60,58],
    },
    {
        eno:105,
        name:"Anitha",
        marks:[90,85,87],

    },
];


Employees.splice(1,0,{
    eno:106,
    name:"Suresh",
    marks:[80,75,85]
});

const index=Employees.findIndex(emp=>emp.name==="kiran");
if(index!==-1){
    Employees.splice(index,1);
}
const sneha=Employees.find(emp=>emp.name ==="Sneha");
if(sneha){
    sneha.marks[sneha.marks.length-1]=75;
}

console.log(Employees);