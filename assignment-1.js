/*Assignment 1: Daily Temperature Analyzer
----------------------------------------
Scenario : You are analyzing daily temperatures recorded by a weather app.

Test data:
const temperatures = [32, 35, 28, 40, 38, 30, 42];

Tasks:
    1. filter() temperatures above 35
    2. map() to convert all temperatures from Celsius → Fahrenheit
    3. reduce() to calculate average temperature
    4. find() first temperature above 40
    5. findIndex() of temperature 28
*/


const temperature=[32,35,28,40,38,30,42];

let temp1=temperature.filter(temperature=> temperature > 35)
console.log("Tempareture above 35:",temp1)

let temp2=temperature.map((temp)=>temp*1.8+32)
console.log(temp2)

let average=temperature.reduce((acc,temperature)=>acc+temperature)
let avgTemp=average/temperature.length;
console.log("Average temperature: ",avgTemp)

let first=temperature.find(temperature=>temperature > 40)
console.log("First temp above 40:",first)

let index=temperature.findIndex(temperature=>temperature==28)
console.log(index)