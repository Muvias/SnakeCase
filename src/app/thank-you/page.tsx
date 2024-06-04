import { Suspense } from "react";
import { ThankYou } from "./ThankYou";

interface PageProps {}

export default function Page({}: PageProps) {
    return (
        <Suspense>
            <ThankYou />
        </Suspense>
    )
}
