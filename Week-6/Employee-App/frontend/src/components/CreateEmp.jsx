import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router";

function CreateEmp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const onFormSubmit = async (newEmpObj) => {
    try {
      setLoading(true);

      let res = await fetch("https://employee-i0iq.onrender.com/emp-api/emp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEmpObj),
      });

      if (res.status === 201) {
        navigate("/list");
      } else {
        let errorRes = await res.json();
        throw new Error(errorRes.reason);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center text-3xl">Loading....</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center text-2xl">{error}</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      
      <div className="w-full max-w-lg bg-white p-6 sm:p-10 rounded-2xl shadow-md">
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-center text-gray-600 mb-6">
          Create New Employee
        </h1>

        <form
          className="space-y-4"
          onSubmit={handleSubmit(onFormSubmit)}
        >
          <input
            type="text"
            placeholder="Enter name"
            {...register("name")}
            className="w-full border p-3 rounded-xl text-sm sm:text-base"
          />

          <input
            type="email"
            placeholder="Enter Email"
            {...register("email")}
            className="w-full border p-3 rounded-xl text-sm sm:text-base"
          />

          <input
            type="number"
            placeholder="Enter mobile number"
            {...register("mobile")}
            className="w-full border p-3 rounded-xl text-sm sm:text-base"
          />

          <input
            type="text"
            placeholder="Enter designation"
            {...register("designation")}
            className="w-full border p-3 rounded-xl text-sm sm:text-base"
          />

          <input
            type="text"
            placeholder="Enter name of the company"
            {...register("companyName")}
            className="w-full border p-3 rounded-xl text-sm sm:text-base"
          />

          <button
            type="submit"
            className="w-full text-lg rounded-xl bg-gray-600 text-white p-3"
          >
            Add Emp
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateEmp;
