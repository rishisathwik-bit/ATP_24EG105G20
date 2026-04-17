import { useLocation } from "react-router";
import { useEffect } from "react";
function EditEmployee() {

const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {state}=useLocation();
useEffect(()=>{
   setValue("name",state.name);
   setValue()
},[])

return (
<div>
      <h1 className="text-5xl text-center text-gray-600">Edit Employee</h1>
      {/* form */}
      <form className=" max-w-md mx-auto mt-10">
        <input
          type="text"
          placeholder="Enter name "
          {...register("name")}
          className="mb-3 border-2 p-3 w-full rounded-2xl"
          />
        <input
          type="email"
          placeholder="Enter Email "
          {...register("email")}
          className="mb-3  border-2 p-3 w-full rounded-2xl"
        />

        <input
          type="number"
          placeholder="Enter mobile number"
          {...register("mobile")}
          className="mb-3  border-2 p-3 w-full rounded-2xl"
        />
        <input
          type="text"
          placeholder="Enter designation"
          {...register("designation")}
          className="mb-3  border-2 p-3 w-full rounded-2xl"
        />
        <input
          type="text"
          placeholder="Enter name of the company"
          {...register("companyName")}
          className="mb-3  border-2 p-3 w-full rounded-2xl"
        />

        <button type="submit" className="text-2xl rounded-2xl bg-gray-600 text-white block mx-auto p-4">
          Add Emp
        </button>
      </form>
    </div>
  );

}

export default EditEmployee;