import { CheckIcon, StarIcon } from "lucide-react";
import { Icons } from "./Icons";
import { MaxWidthWrapper } from "./MaxWidthWrapper";
import { Reviews } from "./Reviews";

export function Testimonials() {
    return (
        <section className="py-24 bg-slate-100">
            <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-32">
                <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
                    <h2 className="order-1 mt-2 tracking-tight font-bold text-5xl md:text-6xl text-center text-balance !leading-tight text-gray-900">
                        O que nossos <span className="relative px-2">clientes <Icons.underline className="absolute hidden sm:block pointer-events-none inset-x-0 -bottom-5 text-green-500" /></span> falam
                    </h2>

                    <img
                        src="/snake-2.png"
                        alt="Mascote cobra"
                        className="w-24 lg:order-2"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 max-w-2xl lg:max-w-none mx-auto px-4 lg:mx-0 gap-y-16">
                    {/* Comentário cliente 1 */}
                    <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
                        <div className="flex gap-0.5 mb-2">
                            <StarIcon className="h-5 w-5 shrink-0 text-green-600 fill-green-600" />
                            <StarIcon className="h-5 w-5 shrink-0 text-green-600 fill-green-600" />
                            <StarIcon className="h-5 w-5 shrink-0 text-green-600 fill-green-600" />
                            <StarIcon className="h-5 w-5 shrink-0 text-green-600 fill-green-600" />
                            <StarIcon className="h-5 w-5 shrink-0 text-green-600 fill-green-600" />
                        </div>

                        <div className="text-lg leading-8">
                            <p>
                                "A capinha parece bem resistente e eu até recebi elogios pelo design.
                                Faz cerca de dois meses e meio que comprei e <span className="p-0.5 text-white bg-slate-800">a imagem está perfeita</span>,
                                a capinha que eu tinha antes começou a amarelar após algumas semanas. Amei."
                            </p>
                        </div>

                        <div className="flex gap-4 mt-2">
                            <img
                                src="/users/user-1.png"
                                alt="Usuário"
                                className="w-12 h-12 rounded-full object-cover"
                            />

                            <div className="flex flex-col">
                                <p className="font-semibold">Jonathan</p>

                                <div className="flex items-center gap-1.5 text-zinc-600">
                                    <CheckIcon className="h-4 w-4 stroke-[3px] text-green-600" />
                                    <p className="text-sm">Compra Verificada</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Comentário cliente 2 */}
                    <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
                        <div className="flex gap-0.5 mb-2">
                            <StarIcon className="h-5 w-5 shrink-0 text-green-600 fill-green-600" />
                            <StarIcon className="h-5 w-5 shrink-0 text-green-600 fill-green-600" />
                            <StarIcon className="h-5 w-5 shrink-0 text-green-600 fill-green-600" />
                            <StarIcon className="h-5 w-5 shrink-0 text-green-600 fill-green-600" />
                            <StarIcon className="h-5 w-5 shrink-0 text-green-600 fill-green-600" />
                        </div>

                        <div className="text-lg leading-8">
                            <p>
                                "Eu normalmente deixo meu celular no bolso junto com as minhas chaves, e isso deixou minhas capinhas antigas cheias de riscos.
                                Esta, além de um arranhão na borda quase imperceptível, <span className="p-0.5 text-white bg-slate-800">parece nova mesmo após meio ano</span>.
                                Gostei muito!"
                            </p>
                        </div>

                        <div className="flex gap-4 mt-2">
                            <img
                                src="/users/user-2.png"
                                alt="Usuário"
                                className="w-12 h-12 rounded-full object-cover"
                            />

                            <div className="flex flex-col">
                                <p className="font-semibold">Camilla</p>

                                <div className="flex items-center gap-1.5 text-zinc-600">
                                    <CheckIcon className="h-4 w-4 stroke-[3px] text-green-600" />
                                    <p className="text-sm">Compra Verificada</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>

            <div className="pt-16">
                <Reviews />
            </div>
        </section>
    )
}
