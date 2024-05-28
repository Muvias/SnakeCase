'use client'

import { Phone } from '@/components/Phone'
import { Button } from '@/components/ui/button'
import { BASE_PRICE, PRODUCT_PRICES } from '@/config/products'
import { formatPrice } from '@/lib/utils'
import { COLORS, MODELS } from '@/validators/option-validator'
import { Configuration } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { ArrowRightIcon, CheckIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import Confetti from 'react-dom-confetti'
import { createCheckoutSession } from './actions'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface DesignPreviewProps {
    configuration: Configuration
}

export function DesignPreview({ configuration }: DesignPreviewProps) {
    const router = useRouter()

    const [showConfetti, setShowConfetti] = useState(false)

    useEffect(() => {
        setShowConfetti(true)
    }, [])

    const { mutate: createPaymentSession, isPending } = useMutation({
        mutationKey: ["get-checkout-session"],
        mutationFn: createCheckoutSession,
        onSuccess: ({ url }) => {
            if (url) router.push(url)
            else throw new Error("Não foi possível recuperar a URL de pagamento.");
        },
        onError: () => {
            toast.error("Algo deu errado, por favor tente novamente!")
        },
    })

    const { color, model, finish, material } = configuration
    const tw = COLORS.find((supportedColor) => supportedColor.value === color)?.tw
    const { label: modelLabel } = MODELS.options.find(({ value }) => value === model)!

    let totalPrice = BASE_PRICE

    if (material === "polycarbonate") totalPrice += PRODUCT_PRICES.material.polycarbonate;
    if (finish === "textured") totalPrice += PRODUCT_PRICES.finish.textured;

    return (
        <>
            <div aria-hidden="true" className="absolute flex justify-center inset-0 pointer-events-none select-none overflow-hidden">
                <Confetti
                    active={showConfetti}
                    config={{
                        elementCount: 200,
                        spread: 90,
                    }}
                />
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-12 sm:grid-rows-1 mt-20 sm:gap-x-6 md:gap-x-8 lg:gap-x-12 text-sm'>
                <div className='sm:col-span-4 md:col-span-3 md:row-span-2 md:row-end-2'>
                    <Phone
                        className={`bg-${tw}`}
                        imgSrc={configuration.croppedImageUrl!}
                    />
                </div>

                <div className='sm:col-span-9 md:row-end-1 mt-6 sm:mt-0'>
                    <h3 className='text-3xl font-bold tracking-tight text-gray-900'>
                        Sua capinha de {modelLabel}
                    </h3>

                    <div className='flex items-center gap-1.5 mt-3 text-base'>
                        <CheckIcon className='w-4 h-4 text-green-500' />
                        Em estoque e pronto para entrega
                    </div>
                </div>

                <div className='sm:col-span-12 md:col-span-9 text-base'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 py-8 sm:py-6 md:py-10 gap-y-8 sm:gap-x-6 border-b border-gray-200'>
                        <div>
                            <p className='font-medium text-zinc-950'>
                                Destaques
                            </p>

                            <ol className='mt-3 text-zinc-700 list-disc list-inside'>
                                <li>Compatível com carregamento por aproximação</li>
                                <li>Absorção de impactos TPU</li>
                                <li>Embalagem feita com materiais recicláveis</li>
                                <li>5 anos de garantia de pintura</li>
                            </ol>
                        </div>

                        <div>
                            <p className='font-medium text-zinc-950'>
                                Materiais
                            </p>

                            <ol className='mt-3 text-zinc-700 list-disc list-inside'>
                                <li>Material durável de alta qualidade</li>
                                <li>Resistente a arranhões e marcas de dedos</li>
                            </ol>
                        </div>
                    </div>

                    <div className='mt-8'>
                        <div className='p-6 sm:p-8 sm:rounded-lg bg-gray-50'>
                            <div className='flow-root text-sm'>
                                <div className='flex items-center justify-between py-1 mt-2'>
                                    <p className='text-gray-600'>Preço base</p>
                                    <p className='font-medium text-gray-900'>
                                        {formatPrice(BASE_PRICE / 100)}
                                    </p>
                                </div>

                                {material === "polycarbonate" ? (
                                    <div className='flex items-center justify-between py-1 mt-2'>
                                        <p className='text-gray-600'>Material de Policarbonato</p>
                                        <p className='font-medium text-gray-900'>
                                            {formatPrice(PRODUCT_PRICES.material.polycarbonate / 100)}
                                        </p>
                                    </div>
                                ) : null}

                                {finish === "textured" ? (
                                    <div className='flex items-center justify-between py-1 mt-2'>
                                        <p className='text-gray-600'>Acabamento texturizado</p>
                                        <p className='font-medium text-gray-900'>
                                            {formatPrice(PRODUCT_PRICES.finish.textured / 100)}
                                        </p>
                                    </div>
                                ) : null}

                                <div className='h-px my-2 bg-gray-200' />

                                <div className='flex items-center justify-between py-2'>
                                    <p className='font-semibold text-gray-900'>Total</p>
                                    <p className='font-semibold text-gray-900'>
                                        {formatPrice(totalPrice / 100)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className='flex justify-end mt-8 pb-12'>
                            <Button
                                onClick={() => createPaymentSession({ configId: configuration.id })}
                                disabled={isPending}
                                className='px-4 sm:px-6 lg:px-8'
                            >
                                Finalizar <ArrowRightIcon className='h-4 w-4 ml-1.5' />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
