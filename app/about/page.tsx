import Image from "next/image";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
interface Ipage {}

const page: React.FC<Ipage> = ({}) => {
  return (
    <>
      <main className='flex min-h-screen z-40 sticky top-0 flex-col justify-between items-center'>
        <header>
          <div className='absolute top-0 left-0 right-0 w-full bg-[rgba(0,0,0,0.4)]'>
            <Navbar />
          </div>
        </header>
              <section className='flex items-center text-center py-8 pb-11 px-8 md:px-56 '>
                  
        </section>
        <footer className='w-full'>
          <Footer />
        </footer>
      </main>
    </>
  );
};
export default page;
