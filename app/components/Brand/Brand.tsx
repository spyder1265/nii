import { FaLinkedin, FaInstagram } from "react-icons/fa6";
import { SiUpwork } from "react-icons/si";

interface IBrand {}

const Brand: React.FC<IBrand> = ({}) => {
  return (
    <>
      <div
        className='
          flex flex-col justify-center items-center
          md:flex-row md:justify-between md:items-start
          '
      >
        <div className='flex flex-col items-center justify-center'>
          <h1 className='text-3xl md:text-5xl font-bold text-gray-100'>
            Nii Monney
          </h1>
          <span className='text-sm md:text-lg text-gray-100 opacity-50'>
            3D CG generalist
          </span>
        </div>
        <div className='flex flex-col items-center justify-center md:items-end'>
          <div className='flex items-center justify-center'>
            <div className='flex items-center justify-center'>
              <a
                href=''
                className='
                  flex items-center justify-center
                  w-8 h-8 rounded-full
                  bg-gray-100
                  hover:bg-gray-200
                  transition
                  duration-700
                  focus:outline-none
                  focus:ring-2 focus:ring-gray-100
                  focus:border-transparent
                  '
              >
                <SiUpwork width={20} height={20} className='text-gray-700' />
              </a>
            </div>
            <div className='flex items-center justify-center'>
              <a
                href=''
                className='
                  flex items-center justify-center
                  w-8 h-8 rounded-full
                  bg-gray-100
                  hover:bg-gray-200
                  transition
                  duration-700
                  focus:outline-none
                  focus:ring-2 focus:ring-gray-100
                  focus:border-transparent
                  '
              >
                <FaLinkedin width={20} height={20} className='text-gray-700' />
              </a>
            </div>
            <div className='flex items-center justify-center'>
              <a
                href=''
                className='
                  flex items-center justify-center
                  w-8 h-8 rounded-full
                  bg-gray-100
                  hover:bg-gray-200
                  transition
                  duration-700
                  focus:outline-none
                  focus:ring-2 focus:ring-gray-100
                  focus:border-transparent
                  '
              >
                <FaInstagram width={20} height={20} className='text-gray-700' />
              </a>
            </div>
          </div>
          <div className='flex items-center justify-center'>
            <a
              href=''
              className='
                  border-2 border-[#2d323c]
                  rounded-full
                  py-2 px-4
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
            >
              Resume
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default Brand;
