import React from 'react'

const SearchEngine = () => {
  return (
   
    <div className='flex w-76 rounded bg-white border border-gray-300'>
      <input type='search' name='search' id='search' placeholder='search' className='w-full border-none bg-transparent px-4 py-1 text-gray-900 outline-none focus:none'/>
    <button className='m-2 rounded bg-primary px-4 py-2 text-white'>Search</button>
    </div>
  )
}

export default SearchEngine