import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { redirect } from 'next/navigation';
import DashboardStats from '@/components/admin/DashboardStats';
import RecentActivity from '@/components/admin/RecentActivity';
import NextLayout from "@/layouts/NextLayout";

export default async function AdminDashboard() {
  // Get cookies properly
  const cookieStore = cookies();
  const token = cookieStore.get('authToken')?.value;
  const decoded = token ? verifyToken(token) : null;
  
  if (!decoded || decoded.role !== 'admin') {
    redirect('/auth/login');
  }

  // Fetch all data in parallel
  const data = await Promise.allSettled([
    fetch('http://localhost:3000/api/admin/products/count', { next: { revalidate: 60 } }),
    fetch('http://localhost:3000/api/admin/inventory', { next: { revalidate: 60 } }),
    fetch('http://localhost:3000/api/admin/sales/recent', { next: { revalidate: 10 } })
  ]);

  const [productsRes, inventoryRes, salesRes] = data;

  const totalProducts = productsRes.status === 'fulfilled' ? await productsRes.value.json() : { count: 0 };
  const totalInventory = inventoryRes.status === 'fulfilled' ? await inventoryRes.value.json() : { count: 0 };
  const recentSales = salesRes.status === 'fulfilled' ? await salesRes.value.json() : { count: 0, orders: [] };

  return (
    <NextLayout footer={2} header={2}>
    <section className="hero-section hero-2 fix">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p className="text-gray-600">Welcome back, {decoded.name || 'Admin'}!</p>
      
      <DashboardStats 
        products={totalProducts.count} 
        inventory={totalInventory.count} 
        sales={recentSales.count} 
      />
      
      <RecentActivity activities={recentSales.orders} />
    </section>
    </NextLayout>
  );
}