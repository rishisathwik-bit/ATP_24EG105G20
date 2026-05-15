import {create} from 'zustand'

// create a global store
export const useCounterStore=create((set)=>({
    // state
    newCounter:0,
    newCounter1:100,
    // add user state:(name,age,email)
    user:{name:"roop",email:"roop@mail.com",age:"20"},
    // function to change email
    chnageEmail:()=>set({...user,email:"roop@mail.in"}),
    // function to change the naem and age

    changeNameAndAge:()=>set({...user,name:"Krish",age:"22"}),

    // functions to modify the state
    incrementCounter:()=>set(state=>({newCounter:state.newCounter+1})),
    incrementCounter1:()=>set(state=>({newCounter1:state.newCounter1+1})),

    decrementCounter:()=>set(state=>({newCounter:state.newCounter-1})),
    reset:()=>set({newCounter:0}),

    // function to change newCounter to 500
    newCounterSet:()=>set({newCounter:500}),

    // function to decrement newCounter1 by 20
    decrementCounter1:()=>set(state=>({newCounter1:state.newCounter1-20})),

}))