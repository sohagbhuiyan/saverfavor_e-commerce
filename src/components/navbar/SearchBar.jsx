import { AiOutlineSearch } from "react-icons/ai";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative bg-white w-full max-w-xs sm:max-w-xs md:max-w-lg lg:max-w-xl rounded-md flex">
      <input
        type="text"
        placeholder="Enter Your Keyword..."
        className="w-full px-2 md:px-6 text-xs md:text-sm sm:px-4 text-black rounded-md outline-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && console.log("Searching:", searchQuery)}
      />
      <button
        className="p-0.5 md:p-1.5 bg-green-500 hover:bg-green-600 rounded-r-md cursor-pointer"
        onClick={() => console.log("Searching:", searchQuery)}
      >
        <AiOutlineSearch className="text-white text-xl" />
      </button>
    </div>
  );
};
export default SearchBar
