import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { Steps } from "@/components/Steps";

export default function ConfigureLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MaxWidthWrapper
      className="flex flex-col flex-1"
    >
      <Steps />
      {children}
    </MaxWidthWrapper>
  );
}