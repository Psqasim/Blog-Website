'use client'
import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from 'lucide-react';
import logoDark from "/public/images/logoDark.png";
import random from "/public/images/randomuser.jpg";


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "#post", label: "Posts" },
    { href: "/", label: "Pages" },
    { href: "/", label: "Features" },
    { href: "/", label: "Contact" },
  ];

  return (
    <div className="w-full h-20 border-b-[1px] border-b-black font-titleFont sticky top-0 bg-white z-50 px-4">
      <div className="max-w-7xl h-full mx-auto flex justify-between items-center">
        {/* Left section with logo and hamburger */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={toggleMenu} className="p-2">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          <Link href="/">
            <div>
              <Image width={80} height={80} src={logoDark} alt="logoDark" />
            </div>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:block">
          <ul className="flex gap-8 uppercase text-sm font-semibold ">
            {menuItems.map((item) => (
              <Link key={item.label} href={item.href} className="headerLi  text-primaryColor hover:text-secondaryColor cursor-pointer duration-300;">
                {item.label}
              </Link>
            ))}
          </ul>
        </div>

        {/* User Profile and Sign In */}
        <div className={`flex items-center gap-8 text-lg ${isMenuOpen ? 'hidden lg:flex' : ''}`}>
          <div className="hidden md:flex items-center gap-1">
            <Image
              className="w-8 h-8 rounded-full"
              src={random}
              alt="logo"
            />
            <p className="text-sm font-medium">Hello Stranger!</p>
          </div>

          <button className="uppercase text-sm border-[1px] border-primaryColor hover:border-secondaryColor px-4 py-1 font-semibold hover:text-white rounded-md hover:bg-secondaryColor transition-all duration-300 active:bg-yellow-600">
            Sign In
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-20 bg-white z-50">
            <ul className="flex flex-col items-center pt-8 gap-6 uppercase text-sm font-semibold">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="headerLi"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;