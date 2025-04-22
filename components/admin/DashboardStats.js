'use client';
import { FiPackage, FiBox, FiDollarSign } from 'react-icons/fi';

export default function DashboardStats({ products, inventory, sales }) {
  const stats = [
    { 
      title: 'Total Products', 
      value: products || 0,
      icon: <FiPackage className="w-6 h-6" />,
      color: 'text-blue-600 bg-blue-100'
    },
    { 
      title: 'Available Inventory', 
      value: inventory || 0,
      icon: <FiBox className="w-6 h-6" />,
      color: 'text-green-600 bg-green-100'
    },
    { 
      title: 'Recent Sales (24h)', 
      value: sales || 0,
      icon: <FiDollarSign className="w-6 h-6" />,
      color: 'text-orange-600 bg-orange-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${stat.color}`}>
              {stat.icon}
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <p className="text-2xl font-semibold">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}