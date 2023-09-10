"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { ThemeSwitcher } from "./themeSwitcher";
import { usePathname, useRouter } from "next/navigation";
import { GithubLogo, House } from "@phosphor-icons/react";

export default function Nav() {
  const router = useRouter();
  const pathname = usePathname();
  const position = pathname.startsWith("/media/") ? "fixed" : "";
  return (
    <Navbar isBordered className={position}>
      <NavbarBrand
        className='cursor-pointer'
        onClick={() => {
          router.push("/");
        }}
      >
        <House size={32} weight='bold' />
      </NavbarBrand>
      <NavbarContent
        className='hidden sm:flex gap-4'
        justify='center'
      ></NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem className='flex gap-3 items-center justify-center'>
          <ThemeSwitcher />
          <a href='https://github.com/eirueirufu/ani'>
            <GithubLogo
              size={32}
              weight='bold'
              className='rounded-full cursor-pointer'
            />
          </a>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
