'use client';

import { useState } from 'react';

const CheckoutButton = ({ courseId, userId, title, price }) => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api-only-mu.vercel.app/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId, userId, title, price }),
      });

      const data = await response.json();
      console.log('Resposta da API:', data);

      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        console.error('init_point não encontrado:', data);
        alert('Erro ao iniciar o checkout.');
      }
    } catch (error) {
      console.error('Erro ao iniciar o checkout:', error);
      alert('Erro ao processar o checkout.');
    }
    setLoading(false);
  };

  return (
    <button
      className="mt-6 inline-block bg-gradient-to-r w-full from-blue-500 to-blue-700 text-white px-8 py-3 rounded-full font-bold text-lg hover:from-blue-600 hover:to-blue-800 transition-transform transform hover:scale-105"
      onClick={handleCheckout}
      disabled={loading}
    >
      {loading ? 'Carregando...' : 'Comprar'}
    </button>
  );
};

export default CheckoutButton;
