import Image from "next/image";
import Navbar from "../components/Navbar/Navbar";
import TypingAnimation from "@/components/ui/typing-animation";
import { useEffect } from "react";
import { pageview } from "@/lib/gtag";

interface Ipage {}

const page: React.FC<Ipage> = ({}) => {
  useEffect(() => {
    pageview(window.location.pathname);
  }, []);

  return (
    <>
      <main className='min-h-screen bg-gradient-to-b from-black via-gray-900 to-black'>
        <header className='min-h-[84px] w-full bg-black/40 backdrop-blur-sm z-50 sticky top-0'>
          <Navbar fixed />
        </header>

        <section className='max-w-4xl mx-auto px-6 md:px-8 py-12'>
          <div className='relative h-[300px] w-[300px] mx-auto mb-16 animate__animated animate__fadeInDown'>
            <div className='absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-50 animate-pulse'></div>
            <div className='relative rounded-full overflow-hidden border-4 border-white/10 h-full w-full'>
              <Image
                src={"/img/nii_profile_pic.jpg"}
                alt={"Nii Monney"}
                fill
                quality={100}
                className='object-cover object-center transform hover:scale-110 transition-transform duration-500'
              />
            </div>
          </div>

          <div className='space-y-12 animate__animated animate__fadeIn'>
            <section className='text-center'>
              <h1 className='text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>
                About Me
              </h1>
              <p className='text-lg text-gray-300 leading-relaxed'>
                I am a professional 3D animator specialising in high-quality
                visual storytelling for brands, products, and creative projects.
                With a strong foundation in 3D Software and industry-standard
                tools, I craft compelling animations that captivate audiences
                and enhance brand presence. My expertise spans product
                animations, cinematic sequences, promotional videos, and
                conceptual art animations. By blending creativity with technical
                precision, I bring ideas to life with dynamic motion, engaging
                visuals, and an eye for detail. Whether you're looking to
                showcase a product, tell a story, or elevate your brand's
                digital presence, I deliver animations that leave a lasting
                impact.
              </p>
            </section>
            <section className='space-y-6'>
              <h2 className='text-2xl max-md:text-xl font-bold text-left border-l-4 border-purple-500 pl-4'>
                Proposal for Animation Services
              </h2>
              <div className='bg-white/5 rounded-lg p-6 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300'>
                <p className='text-gray-300 leading-relaxed'>
                  Objective To create a high-quality 3D animation tailored to
                  your project needs, ensuring a visually compelling and
                  engaging experience for your target audience.
                </p>
              </div>
              <div className='grid gap-6 md:grid-cols-2'>
                <div className='bg-white/5 rounded-lg p-6 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300'>
                  <h3 className='text-xl font-bold mb-3 text-purple-400'>
                    Scope of Work
                  </h3>
                  <ul className='text-gray-50 list-disc pl-6 tracking-tighter'>
                    <li className='pb-2'>
                      Concept Development -{" "}
                      <span className='text-gray-400'>
                        Understanding your vision, brand, and objectives.
                      </span>
                    </li>
                    <li className='pb-2'>
                      Storyboarding -{" "}
                      <span className='text-gray-400'>
                        Creating a visual roadmap of the animation.
                      </span>
                    </li>
                    <li className='pb-2'>
                      3D Modeling & Texturing -{" "}
                      <span className='text-gray-400'>
                        Crafting detailed models with realistic textures.
                      </span>
                    </li>
                    <li className='pb-2'>
                      Animation & Motion Design -{" "}
                      <span className='text-gray-400'>
                        Bringing scenes to life with smooth and engaging motion.
                      </span>
                    </li>
                    <li className='pb-2'>
                      Lighting & Rendering -{" "}
                      <span className='text-gray-400'>
                        Enhancing visuals for a polished and professional look.
                      </span>
                    </li>
                    <li className='pb-2'>
                      Final Editing & Delivery -{" "}
                      <span className='text-gray-400'>
                        Compositing, sound design, and format optimization.
                      </span>
                    </li>
                  </ul>
                </div>
                <div className='bg-white/5 rounded-lg p-6 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300'>
                  <h3 className='text-xl font-bold mb-3 text-purple-400'>
                    Budget & Pricing
                  </h3>
                  <p className='text-gray-300 pb-4'>
                    Pricing varies depending on project complexity, animation
                    length, and required assets. Below is an estimated range:
                  </p>
                  <ul className='text-gray-300 list-disc pl-6 pb-4 tracking-tighter'>
                    <li>Short Animations (10-30s): $300 - $800</li>
                    <li>Product Visualizations (30s-1min): $800 - $2,000</li>
                    <li>Cinematic Sequences (1-2min): $2,000+</li>
                  </ul>
                  Custom quotes are available based on specific project
                  requirements.
                </div>
                <div className='bg-white/5 rounded-lg p-6 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300'>
                  <h3 className='text-xl font-bold mb-3 text-purple-400'>
                    Timelines & Deadlines
                  </h3>
                  <ul className='text-gray-300 list-disc pl-6 pb-4 tracking-tighter'>
                    <li>Short Animations: 1-2 weeks</li>
                    <li>Product Visualizations: 2-4 weeks</li>
                    <li>Cinematic Sequences: 4+ weeks</li>
                  </ul>
                </div>
                <div className='bg-white/5 rounded-lg p-6 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300'>
                  <h3 className='text-xl font-bold mb-3 text-purple-400'>
                    Revisions & Deliverables
                  </h3>
                  <ul className='text-gray-300 list-disc pl-6 pb-4 tracking-tighter'>
                    <li>Two rounds of revisions included</li>
                    <li>Final animation delivered in HD or 4K format</li>
                    <li>
                      Source files available upon request (additional fee may
                      apply)
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className='space-y-4'>
              <h2 className='text-2xl max-md:text-xl font-bold text-left border-l-4 border-purple-500 pl-4'>
                Why I Do It
              </h2>
              <div className='bg-white/5 rounded-lg p-6 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300'>
                <ul className='text-gray-300 leading-relaxed list-disc pl-6 tracking-tighter'>
                  <li>
                    Creative & Technical Expertise: Years of experience in 3D
                    animation and visualization.
                  </li>
                  <li>
                    Tailored Approach: I adapt to your brand’s style and project
                    goals.{" "}
                  </li>
                  <li>
                    Reliability & Communication: Transparent workflow with
                    regular updates.{" "}
                  </li>
                </ul>
              </div>
            </section>
            {/* <div className='mt-4'>
              <TypingAnimation
                className='w-full text-lg max-md:text-sm leading-6 tracking-normal max-md:w-[700px] font-extralight'
                duration={20}
                text='Lets discuss your project requirements and bring your vision to
                life. Contact me to get started!'
              />
            </div> */}
          </div>
        </section>

        <footer className='w-full flex items-center justify-center'>
          <span className='text-sm text-gray-400'>
            &copy; Nii Monney {new Date().getFullYear()}
          </span>
        </footer>
      </main>
    </>
  );
};

export default page;
