"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const menuItems = [
  { name: "Início", href: "hero" },
  { name: "Acessar Plataforma", href: "features" },
  { name: "Contato", href: "formulario" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#010101]/80 backdrop-blur-md shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo com Image */}
        <a href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-principal">OnlyCursos</span>
        </a>

        {/* Ícone do Menu */}
        <button
          className="lg:hidden text-claro"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <AiOutlineClose size={28} /> : <AiOutlineMenu size={28} />}
        </button>

        {/* Menu Desktop */}
        <ul className="hidden lg:flex gap-6 items-center text-base">
          {menuItems.map((item) => (
            <li key={item.name}>
              <a
                href={`#${item.href}`}
                className="text-principal hover:text-[#7F4DFF] cursor-pointer"
              >
                {item.name}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/login"
              className="text-white bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-xl shadow transition"
            >
              Entrar
            </a>
          </li>
        </ul>
      </div>

      {/* Menu Mobile */}
      <div
        className={`fixed top-0 right-0 w-full h-auto bg-[#010101]/80 backdrop-blur-md shadow-md flex flex-col items-center p-6 transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <button
          className="absolute top-4 right-4 text-claro"
          onClick={() => setMenuOpen(false)}
        >
          <AiOutlineClose size={28} />
        </button>

        <ul className="flex flex-col items-center gap-6 mt-10">
          {menuItems.map((item) => (
            <li key={item.name}>
              <a
                href={`#${item.href}`}
                className="text-lg text-principal hover:text-[#7F4DFF] cursor-pointer"
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/login"
              className="text-white bg-cyan-500 hover:bg-cyan-600 px-6 py-2 rounded-xl shadow transition"
              onClick={() => setMenuOpen(false)}
            >
              Entrar
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
