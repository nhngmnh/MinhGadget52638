import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const ChangePassword = () => {
  const { backendurl } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email') || '';
  const userId = queryParams.get('user') || '';

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('Không tìm thấy email!');
      return;
    }
    if (!userId) {
      toast.error('Không có id người dùng');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp!');
      return;
    }

    setLoading(true); // bật loading

    try {
      const res = await axios.post(backendurl + '/api/user/verify-change-password', {
        userId,
        password: newPassword,
      });

      if (res.data.success) {
        toast.success('Cập nhật mật khẩu thành công!');
        navigate('/login');
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error('Đã có lỗi xảy ra!');
    } finally {
      setLoading(false); // tắt loading khi xong
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 animate-spin"></div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-4">Đặt lại mật khẩu</h2>

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full border border-gray-300 p-2 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Mật khẩu mới</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
            disabled={loading}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Xác nhận mật khẩu</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Đang xử lý...' : 'Cập nhật mật khẩu'}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
