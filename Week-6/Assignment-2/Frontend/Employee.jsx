import React from 'react'
import { useLocation } from 'react-router';
function Employee() {
  const {state}=useLocation();
  return (
    <div className='p-16 text-center text-3xl'>
      <p>{state.name}</p>
      <p>{state.email}</p>
      <p>{state.mobile}</p>
      <p>{state.designation}</p>
      <p>{state.CompanyName}</p>
    </div>
  )
}

export default Employee;