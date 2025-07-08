"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  FolderOpen,
  Archive,
  Undo2,
  MoreVertical,
  Pencil,
  Eye,
} from "lucide-react";
import toast from "react-hot-toast";

interface Project {
  id: string;
  name: string;
  description: string;
  images: string[];
  date: string;
  platform: string;
  ytLink?: string;
  skillsDeliverables: string[];
  archived?: boolean;
}

function ProjectSkeleton() {
  return (
    <div className='bg-gray-900 p-6 rounded-xl animate-pulse shadow-md'>
      <div className='flex justify-between items-center pb-3'>
        <div className='flex flex-col gap-3'>
          <div className='h-6 w-36 bg-gray-700 rounded-md'></div>
          <div className='h-4 w-28 bg-gray-700 rounded-md'></div>
        </div>
        <div className='h-8 w-28 bg-gray-700 rounded-lg'></div>
      </div>
      <div className='mt-5 space-y-3'>
        <div className='h-4 w-full bg-gray-700 rounded-md'></div>
        <div className='h-4 w-3/4 bg-gray-700 rounded-md'></div>
        <div className='h-4 w-1/2 bg-gray-700 rounded-md'></div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className='flex flex-col items-center justify-center p-10 mt-10 bg-gray-900 rounded-xl shadow-md'>
      <FolderOpen className='w-20 h-20 text-gray-500 mb-5' />
      <h3 className='text-2xl font-bold text-white mb-3'>No Projects Yet</h3>
      <p className='text-gray-400 text-center mb-6'>
        Start adding projects to showcase your work and experience.
      </p>
      <Link
        href='/dashboard/add-project'
        className='px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all shadow-md'
      >
        Add Your First Project
      </Link>
    </div>
  );
}

function ArchivedState() {
  return (
    <div className='flex flex-col items-center justify-center p-10 mt-10 bg-gray-900 rounded-xl shadow-md'>
      <FolderOpen className='w-20 h-20 text-gray-500 mb-5' />
      <h3 className='text-2xl font-bold text-white mb-3'>
        No Archived Projects Yet
      </h3>
      {/* <p className='text-gray-400 text-center mb-6'>
        Start adding projects to showcase your work and experience.
      </p>
      <Link
        href='/dashboard/add-project'
        className='px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all shadow-md'
      >
        Add Your First Project
      </Link> */}
    </div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "active" | "archived">("active");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        if (!response.ok) throw new Error("Failed to fetch projects.");
        const data = await response.json();
        setProjects(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleArchiveToggle = async (id: string, archived: boolean) => {
    try {
      const res = await fetch(`/api/projects/${id}/archive`, {
        method: "PATCH",
      });
      if (res.ok) {
        setProjects((prev) =>
          prev.map((p) => (p.id === id ? { ...p, archived: !archived } : p))
        );
        toast.success(archived ? "Project unarchived!" : "Project archived!");
      } else {
        toast.error("Failed to update project.");
      }
    } catch (e) {
      toast.error("Failed to update project.");
    }
  };

  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true;
    if (filter === "active") return !project.archived;
    if (filter === "archived") return !!project.archived;
    return true;
  });

  if (loading) {
    return (
      <section className='mb-10'>
        <div className='animate-pulse mb-5'>
          <div className='h-9 w-40 bg-gray-700 rounded-md'></div>
        </div>
        <div className='mt-5 grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {[...Array(6)].map((_, index) => (
            <ProjectSkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section className='mb-10'>
        <h2 className='text-3xl font-bold text-white'>Projects</h2>
        <EmptyState />
      </section>
    );
  }

  return (
    <section className='mb-10'>
      <h2 className='text-3xl font-semibold text-white'>Projects</h2>
      <div className='flex gap-2 mt-4 mb-6'>
        <button
          className={`px-4 py-1 rounded-md text-sm font-medium shadow transition-all ${
            filter === "active"
              ? "bg-blue-600 text-white"
              : "bg-gray-700 text-gray-200 hover:bg-gray-800"
          }`}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={`px-4 py-1 rounded-md text-sm font-medium shadow transition-all ${
            filter === "archived"
              ? "bg-yellow-500 text-black"
              : "bg-gray-700 text-gray-200 hover:bg-gray-800"
          }`}
          onClick={() => setFilter("archived")}
        >
          Archived
        </button>
        <button
          className={`px-4 py-1 rounded-md text-sm font-medium shadow transition-all ${
            filter === "all"
              ? "bg-gray-900 text-white"
              : "bg-gray-700 text-gray-200 hover:bg-gray-800"
          }`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
      </div>
      <div className='mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {filteredProjects.length === 0 ? (
          <div className='col-span-full'>
            <ArchivedState />
          </div>
        ) : (
          filteredProjects.map((project) => (
            <div key={project.id} className='relative'>
              <div className='bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-900 transition-all duration-300 block'>
                <div className='flex flex-col pb-3'>
                  <div className='flex justify-between items-center'>
                    <span className='text-xl text-white font-semibold line-clamp-1'>
                      {project.name}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenu(
                          openMenu === project.id ? null : project.id
                        );
                      }}
                      className='absolute top-4 right-4 p-2 rounded-md bg-gray-800 text-gray-400 hover:bg-gray-700 transition-all'
                    >
                      <MoreVertical className='w-5 h-5' />
                    </button>
                    {openMenu === project.id && (
                      <div className='absolute right-0 mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-lg min-w-[140px] flex flex-col z-20'>
                        <Link
                          href={`/dashboard/projects/${project.id}`}
                          className='flex items-center gap-2 px-4 py-2 text-sm w-full text-left hover:bg-gray-800 transition-all text-green-400'
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenu(null);
                          }}
                        >
                          <Eye size={16} />
                          View Details
                        </Link>
                        {/* <Link
                          href={`/dashboard/projects/${project.id}/edit`}
                          className='flex items-center gap-2 px-4 py-2 text-sm w-full text-left hover:bg-gray-800 transition-all text-blue-400'
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenu(null);
                          }}
                        >
                          <Pencil size={16} />
                          Edit
                        </Link> */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleArchiveToggle(project.id, !!project.archived);
                            setOpenMenu(null);
                          }}
                          className={`flex items-center gap-2 px-4 py-2 text-sm w-full text-left hover:bg-gray-800 transition-all
                              ${
                                project.archived
                                  ? "text-yellow-600"
                                  : "text-gray-200"
                              }`}
                        >
                          {project.archived ? (
                            <Undo2 size={16} />
                          ) : (
                            <Archive size={16} />
                          )}
                          {project.archived ? "Unarchive" : "Archive"}
                        </button>
                        {/* Future: Add more actions here */}
                      </div>
                    )}
                  </div>
                  <div className='flex justify-between items-center'>
                    <span
                      className={`px-4 py-1 w-fit rounded-md text-sm font-medium text-white shadow-md p-2 ${
                        project.platform === "Upwork"
                          ? "bg-green-600"
                          : project.platform === "Passion Project"
                          ? "bg-purple-600"
                          : project.platform === "Commercial"
                          ? "bg-blue-600"
                          : "bg-orange-500"
                      }`}
                    >
                      {project.platform}
                    </span>
                    <span className='font-light italic text-gray-400'>
                      {project.date
                        ? new Date(project.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                          })
                        : "Unknown Date"}
                    </span>
                  </div>
                </div>
                <p className='text-gray-400 font-light text-justify tracking-tight leading-relaxed line-clamp-6'>
                  {project.description}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
