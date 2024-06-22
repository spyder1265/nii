"use client";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { projects } from "../data";
import Image from "next/image";
import Link from "next/link";

interface Ipage {}

enum filterState {
  All,
  Comercial,
  Ghana,
}

const page: React.FC<Ipage> = ({}) => {
  const [currentProjects, setCurrentProjects] = useState(projects);

  return (
    <>
      <main className='flex min-h-screen z-40 sticky top-0 flex-col justify-between items-center'>
        <header className='min-h-[84px] w-full bg-[rgba(0,0,0,0.4)]'>
          <Navbar />
        </header>
        <section className='flex flex-col items-center min-h-[672px] top-0 text-center py-8 pb-11 px-8 md:px-56'>
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
        </section>
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
