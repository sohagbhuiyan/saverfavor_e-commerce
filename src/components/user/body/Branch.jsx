import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBranches } from '../../../store/branchSlice';
import { Button, Card, CardContent, Typography, Alert } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

const Branch = () => {

  const dispatch = useDispatch();
  const { branches, loading, error } = useSelector((state) => state.branch);

  useEffect(() => {
    dispatch(getAllBranches());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(getAllBranches());
  };

  const SkeletonCard = () => (
    <div className="p-4 bg-gray-100 rounded-lg border border-blue-400 shadow-md animate-pulse">
      <div className="h-6 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded"></div>
    </div>
  );

  return (
    <div className="container p-8">
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h4" className="font-bold text-gray-800">
          All Branches
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleRefresh}
          startIcon={<RefreshIcon />}
          disabled={loading}
        >
          Refresh
        </Button>
      </div>
      {error && <Alert severity="error" className="mb-4">{error}</Alert>}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : branches.length === 0 ? (
        <Alert severity="info">No branches found.</Alert>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {branches.map((branch, index) => (
            <Card
              key={index}
              className="shadow-md hover:shadow-lg transition-transform border border-blue-400  transform hover:-translate-y-1"
            >
              <CardContent>
                <Typography variant="h6" className="font-semibold text-gray-800">
                  {branch.branchname}
                </Typography>
                <Typography className="text-sm text-gray-600 mt-1">
                  {branch.branchaddress}
                </Typography>
                <Typography className="text-sm text-gray-600">
                  Phone: {branch.phonenumber}
                </Typography>
                <Typography className="text-sm text-gray-600 mt-2">
                  {branch.description || 'No description available'}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Branch;
