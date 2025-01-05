"use client";
import { projects, skills } from "@/app/data";
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
      <main>
        {/* Back to Projects */}
        <div className='mt-6'>
          <Link
            href='/dashboard/projects'
            className='text-blue-400 hover:underline'
          >
            &larr;&nbsp;Back to Projects
          </Link>
        </div>

        {/* Project Details */}
        <section className='flex flex-col w-full h-full gap-10 mt-5'>
          <h1 className='text-2xl font-bold text-white'>{project.name}</h1>
          <div className='flex flex-row max-lg:flex-col justify-between gap-10'>
            <div className='flex flex-col gap-5 lg:w-1/2'>
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
                <span className='text-gray-400'>Published:&nbsp;</span>
                {project.date}
              </div>
              {/* end */}
            </div>
            <div className='flex flex-col lg:w-1/2 items-center'>
              <div className='rounded-xl border-2 border-[#2d323c] h-fit w-fit animate__animated animate__fadeInRight'>
                <iframe
                  width='610'
                  height='365'
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
          <div className='flex max-md:flex-col justify-between items-center gap-4'>
            <div className='border-2 border-[#2d323c] h-56 w-96 mt-10 rounded-xl max-md:w-[300px] max-md:h-40'></div>
            <div className='border-2 border-[#2d323c] h-56 w-96 mt-10 rounded-xl max-md:w-[300px] max-md:h-40'></div>
            <div className='border-2 border-[#2d323c] h-56 w-96 mt-10 rounded-xl max-md:w-[300px] max-md:h-40'></div>
            <div className='border-2 border-[#2d323c] h-56 w-96 mt-10 rounded-xl max-md:w-[300px] max-md:h-40'></div>
          </div>
        </section>
      </main>
    </>
  );
};

export default page;
