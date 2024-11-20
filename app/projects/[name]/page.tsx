"use client";
import Navbar from "@/app/components/Navbar/Navbar";
import { projects } from "@/app/data";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { skills } from "@/app/data";

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
    date: string;
  }>({ name: "", image: "", description: "", date: "" });

  useEffect(() => {
    const currentProject = projects.map((subproject) =>
      subproject.projects.find(
        (project) => project.name.toLowerCase() === name.toLowerCase()
      )
    );
    setProject(
      currentProject.at(0) || { name: "", image: "", description: "", date: "" }
    );
    console.log(currentProject);
  }, [name]);

  return (
    <>
      <main className='flex flex-col min-h-screen w-full items-center'>
        <header className='min-h-[84px] w-full bg-[rgba(0,0,0,0.4)]'>
          <Navbar fixed />
        </header>
        <section className='flex flex-col w-full h-full top-0 p-10 gap-10'>
          <h1 className='text-2xl font-bold text-white'>{project.name}</h1>
          <div className='flex justify-between gap-10'>
            <div className='flex flex-col gap-5 animate__animated animate__fadeInLeft'>
              <div className='text-justify border-b border-gray-700 pb-10'>
                <div className='text-gray-400'>Project Description:</div>
                <br />
                {project.description}
              </div>
              <div>
                <div className='text-gray-400'>Skills and Deliverables:</div>
                <ul className='list-disc pl-4'>
                  {skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className='text-gray-400'>Published on:&nbsp;</span>
                {project.date}
              </div>
            </div>
            <div className='rounded-xl border border-gray-700 h-fit w-fit animate__animated animate__fadeInRight'>
              <iframe
                width='760'
                height='465'
                src='https://www.youtube.com/embed/KqaTs7DLcOg?si=qWhCmcgtPQdIWlj8'
                title='YouTube video player'
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                referrerPolicy='strict-origin-when-cross-origin'
                allowFullScreen
                className='rounded-xl'
              ></iframe>
            </div>
          </div>
        </section>
        {/* <section className='w-full container max-h-screen flex flex-col items-center'>
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
        </section> */}

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
