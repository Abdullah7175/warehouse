import ItemsManager from '@/components/warehouse/ItemsManager';

export default function ItemsPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Items Management</h1>
      <ItemsManager />
    </div>
  );
}