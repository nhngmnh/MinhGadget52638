import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import RelatedProducts from '../components/RelatedProducts';
import { toast } from 'react-toastify';

const DetailProduct = () => {
  const { products, backendurl, userData, token } = useContext(AppContext);
  const navigate = useNavigate();
  const { prID } = useParams();
  
  const [pr, setPr] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState('');
  
  const [allComments, setAllComments] = useState([]); // Danh sách tất cả bình luận
  const [userComment, setUserComment] = useState(null); // Bình luận của người dùng hiện tại
  const [commentText, setCommentText] = useState('');
  const [editing, setEditing] = useState(false);

  // Load thông tin sản phẩm
  useEffect(() => {
    if (prID && products.length > 0) {
      const prInfo = products.find(p => p._id === prID);
      if (prInfo) {
        setPr(prInfo);
        setCategory(prInfo.category);
      }
    }
  }, [prID, products]);

  // Load danh sách bình luận
  useEffect(() => {
    const fetchComments = async () => {
      if (!prID) return;

      try {
        const res = await axios.get(`${backendurl}/api/user/get-comments-by-product/${prID}`);

        setAllComments(res.data);

        if (userData) {
          const userExistingComment = res.data.find(comment => comment.userId === userData._id);
          if (userExistingComment) {
            setUserComment(userExistingComment);
            setCommentText(userExistingComment.text);
          }
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [prID, userData]);

  const handleQuantityChange = (e) => setQuantity(e.target.value);

  const handleAddToCart = () => {
    const cartData = { prID, quantity };
    localStorage.setItem('cartData', JSON.stringify(cartData));
    navigate('/checkout', { state: cartData });
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;

    try {
      let res;
      if (userComment) {
        // Cập nhật bình luận nếu đã có
        res = await axios.post(`${backendurl}/api/user/update-comment`, {
          productId: prID,
          text: commentText,
        }, { headers: { token } });

        toast.success("Bình luận đã được cập nhật!");
      } else {
        // Tạo bình luận mới
        res = await axios.post(`${backendurl}/api/user/create-comment`, {
          text: commentText,
          productId: prID,
        }, { headers: { token } });

        toast.success("Bình luận đã được thêm!");
      }

      // Cập nhật danh sách bình luận
      const updatedComments = await axios.get(`${backendurl}/api/user/get-comments-by-product/${prID}`);
      setAllComments(updatedComments.data);

      setUserComment(res.data);
      setCommentText(res.data.text);
      setEditing(false);
      
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast.error("Có lỗi xảy ra khi xử lý bình luận!");
    }
  };

  return pr && (
    <div>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg w-auto mt-8">
        <div className="flex">
          <img src={pr.image_url} alt="Product" className="w-1/2 h-1/2 rounded-lg" />
          <div className="ml-6 w-1/2">
            <h1 className="text-2xl font-bold">{pr.name}</h1>
            <p className="text-xl text-gray-700 mt-2">Price: {pr.price}</p>
            <div className="mt-4">
              <label className="block text-gray-700">Quantity:</label>
              <input 
                type="number" 
                value={quantity} 
                onChange={handleQuantityChange} 
                min="1" 
                className="mt-1 border border-gray-300 rounded-md p-2 w-20" 
              />
            </div>
            <button 
              onClick={handleAddToCart} 
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>

        {/* Bình luận */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Bình luận</h2>
          <div className="mt-2 border-t pt-2">
            {userData && (
              <div className="mb-4">
                {editing ? (
                  <div>
                    <textarea 
                      value={commentText} 
                      onChange={(e) => setCommentText(e.target.value)} 
                      className="w-full p-2 border rounded-md" 
                    />
                    <button 
                      onClick={handleCommentSubmit} 
                      className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                      Cập nhật bình luận
                    </button>
                  </div>
                ) : userComment ? (
                  <div>
                    <p className="text-gray-700">{userComment.text}</p>
                    <button 
                      onClick={() => setEditing(true)} 
                      className="text-blue-500">
                      Chỉnh sửa
                    </button>
                  </div>
                ) : (
                  <div>
                    <textarea 
                      value={commentText} 
                      onChange={(e) => setCommentText(e.target.value)} 
                      className="w-full p-2 border rounded-md" 
                      placeholder="Nhập bình luận..." 
                    />
                    <button 
                      onClick={handleCommentSubmit} 
                      className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                      Gửi bình luận
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Hiển thị tất cả bình luận */}
            {allComments.length > 0 ? (
              allComments.map((comment) => (
                <div key={comment._id} className="border-b py-2">
                  <p className="text-gray-800 font-semibold">{comment.username}</p>
                  <p className="text-gray-700">{comment.text}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Chưa có bình luận nào.</p>
            )}
          </div>
        </div>
      </div>

      <RelatedProducts prid={prID} category={category} />
    </div>
  );
};

export default DetailProduct;
