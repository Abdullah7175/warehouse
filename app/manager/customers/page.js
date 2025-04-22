import CustomersManager from '@/components/customer/CustomersManager';

export default function CustomersPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Customers Management</h1>
      <CustomersManager />
    </div>
  );
}