import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const SearchEngine = ({ search, setSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { backendurl, token } = useContext(AppContext);
  const navigate = useNavigate();

  // Hàm xử lý khi click search
  const handleSearchClick = () => {
    const trimmed = searchTerm.trim();
    setSearch(trimmed);
    navigate('/products');
  };
  return (
    <div className='flex w-76 rounded bg-white border border-gray-300 h-13'>
      <input
        type='search'
        name='search'
        id='search'
        placeholder='search'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value.trimStart())}
        className='w-full border-none bg-transparent px-4 py-1 text-gray-900 outline-none focus:none'
      />
      <button
        className='m-2 rounded bg-primary px-4 py-2 text-white'
        onClick={handleSearchClick} // Thêm sự kiện onClick
      >
        Search
      </button>
    </div>
  );
};

export default SearchEngine;