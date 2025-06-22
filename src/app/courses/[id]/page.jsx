"use client";

import MenuLateral from "@/components/MenuLateral";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdPricetag } from "react-icons/io";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import AOS from "aos";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { decodeJwt } from 'jose';
import CheckoutButton from "@/components/CheckoutButton";
import Slogan from "@/components/Slogan";


export default function cursosPresencial() {

  const router = useRouter();

  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [userId, setUserId] = useState(null); // estado para o id do usuário


  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`https://api-only-mu.vercel.app/api/curso/${id}`);
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        console.error("Erro ao buscar curso:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCourse();
  }, [id]);

  const handleRedirect = (url) => {
    router.push(url);
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });

    // Fetch courses from API
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          window.location.href = "/login";
          return;
        }
        const response = await fetch("https://api-only-mu.vercel.app/api/cursos");
        const data = await response.json();
        const mainCourses = data.filter((course) => !course.parentCourseId);
        setCourses(mainCourses);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedToken = decodeJwt(token);
    setUserId(decodedToken.id);
  }, []);



  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen">
      </div>
    );
  }

  return (
    <>
      <div className=" min-h-screen flex">
        {/* Menu Lateral */}
        <MenuLateral />

        {/* Wrapper do conteúdo para evitar sobreposição */}
        <div className="flex-1 flex flex-col">
          {/* Hero Section */}
          <div className="relative bg-[url('/Fita_aprentacao_de_cada_curso.png')] bg-cover bg-center h-[45vh] text-white flex flex-col justify-center items-start pl-4 md:pl-10 lg:pl-20">
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
            <div className="relative w-full md:full 2xl:w-1/2 text-left space-y-4">
              <h2 className="text-lg md:text-xl font-extrabold text-blue-400">
                Desconto de inauguração
              </h2>
              <p className="text-2xl sm:text-4xl lg:text-2xl 2xl:text-5xl  font-bold leading-tight">
                {course.title}
              </p>
              <p className="text-md md:text-lg text-gray-200">
                <Slogan />
              </p>
            </div>
          </div>

          {/* About Section */}
          <section className="py-16 lg:px-20 px-4 bg-gray-100">
            <div className="max-w-screen-2xl gap-x-60 mx-auto grid xl:grid-cols-2 grid-cols-1 gap-6">
              <div>
                <h2 className="text-2xl font-bold text-blue-900">
                  Por que estudar {course.title} pode impulsionar sua carreira?
                </h2>

                <div className="mt-8 space-y-4 text-gray-700 leading-relaxed">
                  <p className="text-xl font-semibold text-blue-900">
                    🚀 Curso Presencial OnlyCursos
                  </p>
                  <p>
                    Do Básico ao Clínico: Como o ECG Guia o Raciocínio Médico.
                    Se você busca crescimento profissional e deseja se destacar na medicina, este curso é a oportunidade ideal! A OnlyCursos oferece formação de alta qualidade, com foco prático e direcionada por especialistas reconhecidos.
                  </p>

                  <p className="font-semibold text-blue-900 mt-6">🎯 Objetivo do Curso</p>
                  <p>
                    Aprimorar o conhecimento médico na avaliação assertiva do ECG, conectando o traçado eletrocardiográfico com o raciocínio clínico e a tomada de decisão diagnóstica.
                  </p>

                  <p className="font-semibold text-blue-900 mt-6">✅ Por que escolher a OnlyCursos?</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>👨‍🏫 Especialistas com reconhecimento (RQE):</strong> Curso ministrado por {course.instructorName}, {course.instructorTitle} ({course.instructorCRM}).</li>
                    <li><strong>📘 Material exclusivo:</strong> Acompanhamento presencial com guia de aprendizagem prático.</li>
                    <li><strong>🎓 Certificação reconhecida nacionalmente:</strong> Você recebe um certificado válido no mercado de trabalho.</li>
                    <li><strong>💡 Conteúdo clínico de verdade:</strong> Aulas teóricas integradas a casos clínicos reais, reforçando a avaliação holística do paciente e o papel central do ECG no diagnóstico.</li>
                  </ul>

                  <p className="font-semibold text-blue-900 mt-6">📍 Local e Horário</p>
                  <p>
                    {course.location}<br />
                    {course.schedule}
                  </p>

                  <p className="mx-auto font-bold text-lg text-center mt-8">Invista na sua carreira médica. Inscreva-se agora!</p>
                </div>
              </div>

              {/* Card de Informações */}
              <div className="bg-white shadow-xl rounded-2xl p-8 flex flex-col items-center text-center border border-gray-200 
      w-full lg:w-[350px]  xl:w-[400px] xl:h-[80vh] 2xl:h-[70vh] sticky top-20 mx-auto">
                <img src="/logo.png" alt="OnlyCursos" className="w-24 h-24" />
                <h2 className="text-2xl font-bold text-blue-900 mb-4">{course.title}</h2>
                <ul className="mt-4 text-gray-700 text-left space-y-2">
                  {[
                    "Curso Presencial",
                    "Instrutor especializado",
                    "Disponibilização de material de apoio ",
                    "Certificado validado",

                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <FaCheckCircle className="text-blue-500" /> {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 text-blue-900 text-center">
                  <p className="line-through text-lg flex items-center justify-center gap-2">
                    <IoMdPricetag className="text-red-500" /> {`de R$ ${(course.price * 1.2).toFixed(2)}`}
                  </p>
                  <p className="text-4xl font-extrabold">R$ {course.price}</p>
                  <p className="text-sm font-medium">em até 12x</p>
                </div>

                <CheckoutButton courseId={course.id}
                  userId={userId} />
              </div>
            </div>
          </section>
          <section className=" text-black py-4 pl-0 md:pl-10 lg:pl-20">
            <span className="text-3xl font-extrabold text-blue-900 pl-3">Cursos recomendados</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-4 gap-6 mt-6">
              {courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  className="flex flex-col justify-between min-h-[520px] bg-gradient-to-b to-white shadow-lg rounded-xl p-6 overflow-hidden transition-transform transform"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex-1 flex flex-col">
                    {/* Imagem */}
                    <div className="relative overflow-hidden rounded-lg aspect-square bg-gray-200 mb-4">
                      <img
                        src={course.coverImage}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Título */}
                    <h3 className="text-lg font-semibold text-blue-900 mb-2 truncate">
                      {course.title}
                    </h3>

                    {/* Preço */}
                    <p className="text-xl font-bold text-blue-700 mb-2">{`R$ ${course.price.toFixed(2)}`}</p>

                    {/* Descrição */}
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                      {course.description}
                    </p>
                  </div>

                  {/* Botão fixo no final */}
                  <button
                    className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg transition-all hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring focus:ring-blue-300"
                    onClick={() => handleRedirect(`/courses/${course.id}`)}
                  >
                    Saiba Mais
                  </button>
                </motion.div>

              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

