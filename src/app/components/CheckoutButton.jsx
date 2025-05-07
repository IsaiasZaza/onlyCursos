"use client"


import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Carrega a chave publicável do Stripe (definida como variável de ambiente)
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CheckoutButton = ({ courseId, userId }) => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      // Chama sua API que cria a sessão do Stripe
      const response = await fetch('http://localhost:3003/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId, userId }),
      });

      const { sessionId } = await response.json();

      // Obtém a instância do Stripe e redireciona para o Checkout
      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        // Caso ocorra algum erro durante o redirecionamento
        console.error(result.error.message);
      }
    } catch (error) {
      console.error('Erro ao iniciar o checkout:', error);
    }
    setLoading(false);
  };

  return (
    <button                   className="mt-6 inline-block bg-gradient-to-r w-full from-blue-500 to-blue-700 text-white px-8 py-3 rounded-full font-bold text-lg hover:from-blue-600 hover:to-blue-800 transition-transform transform hover:scale-105"
    onClick={handleCheckout} disabled={loading}>
      {loading ? 'Carregando...' : 'Comprar'}
    </button>
  );
};

export default CheckoutButton;
