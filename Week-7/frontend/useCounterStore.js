import {create} from 'zustand'

//create store
export const useCounterStore=create((set)=>({
    //state
    newCounter:0,
    newCounter1:100,
    //add user state(name, age,email)
    user:{name:"ravi",age:21,email:"ravi@gmail.com"},
    //function tp change email
    changeEmail:()=>set({...user,email:"test@mail.com"}),
    //function to change name and age
    changeNameandAge:()=>set({...user,name:"test",age:30}),
    //functions to modify the state
    incrementCounts:()=>set((state)=>({newCounter:state.newCounter+1})),
    decrementCounts:()=>set((state)=>({newCounter:state.newCounter-1})),
    reset:()=>set({newCounter:10}),
    //function to change newCounter to 500
    changeCounterTo500:()=>set({newCounter:500}),
    //function to decremnet newcounter1 by 20
    decrementCounter1:()=>set((state)=>({newCounter1:state.newCounter1-20}))

}));
export default useCounterStore;