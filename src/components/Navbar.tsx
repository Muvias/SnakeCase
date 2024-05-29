import { ClerkLoaded, ClerkLoading, SignInButton, SignOutButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { ArrowRightIcon, LoaderIcon } from "lucide-react";
import Link from "next/link";
import { MaxWidthWrapper } from "./MaxWidthWrapper";
import { Button, buttonVariants } from "./ui/button";
import { currentUser } from "@clerk/nextjs/server";

export async function Navbar() {
    const user = await currentUser();
    const isAdmin = user?.emailAddresses[0].emailAddress === process.env.ADMIN_EMAIL;

    return (
        <nav className="sticky top-0 w-full h-14 inset-x-0 border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all z-[100]">
            <MaxWidthWrapper>
                <div className="flex items-center justify-between h-14 border-b border-zinc-200">
                    <Link
                        href="/"
                        className="flex font-semibold z-40"
                    >
                        <span className="text-green-600">Snake</span>Case
                    </Link>

                    <div className="flex items-center h-full space-x-4">
                        <ClerkLoading>
                            <LoaderIcon className="h-5 w-5 text-muted-foreground animate-spin" />
                        </ClerkLoading>

                        <ClerkLoaded>
                            <SignedIn>
                                <SignOutButton
                                    redirectUrl="/"
                                >
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                    >
                                        Sair
                                    </Button>
                                </SignOutButton>

                                {isAdmin ? (
                                    <Link
                                        href="/api/auth"
                                        className={buttonVariants({
                                            size: "sm",
                                            variant: "ghost"
                                        })}
                                    >
                                        Painel
                                    </Link>
                                ) : null}
                            </SignedIn>

                            <SignedOut>
                                <SignUpButton
                                    mode="modal"
                                >
                                    <Button size="sm" variant="ghost" className="w-full">
                                        Cadastrar
                                    </Button>
                                </SignUpButton>

                                <SignInButton
                                    mode="modal"
                                >
                                    <Button size="sm" variant="ghost">
                                        Entrar
                                    </Button>
                                </SignInButton>
                            </SignedOut>
                        </ClerkLoaded>

                        <div className="hidden sm:block h-8 w-px bg-zinc-200" />

                        <Link
                            href="/configure/upload"
                            className={buttonVariants({
                                size: "sm",
                                className: "hidden sm:flex items-center gap-1"
                            })}
                        >
                            Criar Capinha
                            <ArrowRightIcon className="ml-1.5 w-4 h-4 shrink-0" />
                        </Link>
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav >
    )
}
