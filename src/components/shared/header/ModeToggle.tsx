"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { LuSunMoon } from "react-icons/lu";

const ModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const label = isDark ? "Switch to Light mode" : "Switch to Dark mode";
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <Button
      variant="ghost"
      aria-label={label}
      title={label}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="cursor-pointer"
    >
      <LuSunMoon size={18} />
      <span className="md:hidden inline text-sm">{label}</span>
    </Button>
  );
};

export default ModeToggle;
