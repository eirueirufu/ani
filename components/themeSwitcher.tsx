"use client";

import { SunDim, Moon } from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (theme === "light") {
    return (
      <button onClick={() => setTheme("dark")}>
        <Moon size={32} color='#474747' weight='bold' />
      </button>
    );
  }
  return (
    <button onClick={() => setTheme("light")}>
      <SunDim size={32} color='#f2f2f2' weight='bold' />
    </button>
  );
};
