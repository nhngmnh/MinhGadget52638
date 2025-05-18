import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import RelatedProducts from '../components/RelatedProducts';
import { toast } from 'react-toastify';

const DetailProduct = () => {
  const { products, backendurl, userData, token, replies } = useContext(AppContext);
  const navigate = useNavigate();
  const { prID } = useParams();

  const [pr, setPr] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState('');

  const [allComments, setAllComments] = useState([]);
  const [userComment, setUserComment] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [editing, setEditing] = useState(false);

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
    if (!token){
      toast.error("Login to buy this device !");
      navigate('/login')
    }
    else {
      const cartData = { prID, quantity };
      localStorage.setItem('cartData', JSON.stringify(cartData));
      navigate('/checkout', { state: cartData });
    }
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;
    try {
      let res;
      if (userComment) {
        res = await axios.post(`${backendurl}/api/user/update-comment`, {
          productId: prID,
          text: commentText,
        }, { headers: { token } });
        toast.success("Bình luận đã được cập nhật!");
      } else {
        res = await axios.post(`${backendurl}/api/user/create-comment`, {
          text: commentText,
          productId: prID,
        }, { headers: { token } });
        toast.success("Bình luận đã được thêm!");
      }
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
        <div className="flex flex-col md:flex-row">
          <img src={pr.image_url} alt="Product" className="w-full md:w-1/2 h-auto rounded-lg" />
          <div className="ml-0 md:ml-6 mt-4 md:mt-0 w-full md:w-1/2">
            <h1 className="text-xl md:text-3xl font-bold">{pr.name}</h1>
            <p className="text-md md:text-xl text-gray-700 mt-2">Price: {pr.price} ₫</p>
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

            {/* Mô tả sản phẩm */}
            {pr.description && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold">Description</h2>
                <p className="mt-2 text-gray-700 whitespace-pre-line">{pr.description}</p>
              </div>
            )}

            {/* Thông số sản phẩm */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold">Detail Products</h2>
              <table className="w-full mt-4 table-auto">
                <thead>
                  <tr>
                    <th className="border px-4 py-2 text-left">Thông số</th>
                    <th className="border px-4 py-2 text-left">Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {pr.specifications && Object.keys(pr.specifications).length > 0 ? (
                    Object.entries(pr.specifications).map(([key, value]) => (
                      <tr key={key}>
                        <td className="border px-4 py-2">{key}</td>
                        <td className="border px-4 py-2">{value}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="border px-4 py-2 text-center text-gray-500">
                        Not updated yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <button 
              onClick={handleAddToCart} 
              className="mt-6 mb-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
              Add to cart
            </button>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold">Comments</h2>
          <div className="mt-2 border-t pt-2">
            {userData ? (
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
                      Update comment
                    </button>
                  </div>
                ) : userComment ? (
                  <div>
                    <p className="text-gray-700">{userComment.text}</p>
                    <button 
                      onClick={() => setEditing(true)} 
                      className="text-blue-500">
                      Edit
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
                      Send
                    </button>
                  </div>
                )}
              </div>
            ): <div onClick={()=>{navigate('/login'); scrollTo(0,0);}} className='mt-4 mb-6 bg-primary w-40 rounded-lg text-white cursor-pointer transition-transform duration-300 transform hover:scale-110'>
              <button className='ml-3 mt-2 mb-2' >Login to comment</button>
              </div>}
            {allComments.length > 0 ? (
              allComments.map((comment) => (
                <div key={comment._id} className="border-b py-2">
                  <div className="flex items-start gap-3">
                    <img src={comment.userData.image} alt="Avatar" className="w-10 h-10 rounded-full" />
                    <div>
                      <p className="text-gray-800 font-semibold">{comment.userData.name}</p>
                      <p className="text-gray-700">{comment.text}</p>
                    </div>
                  </div>
                  {/* Hiển thị replies của bình luận này */}
                  <div className="ml-12 mt-2">
                    {replies
                      .filter(reply => reply.commentId === comment._id)
                      .map(reply => (
                        <div key={reply._id} className="text-gray-600 mb-1">
                          <strong className='ml-3'>{"Admin"}:</strong> {reply.text}
                        </div>
                      ))
                    }
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No comment yet.</p>
            )}
          </div>
        </div>
      </div>
      <RelatedProducts prid={prID} category={category} />
    </div>
  );
};

export default DetailProduct;
