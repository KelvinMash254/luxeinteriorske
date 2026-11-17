import { IMG } from "./images";

export type Service = {
  slug: string;
  title: string;
  short: string;
  intro: string;
  image: string;
  detailImage: string;
  benefits: string[];
  approach: { title: string; text: string }[];
  includes: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "residential-interior-design",
    title: "Residential Interior Design",
    short: "Homes designed around the way you live, entertain and unwind.",
    intro:
      "From apartments to family homes, we shape residential interiors that feel personal, refined and effortless to live in. Every room is planned around your routines, your tastes and the atmosphere you want to come home to.",
    image: IMG.curvedSofa,
    detailImage: IMG.bedroom,
    benefits: [
      "A home that reflects your personality and lifestyle",
      "A cohesive design language from room to room",
      "Comfortable, practical layouts for everyday living",
      "Carefully chosen materials that age beautifully",
    ],
    approach: [
      { title: "Listen", text: "We begin with how you live: routines, family needs, entertaining and the feeling you want each room to have." },
      { title: "Compose", text: "Layouts, palettes and materials are composed into one clear design direction for the whole home." },
      { title: "Detail", text: "Joinery, lighting, textiles and styling are resolved so every corner feels considered." },
    ],
    includes: ["Living and dining rooms", "Bedrooms and dressing rooms", "Kitchens and bathrooms", "Full-home design direction"],
  },
  {
    slug: "commercial-interior-design",
    title: "Commercial Interior Design",
    short: "Restaurants, retail and hospitality spaces that leave a lasting impression.",
    intro:
      "Commercial interiors must work hard and look exceptional. We design restaurants, lounges, retail and hospitality spaces that express your brand, support your operations and create memorable guest experiences.",
    image: IMG.restaurant,
    detailImage: IMG.hotelLobby,
    benefits: [
      "Interiors that express and strengthen your brand",
      "Efficient circulation for staff and guests",
      "Durable finishes suited to commercial use",
      "Atmosphere that encourages guests to return",
    ],
    approach: [
      { title: "Brand & brief", text: "We study your brand, your customers and the way the space needs to operate day to day." },
      { title: "Experience", text: "We design the guest journey from arrival to the final impression, balancing beauty with function." },
      { title: "Delivery", text: "Specifications are prepared for durability and coordinated with the professionals delivering the work." },
    ],
    includes: ["Restaurants and lounges", "Hotels and hospitality", "Retail and showrooms", "Reception and arrival spaces"],
  },
  {
    slug: "office-interior-design",
    title: "Office Interior Design",
    short: "Workplaces that support focus, collaboration and a confident brand image.",
    intro:
      "A well-designed office shapes how teams work and how clients see your business. We create executive suites and workplaces that are calm, productive and quietly impressive.",
    image: IMG.office,
    detailImage: IMG.visualization,
    benefits: [
      "Layouts that support focus and collaboration",
      "A professional first impression for clients",
      "Integrated storage and technology",
      "Comfortable, healthy working environments",
    ],
    approach: [
      { title: "Understand", text: "We map how your team works, meets and grows, and what your workplace needs to communicate." },
      { title: "Plan", text: "Zones for focus, meetings and hospitality are planned with clear circulation and good light." },
      { title: "Refine", text: "Finishes, furniture and lighting are selected for comfort, durability and brand presence." },
    ],
    includes: ["Executive offices", "Boardrooms and meeting rooms", "Open-plan workspaces", "Reception areas"],
  },
  {
    slug: "space-planning-and-layout",
    title: "Space Planning and Layout",
    short: "Thoughtful layouts that make every square metre purposeful.",
    intro:
      "Great interiors start with a great plan. We study proportion, movement and light to create layouts that feel generous, flow naturally and make the most of every space.",
    image: IMG.spacePlanning,
    detailImage: IMG.openPlan,
    benefits: [
      "Better use of available space",
      "Natural flow between rooms and zones",
      "Furniture layouts planned before purchase",
      "Clear drawings to guide the work",
    ],
    approach: [
      { title: "Measure", text: "We assess the existing space, its proportions, light and constraints." },
      { title: "Explore", text: "Layout options are tested to find the arrangement that best suits how the space is used." },
      { title: "Document", text: "The agreed plan is documented with clear drawings for furniture and construction." },
    ],
    includes: ["Space assessment", "Layout options", "Furniture plans", "Zoning and circulation"],
  },
  {
    slug: "furniture-selection-and-styling",
    title: "Furniture Selection and Styling",
    short: "Curated furniture, art and accessories that complete the story.",
    intro:
      "The right pieces bring a room to life. We select furniture, textiles, art and accessories that suit the scale of your space and give it a finished, collected character.",
    image: IMG.grandSalon,
    detailImage: IMG.dining,
    benefits: [
      "Pieces chosen for scale, comfort and quality",
      "A layered, collected look rather than a showroom feel",
      "Coordinated fabrics, finishes and colours",
      "A beautifully styled space ready to enjoy",
    ],
    approach: [
      { title: "Curate", text: "We build a selection of furniture and decor that fits your brief, space and budget." },
      { title: "Coordinate", text: "Fabrics, finishes and colours are coordinated across every piece." },
      { title: "Style", text: "Final styling with art, books, plants and accessories completes the room." },
    ],
    includes: ["Furniture selection", "Soft furnishings and textiles", "Art and accessories", "Final styling"],
  },
  {
    slug: "interior-renovation-and-remodeling",
    title: "Interior Renovation and Remodeling",
    short: "Transforming existing spaces with a clear vision and careful coordination.",
    intro:
      "Renovation is an opportunity to rethink a space completely. We guide the transformation of existing interiors, from layout changes to new finishes, with a clear design vision throughout.",
    image: IMG.openPlan,
    detailImage: IMG.kitchen,
    benefits: [
      "A fresh vision for an existing space",
      "Design decisions made before work begins",
      "Coordinated finishes and details",
      "A smoother, better-planned renovation",
    ],
    approach: [
      { title: "Assess", text: "We review the existing space and agree what should change, stay or be improved." },
      { title: "Redesign", text: "New layouts, finishes and details are designed and presented for approval." },
      { title: "Coordinate", text: "We work alongside the contractors and suppliers delivering the renovation." },
    ],
    includes: ["Kitchen and bathroom remodels", "Layout changes", "New finishes and joinery", "Full-room refurbishments"],
  },
  {
    slug: "lighting-design",
    title: "Lighting Design",
    short: "Layered light that shapes mood, highlights detail and flatters every space.",
    intro:
      "Light transforms how a space looks and feels. We design layered lighting schemes that combine ambient, task and accent light, so each room is beautiful by day and atmospheric by night.",
    image: IMG.lighting,
    detailImage: IMG.hotelLobby,
    benefits: [
      "Rooms that feel warm and inviting at night",
      "Highlighted architecture, art and materials",
      "Practical task lighting where it matters",
      "Statement fittings chosen to suit the space",
    ],
    approach: [
      { title: "Layer", text: "We plan ambient, task and accent lighting as one scheme." },
      { title: "Select", text: "Fittings, lamps and finishes are chosen to suit the design and the mood." },
      { title: "Tune", text: "Light levels and scenes are planned for different times of day and occasions." },
    ],
    includes: ["Lighting plans", "Decorative fittings", "Architectural and cove lighting", "Accent and art lighting"],
  },
  {
    slug: "3d-interior-visualization",
    title: "3D Interior Visualization",
    short: "See your space in realistic 3D before a single decision is final.",
    intro:
      "3D visualisation lets you experience your new interior before work begins. Realistic renderings help you understand materials, proportions and atmosphere, and make decisions with confidence.",
    image: IMG.visualization,
    detailImage: IMG.materials,
    benefits: [
      "Confidence in design decisions before work begins",
      "A realistic view of materials and finishes",
      "Easier communication with everyone involved",
      "Fewer surprises during implementation",
    ],
    approach: [
      { title: "Model", text: "Your space is modelled accurately in 3D from plans and measurements." },
      { title: "Render", text: "Materials, furniture and lighting are applied to create realistic views." },
      { title: "Review", text: "We review the visuals together and refine the design before it is finalised." },
    ],
    includes: ["Photorealistic renderings", "Material and finish studies", "Multiple viewpoints", "Design revisions"],
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
