"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface Project {
  _id: string;
  name: string;
  description: string;
  images: string[];
  date: string;
  platform: string;
  ytLink?: string;
  skillsDeliverables: string[];
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        if (!response.ok) throw new Error("Failed to fetch projects.");
        const data = await response.json();
        setProjects(data.data); // Assuming API response has a `data` field
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <p>Loading projects...</p>;
  }

  if (projects.length === 0) {
    return <p>No projects available.</p>;
  }

  return (
    <section className='mb-8'>
      <h2 className='text-2xl font-semibold'>PROJECTS</h2>
      <div className='mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {projects.map((project) => (
          <Link
            href={`/dashboard/projects/${project.name}`}
            key={project._id}
            className='bg-gray-800 p-6 rounded-lg hover:bg-gray-700'
          >
            <div className='flex justify-between items-center pb-2'>
              <div className='flex flex-col'>
                <span className='text-xl text-white'>{project.name}</span>
                <span className='font-light text-gray-500'>{project.date}</span>
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
        ))}
      </div>
    </section>
  );
}
