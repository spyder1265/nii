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
    ytLink: string;
  }>({ name: "", image: "", description: "", date: "", ytLink: "" });

  useEffect(() => {
    const currentProject = projects.map((subproject) =>
      subproject.projects.find(
        (project) => project.name.toLowerCase() === name.toLowerCase()
      )
    );
    setProject(
      currentProject.at(0) || {
        name: "",
        image: "",
        description: "",
        date: "",
        ytLink: "",
      }
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
          <div className='flex flex-row max-lg:flex-col justify-between gap-10'>
            <div className='flex flex-col gap-5 animate__animated animate__fadeInLeft lg:w-1/2'>
              <div className='text-justify border-b border-gray-700 pb-10'>
                <div className='text-gray-400'>Project Description:</div>
                <br />
                {project.description}
              </div>
              <div className='border-b border-gray-700 pb-10'>
                <div className='text-gray-400'>Skills and Deliverables:</div>
                <ul className='list-disc pl-4'>
                  {skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
              {/* Line break after "published on" for small devices */}
              <div className='hidden max-sm:block'>
                <span className='text-gray-400'>Published on:&nbsp;</span>
                <br />
                {project.date}
              </div>
              <div className='block max-sm:hidden'>
                <span className='text-gray-400'>Published on:&nbsp;</span>
                {project.date}
              </div>
              {/* end */}
            </div>
            <div className='lg:w-1/2'>
              <div className='rounded-xl border border-gray-700 h-fit w-fit animate__animated animate__fadeInRight'>
                <iframe
                  width='710'
                  height='465'
                  src={project.ytLink}
                  title={project.name + " Video"}
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  referrerPolicy='strict-origin-when-cross-origin'
                  allowFullScreen
                  className='rounded-xl aspect-video max-md:w-full max-lg:w-[701px] max-lg:justify-center max-lg:h-[412px] max-md:h-full max-[1024px]:h-[412px] max-[1024px]:w-fit max-[1284px]:w-fit'
                ></iframe>
              </div>
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
