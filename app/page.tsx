import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { projects } from "./data";
import { FaArrowRight } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import TypingAnimation from "@/components/ui/typing-animation";

export default function Home() {
  return (
    <>
      <main className='flex min-h-screen z-40 sticky top-0 flex-col items-center'>
        <header className='h-auto max-h-screen overflow-hidden'>
          <div className='mt-[90px] md:mt-[90px] relative'>
            <video
              id='comp-k84t2nox_video'
              className='K8MSra h-full aspect-video object-cover md:h-full w-full '
              role='presentation'
              crossOrigin='anonymous'
              playsInline
              preload='auto'
              muted
              loop
              src='https://res.cloudinary.com/dabswbhzp/video/upload/v1715806966/nii_monney/zdnl8q8yebf8mybvqxzu.mp4'
              autoPlay
            ></video>
            <div className='absolute top-0 left-0 right-0 w-full bg-[rgba(0,0,0,0.4)]'>
              <Navbar fixed />
            </div>
          </div>
        </header>
        <section className='flex items-center text-center py-8 pb-11 px-8 md:px-56 '>
          <div>
            <TypingAnimation
              className='text-xl leading-6 tracking-normal md:w-[700px]'
              duration={50}
              text="Greetings! I'm Nii Monney, a passionate 3D CG generalist and video
              editor with a love for bringing imaginative worlds to life. My
              journey in the realm of digital creativity has been a thrilling
              ride, fueled by a dedication to pushing the boundaries of visual
              storytelling."
            />
          </div>
        </section>
        <section className='flex flex-col container items-center justify-center w-full gap-5 py-8 px-4 md:px-56'>
          <Link href={"/projects"}>
            <h1
              className='
            text-2xl font-bold text-center
            underline
            '
            >
              Projects
            </h1>
          </Link>
          <div className='w-full flex flex-col justify-center'>
            <div className='flex justify-between'>
              {projects
                .flatMap((project) => project.projects)
                .sort(() => 0.5 - Math.random())
                .slice(0, 3)
                .map((project, index) => (
                  <Link
                    className='border border-gray-800 flex w-[339.48px] h-96 rounded-xl hover:scale-105 hover:shadow-xl'
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
                ))}
            </div>

            {/* {projects.slice(0, 2).map((project, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center rounded-lg md:w-full min-w-[330px] md:max-h-96 overflow-hidden my-4 shadow-lg shadow-[rgba(0,0,0,0.4)]",
                  index % 2 === 0 ? "flex-row-reverse" : "flex-row"
                )}
              >
                <div
                  className={`md:w-1/2 h-full max-w-[200px] md:max-w-none max-h-[369.844]`}
                >
                  <CCarousel dataArray={project.projects} />
                </div>
                <div
                  className={cn(
                    `w-1/2 h-full px-3 flex flex-col justify-around gap-5`,
                    index % 2 === 0
                      ? "text-left items-start"
                      : "text-right items-end"
                  )}
                >
                  <div>
                    <h3 className='text-lg font-bold underline'>
                      {project.name}
                    </h3>
                  </div>
                  <div>
                    <p className='text-sm w-[150px] h-[240px] md:h-auto font-sans'>
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            ))} */}
            <div className='flex w-full justify-center'>
              <a
                className='
              border-2 border-[#2d323c]
              rounded-full
              inline-flex
              items-center
              py-2 px-4
              my-6
              focus:outline-none
              transition
              duration-700
              focus:ring-2 focus:ring-[#2d323c]
              focus:border-transparent
              text-gray-200
              hover:bg-gray-300
              hover:text-gray-700
              shadow-md
              shadow-[rgba(0,0,0,0.4)]
            '
                href={"/projects"}
              >
                See All <FaArrowRight className='ml-2' />
              </a>
            </div>
          </div>
        </section>
        <footer className='w-full'>
          <Footer />
        </footer>
      </main>
    </>
  );
}
