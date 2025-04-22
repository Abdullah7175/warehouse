'use client';
import { useCart } from '@/hooks/useCart';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Shopping Cart</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-8">
          <p>Your cart is empty</p>
        </div>
      ) : (
        <div className="bg-white rounded shadow overflow-hidden">
          <div className="divide-y">
            {cart.map(item => (
              <div key={item.id} className="p-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-100 rounded"></div>
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="w-16 px-2 py-1 border rounded"
                  />
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t bg-gray-50">
            <div className="flex justify-between items-center">
              <span className="font-bold">Total:</span>
              <span className="font-bold text-xl">${total.toFixed(2)}</span>
            </div>
            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}