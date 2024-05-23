import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
    imgSrc: string
    dark?: boolean
    className?: string
}

export function Phone({ imgSrc, className, dark = false, ...props }: PhoneProps) {
    return (
        <div
            {...props}
            className={cn("relative pointer-events-none z-50 overflow-hidden", className)}
        >
            <img
                src={dark ? "/phone-template-dark-edges.png" : "/phone-template-white-edges.png"}
                alt="Imagem do celular"
                className="pointer-events-none z-50 select-none"
            />

            <div className="absolute -z-10 inset-0">
                <img
                    src={imgSrc}
                    alt="Foto demonstrativa para a capa"
                    className="object-cover min-w-full min-h-full"
                />
            </div>
        </div>
    )
}
