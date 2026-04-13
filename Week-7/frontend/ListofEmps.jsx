import { useState, useEffect } from "react";
import {useNavigate} from "react-router";


function ListOfEmps() {
  const [emps, setEmps] = useState([]);
  const navigate = useNavigate();

  const gotoEmployee=(empObj)=>{
    //navogate to employee along with selected employee object
    navigate("/employee",{state:empObj});
  };
  const gotoEditEmployee=(empObj)=>{
    //navigate to edit employee page along with selected employee object
    navigate("/edit-emp", { state: empObj }); 
  };
  const deleteEmpById=async(id)=>{
     try {
    let res = await fetch(
      `http://localhost:4000/emp-api/employees/${id}`,
      {
        method: "DELETE", // ✅ VERY IMPORTANT
      }
    );
    if (res.status === 200) {
      // get latest emps data
     getEmps();
    }
    } catch (err) {
    console.log(err);
  }
  }
  //get all employees
  async function getEmps() {
      let res = await fetch("http://localhost:4000/emp-api/employees");
      if (res.status === 200) {
     let resObj = await res.json();
        setEmps(resObj.payload);
      }
    }
  useEffect(() => {
    getEmps();
  }, []);

  return (
    <div>
      <h1 className="text-4xl text-center">List of Employees</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {emps.map((empObj) => (
          <div key={empObj._id} className=" bg-white p-5 text-center rounded-2xl shadow-lg">
            <p>{empObj.email}</p>
            <p className="mb-4">{empObj.name}</p>
            {/* 3 buttons */}
            <div className="flex justify-around">
              
              <button onClick={() => gotoEmployee(empObj)} className="bg-green-600 p-2 rounded-2xl text-white">
                View</button>
              <button onClick={() => gotoEditEmployee(empObj)} className="bg-yellow-600 p-2 rounded-2xl text-white">Edit</button>
              <button onClick={()=>deleteEmpById(empObj._id)}className="bg-red-600 p-2 rounded-2xl text-white">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListOfEmps;