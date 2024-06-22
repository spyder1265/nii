"use client";
import Navbar from "@/app/components/Navbar/Navbar";
import { projects } from "@/app/data";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Ipage {
  params: {
    name: string;
  };
}

const page: React.FC<Ipage> = ({ params }) => {
  const name = decodeURI(params.name);
  const [project, setProject] = useState<{
    name: string;
    image: string;
    description: string;
  }>({ name: "", image: "", description: "" });

  useEffect(() => {
    const currentProject = projects.map((subproject) =>
      subproject.projects.find(
        (project) => project.name.toLowerCase() === name.toLowerCase()
      )
    );
    setProject(
      currentProject.at(0) || { name: "", image: "", description: "" }
    );
    console.log(currentProject);
  }, [name]);

  return (
    <>
      <main className='flex flex-col min-h-screen w-full items-center'>
        <header className='min-h-[84px] w-full bg-[rgba(0,0,0,0.4)]'>
          <Navbar />
        </header>
        <section className='w-full container max-h-screen flex flex-col items-center'>
          <h1 className='text-2xl font-bold text-white'>{project.name}</h1>
          <Image
            className='h-full aspect-video w-full '
            src={project.image || ""}
            alt={project.name}
            width={351}
            height={412}
            priority
          />

          <div>
            <p className='text-white'>{project.description}</p>
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
