'use client';
import { useState, useEffect } from 'react';

export default function CustomerForm({ customer, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    customer_type: 'individual',
    email: '',
    phone: '',
    address: '',
    tax_id: '',
    notes: '',
    first_name: '',
    last_name: '',
    company_name: '',
    company_reg_number: '',
    contact_person: '',
    credit_limit: 0,
    payment_terms: 'NET 30',
    is_active: true
  });

  useEffect(() => {
    if (customer) {
      setFormData({
        customer_type: customer.customer_type,
        email: customer.email || '',
        phone: customer.phone || '',
        address: customer.address || '',
        tax_id: customer.tax_id || '',
        notes: customer.notes || '',
        first_name: customer.first_name || '',
        last_name: customer.last_name || '',
        company_name: customer.company_name || '',
        company_reg_number: customer.company_reg_number || '',
        contact_person: customer.contact_person || '',
        credit_limit: customer.credit_limit || 0,
        payment_terms: customer.payment_terms || 'NET 30',
        is_active: customer.is_active !== false
      });
    }
  }, [customer]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white p-6 rounded shadow mb-6">
      <h3 className="text-lg font-medium mb-4">
        {customer ? 'Edit Customer' : 'Add New Customer'}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customer Type
            </label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="customer_type"
                  value="individual"
                  checked={formData.customer_type === 'individual'}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600"
                />
                <span className="ml-2">Individual</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="customer_type"
                  value="company"
                  checked={formData.customer_type === 'company'}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600"
                />
                <span className="ml-2">Company</span>
              </label>
            </div>
          </div>

          {formData.customer_type === 'individual' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name*
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name*
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name*
                </label>
                <input
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Registration Number
                </label>
                <input
                  type="text"
                  name="company_reg_number"
                  value={formData.company_reg_number}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Person*
                </label>
                <input
                  type="text"
                  name="contact_person"
                  value={formData.contact_person}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone*
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address*
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tax ID
            </label>
            <input
              type="text"
              name="tax_id"
              value={formData.tax_id}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Credit Limit
            </label>
            <input
              type="number"
              name="credit_limit"
              value={formData.credit_limit}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Terms
            </label>
            <select
              name="payment_terms"
              value={formData.payment_terms}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="NET 15">NET 15</option>
              <option value="NET 30">NET 30</option>
              <option value="NET 60">NET 60</option>
              <option value="Due on Receipt">Due on Receipt</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={2}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600"
            />
            <label className="ml-2 block text-sm text-gray-700">
              Active Customer
            </label>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {customer ? 'Update Customer' : 'Add Customer'}
          </button>
        </div>
      </form>
    </div>
  );
}