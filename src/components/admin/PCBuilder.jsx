import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPCBuilder, addPCBuilder } from '../../store/pcbuilderSlice';
import api, { API_BASE_URL } from '../../store/api';

const PCBuilder = () => {
  const dispatch = useDispatch();
  const { items: pcbuilders } = useSelector((state) => state.pcBuilder);
  const token = useSelector((state) => state.auth.token) || localStorage.getItem("authToken");
  const userRole = useSelector((state) => state.auth.role) || localStorage.getItem("authRole");

  const [componentName, setComponentName] = useState('');
  const [componentSuccess, setComponentSuccess] = useState('');
  const [componentError, setComponentError] = useState('');

  const [selectedComponentId, setSelectedComponentId] = useState('');
  const [partName, setPartName] = useState('');
  const [partDescription, setPartDescription] = useState('');
  const [partPerformance, setPartPerformance] = useState('');
  const [partAbility, setPartAbility] = useState('');
  const [partRegularPrice, setPartRegularPrice] = useState('');
  const [partDiscountPrice, setPartDiscountPrice] = useState('');
  const [partQuantity, setPartQuantity] = useState('');
  const [partImage, setPartImage] = useState(null);
  const [partSuccess, setPartSuccess] = useState('');
  const [partError, setPartError] = useState('');

  useEffect(() => {
    dispatch(fetchPCBuilder());
  }, [dispatch]);

  const handleComponentSubmit = async (e) => {
    e.preventDefault();
    setComponentSuccess('');
    setComponentError('');

    try {
      const resultAction = await dispatch(addPCBuilder({ name: componentName, token }));
      if (resultAction.meta.requestStatus === 'fulfilled') {
        setComponentSuccess('PC Component added successfully!');
        setComponentName('');
        dispatch(fetchPCBuilder());
      } else {
        setComponentError('Failed to add component.');
      }
    } catch (err) {
      setComponentError('Error adding component.',err);
    }
  };

  const handlePartSubmit = async (e) => {
    e.preventDefault();
    setPartSuccess('');
    setPartError('');

    if (
      !selectedComponentId ||
      !partName ||
      !partDescription ||
      !partPerformance ||
      !partAbility ||
      !partRegularPrice ||
      !partDiscountPrice ||
      !partQuantity ||
      !partImage
    ) {
      setPartError('All fields including image are required.');
      return;
    }

    try {
      const selectedPCBuilder = pcbuilders.find(
        (comp) => String(comp.id) === String(selectedComponentId)
      );

      if (!selectedPCBuilder) {
        setPartError('Selected component not found.');
        return;
      }

      const formData = new FormData();

      const partData = {
        name: partName,
        description: partDescription,
        performance: partPerformance,
        ability: partAbility,
        regular_price: partRegularPrice,
        discount_price: partDiscountPrice,
        quantity: partQuantity,
        pcforpartadd: {
          id: selectedPCBuilder.id,
          name: selectedPCBuilder.name,
        },
      };

      formData.append(
        'pcpartadd',
        new Blob([JSON.stringify(partData)], { type: 'application/json' })
      );
      formData.append('image', partImage);

      const response = await api.post(`${API_BASE_URL}/api/pcparts/save`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        setPartSuccess('PC Part added successfully!');
        setPartName('');
        setPartDescription('');
        setPartPerformance('');
        setPartAbility('');
        setPartRegularPrice('');
        setPartDiscountPrice('');
        setPartQuantity('');
        setPartImage(null);
        setSelectedComponentId('');
      } else {
        setPartError('Failed to add part.');
      }
    } catch (err) {
      setPartError('Error adding part.');
      console.error(err);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-12">
      {userRole === 'admin' ? (
        <>
          {/* Add Component Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Add PC Builder Component</h2>
            <form onSubmit={handleComponentSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Component Name (e.g. Motherboard)"
                value={componentName}
                onChange={(e) => setComponentName(e.target.value)}
                required
                className="border rounded w-full p-2"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Add Component
              </button>
            </form>
            {componentSuccess && <p className="text-green-600 mt-4">{componentSuccess}</p>}
            {componentError && <p className="text-red-600 mt-4">{componentError}</p>}
          </div>

          {/* Add PC Part Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Add PC Part under Component</h2>
            <form onSubmit={handlePartSubmit} className="space-y-4">
              <select
                value={selectedComponentId}
                onChange={(e) => setSelectedComponentId(e.target.value)}
                required
                className="border rounded w-full p-2"
              >
                <option value="">Select Component</option>
                {pcbuilders?.map((component) => (
                  <option key={component.id} value={component.id}>
                    {component.name}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Part Name"
                value={partName}
                onChange={(e) => setPartName(e.target.value)}
                required
                className="border rounded w-full p-2"
              />
              <input
                type="text"
                placeholder="Description"
                value={partDescription}
                onChange={(e) => setPartDescription(e.target.value)}
                required
                className="border rounded w-full p-2"
              />
              <input
                type="text"
                placeholder="Performance"
                value={partPerformance}
                onChange={(e) => setPartPerformance(e.target.value)}
                required
                className="border rounded w-full p-2"
              />
              <input
                type="text"
                placeholder="Ability"
                value={partAbility}
                onChange={(e) => setPartAbility(e.target.value)}
                required
                className="border rounded w-full p-2"
              />
              <input
                type="number"
                placeholder="Regular Price"
                value={partRegularPrice}
                onChange={(e) => setPartRegularPrice(e.target.value)}
                required
                className="border rounded w-full p-2"
              />
              <input
                type="number"
                placeholder="Discount Price"
                value={partDiscountPrice}
                onChange={(e) => setPartDiscountPrice(e.target.value)}
                required
                className="border rounded w-full p-2"
              />
              <input
                type="number"
                placeholder="Quantity"
                value={partQuantity}
                onChange={(e) => setPartQuantity(e.target.value)}
                required
                className="border rounded w-full p-2"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPartImage(e.target.files[0])}
                required
                className="border rounded w-full p-2"
              />
              <button
                type="submit"
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
              >
                Add PC Part
              </button>
            </form>
            {partSuccess && <p className="text-green-600 mt-4">{partSuccess}</p>}
            {partError && <p className="text-red-600 mt-4">{partError}</p>}
          </div>
        </>
      ) : (
        <p className="text-red-600 text-center text-xl font-semibold">
          You do not have permission to access this page.
        </p>
      )}
    </div>
  );
};

export default PCBuilder;
