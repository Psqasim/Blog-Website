import Image from "next/image";
import logoLight from "/public/images/logoLight.png";
import {
  BsFacebook,
  BsTwitter,
  BsYoutube,
  BsLinkedin,
  BsGithub,
} from "react-icons/bs";
import Link from "next/link";
const Footer = () => {
  return (
    <div className="w-full py-10 bg-bgColor text-white/80 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 justify-center items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Image src={logoLight} width={80} height={80} alt="logo" />
          <div className="text-center md:text-right text-sm text-gray-600 dark:text-gray-400 mt-4 md:mt-0">
            <p>© {new Date().getFullYear()} Muhammad Qasim</p>
            <p className="text-xs">All rights reserved</p>
          </div>
        </div>

        <div className="flex gap-6">
          <Link
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsYoutube className="w-6 h-6 text-white/50 hover:text-red-500 duration-300 cursor-pointer" />
          </Link>
          <BsFacebook className="w-6 h-6 text-white/50 hover:text-blue-500 duration-300 cursor-pointer" />
          <Link
            href="https://github.com/Psqasim"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsGithub className="w-6 h-6 text-white/50 hover:text-white duration-300 cursor-pointer" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/muhammad-qasim-5bba592b4/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsLinkedin className="w-6 h-6 text-white/50 hover:text-blue-500 duration-300 cursor-pointer" />
          </Link>
          <BsTwitter className="w-6 h-6 text-white/50 hover:text-white duration-300 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
