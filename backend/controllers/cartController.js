

import cartModel from "../models/cartModel.js";

const removeCart = async (req, res) => {
    try {
        const { cartId } = req.params;  // Lấy cartId từ params, hoặc userId

        // Kiểm tra nếu không có cartId hoặc userId
        if (!cartId) {
            return res.status(400).json({ message: 'cartId is required' });
        }

        let cart;
        // Xóa giỏ hàng theo cartId nếu có
        if (cartId) {
            cart = await cartModel.findByIdAndDelete(cartId);
        } 
        return res.json({ message: 'Giỏ hàng đã được xóa thành công', cart });
    } catch (error) {
        console.error('Lỗi khi xóa giỏ hàng:', error);
        return res.status(500).json({ message: 'Lỗi server' });
    }
};
const getCarts = async (req, res) => {
  try {
    const carts = await cartModel.find({});
    
    // Kiểm tra nếu không có giỏ hàng
    if (carts.length === 0) {
      return res.status(204).json({ success: true, message: 'No carts found' });
    }
    return res.status(200).json({ success: true, carts });
    
  } catch (error) {
    console.error('Cannot get carts', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

export {
    removeCart,getCarts
}