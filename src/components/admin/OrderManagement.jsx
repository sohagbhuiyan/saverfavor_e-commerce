import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../store/orderSlice"; // Adjust path as needed
// import { Card, CardContent } from "@/components/ui/card"; // optional: if using shadcn/ui
// import { formatCurrency } from "../utils/format"; // utility function for price formatting
import { Loader2, AlertTriangle } from "lucide-react"; // optional icons
import { API_BASE_URL } from "../../store/api";

const OrderManagement = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Order Management</h1>

      {loading && (
        <div className="flex items-center space-x-2 text-blue-600">
          <Loader2 className="animate-spin" />
          <span>Loading orders...</span>
        </div>
      )}

      {error && (
        <div className="text-red-600 flex items-center space-x-2">
          <AlertTriangle />
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && orders.length === 0 && (
        <div className="text-gray-500">No orders found.</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div key={order.id} className="shadow-md border border-gray-200">
            {/* <CardContent className="p-4"> */}
              <h2 className="text-lg font-semibold mb-2">{order.productname}</h2>
              <div className="text-sm text-gray-700 space-y-1">
                <p>
                  <strong>Product ID:</strong> {order.productid}
                </p>
                <p>
                  <strong>Quantity:</strong> {order.quantity}
                </p>
                <p>
                  <strong>Price:</strong> (order.price)
                </p>
                <p>
                  <strong>Category:</strong> {order.catagory?.name}
                </p>
                <p>
                  <strong>Subproduct:</strong> {order.product?.name}
                </p>
              </div>

              {/* Show product details */}
              <div className="mt-3 border-t pt-2 text-sm text-gray-600">
                <p>
                  <strong>Details:</strong> {order.productDetails?.details}
                </p>
                <p>
                  <strong>Specification:</strong> {order.productDetails?.specification}
                </p>
                <p>
                  <strong>Regular Price:</strong> (order.productDetails?.regularprice)
                </p>
                <p>
                  <strong>Special Price:</strong> (order.productDetails?.specialprice)
                </p>
              </div>

              {/* Images */}
              <div className="flex space-x-2 mt-3">
                {["imagea", "imageb", "imagec"].map((imgKey) => {
                  const img = order.productDetails?.[imgKey];
                  return (
                    img && (
                      <img
                        key={imgKey}
                        src={`${API_BASE_URL}/images/${img}`}
                        alt={imgKey}
                        className="w-16 h-16 object-cover rounded border"
                      />
                    )
                  );
                })}
              </div>
            {/* </CardContent>*/}
          </div> 
        ))}
      </div>
    </div>
  );
};

export default OrderManagement;
