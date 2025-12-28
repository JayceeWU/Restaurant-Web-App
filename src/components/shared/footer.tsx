import {
  APP_NAME,
  COPYRIGHT,
  DOUYIN_URL,
  EMAIL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  PHONE,
  PHONE_DISPLAY,
  WECHAT_URL,
  XIAOHONGSHU_URL,
  LOCATIONS,
} from "@/lib/constants";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import { SiXiaohongshu, SiWechat } from "react-icons/si";
import { HiOutlineMail } from "react-icons/hi";
import { FaLocationDot } from "react-icons/fa6";
import { LuPhone } from "react-icons/lu";

const socialLinkClass =
  "inline-flex h-8 w-8 items-center justify-center border rounded-full " +
  "hover:bg-accent hover:text-accent-foreground";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="text-s flex flex-col items-center gap-4 p-4 text-muted-foreground">
        <span className="font-bold">{APP_NAME}</span>
        <div className="flex flex-wrap justify-center items-center gap-3">
          {LOCATIONS.map((location) => (
            <a
              key={location.name}
              href={`https://maps.google.com/?q=${encodeURIComponent(location.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-muted"
              aria-label={`Open ${location.address} in Maps`}
            >
              <FaLocationDot />
              <span>{location.name}</span>
            </a>
          ))}
        </div>
        <div className="flex flex-wrap justify-center items-center gap-6">
          <a
            href={WECHAT_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WeChat"
            title="WeChat"
            className={socialLinkClass}
          >
            <SiWechat className="h-4 w-4" />
          </a>

          <a
            href={XIAOHONGSHU_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Xiaohongshu"
            title="Xiaohongshu"
            className={socialLinkClass}
          >
            <SiXiaohongshu className="h-4 w-4" />
          </a>

          <a
            href={DOUYIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Douyin"
            title="Douyin"
            className={socialLinkClass}
          >
            <FaTiktok className="h-4 w-4" />
          </a>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            title="Instagram"
            className={socialLinkClass}
          >
            <FaInstagram className="h-4 w-4" />
          </a>

          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            title="Facebook"
            className={socialLinkClass}
          >
            <FaFacebookF className="h-4 w-4" />
          </a>
        </div>
        <a
          href={`mailto:${EMAIL}`}
          className="flex items-center gap-2 hover:text-foreground"
          aria-label={`Email ${EMAIL}`}
        >
          <HiOutlineMail size={18} />
          <span className="tracking-wide">{EMAIL}</span>
        </a>
        <a
          href={`tel:${PHONE}`}
          className="flex items-center gap-2 hover:text-foreground"
          aria-label={`Call ${PHONE_DISPLAY}`}
        >
          <LuPhone size={18} />
          <span className="tracking-wide">{PHONE_DISPLAY}</span>
        </a>
        <div className="p-1 flex-center text-xs">
          {currentYear} {COPYRIGHT}. All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
