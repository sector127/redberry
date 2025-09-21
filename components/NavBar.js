'use client'
import { useSession } from "next-auth/react";
import { LogIn } from "./LogIn"
import { Logo } from "./Logo"
import { useRouter } from "next/navigation"
import { UserMenu } from "./UserMenu";

export const NavBar = ()=> {
    const { data: session, status } = useSession();
    const router = useRouter();

    return (
        <nav className="container mx-auto flex justify-between items-center">
            <Logo />
            {status === "authenticated" ? (
                <UserMenu /> 
            ) : (
                <LogIn />
            )}
        </nav>
    )
}