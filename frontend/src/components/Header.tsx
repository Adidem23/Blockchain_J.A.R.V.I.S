"use client";

import Link from "next/link";
import ConnectWalletButton from "./ConnectWalletButton";
import { JarvisBotIcon } from "./JarvisBotIcon";

export default function Header() {

  return (
    <header className="flex justify-between items-center px-5 md:px-20 py-6">
      <div className="flex flex-1 items-center gap-2">
              <Link
                href="/"
                className="pointer-events-auto inline-flex items-center text-xl font-medium tracking-tight"
              >
                <JarvisBotIcon className="mr-1 size-4" />
                Jarvis Bot
              </Link>
            </div>

      <div className="flex items-center gap-4">
        <ConnectWalletButton />
      </div>
    </header>
  );
}
