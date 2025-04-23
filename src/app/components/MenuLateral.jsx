"use client";

import { useState, useEffect } from "react";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaBook,
  FaCertificate,
  FaUser,
} from "react-icons/fa";
import { FiPhone, FiLogOut } from "react-icons/fi";
import { usePathname } from "next/navigation";

const MenuLateral = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      window.location.href = "/login";
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
    }
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div className="flex bg-gradient-to-br from-cyan-100 via-white to-cyan-200 min-h-screen">
      {isMobile ? (
        <>
          <button
            onClick={toggleMenu}
            className="fixed z-50 p-3 bg-cyan-600 text-white rounded-br-3xl shadow-lg hover:bg-cyan-700 transition-all duration-300"
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {menuOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-40 z-40 backdrop-blur-sm"
              onClick={toggleMenu}
            />
          )}

          <nav
            className={`fixed top-0 left-0 h-full w-[280px] bg-white/90 backdrop-blur-md text-cyan-800 shadow-2xl transform transition-transform duration-500 ease-in-out z-50 ${
              menuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <MenuContent handleLogout={handleLogout} onLinkClick={toggleMenu} />
          </nav>
        </>
      ) : (
        <nav className="w-[300px] sticky top-0 h-screen bg-white/90 backdrop-blur-md text-cyan-800 flex flex-col left-0 shadow-2xl border-r border-cyan-200">
          <MenuContent handleLogout={handleLogout} />
        </nav>
      )}

      <main className="flex-1 transition-all">{children}</main>
    </div>
  );
};

const MenuContent = ({ handleLogout, onLinkClick = () => {} }) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-center py-6">
        <img src="/logo.png" alt="Logo" className="w-40 h-auto" />
      </div>

      <ul className="space-y-2 px-4 flex-1">
        <MenuItem href="/aluno" icon={<FaHome />} text="Página Inicial" active={pathname === "/aluno"} onClick={onLinkClick} />
        <MenuItem href="/cursos" icon={<FaBook />} text="Cursos" active={pathname === "/cursos"} onClick={onLinkClick} />
        <MenuItem href="/certificado" icon={<FaCertificate />} text="Certificados" active={pathname === "/certificado"} onClick={onLinkClick} />
        <MenuItem href="/dados" icon={<FaUser />} text="Meus Dados" active={pathname === "/dados"} onClick={onLinkClick} />
      </ul>

      <div className="p-4 border-t border-cyan-100 mt-auto">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 text-white px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 transition-all shadow-md"
        >
          <FiLogOut className="text-xl" />
          Sair
        </button>
        <div className="flex items-center gap-3 mt-4 text-sm text-cyan-700">
          <FiPhone />
          <a href="/atendimento" className="hover:underline">Atendimento</a>
        </div>
      </div>
    </div>
  );
};

const MenuItem = ({ href, icon, text, active, onClick }) => (
  <li>
    <a
      href={href}
      onClick={onClick}
      className={`flex items-center gap-4 px-4 py-2 rounded-xl transition-all duration-200 ${
        active
          ? "bg-cyan-200 font-semibold text-cyan-900 shadow-inner"
          : "hover:bg-cyan-100"
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span>{text}</span>
    </a>
  </li>
);

export default MenuLateral;
