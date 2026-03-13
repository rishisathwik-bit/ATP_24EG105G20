export function validateTitle(title) {
  if(!title){
    return "Title is required";
  }
  
  if(title.length<3){
    return "Min 3 char required";
  }

  return true;
 }
                      
    // 2. Validate priority (must be: low, medium, high)
  export function validatePriority(priority) {
        const priorities=['low','medium','high']
       let result= priorities.includes(priority)
        if(result==false){
            return "Invaild priority"
        }
   return true
   }
  
                      
   // 3. Validate due date (must be future date)
  export function validateDueDate(date) {
     let duedate=new Date('2024-10-12')//yyyy-mm-dd
     let today=new Date()
     if(duedate>today){
        return "Invaild Date"
     }
    return true;

  }  
  
