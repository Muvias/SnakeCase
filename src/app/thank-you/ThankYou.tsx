'use client'

import { useQuery } from "@tanstack/react-query"
import { GetPaymentStatus } from "./actions"
import { notFound, useSearchParams } from "next/navigation"
import { Loader2Icon } from "lucide-react"
import { PhonePreview } from "@/components/PhonePreview"
import { formatPrice } from "@/lib/utils"

export function ThankYou() {
    const searchParams = useSearchParams()
    const orderId = searchParams.get("orderId")

    if (orderId === null) return notFound()

    const { data } = useQuery({
        queryKey: ["get-payment-status"],
        queryFn: async () => await GetPaymentStatus({ orderId }),
        retry: true,
        retryDelay: 500
    })

    if (data === undefined) {
        return (
            <div className="flex justify-center w-full my-24">
                <div className="flex flex-col items-center gap-2">
                    <Loader2Icon className="w-8 h-8 animate-spin text-zinc-500" />
                    <h3 className="font-semibold text-xl">Carregando seu pedido...</h3>
                    <p>Não demorará muito.</p>
                </div>
            </div>
        )
    }

    if (data === false) {
        return (
            <div className="flex justify-center w-full my-24">
                <div className="flex flex-col items-center gap-2">
                    <Loader2Icon className="w-8 h-8 animate-spin text-zinc-500" />
                    <h3 className="font-semibold text-xl">Verificando seu pedido...</h3>
                    <p>Isso pode demorar um momento.</p>
                </div>
            </div>
        )
    }

    const { configuration, billingAddress, shippingAddress, amount } = data;
    const { color } = configuration;

    return (
        <div className="bg-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <div className="max-w-xl">
                    <p className="text-base font-medium text-primary">Obrigado!</p>
                    <h1 className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight">
                        Sua capinha está a caminho!
                    </h1>

                    <p className="mt-2 text-base text-zinc-500">
                        Recebemos o seu pedido e agora iremos prepara-lo.
                    </p>

                    <div className="mt-12 text-sm font-medium">
                        <p className="text-zinc-900">Número do pedido:</p>
                        <p className="mt-2 text-zinc-500">{orderId}</p>
                    </div>
                </div>

                <div className="mt-10 border-t border-zinc-200">
                    <div className="flex flex-col flex-auto mt-10">
                        <h2 className="font-semibold text-zinc-900">
                            Você fez uma ótima escolha!
                        </h2>

                        <p className="mt-2 text-sm text-zinc-600">
                            Nós da SnakeCase acreditamos que uma capinha de celular não deve ser apenas bonita, mas também durar pelos próximos anos que virão.{' '}
                            Nós oferecemos 5 anos de garantia de pintura: Se você não estiver com a melhor qualidade, nós trocaremos para você de graça.
                        </p>
                    </div>
                </div>

                <div className="flex mt-4 space-x-6 rounded-xl lg:rounded-2xl overflow-hidden ring-1 ring-inset ring-gray-900/10 bg-gray-900/5">
                    <PhonePreview croppedImageUrl={configuration.croppedImageUrl!} color={color!} />
                </div>

                <div>
                    <div className="grid grid-cols-2 gap-x-6 py-10 text-sm">
                        <div>
                            <p className="font-medium text-gray-900">
                                Endereço de entrega
                            </p>

                            <div className="mt-2 text-zinc-700">
                                <address className="not-italic">
                                    <span className="block">
                                        {shippingAddress?.name}
                                    </span>
                                    <span className="block">
                                        {shippingAddress?.street}
                                    </span>
                                    <span className="block">
                                        {shippingAddress?.postalCode}{" "}
                                        {shippingAddress?.city}
                                    </span>
                                </address>
                            </div>
                        </div>

                        <div>
                            <p className="font-medium text-gray-900">
                                Endereço de cobrança
                            </p>

                            <div className="mt-2 text-zinc-700">
                                <address className="not-italic">
                                    <span className="block">
                                        {billingAddress?.name}
                                    </span>
                                    <span className="block">
                                        {billingAddress?.street}
                                    </span>
                                    <span className="block">
                                        {billingAddress?.postalCode}{" "}
                                        {billingAddress?.city}
                                    </span>
                                </address>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-6 py-10 border-t text-sm border-zinc-200">
                        <div>
                            <p className="font-medium text-zinc-900">
                                Status do pagamento
                            </p>

                            <p className="mt-2 text-zinc-500">
                                Pago
                            </p>
                        </div>

                        <div>
                            <p className="font-medium text-zinc-900">
                                Método de envio
                            </p>

                            <p className="mt-2 text-zinc-500">
                                Transportadora, em até 3 dias úteis
                            </p>
                        </div>
                    </div>
                </div>

                <div className="pt-10 space-y-6 text-sm border-t border-zinc-200">
                    <div className="flex justify-between">
                        <p className="font-medium text-zinc-900">
                            Subtotal
                        </p>

                        <p className="font-medium text-zinc-600">
                            {formatPrice(amount)}
                        </p>
                    </div>

                    <div className="flex justify-between">
                        <p className="font-medium text-zinc-900">
                            Envio
                        </p>

                        <p className="font-medium text-zinc-600">
                            {formatPrice(0)}
                        </p>
                    </div>

                    <div className="flex justify-between">
                        <p className="font-bold text-zinc-950">
                            Total
                        </p>

                        <p className="font-bold text-zinc-800">
                            {formatPrice(amount)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
