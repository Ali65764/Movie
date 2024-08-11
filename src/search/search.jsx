import React from 'react';

function Search({ searchTerm, setSearchTerm }) {
  return (
    <div className='inputandreset'>
      <input 
        type="text" 
        placeholder='Search' 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)}
        className='w-[220px] py-1 rounded-md px-2 border-[1px] border-blue-500' 
      />
      <button className='resetbutton' onClick={() => setSearchTerm('')}>Reset</button>
    </div>
  );
}

export default Search;
