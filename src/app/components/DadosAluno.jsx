"use client";

import React, { useState, useEffect } from "react";
import { FaEdit, FaCamera, FaTrash, FaLock } from "react-icons/fa";
import { decodeJwt } from "jose";
import MenuLateral from "./MenuLateral";
import Image from "next/image";

const ProfilePage = () => {
  const [profilePhoto, setProfilePhoto] = useState("https://via.placeholder.com/150");
  const [userData, setUserData] = useState({
    nome: "Carregando...",
    email: "Carregando...",
    estado: "Carregando...",
    sobre: "Carregando...",
    cpf: "Carregando...",
    profissao: "Carregando...",
  });
  const [userId, setUserId] = useState("");
  const [editingField, setEditingField] = useState("");
  const [modalValue, setModalValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const formatCPF = (cpf) => {
    if (!cpf) return "";
    const digits = cpf.replace(/\D/g, "");
    if (digits.length !== 11) return cpf;
    return `${digits.substring(0, 3)}.${digits.substring(3, 6)}.${digits.substring(6, 9)}-${digits.substring(9, 11)}`;
  };

  const handleEditField = (field) => {
    setEditingField(field);
    setModalValue(userData[field] || "");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          window.location.href = "/login";
          return;
        }
        const decodedToken = decodeJwt(token);
        const userId = decodedToken.id;
        setUserId(userId);

        const response = await fetch(`https://api-only-mu.vercel.app/api/user/${userId}`, {
          method: "GET",
          headers: { "Authorization": `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Erro ao buscar dados do usuário");

        const data = await response.json();
        setUserData({
          nome: data.user.nome || "Nome não disponível",
          email: data.user.email || "Email não disponível",
          estado: data.user.estado || "Estado não disponível",
          sobre: data.user.sobre || "Sobre não disponível",
          cpf: data.user.cpf || "CPF não disponível",
          profissao: data.user.profissao || "Profissão não disponível",
          profilePicture: "logo.png",
        });
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };
    fetchUserData();
  }, []);

  const handlePhotoChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profilePicture", file);
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch(`https://api-only-mu.vercel.app/api/user/${userId}/profile-picture`, {
          method: "PUT",
          body: formData,
        });
        if (!response.ok) throw new Error("Erro ao atualizar foto de perfil");
        const data = await response.json();
        setProfilePhoto(data.user.profilePicture);
        localStorage.setItem("token", data.token);
      } catch (error) {
        console.error("Erro ao atualizar foto de perfil:", error);
      }
    }
  };

  const handleSaveField = async () => {
    if (!editingField || isSubmitting) return;
    setIsSubmitting(true);
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(`https://api-only-mu.vercel.app/api/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ [editingField]: modalValue }),
      });
      if (!response.ok) throw new Error("Erro ao atualizar o campo.");

      const data = await response.json();
      setUserData((prev) => ({
        ...prev,
        [editingField]: data.user[editingField] || modalValue,
      }));
      setEditingField("");
      setModalValue("");
    } catch (error) {
      console.error("Erro ao salvar campo:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemovePhoto = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await fetch(`https://api-only-mu.vercel.app/api/user/${userId}/profile-picture`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Erro ao remover foto de perfil");
      setUserData((prev) => ({
        ...prev,
        profilePicture: "https://via.placeholder.com/150",
      }));
    } catch (error) {
      console.error("Erro ao remover foto de perfil:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <MenuLateral />

      <main className="flex-grow bg-gray-50 p-4 sm:p-8">
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-6 sm:p-10 space-y-10">

          {/* Seção de Foto e Dados */}
          <div className="flex flex-col md:flex-row gap-8 items-center border-b pb-8">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-blue-600 shadow-md">
              <img
                src={`/${userData.profilePicture}`}
                alt="Foto do Perfil"
                className="w-full h-full object-cover"
              />
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </div>

            <div className="text-center md:text-left space-y-1">
              <h1 className="text-3xl font-bold text-gray-800">{userData.nome}</h1>
              <p className="text-blue-700 font-medium">{userData.estado}</p>
              <p className="text-gray-600 text-sm mt-1">{userData.sobre}</p>
            </div>
          </div>

          {/* Seção de Campos */}
          <div className="space-y-4">
            {Object.entries(userData)
              .filter(([field]) => field !== "profilePicture" && field !== "senha")
              .map(([field, value]) => (
                <div
                  key={field}
                  className="flex flex-col md:flex-row md:items-center justify-between bg-gray-50 border border-gray-200 rounded-xl shadow-sm p-4 hover:shadow-md transition"
                >
                  {/* Mobile layout */}
                  <div className="block md:hidden mb-2">
                    <label className="block text-gray-700 font-medium capitalize mb-1">
                      {field === "bio" ? "Biografia" : field}
                    </label>
                    <p className="text-gray-600">{field === "cpf" ? formatCPF(value) : value}</p>
                  </div>

                  {/* Desktop layout */}
                  <div className="hidden md:flex items-center gap-4 w-full">
                    <span className="text-gray-600 text-lg">
                      {field === "email" ? <FaLock /> : <FaEdit />}
                    </span>
                    <label className="w-40 text-gray-700 font-medium capitalize">
                      {field === "bio" ? "Biografia" : field}
                    </label>
                    <p className="flex-grow text-gray-600">
                      {field === "cpf" ? formatCPF(value) : value}
                    </p>
                    {(field === "email" || field === "cpf" || field === "nome") ? (
                      <div className="text-gray-400 flex items-center gap-2">
                        <FaLock />
                        <span>Inalterável</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEditField(field)}
                        className="text-blue-600 hover:underline flex items-center gap-1 transition-colors"
                      >
                        <FaEdit />
                        Editar
                      </button>
                    )}
                  </div>
                </div>
              ))}

            {/* Botão de Alterar Senha */}
            <div className="pt-2">
              <button
                onClick={() => setIsPasswordModalOpen(true)}
                className="flex items-center gap-2 text-blue-600 hover:underline font-medium px-4 py-2 bg-white rounded-lg border border-blue-500 shadow transition"
              >
                <FaLock /> Alterar Senha
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Modal de Senha */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-11/12 max-w-sm p-6 space-y-4">
            <h2 className="text-xl font-bold text-center text-gray-800">Alterar Senha</h2>
            <div>
              <label className="block text-gray-700 mb-1">Senha Atual</label>
              <input
                type="password"
                className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={senhaAtual}
                onChange={(e) => setSenhaAtual(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Nova Senha</label>
              <input
                type="password"
                className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center pt-4">
              <button
                className="text-red-600 hover:underline"
                onClick={() => setIsPasswordModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                onClick={handleSaveField}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Campo */}
      {editingField && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-11/12 max-w-md p-6 space-y-4">
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Editar {editingField === "bio" ? "Biografia" : editingField}
            </h2>
            <input
              type={editingField === "senha" ? "password" : "text"}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={modalValue}
              onChange={(e) => setModalValue(e.target.value)}
            />
            <div className="flex justify-end gap-4 pt-2">
              <button
                className="bg-gray-100 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-200 transition"
                onClick={() => setEditingField("")}
              >
                Cancelar
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-white ${isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"} transition`}
                onClick={handleSaveField}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

};

export default ProfilePage;