import { Icons } from "@/components/Icons";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { Phone } from "@/components/Phone";
import { Testimonials } from "@/components/Testimonials";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRightIcon, CheckIcon, StarIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-slate-50 min-h-screen">
      <section>
        <MaxWidthWrapper
          className="lg:grid lg:grid-cols-3 xl:gap-x-8 pb-24 sm:pb-32 lg:pb-52 pt-10 lg:pt-24 xl:pt-32"
        >
          <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
            <div className="relative flex flex-col items-center lg:items-start mx-auto text-center lg:text-left">
              <div className="absolute hidden lg:block w-28 left-0 -top-20">
                <img
                  src="/snake-1.png"
                  className="w-full select-none pointer-events-none"
                />
              </div>

              <h1 className="relative w-fit mt-16 text-5xl md:text-6xl lg:text-7xl tracking-tight !leading-tight text-balance font-bold text-gray-900">
                Sua Foto em uma Capinha de Celular{' '}
                <span className="px-2 text-white bg-green-600 rounded-sm">
                  Personalizada
                </span>
              </h1>

              <p className="max-w-prose mt-8 lg:pr-8 text-lg text-center lg:text-start text-balance md:text-wrap">
                Tenha suas memórias favoritas em sua própria capinha de celular <span className="font-semibold">exclusiva</span>. SnakeCase permite que você proteja suas memórias, não apenas seu telefone.
              </p>

              <ul className="flex items-center sm:items-start mt-8 space-y-2 text-left font-medium">
                <div className="space-y-2">
                  <li className="flex items-center gap-1.5 text-left">
                    <CheckIcon className="h-5 w-5 shrink-0 text-green-600" />
                    Alta Qualidade, material resistente
                  </li>
                  <li className="flex items-center gap-1.5 text-left">
                    <CheckIcon className="h-5 w-5 shrink-0 text-green-600" />
                    5 anos de garantida de impressão
                  </li>
                  <li className="flex items-center gap-1.5 text-left">
                    <CheckIcon className="h-5 w-5 shrink-0 text-green-600" />
                    Novos modelhos de Iphone suportados
                  </li>
                </div>
              </ul>

              <div className="flex flex-col sm:flex-row items-center sm:items-start mt-12 gap-5">
                <div className="flex -space-x-4">
                  <img
                    src="/users/user-1.png"
                    alt="Image de usuário fictício"
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                  />
                  <img
                    src="/users/user-2.png"
                    alt="Image de usuário fictício"
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                  />
                  <img
                    src="/users/user-3.png"
                    alt="Image de usuário fictício"
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                  />
                  <img
                    src="/users/user-4.jpg"
                    alt="Image de usuário fictício"
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                  />
                  <img
                    src="/users/user-5.jpg"
                    alt="Image de usuário fictício"
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100 object-cover"
                  />
                </div>

                <div className="flex flex-col justify-between items-center sm:items-start">
                  <div className="flex gap-0.5">
                    <StarIcon className="h-4 w-4 shrink-0 text-green-600 fill-green-600" />
                    <StarIcon className="h-4 w-4 shrink-0 text-green-600 fill-green-600" />
                    <StarIcon className="h-4 w-4 shrink-0 text-green-600 fill-green-600" />
                    <StarIcon className="h-4 w-4 shrink-0 text-green-600 fill-green-600" />
                    <StarIcon className="h-4 w-4 shrink-0 text-green-600 fill-green-600" />
                  </div>

                  <p className="text-sm">
                    <span className="font-semibold">1.250</span> clientes satisfeitos
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-full lg:col-span-1 flex justify-center w-full h-fit px-8 sm:px-16 md:px-0 mt-32 lg:mt-20 lg:mx-0">
            <div className="relative md:max-w-xl">
              <img
                src="/your-image.png"
                alt="Indicação de onde ficará sua foto"
                className="absolute hidden sm:block lg:hidden xl:block w-40 lg:w-52 left-56 -top-20 select-none"
              />
              <img
                src="/line.png"
                alt="linha tracejada"
                className="absolute w-20 -left-6 -bottom-6 select-none"
              />
              <Phone
                imgSrc="/testimonials/1.jpg"
                className="w-64"
              />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <Testimonials />

      <section>
        <MaxWidthWrapper className="py-24">
          <div className="mb-12 px-6 lg:px-8">
            <div className="max-w-3xl mx-auto sm:text-center">
              <h2 className="order-1 mt-2 tracking-tight font-bold text-5xl md:text-6xl text-center text-balance !leading-tight text-gray-900">
                Envie sua foto e crie <span className="relative px-2 text-white bg-green-600">sua própria capinha</span>
              </h2>
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="relative flex flex-col items-center md:grid grid-cols-2 gap-40">
              <img
                src="/arrow.png"
                alt="Flecha indicativa"
                className="absolute top-[25rem] md:top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10 rotate-90 md:rotate-0"
              />

              <div className="relative max-w-sm w-full h-80 md:h-full md:justify-self-end rounded-xl lg:rounded-2xl bg-gray-900/5 ring-inset ring-gray-900/10">
                <img
                  src="/horse.jpg"
                  className="w-full h-full rounded-md object-cover shadow-2xl bg-white ring-1 ring-gray-900/10"
                />
              </div>

              <Phone
                imgSrc="/horse_phone.jpg"
                className="w-60"
              />
            </div>
          </div>

          <ul className="max-w-prose w-fit mx-auto mt-12 sm:text-lg space-y-2">
            <li className="w-fit">
              <CheckIcon className="w-5 h-5 inline mr-1.5 text-green-600" />

              Material de silicone de alta qualidade
            </li>
            <li className="w-fit">
              <CheckIcon className="w-5 h-5 inline mr-1.5 text-green-600" />

              Revestido contra arranhões e marcas de dedo
            </li>
            <li className="w-fit">
              <CheckIcon className="w-5 h-5 inline mr-1.5 text-green-600" />

              Compatível com carregamento sem fio
            </li>
            <li className="w-fit">
              <CheckIcon className="w-5 h-5 inline mr-1.5 text-green-600" />

              Garantia de impressão de 5 anos
            </li>

            <div className="flex justify-center">
              <Link
                href="/configure/upload"
                className={buttonVariants({
                  size: "lg",
                  className: "mx-auto mt-8"
                })}
              >
                Crie sua capinha agora <ArrowRightIcon className="h-4 w-4 ml-1.5 shrink-0" />
              </Link>
            </div>
          </ul>
        </MaxWidthWrapper>
      </section>
    </main>
  );
}
