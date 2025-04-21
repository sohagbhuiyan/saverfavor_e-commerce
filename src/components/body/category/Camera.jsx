import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import ProductviewPage from './ProductviewPage'; // Adjust path as needed

const Camera = () => {
  const navigate = useNavigate();

  // Redirect to specific camera product on component mount
  useEffect(() => {
    navigate('/product/Canon EOS 200D DSLR');
  }, [navigate]);

  // Optional: Show loading state during redirect
  return (
    <div className="text-center p-8">
      <p>Loading camera product...</p>
      {/* Optionally add a loading spinner */}
      <div className="mt-4 animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  );
};

export default Camera;
