"use client";

import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function BreadcrumbsComponent() {
  const router = useRouter();
  const pathname = usePathname();

  const paths = pathname.split("/").filter((path) => path);

  const fullPath = ["/", ...paths];

  const handleClick = (index: number) => {
    const pathToNavigate = fullPath.slice(0, index + 1).join("/") || "/";
    router.push(pathToNavigate);
  };

  return (
    <Breadcrumbs
      separator="/"
      itemClasses={{ separator: "px-2" }}
      className="text-[#718096] text-[16px] ml-5"
    >
      {fullPath.map((path, index) => {
        const isLastItem = index === fullPath.length - 1;
        const displayName = path === "/" ? "Home" : decodeURIComponent(path);

        return (
          <BreadcrumbItem
            key={index}
            onClick={() => !isLastItem && handleClick(index)}
            className={`cursor-pointer ${isLastItem ? "underline" : ""}`}
          >
            {displayName}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumbs>
  );
}
