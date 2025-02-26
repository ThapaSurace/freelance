"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function DynamicNavbar() {
  const pathName = usePathname();

  // Hide navbar if pathname is "/sign-in" or "/sign-up"
  const hideNavbar = pathName === "/sign-in" || pathName === "/sign-up";

  if (hideNavbar) return null; // Don't render anything

  return <Navbar />;
}
