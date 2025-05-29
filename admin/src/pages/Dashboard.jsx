import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const Dashboard = () => {
  const { aToken, dashData, getDashData } = useContext(AdminContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (aToken) {
        setLoading(true);
        await getDashData();
        setLoading(false);
      }
    };
    fetchData();
  }, [aToken]);

  const chartData = dashData ? [
    { name: 'Users', value: dashData.users?.length || 0 },
    { name: 'Comments', value: dashData.qcomments || 0 },
    { name: 'Carts', value: dashData.qcarts || 0 }
  ] : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <p className="text-gray-600 text-lg">Loading dashboard...</p>
      </div>
    );
  }

  return dashData && (
    <div className="w-screen min-h-screen px-4 md:px-8 py-6 bg-gray-50">
      {/* Biểu đồ thống kê */}
      <div className="bg-white p-6 rounded-xl shadow w-full">
        <h2 className="text-2xl font-semibold mb-6">Dashboard Overview</h2>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#4F46E5" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Danh sách người dùng */}
      <div className="bg-white mt-10 rounded-xl shadow w-full overflow-auto">
        <div className="flex items-center gap-2.5 px-6 py-5 border-b">
          <p className="text-xl font-semibold text-gray-800">Latest Users</p>
        </div>

        {/* Bảng hiển thị trên desktop */}
        <div className="hidden md:block">
          <table className="min-w-full table-auto text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-800">
              <tr>
                <th className="px-6 py-3">Avatar</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Address</th>
              </tr>
            </thead>
            <tbody>
              {dashData.users.map((user, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.phone || 'N/A'}</td>
                  <td className="px-6 py-4">{user.address || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Dạng thẻ hiển thị trên mobile */}
        <div className="block md:hidden">
          {dashData.users.map((user, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 px-4 py-4 border-b hover:bg-gray-50"
            >
              <div className="flex items-center gap-4">
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-600">{user.email}</p>
                </div>
              </div>
              <div className="text-sm text-gray-700">
                <p><span className="font-medium">Phone:</span> {user.phone || 'N/A'}</p>
                <p><span className="font-medium">Address:</span> {user.address || 'N/A'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
