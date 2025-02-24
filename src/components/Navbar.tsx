"use client";

import Link from "next/link";
import MaxWidthContainer from "./MaxWidthContainer";
import { Button } from "./ui/button";
import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";

export default function Navbar() {
  const { isSignedIn } = useUser();
  return (
    <div className="border border-b py-4">
      <MaxWidthContainer className="flex-between">
        <Link href={"/"} className="font-bold text-2xl text-slate-800">
          Freelancer
        </Link>

        <div className="flex gap-6 items-center">
          <span className="font-medium text-gray-700 hover:text-gray-700/90 cursor-pointer">
            Explore
          </span>
          <span className="font-medium text-gray-700 hover:text-gray-700/90 cursor-pointer">
            Become a seller
          </span>

          {isSignedIn ? (
            <div className="flex items-center space-x-4">
              <Link
                className="font-medium text-gray-700 hover:text-gray-700/90 cursor-pointer"
                href="/profile"
              >
                Profile
              </Link>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          ) : (
            <div className="space-x-4">
              <Link href="/sign-in">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/sign-up">
                <Button variant="outline">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </MaxWidthContainer>
    </div>
  );
}
