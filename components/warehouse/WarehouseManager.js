'use client';
import { useState, useEffect } from 'react';
import { query } from '@/lib/db';

export default function WarehouseManager() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const itemsRes = await fetch('/api/warehouse/items');
        const itemsData = await itemsRes.json();
        setItems(itemsData);
        
        const categoriesRes = await fetch('/api/warehouse/categories');
        const categoriesData = await categoriesRes.json();
        setCategories(categoriesData);
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    }
    loadData();
  }, []);

  if (loading) return <div>Loading warehouse data...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Warehouse Management</h2>
      
      <div className="mb-6">
        <h3 className="font-medium mb-2">Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map(category => (
            <div key={category.id} className="bg-white p-3 rounded shadow">
              <h4 className="font-medium">{category.name}</h4>
              <p className="text-sm text-gray-600">{category.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-2">Inventory Items</h3>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Category</th>
              <th className="py-2 px-4 border">SKU</th>
              <th className="py-2 px-4 border">Quantity</th>
              <th className="py-2 px-4 border">Price</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td className="py-2 px-4 border">{item.name}</td>
                <td className="py-2 px-4 border">
                  {categories.find(c => c.id === item.category_id)?.name || 'N/A'}
                </td>
                <td className="py-2 px-4 border">{item.sku}</td>
                <td className="py-2 px-4 border">{item.quantity}</td>
                <td className="py-2 px-4 border">{item.selling_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}