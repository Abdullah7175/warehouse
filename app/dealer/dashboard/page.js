'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CustomerAssignment from '@/components/dealer/CustomerAssignment';
import AssignedCustomers from '@/components/dealer/AssignedCustomers';

export default function DealerDashboard() {
  const [assignedCustomers, setAssignedCustomers] = useState([]);
  const [stats, setStats] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/dealer/stats');
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error(error);
        router.push('/auth/login');
      }
    }
    fetchStats();
  }, []);

  useEffect(() => {
    async function fetchAssignedCustomers() {
      const response = await fetch('/api/dealer/customers');
      const data = await response.json();
      if (response.ok) {
        setAssignedCustomers(data.customers);
      }
    }
    fetchAssignedCustomers();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Dealer Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Assign Customer</h2>
          <CustomerAssignment 
            onAssign={(customer) => setAssignedCustomers([...assignedCustomers, customer])}
          />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Customers ({assignedCustomers.length})</h2>
          <AssignedCustomers customers={assignedCustomers} />
        </div>
        {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-medium">Total Customers</h3>
            <p className="text-3xl font-bold">{stats.totalCustomers}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-medium">Monthly Sales</h3>
            <p className="text-3xl font-bold">${stats.monthlySales}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-medium">Commission</h3>
            <p className="text-3xl font-bold">${stats.commission}</p>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}