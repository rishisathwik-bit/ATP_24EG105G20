import { useState } from "react";
import { useForm } from "react-hook-form";

function Assignment() {
  const [users, setUsers] = useState([]);
  const { register, handleSubmit } = useForm();

  const onFormSubmit = (obj) => {
    setUsers([...users, obj]);
  };

  return (
    <div className="bg-pink-300 min-h-screen flex flex-col items-center justify-center ">

      {/* FORM BOX */}
      <div className="bg-blue-200 shadow-xl rounded-4xl p-10 m-5 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center">User Form Details</h1>

        <form className="mt-5 font-bold" onSubmit={handleSubmit(onFormSubmit)}>
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              {...register("username")}
              className="border w-full p-2"
            />
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              {...register("email")}
              className="border w-full p-2"
            />
          </div>

          <div className="mb-3">
            <label>Date of Birth</label>
            <input
              type="date"
              {...register("dob")}
              className="border w-full p-2"
            />
          </div>

          <div className="flex justify-center">
            <button className="bg-yellow-300 p-2 rounded-md text-white">
              Add User
            </button>
          </div>
        </form>
      </div>

      {/* USER LIST */}
      <div className="bg-orange-300 shadow-xl rounded-4xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-center">List of Users</h2>

        <table className="w-full mt-3 border">
          <thead>
            <tr className="bg-fuchsia-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">DOB</th>
            </tr>
          </thead>

          <tbody>
            {users.map((userObj, index) => (
              <tr key={index}>
                <td className="border p-2">{userObj.username}</td>
                <td className="border p-2">{userObj.email}</td>
                <td className="border p-2">{userObj.dob}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Assignment;