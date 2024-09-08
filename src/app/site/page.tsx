import Image from "next/image";
import { pricingCards } from "@/lib/constants";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

export default function Home() {
  return (
    <>
      <section className="h-full w-full pt-36 relative flex items-center justify-center flex-col">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

        <p className="text-center text-lg md:text-xl lg:text-2xl">
          Run your agency, in one place
        </p>
        <div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative">
          <h1 className="text-6xl md:text-9xl lg:text-[300px] font-bold text-center">
            Plural
          </h1>
        </div>

        <div className="flex justify-center items-center relative mt-8 md:mt-[70px] w-full">
          <Image
            src={"/assets/preview.png"}
            alt="banner image"
            height={1200}
            width={1200}
            className="rounded-tl-2xl rounded-tr-2xl border-2 border-muted max-w-full h-auto"
          />
          <div className="button-0 top-[50%] bg-gradient-to-t dark:from-background left-0 right-0 absolute z-10"></div>
        </div>
      </section>

      <section className="flex flex-col items-center gap-4 mt-12 md:mt-20 w-full px-4">
        <h2 className="text-3xl md:text-4xl text-center">
          Choose what fits you right
        </h2>
        <p className="text-muted-foreground text-center">
          Our straightforward Pricing plans are tailored to meet your needs. If
          {" you're"} not <br />
          ready to commit your can get started for free
        </p>

        <div className="flex flex-wrap justify-center items-center gap-4 mt-6 w-full max-w-6xl">
          {pricingCards.map((card) => (
            <Card
              key={card.title}
              className={clsx(
                "w-full sm:w-[300px] flex flex-col justify-between",
                {
                  "border-2 border-primary": card.title === "Unlimited Saas",
                }
              )}
            >
              <CardHeader>
                <CardTitle
                  className={clsx("", {
                    "text-muted-foreground": card.title !== "Unlimited Saas",
                  })}
                >
                  {card.title}
                </CardTitle>

                <CardDescription>{card.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <span className="text-4xl font-bold">{card.price}</span>
                <span>/m</span>
              </CardContent>

              <CardFooter className="flex flex-col items-start gap-4">
                <div>
                  {card.features.map((feature) => (
                    <div key={feature} className="flex gap-2 items-center">
                      <Check className="text-muted-foreground" />
                      <p>{feature}</p>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/agency?plan=${card.priceId}`}
                  className={clsx(
                    "w-full text-center bg-primary p-2 rounded-md",
                    {
                      "!bg-muted-foreground": card.title !== "Unlimited Saas",
                    }
                  )}
                >
                  Get started
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
