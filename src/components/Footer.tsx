import Link from "next/link";
import { MaxWidthWrapper } from "./MaxWidthWrapper";

export function Footer() {
    return (
        <footer className="relative h-20 bg-white">
            <MaxWidthWrapper>
                <div className="border-t border-gray-200" />

                <div className="flex flex-col md:flex-row justify-center items-center md:justify-between h-full">
                    <div className="text-center md:text-left pb-2 md:pb-0">
                        <p className="text-sm text-muted-foreground">
                            &copy; {new Date().getFullYear()} Todos os direitos reservados
                        </p>
                    </div>

                    <div className="flex items-center justify-center">
                        <div className="flex space-x-8">
                            <Link href="#" className="text-sm text-muted-foreground hover:text-gray-600">Termos</Link>
                            <Link href="#" className="text-sm text-muted-foreground hover:text-gray-600">Política de Privacidade</Link>
                            <Link href="#" className="text-sm text-muted-foreground hover:text-gray-600">Política de Cookies</Link>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </footer>
    )
}
