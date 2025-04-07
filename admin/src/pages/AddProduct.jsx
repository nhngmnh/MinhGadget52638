import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../assets/assets';

const AddProduct = () => {
  const [productImg, setProductImg] = useState(false);
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Laptop');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [specifications, setSpecifications] = useState(JSON.stringify([{ key: '', value: '' }]));

  const { backendurl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (!productImg) {
        return toast.error('Image not selected');
      }

      const formData = new FormData();
      formData.append('image', productImg);
      formData.append('name', name);
      formData.append('brand', brand);
      formData.append('price', Number(price));
      formData.append('category', category);
      formData.append('description', description);
      formData.append('stock_quantity', Number(stock));

      const specificationsObj = {};
      JSON.parse(specifications).forEach((item) => {
        if (item.key.trim() && item.value.trim()) {
          specificationsObj[item.key] = item.value;
        }
      });

      formData.append('specifications', JSON.stringify(specificationsObj));

      const { data } = await axios.post(backendurl + '/api/admin/add-product', formData, { headers: { aToken } });

      if (data.success) {
        toast.success(data.message + ' Product added');
        setProductImg(false);
        setName('');
        setBrand('');
        setPrice('');
        setCategory('Laptop');
        setDescription('');
        setStock('');
        setSpecifications(JSON.stringify([{ key: '', value: '' }]));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const handleSpecificationChange = (index, field, value) => {
    const updated = JSON.parse(specifications);
    updated[index][field] = value;
    setSpecifications(JSON.stringify(updated));
  };

  const addSpecificationField = () => {
    const updated = JSON.parse(specifications);
    updated.push({ key: '', value: '' });
    setSpecifications(JSON.stringify(updated));
  };

  const removeSpecificationField = (index) => {
    const updated = JSON.parse(specifications);
    if (updated.length > 1) {
      updated.splice(index, 1);
      setSpecifications(JSON.stringify(updated));
    }
  };

  const categories = ["Laptop", "Smartphone", "Smartwatch", "Pc, Printer", "Accessory"];

  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
      <p className='my-3 text-lg font-medium'>Add Product</p>
      <div className='px-8 py-8 bg-white border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
        <div className='flex items-center gap-4 mb-8 text-gray-700'>
          <label htmlFor='product-img'>
            <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={productImg ? URL.createObjectURL(productImg) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setProductImg(e.target.files[0])} type='file' id='product-img' hidden />
          <p>Upload product<br />image</p>
        </div>

        <div className='flex flex-col gap-4 text-gray-800'>
          <div className='flex flex-col gap-1'>
            <p>Product Name</p>
            <input onChange={(e) => setName(e.target.value)} value={name} className='border rounded px-3 py-2' type="text" placeholder='Name' required />
          </div>

          <div className='flex flex-col gap-1'>
            <p>Brand</p>
            <input onChange={(e) => setBrand(e.target.value)} value={brand} className='border rounded px-3 py-2' type="text" placeholder='Brand' required />
          </div>

          <div className='flex flex-col gap-1'>
            <p>Price</p>
            <input onChange={(e) => setPrice(e.target.value)} value={price} className='border rounded px-3 py-2' type="number" placeholder='Price' required />
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
            <input onChange={(e) => setStock(e.target.value)} value={stock} className='border rounded px-3 py-2' type="number" placeholder='Stock' required />
          </div>

          <div>
            <p className='mt-4 mb-2'>Description</p>
            <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full px-4 pt-2 border rounded' placeholder='Write about product' rows={5} required />
          </div>

          <div className='mt-6'>
            <p className='mb-2'>Specifications</p>
            {JSON.parse(specifications).map((spec, index) => (
              <div key={index} className='flex items-center gap-2 mb-2'>
                <input
                  type='text'
                  placeholder='Key (e.g., RAM, Storage)'
                  value={spec.key}
                  onChange={(e) => handleSpecificationChange(index, 'key', e.target.value)}
                  className='border rounded px-3 py-2 w-1/3'
                />
                <input
                  type='text'
                  placeholder='Value (e.g., 16GB, 512GB SSD)'
                  value={spec.value}
                  onChange={(e) => handleSpecificationChange(index, 'value', e.target.value)}
                  className='border rounded px-3 py-2 w-1/3'
                />
                <button
                  type="button"
                  onClick={() => removeSpecificationField(index)}
                  className='px-3 py-2 text-white bg-red-500 rounded'>
                  ❌
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSpecificationField}
              className='px-3 py-2 mt-2 text-white bg-green-500 rounded'>
              ➕ Add Specification
            </button>
          </div>
        </div>

        <button type="submit" className='bg-red-100 px-10 py-3 mt-4 text-black rounded-full'>Add Product</button>
      </div>
    </form>
  );
};

export default AddProduct;
