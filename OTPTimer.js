/*2.OTP Countdown Simulator (Console App)
------------------------------------
Simulate OTP sending flow in Node.js:
 Show “OTP Sent Successfully”
 Start 10-second countdown
 Allow resend only after countdown ends */


console.log("OTP sent Successfully")
 let seconds=10;
 let intervel=setInterval(()=>{
    seconds--;
    console.log(`OTP can Resend after ${seconds} secs`)
 if(seconds==0){
    console.log("Resend OTP");
    clearInterval(intervel); }
 },1000);
