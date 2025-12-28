import LocationCard from "./LocationCard";
import { LOCATIONS } from "@/lib/constants";

export const metadata = {
  title: "Locations",
};

const Locations = () => {
  return (
    <div>
      {LOCATIONS.map((location) => (
        <LocationCard
          key={location.name}
          title={location.name}
          imageSrc={`/image/locations/${location.name.toLowerCase().replace(" ", "-")}.png`}
          address={location.address}
          phoneDisplay={location.phoneDisplay}
          phoneTel={location.phoneTel}
          hours={location.hours}
        />
      ))}
    </div>
  );
};

export default Locations;
