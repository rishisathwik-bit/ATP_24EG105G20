import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
function ListOfEmps() {
  const [emps, setEmps] = useState([]);
  const navigate=useNavigate();
  

  const gotoEmployee=()=>{
    // navigate to Employee along with selected employee object
  navigate("/employee",{state: empObj});
  };

  const gotoEditEmployee=()=>{
    navigate("/edit-emp",{state:empObj});
  }


  const deleteEmpById=async(id)=>{
    let res=await axios.delete('http://localhost:4000/emp-api/employees')
    if(res.status == 200){
      getEmps();
    }
  };
  async function getEmps() {
      let res = await axios.get("http://localhost:4000/emp-api/employees");
      if (res.status === 200) {
        let resObj = res.data;
        setEmps(resObj.payload);
      }
    }
  useEffect(()=>{
    getEmps();
  }, []);

  return (
    <div>
      <h1 className="text-4xl text-center">List of Employees</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {emps.map((empObj) => (
          <div key={empObj._id} className=" bg-white p-5 text-center text-2xl rounded-2xl">
            <p>{empObj.email}</p>
            <p className="mb-4">{empObj.name}</p>
          <div className="flex justify-around">
           <button onClick={()=>gotoEmployee(empObj)} className="bg-green-500 p-2.5 rounded-2xl text-amber-50">View</button>
           <button className="bg-yellow-500 p-2.5 rounded-2xl text-amber-50">Edit</button>
           <button className="bg-red-500 p-2.5 rounded-2xl text-amber-50">Delete</button>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListOfEmps;