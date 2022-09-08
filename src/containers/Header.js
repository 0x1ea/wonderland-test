import React from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import Link from "next/link"
import Image from "next/image"
import LOGO from "../assets/wonder-logo.svg"

const Header = () => {
  return (
    <header className="h-20 w-full">
      <nav className="h-20 flex justify-end md:justify-between max-w-screen-lg align-middle mx-auto">
        <Link href="/">
          <a className="w-28 items-center justify-center hidden md:flex">
            <div className="mx-auto">
              <Image src={LOGO} alt="Wonderland Logo" width="50" height="50" />
            </div>
          </a>
        </Link>

        <div className="w-48 flex items-center justify-center">
          <ConnectButton showBalance={false} accountStatus="address" />
        </div>
      </nav>
    </header>
  )
}

export default Header
