import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

export const UserCart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler une réponse de l'API avec des données fictives
    const fakeCart = [
      {
        id: 1,
        image: 'https://picsum.photos/200/300',
        title: 'Article 1',
        description: 'Description de l\'article 1 qui est assez longue pour être coupée...',
        price: 20.0,
        shipping: 5.0,
        sellerCity: 'Paris',
        quantity: 2
      },
      {
        id: 2,
        image: 'https://picsum.photos/200/300',
        title: 'Article 2',
        description: 'Description de l\'article 2.',
        price: 15.0,
        shipping: 3.0,
        sellerCity: 'Lyon',
        quantity: 1
      }
    ];
    setCart(fakeCart);
    setLoading(false);

    // Commenter l'appel réel à l'API
    /*
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
        setCart(data);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };

    fetchCart();
    */
  }, []);

  const handleRemoveItem = (id) => {
    // Simuler la suppression locale sans appel API
    setCart(cart.filter(item => item.id !== id));

    // Commenter l'appel réel à l'API
    /*
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

      setCart(cart.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error:', error);
    }
    */
  };

  const handleQuantityChange = (id, quantity) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity: quantity } : item));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalShipping = cart.reduce((acc, item) => acc + item.shipping * item.quantity, 0);
  const totalCommission = cart.reduce((acc, item) => acc + (item.price * 0.1 * item.quantity), 0);
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
            <div key={item.id} className="border rounded-lg p-6 mb-4 relative transition-transform duration-300 hover:scale-105">
              <div className="flex items-start mb-4">
                <img src={item.image} alt={item.title} className="w-32 h-32 object-cover mr-8 transition-transform duration-300 hover:scale-110" />
                <div className="flex-1">
                  <div className="text-xl mb-2 font-medium">{item.price}€</div>
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-gray-600">{item.description.length > 100 ? item.description.slice(0, 100) + '...' : item.description}</p>
                  <div className="mt-2">
                    <span className="text-gray-500">Frais de livraison: </span>
                    <span className="font-medium">{item.shipping}€</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Commission: </span>
                    <span className="font-medium">{(item.price * 0.1).toFixed(2)}€ (10%)</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Expédié depuis: </span>
                    <span className="font-medium">{item.sellerCity}</span>
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
                <FiX className="text-red-600 w-6 h-6" /> {/* Taille ajustée */}
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
