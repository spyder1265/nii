"use client";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { projects } from "../data";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import BlurFade from "@/components/ui/blur-fade";

interface Ipage {}

enum filterState {
  All,
  Comercial,
  Ghana,
}

const page: React.FC<Ipage> = ({}) => {
  const [currentProjects, setCurrentProjects] = useState(projects);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <>
      <main className='flex min-h-screen z-40 sticky top-0 flex-col justify-between items-center'>
        <header className='min-h-[84px] w-full bg-[rgba(0,0,0,0.4)]'>
          <Navbar fixed />
        </header>
        <motion.section
          className='flex flex-row items-start top-0'
          {...fadeInUp}
        >
          <div className='flex justify-normal w-full h-full gap-6 p-10 flex-wrap'>
            {currentProjects.map((project) =>
              project.projects.map((project, index) => (
                <BlurFade delay={0.25} inView>
                  <Link
                    className='border-2 border-[#2d323c] flex w-[339.48px] h-96 rounded-xl hover:scale-105 hover:shadow-xl focus:outline-none transition duration-700 focus:ring-2 focus:ring-[#2d323c] focus:border-transparent text-gray-200 hover:bg-gray-500 hover:text-white shadow-md shadow-[rgba(0,0,0,0.4)]'
                    key={index}
                    href={`/projects/${project.name}`}
                  >
                    <div className='flex w-full h-full flex-col'>
                      <div className='h-3/5'>
                        <Image
                          src={project.image}
                          width={100}
                          height={100}
                          quality={100}
                          alt='final start'
                          className='w-full h-full overflow-hidden rounded-t-xl aspect-square object-cover'
                        />
                      </div>
                      <div className='flex flex-col gap-5 p-4'>
                        <span className='truncate'>{project.name}</span>
                        <span
                          className={`px-2 py-1 w-fit rounded-lg ${
                            project.platform === "Upwork"
                              ? "bg-green-600"
                              : project.platform === "Passion Project"
                              ? "bg-purple-600"
                              : project.platform === "Commercial Work"
                              ? "bg-blue-600"
                              : "bg-orange-500"
                          }`}
                        >
                          {project.platform}
                        </span>
                        <span>{project.date}</span>
                      </div>
                    </div>
                  </Link>
                </BlurFade>
              ))
            )}
          </div>
        </motion.section>
        {/* <section className='flex flex-col items-center min-h-[672px] top-0 text-center py-8 pb-11 px-8 md:px-56'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {currentProjects.map((project) =>
              project.projects.map((project, index) => (
                <Link
                  href={`/projects/${project.name}`}
                  key={index}
                  className='relative group max-w-[320] max-h-[247.641]'
                >
                  <div className='h-[412px] w-[351px] overflow-hidden'>
                    <Image
                      className='h-full aspect-square w-full '
                      src={project.image}
                      alt={project.name}
                      layout='fill'
                      sizes='100vw'
                    />
                  </div>
                  <div className='absolute hidden inset-0 top-0 bg-black/50 group-hover:flex items-center justify-center'>
                    <div className='text-center'>
                      <h1 className='text-2xl font-bold text-white'>
                        {project.name}
                      </h1>
                      <p className='text-white'>{project.description}</p>
                      <button className='bg-white text-black px-4 py-2 rounded-lg'>
                        View Project
                      </button>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </section> */}
        {/* <div className='flex flex-col gap-5 p-4'>
          <span className='font-semibold'>
            Project Name:
            <span className='font-normal'> {project.name}</span>
          </span>
          <span className='font-semibold'>
            Purpose:
            <span className='font-normal'> {project.platform}</span>
          </span>
          <span className='font-semibold'>
            Date:
            <span className='font-normal'> {project.date}</span>
          </span>
          <span className='truncate font-semibold'>
            Description:
            <span className='font-normal'>
              {" "}
              {project.description}
            </span>
          </span>
        </div> */}
        <footer className='w-full flex items-center justify-center'>
          <span className='font-sans text-sm font-bold text-gray-100 opacity-50 '>
            &copy; Nii Monney 2021
          </span>
        </footer>
      </main>
    </>
  );
};
export default page;
