"use client";

import MenuLateral from "../../components/MenuLateral";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdPricetag } from "react-icons/io";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import AOS from "aos";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import  {decodeJwt } from 'jose';
import CheckoutButton from "../../components/CheckoutButton";



const CourseDetail = () => {

  const router = useRouter();

  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [userId, setUserId] = useState(null); // estado para o id do usuário


  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`https://crud-usuario.vercel.app/api/curso/${id}`);
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
        const response = await fetch("https://crud-usuario.vercel.app/api/cursos");
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-bold text-gray-600">Carregando curso...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-bold text-red-600">Curso não encontrado.</p>
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
            <div className="relative w-full md:w-1/2 text-left space-y-4">
              <h2 className="text-lg md:text-xl font-extrabold text-blue-400">
                Desconto de inauguração
              </h2>
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                {course.title}
              </p>
              <p className="text-md md:text-lg text-gray-200">
                {course.description}
              </p>
            </div>
          </div>

          {/* About Section */}
          <section className="py-16 lg:px-20 px-4 bg-gray-100">
            <div className="max-w-screen-2xl mx-auto grid lg:gap-x-40 grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl font-bold text-blue-900">
                  Por que estudar {course.title} pode impulsionar sua carreira na
                  enfermagem?
                </h2>
                <div className="h-96">
                  <iframe
                    src="https://www.youtube.com/embed/KT3WDc2B_q8?si=XRS-vSd5DAm8dG72"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full py-12">
                  </iframe>
                </div>
                <p className="mt-6 text-gray-700 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.
                  Risus commodo viverra maecenas accumsan lacus vel facilisis.
                </p>
                <p className="mt-6 text-gray-700 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.
                  Risus commodo viverra maecenas accumsan lacus vel facilisis.
                </p>
                <p className="mt-6 text-gray-700 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.
                  Risus commodo viverra maecenas accumsan lacus vel facilisis.
                </p>
              </div>
              <div className="bg-white shadow-xl rounded-2xl p-8 flex flex-col items-center text-center border border-gray-200 lg:w-4/6 w-full lg:h-[70vh] sticky top-20">
                <img src="/logo.png" alt="Cetma Logo" className="w-24 h-24" />
                <h2 className="text-2xl font-bold text-blue-900 mb-4">{course.title}</h2>
                <ul className="mt-4 text-gray-700 text-left space-y-2">
                  {[
                    "Acesso vitalício",
                    "Acesso imediato",
                    "Professores para tirar dúvidas",
                    "100% Online",
                    "Certificados aprovados pelo MEC",
                    "E muito mais",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <FaCheckCircle className="text-blue-500" /> {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 text-blue-900 text-center">
                  <p className="line-through text-lg flex items-center justify-center gap-2">
                    <IoMdPricetag className="text-red-500" /> de R$ 1299,99
                  </p>
                  <p className="text-4xl font-extrabold">R$ {course.price}</p>
                  <p className="text-sm font-medium">em até 6x sem juros</p>
                </div>
                <CheckoutButton                 courseId={course.id} 
                userId={userId} />

              </div>
            </div>
          </section>
          <section className="lg:py-16 lg:px-20 text-black py-4 ">
            <span className="text-3xl font-extrabold text-blue-900 pl-3">Cursos recomendados</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              {courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  className="relative bg-gradient-to-b to-white shadow-lg rounded-xl p-6 overflow-hidden transition-transform transform "
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Imagem do curso */}
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
                  <p className="text-xl font-bold text-blue-700 mb-2">{`R$ ${course.price.toFixed(
                    2
                  )}`}</p>

                  {/* Descrição */}
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    {course.description}
                  </p>

                  {/* Botão de "Saiba Mais" */}
                  <button
                    className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg transition-all hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring focus:ring-blue-300"
                    onClick={() => handleRedirect(`/courses/${course.id}`)}
                  >
                    Saiba Mais
                  </button>

                  {/* Decoração no canto inferior direito */}
                  <div className="absolute bottom-0 right-0 w-16 h-16 bg-blue-200 opacity-70 rounded-full blur-lg pointer-events-none"></div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default CourseDetail;
