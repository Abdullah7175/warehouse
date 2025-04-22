import CategoriesManager from '@/components/warehouse/CategoriesManager';

export default function CategoriesPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Categories Management</h1>
      <CategoriesManager />
    </div>
  );
}