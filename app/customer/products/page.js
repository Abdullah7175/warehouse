'use client';
import { useState, useEffect } from 'react';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  if (loading) return <div>Loading products...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Our Products</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-gray-600 text-sm my-2">{product.description}</p>
            <p className="font-bold">${product.selling_price}</p>
            <button 
              onClick={() => addToCart(product)}
              className="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-sm"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      
      {/* Cart Preview */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-white p-4 rounded shadow-lg border">
          <h3 className="font-semibold">Your Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})</h3>
          <button className="mt-2 bg-green-500 text-white px-3 py-1 rounded text-sm">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}