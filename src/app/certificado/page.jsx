"use client";

import React, { useState, useEffect, useRef } from "react";
import MenuLateral from "@/components/MenuLateral";
import { decodeJwt } from "jose";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default function CertificatePage() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [dataAtual, setDataAtual] = useState("");
  const certificateRef = useRef(null);

  useEffect(() => {
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, "0");
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const ano = hoje.getFullYear();
    setDataAtual(`${dia}/${mes}/${ano}`);
  }, []);

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
        const response = await fetch(`https://api-only-mu.vercel.app/api/user/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Erro ao buscar dados do usuário");

        const data = await response.json();
        setUserData(data.user || data);
      } catch (err) {
        console.error("Erro ao buscar dados do usuário:", err);
        setError("Erro ao carregar dados do usuário");
      }
    };

    fetchUserData();
  }, []);

  const handleSelectCourse = (courseTitle) => setSelectedCourse(courseTitle);

  const handleDownloadPDF = async () => {
    if (!certificateRef.current) {
      console.warn("certificateRef.current não existe");
      return;
    }

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true, // importante se tiver imagens externas (ex: logo)
      });

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

  const handleCloseCertificate = () => setSelectedCourse(null);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <MenuLateral />
      <div className="flex-grow p-4 md:p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          <header className="bg-blue-600 p-6 text-white">
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
                  {userData.courses?.length > 0 ? (
                    userData.courses.map((course) => (
                      <div
                        key={course.id || course.title}
                        className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
                      >
                        <span className="text-gray-800 font-medium">{course.title}</span>
                        <button
                          onClick={() => handleSelectCourse(course.title)}
                          className="mt-2 sm:mt-0 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
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
                  style={{
                    width: '700px',
                    margin: '0 auto',
                    padding: '40px',
                    backgroundColor: '#ffffff',
                    backgroundImage: "url('/certificado-base.png')",
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    border: '8px solid #2563eb', // azul tailwind (blue-600)
                    borderRadius: '16px',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                    textAlign: 'center',
                    fontFamily: 'sans-serif',
                    color: '#1e3a8a', // blue-800
                  }}
                >
                  <img src="/logo.png" alt="Logo CETMA" style={{ width: '150px', margin: '0 auto 20px' }} />
                  <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '20px' }}>Certificado de Conclusão</h1>
                  <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#333' }}>
                    Certificamos que <strong>{userData?.nome}</strong> concluiu com êxito o curso{" "}
                    <strong>{selectedCourse}</strong> no dia <strong>{dataAtual}</strong>.
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '60px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <img src="/images.png" alt="Assinatura" style={{ width: '100px', marginBottom: '8px' }} />
                      <p style={{ fontSize: '12px', color: '#666' }}>Diretor(a)</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <img src="/image22.png" alt="Carimbo" style={{ width: '80px', marginBottom: '8px' }} />
                      <p style={{ fontSize: '12px', color: '#666' }}>Carimbo Oficial</p>
                    </div>
                  </div>
                </div>


                <div className="mt-6 text-center flex flex-col sm:flex-row justify-center items-center gap-4">
                  <button
                    onClick={handleDownloadPDF}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
                  >
                    Download PDF
                  </button>
                  <button
                    onClick={handleCloseCertificate}
                    className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
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
