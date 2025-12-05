const Search = ({searchQuery,setSearchQuery}) => {
  return (
    <div className="flex justify-center w-full px-4 ">
        <input type="search" placeholder="Search Movies" 
        className="bg-white dark:bg-black w-full max-w-sm outline-none border-b-2 border-red-600 dark:border-[#7dd3fc] dark:text-white"
        value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} />
    </div>
  )
}

export default Search