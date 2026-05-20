import {useLocation} from 'react-router'


function Employee() {
  // read state from the navigation

  const {state}=useLocation();  // state property lo employee details i.e object undi

  return (
    <div className='text-center border-orange-500 border-2 p-3 rounded-4xl'>
      <h2 className='text-4xl  mb-3'>Employee Details</h2>
      <p className='text-3xl border-3 mx-70 rounded-2xl mb-2'>{state.name}</p>
      <p className='text-3xl border-3 mx-70 rounded-2xl mb-2'>{state.email}</p>
      <p className='text-3xl border-3 mx-70 rounded-2xl mb-2'>{state.mobile}</p>
      <p className='text-3xl border-3 mx-70 rounded-2xl mb-2'>{state.designation}</p>
      <p className='text-3xl border-3 mx-70 rounded-2xl mb-2'>{state.companyName}</p>
    </div>
  )
}

export default Employee