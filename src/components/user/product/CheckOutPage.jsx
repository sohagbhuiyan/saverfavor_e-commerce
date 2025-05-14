// import { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import toast, { Toaster } from "react-hot-toast";
// import { placeOrder } from "../../../store/orderSlice";
// import { API_BASE_URL } from "../../../store/api";

// const CheckoutPage = () => {
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user, profile, token } = useSelector((state) => state.auth);
//   const { product, quantity } = location.state || {};
//   const [orderForm, setOrderForm] = useState({
//     districts: "",
//     upazila: "",
//     address: "",
//   });
//   const [districts, setDistricts] = useState([]);
//   const [upazilas, setUpazilas] = useState([]);
//   const [loadingDistricts, setLoadingDistricts] = useState(false);
//   const [loadingUpazilas, setLoadingUpazilas] = useState(false);

//   // Redirect to login if not authenticated
//   if (!user?.id || !profile?.email || !token) {
//     toast.error("Please log in to place an order.", { duration: 1000 });
//     navigate("/login", { state: { from: location.pathname } });
//     return null;
//   }

//   if (!product) {
//     toast.error("No product selected.", { duration: 1000 });
//     navigate("/");
//     return null;
//   }

//   // Fetch districts on component mount
//   useEffect(() => {
//     const fetchDistricts = async () => {
//       setLoadingDistricts(true);
//       try {
//         const response = await fetch("https://sohojapi.vercel.app/api/districts");
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();
//         console.log("Districts API response:", data); // Debugging log
//         const districtsData = (Array.isArray(data) ? data : data.data || []).sort((a, b) =>
//           a.name.localeCompare(b.name)
//         ); // Sort alphabetically by name
//         setDistricts(districtsData);
//         if (districtsData.length === 0) {
//           toast.error("No districts available.", { duration: 2000 });
//         }
//       } catch (error) {
//         toast.error("Failed to load districts. Please try again.", { duration: 2000 });
//         console.error("Error fetching districts:", error);
//       } finally {
//         setLoadingDistricts(false);
//       }
//     };
//     fetchDistricts();
//   }, []);

//   // Fetch upazilas when district changes
//   useEffect(() => {
//     if (orderForm.districts) {
//       const fetchUpazilas = async () => {
//         setLoadingUpazilas(true);
//         try {
//           const response = await fetch(`https://sohojapi.vercel.app/api/upzilas/${orderForm.districts}`);
//           if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//           }
//           const data = await response.json();
//           console.log("Upazilas API response:", data); // Debugging log
//           const upazilasData = (Array.isArray(data) ? data : data.data || []).sort((a, b) =>
//             a.name.localeCompare(b.name)
//           ); // Sort alphabetically by name
//           setUpazilas(upazilasData);
//           if (upazilasData.length === 0) {
//             toast.warn("No upazilas available for selected district.", { duration: 2000 });
//           }
//         } catch (error) {
//           toast.error("Failed to load upazilas. Please try again.", { duration: 2000 });
//           console.error("Error fetching upazilas:", error);
//         } finally {
//           setLoadingUpazilas(false);
//         }
//       };
//       fetchUpazilas();
//     } else {
//       setUpazilas([]);
//       setOrderForm((prev) => ({ ...prev, upazila: "" }));
//     }
//   }, [orderForm.districts]);

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     console.log(`Form change: ${name} = ${value}`); // Debugging log
//     setOrderForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();

//     // Validate form fields
//     if (!orderForm.districts || !orderForm.upazila || !orderForm.address) {
//       toast.error("Please fill in all required fields.", { duration: 2000 });
//       return;
//     }

//     const requestDate = new Date().toISOString();
//     const orderPayload = {
//       quantity,
//       catagory: {
//         id: product.catagory.id,
//         name: product.catagory.name,
//       },
//       product: {
//         id: product.product.id,
//         name: product.product.name,
//         catagory: {
//           id: product.catagory.id,
//           name: product.catagory.name,
//         },
//       },
//       productDetails: {
//         id: product.id,
//         productid: product.productid,
//         name: product.name,
//         quantity: product.quantity,
//         regularprice: product.regularprice,
//         specialprice: product.specialprice,
//         title: product.title,
//         details: product.details,
//         specification: product.specification,
//         imagea: product.imagea,
//         imageb: product.imageb,
//         imagec: product.imagec,
//         catagory: {
//           id: product.catagory.id,
//           name: product.catagory.name,
//         },
//         product: {
//           id: product.product.id,
//           name: product.product.name,
//           catagory: {
//             id: product.catagory.id,
//             name: product.catagory.name,
//           },
//         },
//       },
//       productid: product.productid,
//       productname: product.name,
//       districts: districts.find((d) => d.id === orderForm.districts)?.name || orderForm.districts,
//       upazila: upazilas.find((u) => u.id === orderForm.upazila)?.name || orderForm.upazila,
//       address: orderForm.address,
//       requestDate,
//       userId: user.id,
//     };

//     console.log("Order payload:", orderPayload); // Debugging log

//     dispatch(placeOrder(orderPayload))
//       .unwrap()
//       .then(() => {
//         toast.success("Order placed successfully!", { duration: 2000 });
//         navigate("/order-confirmation", { state: { order: orderPayload } });
//       })
//       .catch((error) => {
//         toast.error(`Order failed: ${error}`, { duration: 2000 });
//       });
//   };

//   return (
//     <div className="p-8 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6">Checkout</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Order Summary */}
//         <div>
//           <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
//           <div className="flex gap-4">
//             <img
//               src={`${API_BASE_URL}/images/${product.imagea}`}
//               alt={product.name}
//               className="w-24 h-24 object-cover border"
//             />
//             <div>
//               <h4 className="font-medium">{product.name}</h4>
//               <p className="text-sm text-gray-600">Product ID: {product.productid}</p>
//               <p className="text-sm">Quantity: {quantity}</p>
//               <p className="text-sm font-bold">
//                 Price: Tk {product.specialprice || product.regularprice}
//               </p>
//               <p className="text-sm font-bold">
//                 Total: Tk {(product.specialprice || product.regularprice) * quantity}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Shipping Address Form */}
//         <div>
//           <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
//           <form onSubmit={handleFormSubmit}>
//             <div className="mb-4">
//               <label htmlFor="districts" className="block text-sm font-medium text-gray-700">
//                 District
//               </label>
//               <select
//                 id="districts"
//                 name="districts"
//                 value={orderForm.districts}
//                 onChange={handleFormChange}
//                 className="mt-1 p-2 block w-full border rounded-md focus:ring focus:ring-green-200 text-gray-900 bg-white appearance-auto"
//                 required
//                 disabled={loadingDistricts || districts.length === 0}
//               >
//                 <option value="" className="text-gray-900">Select District</option>
//                 {districts.map((district) => (
//                   <option key={district.id} value={district.id} className="text-gray-900">
//                     {district.name}
//                   </option>
//                 ))}
//               </select>
//               {loadingDistricts && <p className="text-sm text-gray-500 mt-1">Loading districts...</p>}
//               {!loadingDistricts && districts.length === 0 && (
//                 <p className="text-sm text-red-500 mt-1">No districts available</p>
//               )}
//             </div>
//             <div className="mb-4">
//               <label htmlFor="upazila" className="block text-sm font-medium text-gray-700">
//                 Upazila
//               </label>
//               <select
//                 id="upazila"
//                 name="upazila"
//                 value={orderForm.upazila}
//                 onChange={handleFormChange}
//                 className="mt-1 p-2 block w-full border rounded-md focus:ring focus:ring-green-200 text-gray-900 bg-white appearance-auto"
//                 required
//                 disabled={loadingUpazilas || !orderForm.districts || upazilas.length === 0}
//               >
//                 <option value="" className="text-gray-900">Select Upazila</option>
//                 {upazilas.map((upazila) => (
//                   <option key={upazila.id} value={upazila.id} className="text-gray-900">
//                     {upazila.name}
//                   </option>
//                 ))}
//               </select>
//               {loadingUpazilas && <p className="text-sm text-gray-500 mt-1">Loading upazilas...</p>}
//               {!loadingUpazilas && orderForm.districts && upazilas.length === 0 && (
//                 <p className="text-sm text-red-500 mt-1">No upazilas available for selected district</p>
//               )}
//             </div>
//             <div className="mb-4">
//               <label htmlFor="address" className="block text-sm font-medium text-gray-700">
//                 Address
//               </label>
//               <textarea
//                 id="address"
//                 name="address"
//                 value={orderForm.address}
//                 onChange={handleFormChange}
//                 className="mt-1 p-2 block w-full border rounded-md focus:ring focus:ring-green-200 text-gray-900 bg-white"
//                 required
//               />
//             </div>
//             <div className="flex justify-end gap-2">
//               <button
//                 type="button"
//                 className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
//                 onClick={() => navigate(-1)}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
//                 disabled={loadingDistricts || loadingUpazilas}
//               >
//                 Confirm Order
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//       <Toaster />
//     </div>
//   );
// };

// export default CheckoutPage;

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { placeOrder } from "../../../store/orderSlice";
import { API_BASE_URL } from "../../../store/api";

const CheckoutPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, profile, token } = useSelector((state) => state.auth);
  const { product, quantity } = location.state || {};
  const [orderForm, setOrderForm] = useState({
    districts: "",
    upazila: "",
    address: "",
  });
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingUpazilas, setLoadingUpazilas] = useState(false);

  // Redirect to login if not authenticated
  if (!user?.id || !profile?.email || !token) {
    toast.error("Please log in to place an order.", { duration: 1000 });
    navigate("/login", { state: { from: location.pathname } });
    return null;
  }

  if (!product) {
    toast.error("No product selected.", { duration: 1000 });
    navigate("/");
    return null;
  }

  // Fetch districts on component mount
  useEffect(() => {
    const fetchDistricts = async () => {
      setLoadingDistricts(true);
      try {
        const response = await fetch("https://sohojapi.vercel.app/api/districts");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Districts API response:", data);
        const districtsData = (Array.isArray(data) ? data : data.data || []).sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setDistricts(districtsData);
        localStorage.setItem("districts", JSON.stringify(districtsData)); // Cache districts
        if (districtsData.length === 0) {
          toast.error("No districts available.", { duration: 2000 });
        }
      } catch (error) {
        const cachedDistricts = JSON.parse(localStorage.getItem("districts") || "[]");
        if (cachedDistricts.length > 0) {
          setDistricts(cachedDistricts);
          toast.warn("Using cached districts due to API failure.", { duration: 2000 });
        } else {
          toast.error("Failed to load districts. Please try again.", { duration: 2000 });
        }
        console.error("Error fetching districts:", error);
      } finally {
        setLoadingDistricts(false);
      }
    };
    fetchDistricts();
  }, []);

  // Fetch upazilas when district changes
  useEffect(() => {
    if (orderForm.districts) {
      const fetchUpazilas = async () => {
        setLoadingUpazilas(true);
        try {
          const response = await fetch(`https://sohojapi.vercel.app/api/upzilas/${orderForm.districts}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          console.log("Upazilas API response:", data);
          const upazilasData = (Array.isArray(data) ? data : data.data || []).sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          setUpazilas(upazilasData);
          localStorage.setItem(`upazilas_${orderForm.districts}`, JSON.stringify(upazilasData)); // Cache upazilas
          if (upazilasData.length === 0) {
            toast.warn("No upazilas available for selected district.", { duration: 2000 });
          }
        } catch (error) {
          const cachedUpazilas = JSON.parse(localStorage.getItem(`upazilas_${orderForm.districts}`) || "[]");
          if (cachedUpazilas.length > 0) {
            setUpazilas(cachedUpazilas);
            toast.warn("Using cached upazilas due to API failure.", { duration: 2000 });
          } else {
            toast.error("Failed to load upazilas. Please try again.", { duration: 2000 });
          }
          console.error("Error fetching upazilas:", error);
        } finally {
          setLoadingUpazilas(false);
        }
      };
      fetchUpazilas();
    } else {
      setUpazilas([]);
      setOrderForm((prev) => ({ ...prev, upazila: "" }));
    }
  }, [orderForm.districts]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    console.log(`Form change: ${name} = ${value}`);
    setOrderForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    if (!orderForm.districts || !orderForm.upazila || !orderForm.address) {
      toast.error("Please fill in all required fields.", { duration: 2000 });
      return;
    }

    const requestDate = new Date().toISOString();
    const orderPayload = {
      quantity,
      catagory: {
        id: product.catagory.id,
        name: product.catagory.name,
      },
      product: {
        id: product.product.id,
        name: product.product.name,
        catagory: {
          id: product.catagory.id,
          name: product.catagory.name,
        },
      },
      productDetails: {
        id: product.id,
        productid: product.productid,
        name: product.name,
        quantity: product.quantity,
        regularprice: product.regularprice,
        specialprice: product.specialprice,
        title: product.title,
        details: product.details,
        specification: product.specification,
        imagea: product.imagea,
        imageb: product.imageb,
        imagec: product.imagec,
        catagory: {
          id: product.catagory.id,
          name: product.catagory.name,
        },
        product: {
          id: product.product.id,
          name: product.product.name,
          catagory: {
            id: product.catagory.id,
            name: product.catagory.name,
          },
        },
      },
      productid: product.productid,
      productname: product.name,
      districts: districts.find((d) => d.id === orderForm.districts)?.name || orderForm.districts,
      upazila: upazilas.find((u) => u.id === orderForm.upazila)?.name || orderForm.upazila,
      address: orderForm.address,
      requestDate,
      userId: user.id,
      status: "Pending",
    };

    console.log("Submitting order payload:", orderPayload);

    dispatch(placeOrder(orderPayload))
      .unwrap()
      .then((response) => {
        console.log("Order placed successfully:", response);
      toast.success("Order placed successfully!", {
      duration: 3000,
      style: { background: "#10B981", color: "#FFFFFF", fontWeight: "bold" },
    });
        navigate("/order-confirmation", { state: { order: { ...orderPayload, orderId: response.orderId || response.id } }});
      })
      .catch((error) => {
        console.error("Order submission failed:", error);
        toast.error(`Order failed: ${error.message || error}`, { duration: 3000 });
      });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <div className="flex gap-4">
            <img
              src={`${API_BASE_URL}/images/${product.imagea}`}
              alt={product.name}
              className="w-24 h-24 object-cover border"
            />
            <div>
              <h4 className="font-medium">{product.name}</h4>
              <p className="text-sm text-gray-600">Product ID: {product.productid}</p>
              <p className="text-sm">Quantity: {quantity}</p>
              <p className="text-sm font-bold">
                Price: Tk {product.specialprice || product.regularprice}
              </p>
              <p className="text-sm font-bold">
                Total: Tk {(product.specialprice || product.regularprice) * quantity}
              </p>
            </div>
          </div>
        </div>

        {/* Shipping Address Form */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label htmlFor="districts" className="block text-sm font-medium text-gray-700">
                District
              </label>
              <select
                id="districts"
                name="districts"
                value={orderForm.districts}
                onChange={handleFormChange}
                className="mt-1 p-2 block w-full border rounded-md focus:ring focus:ring-green-200 text-gray-900 bg-white appearance-auto"
                required
                disabled={loadingDistricts || districts.length === 0}
              >
                <option value="" className="text-gray-900">Select District</option>
                {districts.map((district) => (
                  <option key={district.id} value={district.id} className="text-gray-900">
                    {district.name}
                  </option>
                ))}
              </select>
              {loadingDistricts && <p className="text-sm text-gray-500 mt-1">Loading districts...</p>}
              {!loadingDistricts && districts.length === 0 && (
                <p className="text-sm text-red-500 mt-1">No districts available</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="upazila" className="block text-sm font-medium text-gray-700">
                Upazila
              </label>
              <select
                id="upazila"
                name="upazila"
                value={orderForm.upazila}
                onChange={handleFormChange}
                className="mt-1 p-2 block w-full border rounded-md focus:ring focus:ring-green-200 text-gray-900 bg-white appearance-auto"
                required
                disabled={loadingUpazilas || !orderForm.districts || upazilas.length === 0}
              >
                <option value="" className="text-gray-900">Select Upazila</option>
                {upazilas.map((upazila) => (
                  <option key={upazila.id} value={upazila.id} className="text-gray-900">
                    {upazila.name}
                  </option>
                ))}
              </select>
              {loadingUpazilas && <p className="text-sm text-gray-500 mt-1">Loading upazilas...</p>}
              {!loadingUpazilas && orderForm.districts && upazilas.length === 0 && (
                <p className="text-sm text-red-500 mt-1">No upazilas available for selected district</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={orderForm.address}
                onChange={handleFormChange}
                className="mt-1 p-2 block w-full border rounded-md focus:ring focus:ring-green-200 text-gray-900 bg-white"
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                disabled={loadingDistricts || loadingUpazilas}
              >
                Confirm Order
              </button>
            </div>
          </form>
        </div>
      </div>
      <Toaster position="top-right"/>
    </div>
  );
};

export default CheckoutPage;
