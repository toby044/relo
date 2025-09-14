"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteHeader() {
  const pathname = usePathname();

  const links = [
    { href: "/characters", name: "Characters" },
    { href: "/spells", name: "Spells" },
    { href: "/books", name: "Books" },
    { href: "/houses", name: "Houses" },
    { href: "/admin", name: "Admin" },
  ];

  return (
    <header className="flex h-[9rem] mb-15">
      <Link
        href="/"
        className="font-sans font-medium text-3xl grid place-content-center w-[10rem] h-[9rem] border-r border-b border-neutral-800  "
      >
        <span className="">Relo</span>
      </Link>

      {links.map((link) => {
        const isActive = pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`c-site-header__link relative font-sans w-[8rem] bg-background h-[9rem] grid place-content-center border-r border-b border-neutral-800 transition-colors 
              ${
                isActive
                  ? " c-site-header__link--is-active"
                  : " hover:border-b-neutral-400"
              }`}
          >
            <span className="c-site-header__link-text text-foreground transition-colors delay-250">
              {link.name}
            </span>
          </Link>
        );
      })}

      <div className="h-[9rem] flex-grow border-r border-b border-neutral-800"></div>
    </header>
  );
}
