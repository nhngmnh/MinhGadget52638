import React, { useContext, useState, useEffect } from 'react';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';

const Search = ({ search, setSearch }) => {
  const [searchTerm, setSearchTerm] = useState(search || '');
  const { backendurl, token } = useContext(AdminContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    const trimmed = searchTerm.trim();
    if (trimmed) {
      setSearch(trimmed);
      navigate('/products-list');
    }
  };

  useEffect(() => {
    setSearchTerm(search || '');
  }, [search]);

  return (
    <div className='flex w-72 md:w-96 rounded bg-white border border-gray-300 h-13'>
      <input
        type='search'
        name='search'
        id='search'
        placeholder='Search'
        value={searchTerm}
        onChange={handleInputChange}
        className='w-full border-none bg-transparent px-4 py-1 text-gray-900 outline-none'
      />
      <button
        onClick={handleSearchClick}
        className='m-2 rounded bg-blue-500 px-4 py-2 text-white'
      >
        Search
      </button>
    </div>
  );
};

export default Search;
