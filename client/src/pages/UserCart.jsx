import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

export const UserCart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch('http://4.233.138.141:3001/api/cart/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch cart');
        }

        const data = await response.json();
        console.log(data);
        setCart(data);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleRemoveItem = async (id) => {
    try {
      const response = await fetch(`http://4.233.138.141:3001/api/cart/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete item');
      }

      setCart(await response.json());
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleQuantityChange = async (id, quantity) => {
    try {
      const response = await fetch(`https://4.233.138.141:3001/api/cart/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ quantity })
      });

      if (!response.ok) {
        throw new Error('Failed to update quantity');
      }

      setCart(cart.map(item => item.id === id ? { ...item, quantity } : item));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + item.article_price * item.quantity, 0);
  const totalShipping = cart.reduce((acc, item) => acc + item.shipping_cost * item.quantity, 0);
  const totalCommission = cart.reduce((acc, item) => acc + (item.article_price * 0.1 * item.quantity), 0);
  const total = subtotal + totalShipping + totalCommission;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-64 w-64"></div>
      </div>
    );
  }

  return (
    <main className='container mx-auto py-28 px-12'>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-2">
          {cart.map((item) => (
            <div key={item.article_id} className="border rounded-lg p-6 mb-4 relative transition-transform duration-300 hover:scale-105">
              <div className="flex items-start mb-4">
                <NavLink to={`/articles/:${item.article_id}`} className="mr-8">
                  <img src={item.article_photo} alt={item.article_title} className="w-32 h-32 object-cover" />
                </NavLink>
                <div className="flex-1">
                  <div className="text-xl mb-2 font-medium">{item.article_price}€</div>
                  <NavLink to={`/articles/:${item.article_id}`}>
                    <h2 className="text-lg font-semibold">{item.article_title}</h2>
                  </NavLink>
                  <p className="text-gray-600">{item.article_description.length > 100 ? item.article_description.slice(0, 100) + '...' : item.article_description}</p>
                  <div className="mt-2">
                    <span className="text-gray-500">Frais de livraison: </span>
                    <span className="font-medium">{item.shipping_cost}€</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Commission: </span>
                    <span className="font-medium">{(item.article_price * 0.05).toFixed(2)}€ (5%)</span> 
                  </div>
                  <div className="flex items-center mt-4">
                    <label className="mr-2">Quantité:</label>
                    <select
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                      className="border rounded px-2 py-1 transition duration-300 hover:bg-gray-200"
                    >
                      {[...Array(10).keys()].map(x => (
                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <button onClick={() => handleRemoveItem(item.id)} className="absolute top-4 right-4 mt-2 mr-2 lg:ml-4 transition-transform duration-300 hover:scale-125">
                <FiX className="text-red-600 w-6 h-6" />
              </button>
            </div>
          ))}
          <div className="mt-8 flex flex-col justify-center items-center">
            <div className='flex flex-row gap-5'>
              <h3 className="text-lg font-normal tracking-wider uppercase">Sous-total</h3>
              <h3 className="text-lg font-semibold tracking-wider uppercase">{subtotal}€</h3>
            </div>
            <p className="text-sm text-gray-500 mt-1">(Sans commission ni frais de livraison)</p>
          </div>
        </div>
        <div className="col-span-2 lg:col-span-1">
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold tracking-wider uppercase">Total</h3>
            <div className="flex justify-between mt-4">
              <span>Sous-total:</span>
              <span>{subtotal.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between mt-2">
              <span>Livraison:</span>
              <span>{totalShipping.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between mt-2">
              <span>Commission:</span>
              <span>{totalCommission.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between mt-4 font-bold">
              <span>Total TTC:</span>
              <span>{total.toFixed(2)}€</span>
            </div>
            <button className="mt-4 w-full bg-gold text-white py-2 rounded hover:bg-white hover:text-gold hover:border hover:border-gold transition-colors duration-300">
              Paiement
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default UserCart;
