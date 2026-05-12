import { useContext } from "react"
import { counterContextObj } from "../contexts/contextProvider.jsx"
import userCounterStore from "../store/useCounterStore.js";

function Home() {
  let incrementCounter=userCounterStore((state)=>state.incrementCounter);
  let newcounter=userCounterStore((state)=>state.newCounter);
  const {counter,changeCounter}=useContext(counterContextObj);
  
  return (
    <div>
      <h1 className="text-2xl">counter:{counter}</h1>
      <button onClick={changeCounter} className="bg-green-300">Change Counter</button>
    </div>
  )
}

export default Home