// pages/Verify.jsx
import { useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';

export default function Verify() {
  const navigate = useNavigate();
    const {setToken,backendurl} = useContext(AppContext)
  useEffect(() => {
    const tokenGmail = new URLSearchParams(window.location.search).get('tokenGmail');
    if (!tokenGmail) {
      toast.error('Không tìm thấy token xác thực!');
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await axios.get(`${backendurl}/api/user/verify?tokenGmail=${tokenGmail}`);
        if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token)
          toast.success('Xác thực thành công! Đang chuyển sang trang đăng nhập...');
          setTimeout(() => navigate('/'), 3000);
        } else {
          toast.error('Token không hợp lệ hoặc đã hết hạn!');
        }
      } catch (err) {
        console.log(err);
        
        toast.error('Lỗi khi xác thực. Vui lòng thử lại sau.');
      }
    };

    verifyEmail();
  }, [navigate]);

  return <p style={{ textAlign: 'center', marginTop: '40px' }}>Đang xác thực email...</p>;
}
