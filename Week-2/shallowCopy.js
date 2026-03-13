/*Hands-On 1: Shallow Copy (Controlled Mutation Use Case)
-------------------------------------------------------
🧪 Given Data:
              const user = {
                id: 101,
                name: "Ravi",
                preferences: {
                  theme: "dark",
                  language: "en"
                }
              };

🎯 Task
    1. Create a shallow copy of user
    2. Change:
          i. name in the copied object
          ii. preferences.theme in the copied object
          iii .Log both original and copied objects
          iv. Observe what changes and what doesn’t  */

const user = {
     id: 101,
     name: "Ravi",
    preferences: {
       theme: "dark",
      language: "en"         
       }
  };

  let Usercpy={...user}
  Usercpy.name='Rahul'
  Usercpy.preferences.theme='White'
  Usercpy.preferences.language='Hindi'
  

  user.preferences.theme='dark'
  user.preferences.language='Telugu'
  console.log(Usercpy)

  console.log(user)