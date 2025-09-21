'use client';
import { ArrowDown, ShoppingCart } from "@/lib/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export const UserMenu = () => {
  const router = useRouter();
  
  const handleSignOut = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    await signOut({ redirectTo: "/login" });
  };

  return (
    <div className="flex justify-between items-center w-[108px]">
      <ShoppingCart />

      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex justify-between items-center w-16">
            <Image
              src="/assets/images/avatar.png"
              alt="avatar"
              width={40}
              height={40}
              className="rounded-full object-cover cursor-pointer"
            />
            <ArrowDown />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Orders</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <button onClick={() => signOut({callbackUrl: "/login"})} className="w-full">
          <DropdownMenuItem 
            className="text-red-500 flex justify-between cursor-pointer"
          >
            Leave
            <LogOut color="red" />
          </DropdownMenuItem>
          </button>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};