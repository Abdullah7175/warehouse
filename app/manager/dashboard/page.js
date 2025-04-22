import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

export default async function ManagerDashboard() {
  // Get cookies properly
  const cookieStore = cookies();
  const token = cookieStore.get('authToken')?.value;
  const decoded = token ? verifyToken(token) : null;
  
  if (!decoded || decoded.role !== 'manager') {
    redirect('/auth/login');
  }
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Manager Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Active Customers</h3>
          <p className="text-2xl">Loading...</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Pending Orders</h3>
          <p className="text-2xl">Loading...</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Inventory Alerts</h3>
          <p className="text-2xl">Loading...</p>
        </div>
      </div>
    </div>
  );
}