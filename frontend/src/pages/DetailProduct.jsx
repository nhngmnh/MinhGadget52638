import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import RelatedProducts from '../components/RelatedProducts';

const DetailProduct = () => {
  const { products, backendurl, userData } = useContext(AppContext);
  const navigate = useNavigate();
  const { prID } = useParams();
  const [pr, setPr] = useState();
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState('');
  const [userComment, setUserComment] = useState(null);
  const [editing, setEditing] = useState(false);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    if (prID && products.length > 0) {
      const prInfo = products.find(p => p._id === prID);
      if (prInfo) {
        setPr(prInfo);
        setCategory(prInfo.category);
      }
    }
  }, [prID, products]);

  useEffect(() => {
    if (prID && userData) {
      axios.get(`${backendurl}/api/user/get-comments-by-id/${prID}`)
        .then(res => {
          const userExistingComment = res.data.find(comment => comment.userId === userData._id);
          if (userExistingComment) {
            setUserComment(userExistingComment);
            setCommentText(userExistingComment.text);
          }
        })
        .catch(err => console.error("Error fetching comments:", err));
    }
  }, [prID, userData]);

  const handleQuantityChange = (e) => setQuantity(e.target.value);

  const handleAddToCart = () => {
    const cartData = { prID, quantity };
    localStorage.setItem('cartData', JSON.stringify(cartData));
    navigate('/checkout', { state: cartData });
  };

  const handleCommentSubmit = () => {
    if (!commentText.trim()) return;
    if (userComment) {
      axios.post(`${backendurl}/api/user/update-comment`, { 
        productId: prID, 
        text: commentText 
      })
        .then(res => {
          setUserComment(res.data);
          setEditing(false);
        })
        .catch(err => console.error("Error updating comment:", err));
    } else {
      axios.post(`${backendurl}/api/user/create-comment`, { 
        text: commentText, 
        productId: prID, 
      })
        .then(res => {
          setUserComment(res.data);
          setEditing(false);
        })
        .catch(err => console.error("Error posting comment:", err));
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
              <input type="number" value={quantity} onChange={handleQuantityChange} min="1" className="mt-1 border border-gray-300 rounded-md p-2 w-20" />
            </div>
            <button onClick={handleAddToCart} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Comments</h2>
          <div className="mt-2 border-t pt-2">
            {userComment ? (
              <div className="border-b py-2">
                {editing ? (
                  <div>
                    <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} className="w-full p-2 border rounded-md" />
                    <button onClick={handleCommentSubmit} className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Cập nhật</button>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-700">{userComment.text}</p>
                    <button onClick={() => setEditing(true)} className="text-blue-500">Chỉnh sửa</button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} className="w-full p-2 border rounded-md" placeholder="Nhập bình luận..." />
                <button onClick={handleCommentSubmit} className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Gửi bình luận</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <RelatedProducts prid={prID} category={category} />
    </div>
  );
};

export default DetailProduct;
