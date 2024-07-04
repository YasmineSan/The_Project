import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51PWEtF2Kq8XatW7q7Vjga2elQagu6zi8Y3u1JM92VgXDSKqPpNNy0hx2muypSjci1rW6wumGMyzMSnEjFRrQnyY000VY8Zg9Ca');

const CheckoutForm = ({ total }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentMessage, setPaymentMessage] = useState('');
  const [response , setResponse] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setPaymentMessage(error.message);
    } else {
      setPaymentMessage('Paiement effectué avec succès !');

      // Ajoute une commande
      const handleAddOrder = async () => {
        try {
          const response = await fetch('http://4.233.138.141:3001/api/payments/create-payment-intent', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ total, "currency":'EUR' })
          });
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const data = await response.json();
          setResponse(data);
          console.log(data);
        } catch (error) {
          console.error('Error fetching articles:', error);
        }
      };

      handleAddOrder();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" className="mt-4 w-full bg-gold text-white py-2 rounded hover:bg-white border hover:text-gold hover:border hover:border-gold transition-colors duration-300" disabled={!stripe}>
        Payer {total.toFixed(2)}€
      </button>
      {paymentMessage && <div className="mt-4 text-center text-green-500">{paymentMessage}</div>}
    </form>
  );
};

export const UserCart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top
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

      const updatedCart = cart.filter(item => item.article_id !== id);
      setCart(updatedCart);
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
    <div className="bg-gray-100 min-h-screen">
      <main className='container mx-auto py-28 px-4 sm:px-6 lg:px-8'>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-2">
            {cart.map((item, i) => (
              <div key={i} className="border rounded-lg p-4 mb-4 bg-white relative">
                <div className="flex flex-col md:flex-row items-start mb-4">
                  <NavLink to={`/articles/${item.article_id}`} className="mr-0 md:mr-8 mb-4 md:mb-0">
                    <img src={item.article_photo} alt={item.title} className="w-32 h-32 object-cover" />
                  </NavLink>
                  <div className="flex-1">
                    <div className="text-xl mb-2 font-medium">{item.article_price}€</div>
                      <h2 className="text-lg font-semibold"><NavLink to={`/articles/${item.article_id}`} className="hover:text-gold">{item.title}</NavLink></h2>
                    <p className="text-gray-600">{item.article_description.length > 100 ? item.article_description.slice(0, 100) + '...' : item.article_description}</p>
                    <div className="mt-2">
                      <span className="text-gray-500">Frais de livraison: </span>
                      <span className="font-medium">{item.shipping_cost}€</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Commission: </span>
                      <span className="font-medium">{(item.article_price * 0.1).toFixed(2)}€ (10%)</span> 
                    </div>
                  </div>
                </div>
                <button onClick={() => handleRemoveItem(item.article_id)} className="absolute top-4 right-4 mt-2 mr-2 lg:ml-4 transition-transform duration-300 hover:scale-125">
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
          <div className="col-span-2 lg:col-span-1 bg-white shadow-lg rounded-lg h-[330px]">
            <div className="p-4">
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
              <div className="mt-4 p-2 bg-slate-100 shadow-lg">
                <Elements stripe={stripePromise}>
                  <CheckoutForm total={total} />
                </Elements>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserCart;
