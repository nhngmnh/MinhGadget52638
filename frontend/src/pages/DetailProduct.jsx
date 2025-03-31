import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import RelatedProducts from '../components/RelatedProducts';

const DetailProduct = () => {
  const { products,backendurl,userData } = useContext(AppContext);
  const navigate = useNavigate();
  const { prID } = useParams();
  const [pr, setPr] = useState();
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState('');
  const [comment, setComment] = useState(null);
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
    if (prID) {
      axios.get(backendurl+`/api/user/get-comments-by-id/:${prID}`)
        .then(res => setComment(res.data))
        .catch(err => console.error("Error fetching comment:", err));
    }
  }, [prID]);

  const handleQuantityChange = (e) => setQuantity(e.target.value);

  const handleAddToCart = () => {
    const cartData = { prID, quantity };
    localStorage.setItem('cartData', JSON.stringify(cartData));
    navigate('/checkout', { state: cartData });
  };

  const handleCommentSubmit = () => {
    if (!commentText.trim()) return;
    axios.post(`/api/user/create-comment`, { text: commentText,productId: prID, userId:userData._id })
      .then(res => {
        setComment(res.data);
        setEditing(false);
      })
      .catch(err => console.error("Error posting comment:", err));
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
            {pr?.specifications && (
              <div className="mt-4">
                <h2 className="text-xl font-semibold">Specifications</h2>
                <table className="w-full border border-gray-300 mt-2">
                  <tbody>
                    {Object.entries(pr.specifications).map(([key, value]) => (
                      <tr key={key} className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium bg-gray-100">{key}</td>
                        <td className="px-4 py-2">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <button onClick={handleAddToCart} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Product's description</h2>
          <p className="text-gray-600 mt-2">{pr?.description}</p>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Product Review</h2>
          <p className="text-gray-600 mt-2">⭐️⭐️⭐️⭐️☆ (4/5 từ 100 đánh giá)</p>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Delivery information</h2>
          <p className="text-gray-600 mt-2">Giao hàng miễn phí trong vòng 3-5 ngày làm việc.</p>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Comments</h2>
          <div className="mt-2 border-t pt-2">
            {comment ? (
              <div className="border-b py-2">
                {editing ? (
                  <div>
                    <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} className="w-full p-2 border rounded-md" />
                    <button onClick={handleCommentSubmit} className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Cập nhật</button>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-700">{comment.text}</p>
                    <button onClick={() => { setEditing(true); setCommentText(comment.text); }} className="text-blue-500">Chỉnh sửa</button>
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
