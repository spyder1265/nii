import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaTiktok,
} from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { SiUpwork } from "react-icons/si";
import Link from "next/link";
import ContactForm from "../Contact/Contact";
interface IFooter {}

const Footer: React.FC<IFooter> = ({}) => {
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
        <div className='flex w-full justify-center max-md:flex-col max-md:items-center gap-10'>
          <div className='w-1/2 flex max-md:w-full max-md:justify-center items-center'>
            <ContactForm />
          </div>
          <div className='w-1/2 flex flex-col items-center py-2 gap-5 justify-between h-1/2'>
            <div className='flex items-center w-full justify-center gap-5 text-lg md:text-2xl'>
              {/* <a
                href='https://twitter.com/nii_monneyy'
                className='hover:scale-150 transition-all duration-500 hover:mb-3'
                target='_blank'
              >
                <FaXTwitter />
              </a> */}
              <a
                href='https://www.linkedin.com/in/nathaniel-monney-238a33237/'
                className='hover:scale-150 transition-all duration-500 hover:mb-3'
                target='_blank'
              >
                <FaLinkedin />
              </a>
              <a
                href='https://www.instagram.com/nii_monney/ '
                className='hover:scale-150 transition-all duration-500 hover:mb-3'
                target='_blank'
              >
                <FaInstagram />
              </a>
              {/* <a
                href='https://www.youtube.com/channel/UCdzHSSI5BOlBXfxtLUY021g'
                className='hover:scale-150 transition-all duration-500 hover:mb-3'
                target='_blank'
              >
                <FaYoutube />
              </a> */}
              {/* <a
                href='https://www.tiktok.com/@nii_monney?is_from_webapp=1&sender_device=pc'
                className='hover:scale-150 transition-all duration-500 hover:mb-3'
                target='_blank'
              >
                <FaTiktok />
              </a> */}
              <a
                href='https://www.upwork.com/freelancers/~01ecff7fb09dcf2a24?viewMode=1'
                className='hover:scale-150 transition-all duration-500 hover:mb-3'
                target='_blank'
              >
                <SiUpwork />
              </a>
            </div>

            <div className='flex max-md:flex-col items-center justify-center w-full gap-5'>
              <Link
                href={"/dashboard"}
                className='text-sm font-sans text-gray-400'
              >
                Dashboard
              </Link>
              <p className='text-sm font-sans'>
                &copy; {new Date().getFullYear()} Nii Monney
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
