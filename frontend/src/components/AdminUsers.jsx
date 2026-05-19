import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import BASE_URL from "../config";
import {
  errorClass,
  loadingClass,
  emptyStateClass,
  articleStatusActive,
  articleStatusDeleted,
  secondaryBtn,
} from "../styles/common";

function AdminUsers({ role = "USER" }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const endpoint = role === "AUTHOR" ? "authors" : "users";

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(`${BASE_URL}/admin-api/${endpoint}`, {
          withCredentials: true,
        });
        setUsers(res.data.payload || []);
      } catch (err) {
        setError(err.response?.data?.message || `Failed to load ${endpoint}`);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, [endpoint]);

  const toggleStatus = async (user) => {
    const nextStatus = !user.isUserActive;

    try {
      const res = await axios.patch(
        `${BASE_URL}/admin-api/users`,
        {
          userId: user._id,
          isUserActive: nextStatus,
        },
        { withCredentials: true }
      );

      setUsers((prevUsers) =>
        prevUsers.map((item) =>
          item._id === user._id ? { ...item, isUserActive: nextStatus } : item
        )
      );
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update user");
    }
  };

  if (loading) return <p className={loadingClass}>Loading {endpoint}...</p>;
  if (error) return <p className={errorClass}>{error}</p>;
  if (users.length === 0) {
    return <p className={emptyStateClass}>No {endpoint} found.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-[#e8e8ed] text-left text-[#6e6e73]">
            <th className="py-3 pr-4 font-medium">Name</th>
            <th className="py-3 pr-4 font-medium">Email</th>
            <th className="py-3 pr-4 font-medium">Status</th>
            <th className="py-3 pr-4 font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b border-[#f5f5f7]">
              <td className="py-3 pr-4 text-[#1d1d1f]">
                {[user.firstName, user.lastName].filter(Boolean).join(" ") || "Unnamed"}
              </td>
              <td className="py-3 pr-4 text-[#6e6e73]">{user.email}</td>
              <td className="py-3 pr-4">
                <span
                  className={
                    user.isUserActive
                      ? articleStatusActive.replace("absolute top-3 right-3 ", "")
                      : articleStatusDeleted.replace("absolute top-3 right-3 ", "")
                  }
                >
                  {user.isUserActive ? "ACTIVE" : "BLOCKED"}
                </span>
              </td>
              <td className="py-3 pr-4">
                <button className={secondaryBtn} onClick={() => toggleStatus(user)}>
                  {user.isUserActive ? "Block" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsers;
