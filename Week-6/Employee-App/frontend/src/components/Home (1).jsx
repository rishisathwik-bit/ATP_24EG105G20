import {useContext} from 'react'
import { counterContextObj } from '../context/ContextProvider'
import Test from './Test';
import { useCounterStore } from '../store/CounterStore';

function Home() {
  console.log("Home");


  // CALL useCounterStore hook to get state of ZUSTAND STORE

  // let {newCounter,incrementCounter} =useCounterStore(); 

  // now i have more then one state so use counter store lo specific state ne use cheskovali
  let newCounter = useCounterStore(state=>state.newCounter)
  let incrementCounter=useCounterStore(state=>state.incrementCounter)
  let newCounterSet=useCounterStore(state=>state.newCounterSet)

  let user =useCounterStore(state=>state.user);
  let changeNameAndAge=useCounterStore(state=>state.changeNameAndAge)



  const {counter,changeCounter}=useContext(counterContextObj);

  return (
    <div>
      <p>Counter sharing across components::</p>
      <h1>Counter :{newCounter}</h1>
      <button onClick={newCounterSet} className='bg-black text-white p-2 m-1'>Increment</button>
      <Test/>
    </div>
  )
}

export default Home