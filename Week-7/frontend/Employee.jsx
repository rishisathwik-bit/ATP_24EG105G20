import { useLocation } from "react-router"

function Employee() {
  //read state recieved in navigation
  const {state}= useLocation();
  console.log(state);
  return (
    <div className="p-16 text-center text-3xl">
      <p>{state.name}</p>
      <p>{state.email}</p>
      <p>{state.phone}</p>
      <p>{state.mobile}</p>
      <p>{state.companyName}</p>
    </div>
  )
}

export default Employee