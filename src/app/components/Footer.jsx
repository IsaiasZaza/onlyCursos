"use client"

import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const menuItems = [
    { name: "Início", href: "hero" },
    { name: "Recursos", href: "features" },
    { name: "Portfólio", href: "portifolio" },
    { name: "Público-Alvo", href: "publico-alvo" },
    { name: "Contato", href: "formulario" },
  ];

  return (
    <footer className="relative bg-gradient-to-r from-gray-900 to-black text-white py-12 overflow-hidden">
      {/* Luzes animadas */}
      <div className="absolute top-[10%] left-[20%] w-[250px] h-[350px] bg-principal rounded-full blur-[100px] opacity-20 animate-pulseSlow pointer-events-none z-0 sm:w-[400px] sm:h-[500px]" />
      <div className="absolute top-[50%] right-[10%] w-[300px] h-[300px] bg-[#7F4DFF] rounded-full blur-[120px] opacity-20 animate-pulseMedium pointer-events-none z-0 sm:w-[500px] sm:h-[500px]" />
      <div className="absolute bottom-[10%] left-[50%] -translate-x-1/2 w-[350px] h-[250px] bg-principal rounded-full blur-[100px] opacity-20 animate-pulseFast pointer-events-none z-0 sm:w-[500px] sm:h-[400px]" />

      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left relative z-10">
        {/* Seção de Logo e Descrição */}
        <div className="border-b border-gray-700 pb-6 md:border-none md:pb-0">
          <div className="pb-6 md:pb-0 md:pr-6">
            <img
              src="/jovens.png"
              alt="Logo"
              className="mx-auto md:mx-0 w-auto h-auto max-w-[200px]"
            />
          </div>
        </div>

        {/* Seção de Links */}
        <div className="border-b border-gray-700 pb-6 md:border-none md:pb-0">
          <h2 className="text-2xl text-claro font-semibold mb-6">Navegação</h2>
          <ul className="space-y-3 text-gray-300">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  to={item.href}
                  smooth={true}
                  duration={500}
                  className="hover:text-principal transition-all duration-300 transform hover:scale-110 cursor-pointer"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Seção de Redes Sociais */}
        <div>
          <h2 className="text-2xl font-semibold text-claro mb-6">Conecte-se Conosco</h2>
          <div className="flex justify-center md:justify-start gap-6">
            <a
              href="https://www.instagram.com/os3jovens/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-pink-500 hover:text-white transition-all duration-300 transform hover:scale-110"
            >
              <FaInstagram />
            </a>
            <a
              href="https://wa.link/3u5tn2"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-green-500 hover:text-white transition-all duration-300 transform hover:scale-110"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      {/* Linha Divisória Iluminada */}
      <div
        id="formulario"
        className="relative border-t border-transparent mt-12 mx-6 pt-6 text-center text-gray-500 text-sm z-10"
        style={{ borderImage: "linear-gradient(to left, #7F4DFF, #6121ff)", borderImageSlice: 1 }}
      >
        &copy; 2025 zaza. Todos os direitos reservados.
      </div>
    </footer>
  );
}