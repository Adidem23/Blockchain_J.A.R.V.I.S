"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navItems = [
  { label: "Strategies", href: "/strategies", icon: "/atom.svg" },
  { label: "Bot", href: "/", icon: "/window.svg" },
  // Quests intentionally omitted for mobile nav
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around items-center py-2 z-50 md:hidden">
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href === "/" && pathname === "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center flex-1 py-1 px-2 transition-colors ${
              isActive ? "text-[#5F79F1]" : "text-[#A0AEC0]"
            }`}
          >
            <Image src={item.icon} alt={item.label} width={28} height={28} />
            <span className="text-xs mt-1 font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
