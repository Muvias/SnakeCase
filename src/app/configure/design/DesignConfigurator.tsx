'use client'

import NextImage from "next/image";

import { cn } from "@/lib/utils";
import { Rnd } from "react-rnd";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { HandleComponent } from "@/components/HandleComponent";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DesignConfiguratorProps {
    configId: string
    imageUrl: string
    imageDimensions: {
        width: number;
        height: number;
    }
}

export function DesignConfigurator({ imageDimensions, imageUrl, configId }: DesignConfiguratorProps) {
    return (
        <div className="grid grid-cols-3 my-20 pb-20">
            <div className="relative flex items-center justify-center max-w-4xl h-[37.5rem] p-12 text-center col-span-2 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                <div className="relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]">
                    <AspectRatio
                        ratio={896 / 1831}
                        className="relative w-full pointer-events-none z-50 aspect-[896/1831]"
                    >
                        <NextImage
                            src="/phone-template.png"
                            alt="Foto do Celular"
                            fill
                            className="select-none pointer-events-none z-50"
                        />
                    </AspectRatio>

                    <div
                        className="absolute inset-0 top-px bottom-px left-[3px] right-[3px] rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)] z-40"
                    />

                    <div
                        className={cn("absolute inset-0 top-px bottom-px left-[3px] right-[3px] rounded-[32px]",
                            `bg-blue-950`
                        )}
                    />
                </div>

                <Rnd
                    default={{
                        x: 150,
                        y: 205,
                        width: imageDimensions.width / 4,
                        height: imageDimensions.height / 4
                    }}
                    lockAspectRatio
                    resizeHandleComponent={{
                        bottomRight: <HandleComponent />,
                        bottomLeft: <HandleComponent />,
                        topLeft: <HandleComponent />,
                        topRight: <HandleComponent />
                    }}
                    className="absolute z-20 border-[3px] border-primary"
                >
                    <div className="relative w-full h-full">
                        <NextImage
                            src={imageUrl}
                            alt="Sua imagem"
                            fill
                            className="pointer-events-none"
                        />
                    </div>
                </Rnd>
            </div>

            <div className="flex flex-col h-[37.5rem] bg-white">
                <ScrollArea
                    className="relative flex-1 overflow-auto"
                >
                    <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none z-10" />

                    <div className="pt-8 pb-12 px-8">
                        <h2
                            className="text-3xl tracking-tight font-bold"
                        >
                            Personalize sua capinha
                        </h2>

                        <div className="w-full h-px my-6 bg-zinc-200" />

                        <div></div>
                    </div>
                </ScrollArea>
            </div>
        </div>
    )
}
