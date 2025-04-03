import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddProduct = () => {
  const [productImg, setProductImg] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const { backendurl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (!productImg) {
        return toast.error('Image not selected');
      }
      const formData = new FormData();
      formData.append('image_url', productImg);
      formData.append('name', name);
      formData.append('price', Number(price));
      formData.append('category', category);
      formData.append('description', description);
      formData.append('stock_quantity', Number(stock));
      
      const { data } = await axios.post(backendurl + '/api/admin/add-product', formData, { headers: { aToken } });
      if (data.success) {
        toast.success(data.message + " Product added");
        setProductImg(false);
        setName('');
        setPrice('');
        setCategory('');
        setDescription('');
        setStock('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const categories = ["Laptop", "Smartphone", "Smartwatch", "Pc, Printer", "Accessory"];

  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
      <p className='my-3 text-lg font-medium'>Add Product</p>
      <div className='px-8 py-8 bg-white border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
        <div className='flex items-center gap-4 mb-8 text-gray-700'>
          <label htmlFor='product-img'>
            <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={productImg ? URL.createObjectURL(productImg) : ''} alt=""/>
          </label>
          <input onChange={(e) => setProductImg(e.target.files[0])} type='file' id='product-img' hidden/>
          <p>Upload product<br/>image</p>
        </div>
        <div className='flex flex-col gap-4 text-gray-800'>
          <div className='flex flex-col gap-1'>
            <p>Product Name</p>
            <input onChange={(e) => setName(e.target.value)} value={name} className='border rounded px-3 py-2' type="text" placeholder='Name' required/>
          </div>
          <div className='flex flex-col gap-1'>
            <p>Price</p>
            <input onChange={(e) => setPrice(e.target.value)} value={price} className='border rounded px-3 py-2' type="number" placeholder='Price' required/>
          </div>
          <div className='flex flex-col gap-1'>
            <p>Category</p>
            <select onChange={(e) => setCategory(e.target.value)} value={category}>
              {categories.map((item, i) => (
                <option key={i} value={item}>{item}</option>
              ))}
            </select>
          </div>
          <div className='flex flex-col gap-1'>
            <p>Stock</p>
            <input onChange={(e) => setStock(e.target.value)} value={stock} className='border rounded px-3 py-2' type="number" placeholder='Stock' required/>
          </div>
          <div>
            <p className='mt-4 mb-2'>Description</p>
            <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full px-4 pt-2 border rounded' placeholder='Write about product' row={5} required/>
          </div>
        </div>
        <button type="submit" className='bg-red-100 px-10 py-3 mt-4 text-black rounded-full'>Add Product</button>
      </div>
    </form>
  );
};

export default AddProduct;
