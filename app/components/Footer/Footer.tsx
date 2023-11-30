import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaTiktok,
} from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { SiUpwork } from "react-icons/si";
interface IFooter {}

const Footer: React.FC<IFooter> = ({}) => {
  const form = (
    <form className='flex flex-col items-center text-black place-self-start justify-center gap-5'>
      <input
        type='text'
        placeholder='Name'
        className='
              w-full
              border-2 border-[#2d323c]
              rounded-lg
              py-2 px-4
              focus:outline-none
              focus:ring-2 focus:ring-[#2d323c]
              focus:border-transparent
              '
      />
      <input
        type='email'
        placeholder='Email'
        className='
              w-full
              border-2 border-[#2d323c]
              rounded-lg
              py-2 px-4
              focus:outline-none
              focus:ring-2 focus:ring-[#2d323c]
              focus:border-transparent
              '
      />
      <textarea
        placeholder='Message'
        className='
              w-full
              border-2 border-[#2d323c]
              rounded-lg
              py-2 px-4
              focus:outline-none
              focus:ring-2 focus:ring-[#2d323c]
              focus:border-transparent
              '
      ></textarea>
      <button
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
              '
      >
        Send
      </button>
    </form>
  );

  return (
    <div className='flex items-center justify-center w-full border-t py-10 px-4 md:px-56'>
      <div className='w-full flex flex-col items-center justify-center gap-7 '>
        <h1
          className='
            text-2xl font-bold text-center
            underline
            '
        >
          Contact
        </h1>
        <div className='flex w-full justify-center'>
          <div className='w-1/2'>{form}</div>
          <div className='w-1/2 flex flex-col items-center py-2 gap-5 justify-between h-1/2'>
            <div className='flex items-center w-full justify-center gap-5 text-lg md:text-2xl'>
              <a
                href='https://twitter.com/nii_monneyy'
                className='hover:scale-150 transition-all duration-500 hover:mb-3'
                target='_blank'
              >
                <FaXTwitter />
              </a>
              <a
                href='https://www.instagram.com/nii_monney/ '
                className='hover:scale-150 transition-all duration-500 hover:mb-3'
                target='_blank'
              >
                <FaInstagram />
              </a>
              <a
                href='https://www.youtube.com/channel/UCdzHSSI5BOlBXfxtLUY021g'
                className='hover:scale-150 transition-all duration-500 hover:mb-3'
                target='_blank'
              >
                <FaYoutube />
              </a>
              <a
                href='https://www.tiktok.com/@nii_monney?is_from_webapp=1&sender_device=pc'
                className='hover:scale-150 transition-all duration-500 hover:mb-3'
                target='_blank'
              >
                <FaTiktok />
              </a>
              <a
                href='https://www.upwork.com/freelancers/~01ecff7fb09dcf2a24?viewMode=1'
                className='hover:scale-150 transition-all duration-500 hover:mb-3'
                target='_blank'
              >
                <SiUpwork />
              </a>
            </div>

            <div className='flex items-center justify-center w-full gap-5'>
              <p className='text-sm font-sans'>&copy; 2021 Nii Monney</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
