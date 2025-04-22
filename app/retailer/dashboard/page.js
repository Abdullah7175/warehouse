import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

  // Get cookies properly
  const cookieStore = cookies();
  const token = cookieStore.get('authToken')?.value;
  const decoded = token ? verifyToken(token) : null;
  
  if (!decoded || decoded.role !== 'admin') {
    redirect('/auth/login');
  }

export default async function RetailerDashboard() {
  // Get cookies properly
  const cookieStore = cookies();
  const token = cookieStore.get('authToken')?.value;
  const decoded = token ? verifyToken(token) : null;
  
  if (!decoded || decoded.role !== 'retailer') {
    redirect('/auth/login');
  }
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Retailer Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">My Recent Orders</h3>
          <div className="mt-2">Loading orders...</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Quick Order</h3>
          <div className="mt-2">Order form will go here</div>
        </div>
      </div>
    </div>
  );
}