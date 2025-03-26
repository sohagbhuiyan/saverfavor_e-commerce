import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../../../store/authSlice';
import { useNavigate } from 'react-router-dom';

const ProfileView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, profile, loading, error } = useSelector((state) => state.auth);

  // Fetch profile data when component mounts
  useEffect(() => {
    if (user?.email) {
      dispatch(fetchProfile());
    }
  }, [dispatch, user]);

  if (!user) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
        <p className="mb-4">You need to login to view your profile</p>
        <Link to="/login" className="text-blue-500 hover:underline">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Information</h2>
      
      {loading && (
        <div className="text-center py-4">
          <p>Loading profile data...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>{error}</p>
        </div>
      )}

      {profile && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
            <p className="text-lg">{profile.name}</p>
          </div>
          
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500">Email</h3>
            <p className="text-lg">{profile.email}</p>
          </div>
          
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500">Address</h3>
            <p className="text-lg">{profile.address}</p>
          </div>
          
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500">Country</h3>
            <p className="text-lg">{profile.country}</p>
          </div>
          
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
            <p className="text-lg">{profile.phoneNo}</p>
          </div>
          
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500">Date of Birth</h3>
            <p className="text-lg">{profile.dob}</p>
          </div>
          
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500">NID Number</h3>
            <p className="text-lg">{profile.nidnumber}</p>
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-between">
        <button
          onClick={() => navigate('/profile/edit')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Edit Profile
        </button>
        <button
          onClick={() => navigate('/')}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ProfileView;
