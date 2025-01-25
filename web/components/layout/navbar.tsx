"use client";
import { Loader2, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { getAccessToken } from "@/actions/auth";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSignOutMutation } from "@/redux/features/auth/api";
import { TJwtPayload } from "@/types";
import { jwtDecode } from "jwt-decode";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Container from "../ui/container";

const navItems = [
  { title: "Home", href: "/" },
  { title: "Expeditions", href: "/expeditions" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];

export function Navbar() {
  const [token, setToken] = React.useState("");
  const [skip, setSkip] = React.useState(true);
  const [isOpen, setIsOpen] = React.useState(false);
  const [signOut, { isLoading }] = useSignOutMutation();

  let user;
  if (token) {
    user = jwtDecode(token || "") as TJwtPayload;
  }
  const handleSignOut = async () => {
    await signOut("");
    setSkip(false);
  };

  const getToken = async () => {
    const token = await getAccessToken();
    setToken(token || "");
  };

  React.useEffect(() => {
    getToken();
  }, [skip]);

  return (
    <nav className="fixed top-0 w-full bg-black bg-opacity-50 backdrop-blur-md z-50">
      <Container className="">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center lg:justify-start  w-full justify-center">
            <Link href="/" className="text-white text-xl font-bold">
              SpaceVoyager
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            {user?.id ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="cursor-pointer" asChild>
                  <Avatar>
                    <AvatarImage src="" alt={user?.email} />
                    <AvatarFallback>{user?.email?.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="cursor-pointer"
                  >
                    {isLoading ? (
                      <Loader2 className="animate-spin duration-300" />
                    ) : (
                      <>
                        <LogOut />
                        <span>Sign out</span>
                      </>
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href={"/sign-in"}>
                <Button variant="default" className="">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="default" size="icon" className="">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                  {user?.id ? (
                    <Button onClick={handleSignOut} className="w-full">
                      {isLoading ? (
                        <Loader2 className="animate-spin duration-300" />
                      ) : (
                        "Sign out"
                      )}
                    </Button>
                  ) : (
                    <Link href={"/sign-in"}>
                      <Button className="w-full">Sign In</Button>
                    </Link>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </nav>
  );
}
