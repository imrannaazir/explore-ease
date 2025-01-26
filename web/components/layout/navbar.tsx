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
import { saveUser, selectUser } from "@/redux/features/auth/slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
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
  const { user } = useAppSelector(selectUser);
  console.log(user, "36");

  const dispatch = useAppDispatch();
  const [skip, setSkip] = React.useState(true);
  const [isOpen, setIsOpen] = React.useState(false);
  const [signOut, { isLoading }] = useSignOutMutation();

  const handleSignOut = async () => {
    await signOut("");
    setSkip(!skip);
  };

  const getToken = async () => {
    const token = await getAccessToken();
    if (token) {
      const decoded = jwtDecode(token) as TJwtPayload;
      dispatch(saveUser(decoded || null));
    } else {
      dispatch(saveUser(null));
    }
  };

  React.useEffect(() => {
    getToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip]);

  return (
    <nav className="fixed top-0 w-full   backdrop-blur-md z-50">
      <Container className="">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center lg:justify-start  w-full justify-center">
            <Link href="/" className="text-primary text-xl font-bold">
              ExploreEase
            </Link>
          </div>
          <div className="hidden md:block ">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="text-gray-700 hover:text-primary transition-all duration-300  px-3 py-2 rounded-md text-sm font-medium"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:block md:ml-4">
            {user?.id ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="cursor-pointer" asChild>
                  <Avatar>
                    <AvatarImage src="" alt={user?.email} />
                    <AvatarFallback className="uppercase">
                      {user?.email?.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuLabel className="text-sm font-normal py-0">
                    {user.fullName}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href={`/${user?.role?.toLowerCase()}/profile`}>
                    <DropdownMenuItem className="cursor-pointer">
                      Profile
                    </DropdownMenuItem>
                  </Link>
                  <Link href={`/${user?.role?.toLowerCase()}/dashboard`}>
                    <DropdownMenuItem className="cursor-pointer">
                      Dashboard
                    </DropdownMenuItem>
                  </Link>

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
