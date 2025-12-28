import { Cormorant_Garamond } from "next/font/google";
import Image from "next/image";

type LocationCardProps = {
  title: string;
  imageSrc: string;
  content: Array<{ value: string }>;
};

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600", "600"],
});

export default function LocationCard({
  title,
  imageSrc,
  content,
}: LocationCardProps) {
  return (
    <div className="m-6 overflow-hidden bg-background md:p-4">
      <div className="flex flex-col">
        <div className="p-2">
          <h2
            className={`text-2xl uppercase font-bold tracking-wider ${cormorant.className}`}
          >
            {title.toUpperCase()}
          </h2>
          {content.map((c) => (
            <div key={c.value} className="flex">
              <div
                className={`text-foreground/80 mt-1 text-xl ${cormorant.className}`}
              >
                {c.value}
              </div>
            </div>
          ))}
        </div>
        <div className="relative h-70 md:h-120 w-full">
          <Image
            src={imageSrc}
            alt={`${title} photo`}
            fill
            className="object-cover"
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
}
