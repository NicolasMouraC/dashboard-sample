"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { HiLogout } from "react-icons/hi";
import { StaticImageData } from "next/image";

interface ProfileProps {
  imageSource: string | StaticImageData;
}

export default function Profile({ imageSource }: ProfileProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        aria-haspopup="true"
        aria-expanded={isMenuOpen}
        aria-label="User Profile Menu"
      >
        <Image
          className="w-10 h-10 rounded-full"
          src={imageSource}
          alt="User avatar"
          width={40}
          height={40}
        />
      </button>

      {isMenuOpen && (
        <aside
          ref={menuRef}
          className="absolute right-0 mt-2 w-48 bg-white border border-[#CBD5E0] rounded-[4px] shadow-xl z-10"
          role="menu"
          aria-label="User Profile Menu"
        >
          <ul className="py-1">
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              role="menuitem"
            >
              <div className="flex gap-2">
                <Image
                  className="w-[16px] h-[16px] rounded-full"
                  src={imageSource}
                  alt="User avatar"
                />
                <div className="flex flex-col">
                  <span className="text-[14px] font-normal text-[#4A5568]">
                    My Profile
                  </span>
                  <span className="text-[14px] font-normal text-[#A0AEC0]">
                    Change settings of your account.
                  </span>
                </div>
              </div>
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              role="menuitem"
            >
              <div className="flex gap-2 items-center">
                <HiLogout
                  className="text-[#E53E3E] w-[20px] h-[20px]"
                  aria-hidden="true"
                />
                <span className="text-[14px] font-normal text-[#E53E3E]">
                  Logout
                </span>
              </div>
            </li>
          </ul>
        </aside>
      )}
    </div>
  );
}
