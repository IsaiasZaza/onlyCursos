"use client";

import React, { useState, useEffect, useRef } from "react";
import MenuLateral from "../components/MenuLateral";
import { decodeJwt } from "jose";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default function CertificatePage() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [dataAtual, setDataAtual] = useState("");
  const certificateRef = useRef(null);

  // Define a data atual automaticamente (formato dd/mm/aaaa)
  useEffect(() => {
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, "0");
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const ano = hoje.getFullYear();
    setDataAtual(`${dia}/${mes}/${ano}`);
  }, []);

  // Busca os dados do usuário automaticamente com base no token
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
        return;
      }
      try {
        const decodedToken = decodeJwt(token);
        const userId = decodedToken.id;
        const response = await fetch(`http://localhost:3003/api/user/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Erro ao buscar dados do usuário");
        }
        const data = await response.json();
        setUserData(data.user || data);
      } catch (err) {
        console.error("Erro ao buscar dados do usuário:", err);
        setError("Erro ao carregar dados do usuário");
      }
    };
    fetchUserData();
  }, []);

  // Seleciona o curso
  const handleSelectCourse = (courseTitle) => {
    setSelectedCourse(courseTitle);
  };

  // Função que gera o PDF usando html2canvas e jsPDF
  const handleDownloadPDF = async () => {
    if (!certificateRef.current) return;
    try {
      const canvas = await html2canvas(certificateRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("certificado.pdf");
    } catch (err) {
      console.error("Erro ao gerar PDF:", err);
      setError("Erro ao gerar o PDF do certificado");
    }
  };

  // Função para fechar a visualização do certificado
  const handleCloseCertificate = () => {
    setSelectedCourse(null);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <MenuLateral />
      <div className="flex-grow p-4 md:p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          <header className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-center">
              Gerar Certificado
            </h1>
          </header>

          <div className="p-4 sm:p-6 lg:p-8">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-center">
                {error}
              </div>
            )}

            {!userData ? (
              <p className="text-center text-gray-600">Carregando dados do usuário...</p>
            ) : (
              <div>
                <h2 className="text-lg font-semibold mb-4 text-center text-gray-800">
                  Selecione um curso para gerar o certificado:
                </h2>
                <div className="space-y-4">
                  {userData.courses && userData.courses.length > 0 ? (
                    userData.courses.map((course) => (
                      <div
                        key={course.id || course.title}
                        className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-lg shadow hover:shadow-lg transition-transform duration-300 transform "
                      >
                        <span className="text-gray-800 font-medium">{course.title}</span>
                        <button
                          onClick={() => handleSelectCourse(course.title)}
                          className="mt-2 sm:mt-0 bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors"
                        >
                          Gerar Certificado
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-600">Nenhum curso encontrado.</p>
                  )}
                </div>
              </div>
            )}

            {selectedCourse && (
              <div className="mt-10">
                <h3 className="text-xl font-bold text-gray-800 text-center mb-4">
                  Pré-visualização do Certificado
                </h3>
                <div
                  ref={certificateRef}
                  className="relative mx-auto max-w-4xl w-full rounded-xl overflow-hidden border-4 border-blue-600 shadow-2xl bg-cover bg-center bg-no-repeat p-6"
                  style={{ backgroundImage: "url('/certificado-base.png')" }}
                >
                  <div className="text-center">
                    <img
                      src="/logoOficial.png"
                      alt="Logo CETMA"
                      className="mx-auto w-32 sm:w-40 mb-4"
                    />
                  </div>
                  <div className="text-center">
                    <h1 className="text-2xl sm:text-4xl font-bold text-blue-800">
                      Certificado de Conclusão
                    </h1>
                    <p className="mt-4 sm:mt-6 text-base sm:text-xl leading-relaxed text-gray-700">
                      Certificamos que{" "}
                      <strong className="font-semibold">{userData.nome}</strong> concluiu com êxito o curso{" "}
                      <strong className="font-semibold">{selectedCourse}</strong> no dia{" "}
                      <strong className="font-semibold">{dataAtual}</strong>.
                    </p>
                  </div>
                  <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row justify-evenly items-center gap-6">
                    <div className="flex flex-col items-center">
                      <img
                        src="/assinatura.png"
                        alt="Assinatura"
                        className="w-24 sm:w-32 mb-2"
                      />
                      <p className="text-xs sm:text-sm text-gray-600">Diretor(a)</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <img
                        src="/carimbo.png"
                        alt="Carimbo"
                        className="w-16 sm:w-20 mb-2"
                      />
                      <p className="text-xs sm:text-sm text-gray-600">Carimbo Oficial</p>
                    </div>
                  </div>
                </div>

                {/* Botões de ação */}
                <div className="mt-6 text-center flex flex-col sm:flex-row justify-center items-center gap-4">
                  <button
                    onClick={handleDownloadPDF}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition-colors"
                  >
                    Download PDF
                  </button>
                  <button
                    onClick={handleCloseCertificate}
                    className="bg-red-600 text-white px-6 py-3 rounded-lg shadow hover:bg-red-700 transition-colors"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}