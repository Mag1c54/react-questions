import type { IconType } from "react-icons";
import {
  FaBehance,
  FaDribbble,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTelegramPlane,
  FaTwitter,
  FaVk,
  FaWhatsapp,
} from "react-icons/fa";

export interface SocialPlatform {
  code: string;
  label: string;
  icon: IconType;
}

export const SOCIAL_PLATFORMS: SocialPlatform[] = [
  { code: "instagram", label: "Instagram", icon: FaInstagram },
  { code: "linkedin", label: "Linkedin", icon: FaLinkedinIn },
  { code: "twitter", label: "Twitter", icon: FaTwitter },
  { code: "github", label: "GitHub", icon: FaGithub },
  { code: "behance", label: "Behance", icon: FaBehance },
  { code: "whatsapp", label: "Whatsapp", icon: FaWhatsapp },
  { code: "telegram", label: "Telegram", icon: FaTelegramPlane },
  { code: "vk", label: "VK", icon: FaVk },
  { code: "dribbble", label: "Dribbble", icon: FaDribbble },
];

export const getPlatform = (code: string) =>
  SOCIAL_PLATFORMS.find((platform) => platform.code === code);
