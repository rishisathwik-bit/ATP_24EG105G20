import { useContext } from "react";
import { counterContextObj } from "../contexts/contextProvider";
import { useCounterStore } from "../store/CounterStore";

function Home() {
  // Context API
  const { counter, changeCounter } = useContext(counterContextObj);

  // Zustand Store
  const { newCounter, incrementCounter } = useCounterStore();

  console.log("Home");

  return (
    <div className="p-5 space-y-4">
      {/* Context API Counter */}
      <h1 className="text-4xl">Context Counter: {counter}</h1>
      <button
        onClick={changeCounter}
        className="bg-amber-400 p-4 rounded"
      >
        Change Context Counter
      </button>

      {/* Zustand Counter */}
      <h1 className="text-4xl">Store Counter: {newCounter}</h1>
      <button
        onClick={incrementCounter}
        className="bg-amber-400 p-4 rounded"
      >
        Change Store Counter
      </button>
    </div>
  );
}

export default Home;