import React, { useState } from 'react';

// import SearchIcon from '@mui/icons-material/Search';
export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    onSearch(searchTerm);
  }

  return (
    <form onSubmit={handleSearchSubmit} className="flex items-center mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search products..."
        className="p-2 border border-gray-300 rounded-l-lg flex-grow"
      />
 <div className='flex justify-center items-center'>
 <button
        type="submit"
        className="p-5  z-10  bg-[#027d02] text-white rounded-r-lg flex-shrink-0 h-2 text-center"
        aria-label="Search"
      > search
        {/* <SearchIcon
         /> */}
      </button>
 </div>
    </form>
  );
}
