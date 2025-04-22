import RetailerOrders from '@/components/orders/RetailerOrders';

export default function OrdersPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <RetailerOrders />
    </div>
  );
}