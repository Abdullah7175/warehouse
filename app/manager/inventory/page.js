import InventoryOverview from '@/components/warehouse/InventoryOverview';

export default function InventoryPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Inventory Overview</h1>
      <InventoryOverview />
    </div>
  );
}