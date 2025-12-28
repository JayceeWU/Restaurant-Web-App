import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import { LuPhone } from "react-icons/lu";

type LocationCardProps = {
  title: string;
  imageSrc: string;
  address: string; // e.g. "1477 Plymouth St., Mountain View, CA"
  phoneDisplay: string; // e.g. "(650) 628-6100"
  phoneTel: string; // e.g. "+16506286100"
  hours: Array<{ value: string }>;
};

export default function LocationCard({
  title,
  imageSrc,
  address,
  phoneDisplay,
  phoneTel,
  hours,
}: LocationCardProps) {
  return (
    <div className="m-6 overflow-hidden rounded-lg border bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left image */}
        <div className="relative h-80 w-full">
          <Image
            src={imageSrc}
            alt={`${title} photo`}
            fill
            className="object-cover"
            loading="eager"
            sizes="960px"
          />
        </div>

        {/* Right content */}
        <div className="p-6 md:p-10">
          <h2 className="text-2xl font-semibold tracking-wide">
            {title.toUpperCase()}
          </h2>

          <div className="mt-6 space-y-4 text-xs">
            <div>
              <a
                key={address}
                href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full text-sm"
                aria-label={`Open ${address} in Maps`}
              >
                <FaLocationDot />
                <span>{address}</span>
              </a>
            </div>

            <div>
              <a
                href={`tel:${phoneTel}`}
                className="flex items-center gap-2"
                aria-label={`Call ${phoneDisplay}`}
              >
                <LuPhone size={18} />
                <span className="tracking-wide">{phoneDisplay}</span>
              </a>
            </div>

            <div>
              <h3 className="font-semibold tracking-widest uppercase">Hours</h3>
              {hours.map((h) => (
                <div key={h.value} className="flex">
                  <div className="text-foreground/80 mt-1">{h.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
