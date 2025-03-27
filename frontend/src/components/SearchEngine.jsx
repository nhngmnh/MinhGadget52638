import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const SearchEngine = ({search,setSearch}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { backendurl, token } = useContext(AppContext);

  const handleSearch = async () => {
    
    const trimmedSearchTerm = searchTerm.trim(); // Loại bỏ khoảng trắng đầu & cuối
    setSearch(trimmedSearchTerm);
    if (!trimmedSearchTerm) {
      toast.error("Search term cannot be empty!");
      return;
    }

    try {
      const value = await axios.get(`${backendurl}/api/user/get-products?query=${trimmedSearchTerm}`);
      if (value) {
        console.log(value.data);
      } else {
        toast.error("No product found!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className='flex w-76 rounded bg-white border border-gray-300 h-13'>
      <input
        type='search'
        name='search'
        id='search'
        placeholder='search'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value.trimStart())} // Xóa khoảng trắng đầu khi nhập
        className='w-full border-none bg-transparent px-4 py-1 text-gray-900 outline-none focus:none'
      />
      <button onClick={handleSearch} className='m-2 rounded bg-primary px-4 py-2 text-white'>
        Search
      </button>
    </div>
  );
};

export default SearchEngine;
