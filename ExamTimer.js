/*.Exam portal simulator:
-----------------------------
When a student submits an exam:
Immediately show: “Exam submitted successfully”
After 2 seconds → show: “Evaluating answers…”
 After 4 seconds → show: “Result: Pass”

*/
 console.log("Exam submitted Successfully")
 setTimeout(()=>{
    console.log("Evaluating Answers...")
 },2000)
 setTimeout(()=>{
    console.log("Result: pass")
 },4000)


 