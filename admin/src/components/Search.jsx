import React, { useContext, useState, useEffect } from 'react';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';

const Search = ({ search, setSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { backendurl, token } = useContext(AdminContext);
  const navigate = useNavigate();

  // Cập nhật searchTerm khi người dùng nhập vào ô tìm kiếm
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Cập nhật localStorage khi searchTerm thay đổi và điều hướng
  const handleSearchClick = () => {
    const trimmed = searchTerm.trim();
    setSearch(trimmed);
    navigate('/products-list');
  };

  return (
    <div className='flex w-72 md:w-96 rounded bg-white border border-gray-300 h-13'>
      <input
        type='search'
        name='search'
        id='search'
        placeholder='Search'
        value={searchTerm}
        onChange={handleInputChange} // Cập nhật giá trị searchTerm khi người dùng nhập
        className='w-full border-none bg-transparent px-4 py-1 text-gray-900 outline-none focus:none'
      />
      <button onClick={handleSearchClick} className='m-2 rounded bg-blue-500 px-4 py-2 text-white'>
        Search
      </button>
    </div>
  );
};

export default Search;
