
const AllCategories = () => {
    return (
      <>
   
      <div className="p-6">
        <h1 className="text-center text-2xl font-bold text-[#CF212B]">All Categories<br/>No Product Available! </h1>
        <p className="text-center text-gray-600 mt-2">Explore all available categories in detail.</p>
        
        <div className="flex justify-center mt-6">
          <button 
            className="bg-[#CF212B] text-white px-4 py-2 rounded-lg"
            onClick={() => window.history.back()} // Go back to the previous page
          >
            Go Back
          </button>
        </div>
      </div>

      </>
    );
  };
  
  export default AllCategories;
  