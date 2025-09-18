import Link from "next/link";

const links = [
  { href: "/characters", name: "Characters" },
  { href: "/spells", name: "Spells" },
  { href: "/books", name: "Books" },
  { href: "/houses", name: "Houses" },
];

export default function Home() {
  return (
    <div className="font-sans grid w-full md:px-8">
      <h1 className="tracking-tight font-medium mb-4 px-4 md:px-0">
        Welcome to Relo, a simple collection of harry potter stuff.
      </h1>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="u-border-hover py-20 px-4 -mt-[1px] border-y md:border-x border-neutral-800 flex items-center md:px-12 md:min-h-[220px] active:border-foreground transition-colors"
        >
          <h2 className="text-4xl lg:text-5xl xl:text-6xl tracking-tight font-medium">
            {link.name}
          </h2>
        </Link>
      ))}
      <p className="font-light text-sm mt-12 px-4 md:px-0">
        Credits to{" "}
        <a
          href="https://github.com/fedeperin/potterapi"
          target="_blank"
          className="underline"
        >
          https://github.com/fedeperin/potterapi
        </a>{" "}
        for providing the data for this.
      </p>
    </div>
  );
}
