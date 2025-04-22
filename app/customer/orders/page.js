'use client';
import { useState, useEffect } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch('/api/customer/orders');
        const data = await response.json();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    }
    fetchOrders();
  }, []);

  if (loading) return <div className="p-4">Loading your orders...</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-8">
          <p>You haven't placed any orders yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white p-4 rounded shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">Order #{order.order_number}</h3>
                  <p className="text-sm text-gray-600">
                    Placed on {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${
                  order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                  order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {order.status}
                </span>
              </div>
              <div className="mt-4">
                {order.items.map(item => (
                  <div key={item.id} className="flex justify-between py-2 border-t">
                    <span>{item.name}</span>
                    <span>${item.total_price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex justify-between font-medium">
                <span>Total</span>
                <span>${order.total_amount.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}