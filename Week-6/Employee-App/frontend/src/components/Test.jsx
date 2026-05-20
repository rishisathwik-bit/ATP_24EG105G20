import { useCounterStore } from "../store/CounterStore";  

function Test() {
    console.log("Test");
    
   // const {counter1,setCounter1} = useContext(counterContextObj)

   let newCounter1 = useCounterStore(state=>state.newCounter1)
  let incrementCounter1=useCounterStore(state=>state.incrementCounter1)

  return (
    <div>
        <h1 className="mt-3">Counter1: {newCounter1}</h1>
        <button className="p-2 border rounded-2xl bg-amber-200" onClick={incrementCounter1}>+</button>
    </div>
  )
}

export default Test