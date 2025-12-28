import AboutCard from "./AboutCard";
import { ABOUT } from "@/lib/constants";

export const metadata = {
  title: "About Us",
};

const About = () => {
  return (
    <div>
      {ABOUT.map((about) => (
        <AboutCard
          key={about.title}
          title={about.title}
          content={about.content}
          imageSrc={about.imageSrc}
        />
      ))}
    </div>
  );
};

export default About;
