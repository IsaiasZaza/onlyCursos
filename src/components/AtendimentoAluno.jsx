"use client";

import React from "react";
import { FaEnvelope, FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import MenuLateral from "./MenuLateral";
import { motion } from "framer-motion";

const AtendimentoAluno = () => {
  const email = "https://cetmacetma7@gmail.com";
  const whatsappNumber = "61992441951";

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Menu lateral */}
      <MenuLateral />

      <motion.div
        className="flex-grow flex flex-col justify-center items-center px-6 py-12 md:p-12"
        style={{ background: "linear-gradient(120deg, #f8fafc 0%, #e7ebf0 100%)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Glassmorphism Card */}
        <motion.div
          className="rounded-xl shadow-2xl p-8 md:p-12 bg-white/60 backdrop-blur-lg text-center max-w-lg md:max-w-4xl relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Background Shape */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-blue-500 via-purple-400 to-pink-300 opacity-10 pointer-events-none"></div>

          {/* Animated Title */}
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-black mb-6 md:mb-8"
          >
            Fale Conosco
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-base md:text-lg text-gray-600 mb-8 md:mb-12 leading-relaxed"
          >
            Nossa equipe está sempre disponível para ajudar você! Escolha uma das opções abaixo para entrar em contato
            e resolver suas dúvidas de forma rápida e eficiente.
          </motion.p>

          {/* Buttons */}
          <div className="space-y-6 md:space-y-8">
            <motion.a
              href={`mailto:${email}`}
              className="flex items-center justify-center gap-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-5 md:py-4 md:px-6 rounded-lg shadow-lg text-lg md:text-xl hover:scale-105 transform transition w-full"
              whileHover={{ scale: 1.1 }}
            >
              <FaEnvelope size={24} />
              Enviar E-mail
            </motion.a>
            <motion.a
              href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-4 bg-gradient-to-r from-green-400 to-green-600 text-white py-3 px-5 md:py-4 md:px-6 rounded-lg shadow-lg text-lg md:text-xl hover:scale-105 transform transition w-full"
              whileHover={{ scale: 1.1 }}
            >
              <FaWhatsapp size={24} />
              Chamar no WhatsApp
            </motion.a>
            
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-24 h-24 md:w-40 md:h-40 bg-gradient-to-tr from-blue-300 to-purple-300 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-24 h-24 md:w-40 md:h-40 bg-gradient-to-tr from-pink-300 to-purple-300 rounded-full opacity-20 animate-pulse"></div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AtendimentoAluno;
