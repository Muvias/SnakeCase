import { SignIn } from "@clerk/nextjs";
import { Dispatch, SetStateAction } from "react";
import { Dialog, DialogContent } from "./ui/dialog";

interface LoginModalProps {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

export function LoginModal({ isOpen, setIsOpen }: LoginModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="w-max pt-10 z-[9999]">
                <SignIn
                    routing="hash"
                />
            </DialogContent>
        </Dialog>
    )
}
