"use client";
import {
  JSXElementConstructor,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import Navbar from "../components/Navbar/Navbar";
import { projects } from "../data";

interface Ipage {}

enum filterState {
  All,
  Comercial,
  Ghana,
}

const page: React.FC<Ipage> = ({}) => {
  const [filter, setFilter] = useState<filterState>(filterState.All);
  const [currentProjects, setCurrentProjects] = useState(projects);

  const filterFunc = (filter: filterState) => {
    switch (filter) {
      case filterState.All:
        setCurrentProjects(projects);
        break;
      case filterState.Comercial:
        setCurrentProjects(
          projects.filter((project) => project.name === "Commercial Projects")
        );
        break;
      case filterState.Ghana:
        setCurrentProjects(
          projects.filter((project) => project.name === "Ghanaverse")
        );
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    filterFunc(filter);
  }, [filter]);

  const categories = [
    {
      name: "All categories",
      isActive: filter === filterState.All,
      type: filterState.All,
    },
    {
      name: "Comercial",
      isActive: filter === filterState.Comercial,
      type: filterState.Comercial,
    },
    {
      name: "Ghana",
      isActive: filter === filterState.Ghana,
      type: filterState.Ghana,
    },
  ];

  return (
    <>
      <main className='flex min-h-screen z-40 sticky top-0 flex-col justify-between items-center'>
        <header>
          <div className='video_container mt-[40px] md:mt-[40px] relative'>
            <div className='absolute top-0 left-0 right-0 w-full bg-[rgba(0,0,0,0.4)]'>
              <Navbar />
            </div>
          </div>
        </header>
        <section className='flex flex-col items-center min-h-[672px] top-0 text-center py-8 pb-11 px-8 md:px-56'>
          <div className='flex items-center justify-center py-4 md:py-8 flex-wrap'>
            {categories.map((category, index) => (
              <button
                key={index}
                type='button'
                className={`${
                  category.isActive
                    ? "text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full transition-all duration-500 text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800"
                    : "text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 transition-all duration-300 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800"
                }
                `}
                onClick={() => setFilter(category.type)}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
            {currentProjects.map((project) =>
              project.projects.map((project, index) => (
                <div
                  key={index}
                  className='relative group max-w-[320] max-h-[247.641]'
                >
                  <img
                    className='h-[247.641px] w-[320px] rounded-lg'
                    src={project.image}
                    alt=''
                    width='auto'
                    height='auto'
                  />
                  <div className='absolute hidden inset-0 bg-black bg-opacity-50 group-hover:flex items-center justify-center'>
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
                </div>
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
