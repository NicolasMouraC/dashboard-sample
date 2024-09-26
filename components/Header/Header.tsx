import Profile from "./Profile";
import profilePic from "@/public/profile_placeholder.jpg";
import Link from "next/link";

const MENUS = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Dashboard", path: "/dashboard" },
];

interface HeaderProps {
  userProfileImage?: string;
}

export default function Header({ userProfileImage }: HeaderProps) {
  return (
    <header
      className="flex flex-row justify-between items-center gap-10 bg-[#1E1ADD] py-[20px] px-[25px] rounded-[5px] w-full"
      role="banner"
    >
      <span className="text-[24px] font-bold text-white" aria-label="Logo">
        LOGO
      </span>

      <nav
        className="hidden md:flex flex-row flex-1 gap-10"
        aria-label="Main Navigation"
      >
        {MENUS.map((item, index) => (
          <Link
            key={index}
            href={item.path}
            className="text-[16px] text-white"
            aria-label={`Go to ${item.name}`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <Profile
        imageSource={userProfileImage || profilePic}
        aria-label="User Profile"
      />
    </header>
  );
}
