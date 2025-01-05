"use client";
import Link from "next/link";
import { useState } from "react";
import { projects } from "@/app/data";

interface Ipage {}

enum filterState {
  All,
  Comercial,
  Ghana,
}

export default function Projects() {
  const [currentProjects, setCurrentProjects] = useState(projects);

  return (
    <section className='mb-8'>
      <h2 className='text-2xl font-semibold'>PROJECTS</h2>
      <div className='mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {currentProjects.map((project) =>
          project.projects.map((project, index) => (
            <Link
              href={`/dashboard/projects/${project.name}`}
              key={index}
              className='bg-gray-800 p-6 rounded-lg hover:bg-gray-700'
            >
              <div className='flex justify-between items-center pb-2'>
                <div className='flex flex-col'>
                  <span className='text-xl text-white'>{project.name}</span>
                  <span className='font-light text-gray-500'>
                    {project.date}
                  </span>
                </div>
                <div>
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
                </div>
              </div>
              <p className='text-gray-400 font-light text-justify tracking-tighter leading-relaxed'>
                {project.description}
              </p>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}
