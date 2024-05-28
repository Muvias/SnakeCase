"use server"

import { BASE_PRICE, PRODUCT_PRICES } from "@/config/products";
import { db } from "@/db"
import { stripe } from "@/lib/stripe";
import { auth } from "@clerk/nextjs/server";
import { Order } from "@prisma/client";

export async function createCheckoutSession({ configId }: { configId: string }) {
    const configuration = await db.configuration.findUnique({
        where: { id: configId }
    });

    if (!configuration) throw new Error("Nenhuma configuração encontrada");

    const { userId } = auth();

    if (!userId) throw new Error("Você precisa estar logado");

    const { finish, material } = configuration;

    let price = BASE_PRICE;

    if (finish === "textured") price += PRODUCT_PRICES.finish.textured;
    if (material === "polycarbonate") price += PRODUCT_PRICES.material.polycarbonate;

    let order: Order | undefined = undefined;

    const existingOrder = await db.order.findFirst({
        where: { userId, configurationId: configuration.id }
    })

    console.log(userId, configuration.id)

    if (existingOrder) {
        order = existingOrder
    } else {
        order = await db.order.create({
            data: {
                amount: price / 100,
                userId: userId,
                configurationId: configuration.id
            }
        })
    }

    const product = await stripe.products.create({
        name: "Capinha de Iphone Personalizada",
        images: [configuration.imageUrl],
        default_price_data: {
            currency: "BRL",
            unit_amount: price,
        }
    })

    const stripeSession = await stripe.checkout.sessions.create({
        success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/check?id=${configuration.id}`,
        payment_method_types: ["card"],
        mode: "payment",
        shipping_address_collection: { allowed_countries: ["BR"] },
        metadata: {
            userId,
            orderId: order.id
        },
        line_items: [{ price: product.default_price as string, quantity: 1 }]
    })

    return { url: stripeSession.url }
}