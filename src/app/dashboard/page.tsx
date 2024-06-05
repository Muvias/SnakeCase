import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatPrice } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusDropdown } from "./StatusDropdown";

export default async function Page() {
    const user = await currentUser()

    const ADMIN_EMAIL = process.env.ADMIN_EMAIL

    if (!user || user.emailAddresses[0].emailAddress !== ADMIN_EMAIL) notFound();

    const orders = await db.order.findMany({
        where: {
            isPaid: true,
            createdAt: {
                gte: new Date(new Date().setDate(new Date().getDate() - 7))
            }
        },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            user: true,
            shippingAddress: true
        }
    })

    const lastWeekSum = await db.order.aggregate({
        where: {
            isPaid: true,
            createdAt: {
                gte: new Date(new Date().setDate(new Date().getDate() - 7))
            }
        },
        _sum: {
            amount: true
        }
    })

    const lastMonthSum = await db.order.aggregate({
        where: {
            isPaid: true,
            createdAt: {
                gte: new Date(new Date().setDate(new Date().getDate() - 30))
            }
        },
        _sum: {
            amount: true
        }
    })

    const WEEKLY_GOAL = 500
    const MONTH_GOAL = 2200

    return (
        <div className="flex min-h-screen w-full bg-muted/40">
            <div className="flex flex-col max-w-7xl w-full mx-auto sm:gap-4 py-4 px-3">
                <div className="flex flex-col gap-16">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardDescription>
                                    Última Semana
                                </CardDescription>

                                <CardTitle className="text-4xl">
                                    {formatPrice(lastWeekSum._sum.amount ?? 0)}
                                </CardTitle>
                            </CardHeader>

                            <CardContent>
                                <div className="text-sm text-muted-foreground">
                                    meta {formatPrice(WEEKLY_GOAL)}
                                </div>
                            </CardContent>

                            <CardFooter>
                                <Progress value={((lastWeekSum._sum.amount ?? 0) * 100) / WEEKLY_GOAL} />
                            </CardFooter>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardDescription>
                                    Último mês
                                </CardDescription>

                                <CardTitle className="text-4xl">
                                    {formatPrice(lastMonthSum._sum.amount ?? 0)}
                                </CardTitle>
                            </CardHeader>

                            <CardContent>
                                <div className="text-sm text-muted-foreground">
                                    meta {formatPrice(MONTH_GOAL)}
                                </div>
                            </CardContent>

                            <CardFooter>
                                <Progress value={((lastMonthSum._sum.amount ?? 0) * 100) / MONTH_GOAL} />
                            </CardFooter>
                        </Card>
                    </div>

                    <h1 className="text-4xl font-bold tracking-tight">
                        Pedidos recebidos
                    </h1>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Cliente</TableHead>

                                <TableHead className="hidden sm:table-cell">Status</TableHead>

                                <TableHead className="hidden sm:table-cell">Data da compra</TableHead>

                                <TableHead className="text-right">Total</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id} className="bg-accent">
                                    <TableCell>
                                        <div className="font-medium">
                                            {order.shippingAddress?.name}
                                        </div>

                                        <div className="hidden md:inline text-sm text-muted-foreground">
                                            {order.user.email}
                                        </div>
                                    </TableCell>

                                    <TableCell className="hidden sm:table-cell">
                                        <StatusDropdown id={order.id} orderStatus={order.status} />
                                    </TableCell>

                                    <TableCell className="hidden sm:table-cell">
                                        {order.createdAt.toLocaleDateString()}
                                    </TableCell>

                                    <TableCell className="text-right">
                                        {formatPrice(order.amount)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
