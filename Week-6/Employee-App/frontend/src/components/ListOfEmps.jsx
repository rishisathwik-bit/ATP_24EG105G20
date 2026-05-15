import { useState, useEffect } from "react";
import {useNavigate} from 'react-router'
import axios from 'axios'


function ListOfEmps() {
  const [emps, setEmps] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const goToEmployee=(empObj)=>{
    // navigate to employee programatically along iwth the empobj
    navigate('/employee',{state:empObj})
  }
  const deleteEmp=async (id)=>{
    try{
    setLoading(true);
    setError("");
    let res = await axios.delete(`https://employee-i0iq.onrender.com/emp-api/emp/${id}`)
    if(res.status===200){
      //get the latest data
        getEmps();
    }
  }catch (err) {
      console.log("err in catch", err);
      //deal with err
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

   
  const goToEditEmp=(empObj)=>{
    navigate('/edit-emp',{state:empObj})
  }
  async function getEmps(empObj) {
    try{
      setLoading(true);
      setError("");
      let res = await axios.get("https://employee-i0iq.onrender.com/emp-api/emp");
      if (res.status === 200) {
        let resObj = res.data;
        setEmps(resObj.payload);
      }
    }catch (err) {
      console.log("err in catch", err);
      //deal with err
      setError(err.message);
    } finally {
      setLoading(false);
    }
    }
  useEffect(() => {
    getEmps();
  }, []);
if (loading) {
    return <p className="text-center text-4xl">Loading....</p>;
  }
  if (error) {
    return <p className="text-red-500 text-center text-3xl">{error}</p>;
  }
  return (
    <div>
      <h1 className="text-4xl text-center">List of Employees</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {emps.map((empObj) => (
          <div key={empObj._id} className=" bg-white p-2 rounded-2xl shadow-2xl shadow-amber-800">
            <p>{empObj?.email}</p>
            <p>{empObj?.name}</p>
            <div className="flex justify-around">
              {/* 3 buttons */}
              <button onClick={()=>goToEmployee(empObj)} className="bg-amber-300 p-2 rounded-3xl">View</button>
              <button onClick={()=>goToEditEmp(empObj)} className="bg-blue-300 p-2 rounded-3xl">Edit</button>
              <button onClick={()=>deleteEmp(empObj._id)} className="bg-red-300 p-2 rounded-3xl">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListOfEmps;
