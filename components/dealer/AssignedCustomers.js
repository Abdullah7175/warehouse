'use client';
import Link from 'next/link';

export default function AssignedCustomers({ customers }) {
  if (customers.length === 0) {
    return (
      <div className="text-gray-500 text-center py-8">
        You haven't assigned any customers yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Orders
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Spent
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <Link 
                  href={`/dealer/customers/${customer.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {customer.name}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {customer.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {customer.total_orders}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                ${customer.total_spent || 0}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}