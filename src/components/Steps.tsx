'use client'

import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

const STEPS = [
    {
        name: "Passo 1: Adicionar imagem",
        description: "Escolha uma imagem para a sua capinha",
        url: "/upload"
    },
    {
        name: "Passo 2: Customizar o design",
        description: "Faça da capinha sua",
        url: "/design"
    },
    {
        name: "Passo 3: Resumo",
        description: "Confira o design final",
        url: "/preview"
    },
]

export function Steps() {
    const pathname = usePathname()

    return (
        <ol className="rounded-md lg:flex lg:rounded-none lg:border-l lg:border-r lg:border-x-gray-200">
            {STEPS.map((step, index) => {
                const isCurrent = pathname.endsWith(step.url)
                const isCompleted = STEPS.slice(index + 1).some((step) => pathname.endsWith(step.url))
                const imgPath = `/snake-${index + 1}.png`

                return (
                    <li
                        key={step.name}
                        className="relative lg:flex-1 overflow-hidden"
                    >
                        <div>
                            <span
                                aria-hidden="true"
                                className={cn("absolute h-full w-1 left-0 top-0 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full bg-zinc-400",
                                    isCurrent && "bg-zinc-700",
                                    isCompleted && "bg-primary"
                                )}
                            />

                            <div
                                className={cn("flex items-center px-6 py-4 text-sm font-medium",
                                    index !== 0 ? "lg:pl-9" : ""
                                )}
                            >
                                <span className="flex-shrink-0">
                                    <img
                                        src={imgPath}
                                        alt="Mascote do site"
                                        className={cn("h-20 w-20 object-contain",
                                            isCompleted && "border-none",
                                            isCurrent && "border-zinc-700"
                                        )}
                                    />
                                </span>

                                <div className="flex flex-col justify-center min-w-0 h-full ml-4 mt-0.5">
                                    <span
                                        className={cn("text-sm font-semibold text-zinc-700",
                                            isCompleted && "text-primary",
                                            isCurrent && "text-zinc-700"
                                        )}
                                    >
                                        {step.name}
                                    </span>

                                    <span className="text-sm text-zinc-500">
                                        {step.description}
                                    </span>
                                </div>
                            </div>

                            {index !== 0 ? (
                                <div className="absolute hidden w-3 inset-0 lg:block">
                                    <svg
                                        className='h-full w-full text-gray-300'
                                        viewBox='0 0 12 82'
                                        fill='none'
                                        preserveAspectRatio='none'>
                                        <path
                                            d='M0.5 0V31L10.5 41L0.5 51V82'
                                            stroke='currentcolor'
                                            vectorEffect='non-scaling-stroke'
                                        />
                                    </svg>
                                </div>
                            ) : null}
                        </div>
                    </li>
                )
            })}
        </ol>
    )
}
