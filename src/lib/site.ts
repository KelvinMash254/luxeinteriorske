export const COMPANY = {
  name: "Luxe Interiors Ke",
  tagline: "Elevating Spaces. Defining Luxury.",
  statement: "Redefining Luxury. Transforming Spaces.",
  email: "luxeinteriorskenyake@gmail.com",
  phone: "+254714103131",
  phoneDisplay: "+254 714 103 131",
  whatsappNumber: "254714103131",
  location: "Kenya",
} as const;

export const WHATSAPP_MESSAGE =
  "Hello Luxe Interiors Ke, I am interested in your interior design services. I would like to discuss a project and request more information.";

export function whatsappUrl(message: string = WHATSAPP_MESSAGE) {
  return `https://wa.me/${COMPANY.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const MAILTO = `mailto:${COMPANY.email}`;
export const TEL = `tel:${COMPANY.phone}`;

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/process", label: "Our Process" },
  { to: "/contact", label: "Contact" },
] as const;

export const BUDGET_OPTIONS = [
  "Under KES 500,000",
  "KES 500,000 – 1,500,000",
  "KES 1,500,000 – 5,000,000",
  "KES 5,000,000 – 15,000,000",
  "Above KES 15,000,000",
  "Not sure yet",
] as const;

export const CONSULTATION_METHODS = [
  { value: "phone", label: "Phone Call" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "video", label: "Video Call" },
  { value: "in_person", label: "In-Person Meeting" },
] as const;

export const PROJECT_CATEGORIES = [
  "Residential",
  "Commercial",
  "Hospitality",
  "Office",
  "Living Rooms",
  "Bedrooms",
  "Kitchens",
] as const;
