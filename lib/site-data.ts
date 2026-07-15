export const company = {
  name: "Star Quality Concrete",
  shortName: "Star",
  tagline: "Concrete that shows up ready.",
  description:
    "Quality ready-mix concrete, professional delivery, and coordinated pumping for Bay Area homeowners, contractors, and commercial teams.",
  founded: 1979,
  mainPhone: "408-947-0669",
  mainPhoneHref: "+14089470669",
  sanJoseDispatch: "408-947-0159",
  sanJoseDispatchHref: "+14089470159",
  southCountyDispatch: "408-848-1560",
  southCountyDispatchHref: "+14088481560",
  email: "tbbsandman@gmail.com",
  address: "1404 S 7th St, San Jose, CA 95112",
  hours: "Monday–Friday, 8:00 AM–4:00 PM",
  yelp: "https://www.yelp.com/biz/star-concrete-san-jose",
};

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  number: string;
  summary: string;
  description: string;
  image: string;
  imageAlt: string;
  projectTypes: string[];
  benefits: { title: string; text: string }[];
  process: { title: string; text: string }[];
  faqs: { question: string; answer: string }[];
};

export const services: Service[] = [
  {
    slug: "ready-mix-concrete",
    name: "Ready-mix concrete",
    shortName: "Ready-mix",
    number: "01",
    summary:
      "Consistent concrete produced with high-shear, twin-shaft homogenization and dispatched for projects of every scale.",
    description:
      "Star combines cement, sand, aggregate, fly ash, slag, and specified additives in a high-shear twin-shaft mixer. The result is a thoroughly homogenized mix prepared for dependable placement across residential and commercial work.",
    image: "/media/plant.jpg",
    imageAlt: "Star Quality Concrete ready-mix truck at the San Jose facility",
    projectTypes: [
      "Foundations and footings",
      "Driveways and flatwork",
      "Commercial slabs",
      "Retaining walls",
      "Patios and walkways",
      "Structural concrete",
    ],
    benefits: [
      { title: "Uniform mix", text: "High-shear blending distributes cementitious materials and additives throughout the batch." },
      { title: "Local dispatch", text: "San Jose and South County teams coordinate timing around Bay Area jobsites." },
      { title: "Jobsite care", text: "Truck wash-out systems, backup cameras, and automatic transmissions support cleaner, safer delivery." },
    ],
    process: [
      { title: "Define the pour", text: "Share the structure, approximate volume, placement method, and performance requirements." },
      { title: "Confirm the mix", text: "The team reviews mix requirements, additives, access, and current pricing with you." },
      { title: "Schedule dispatch", text: "Dispatch coordinates the delivery window and any required pumping support." },
      { title: "Place with confidence", text: "The load arrives ready for an organized placement and clean jobsite handoff." },
    ],
    faqs: [
      { question: "How much concrete should I order?", answer: "Volume depends on finished dimensions and an allowance for site conditions. Share your measurements and project type so the team can help confirm the order." },
      { question: "Do you serve homeowners and contractors?", answer: "Yes. Star serves homeowner projects, local trades, general contractors, and large commercial placements." },
      { question: "Can you help coordinate pumping?", answer: "Yes. Tell dispatch about access, reach, elevation, and placement timing when requesting your estimate." },
      { question: "How do I get current pricing?", answer: "Pricing varies by mix, volume, delivery location, timing, additives, and pumping needs. Call the main office or submit a structured estimate request." },
    ],
  },
  {
    slug: "concrete-pumping",
    name: "Concrete pumping",
    shortName: "Pumping",
    number: "02",
    summary:
      "Coordinated pumping support that helps move concrete from the truck to difficult or high-volume placements.",
    description:
      "When direct chute access is not practical, coordinated pumping helps move ready-mix efficiently to the forms. Star plans delivery and pumping together so the equipment, crew, and mix arrive around the same placement window.",
    image: "/media/fleet.jpg",
    imageAlt: "Aerial view of a large concrete placement using multiple pumps",
    projectTypes: [
      "Backyard and limited-access pours",
      "Large commercial slabs",
      "Foundations and grade beams",
      "Elevated or long-reach placement",
      "Walls and structural forms",
      "High-volume scheduled pours",
    ],
    benefits: [
      { title: "One coordinated plan", text: "Delivery and pumping details are reviewed together before the pour." },
      { title: "Access-aware", text: "Reach, setup area, overhead conditions, and hose path are part of the request." },
      { title: "Placement-ready", text: "The team focuses on timing so concrete and pumping support meet the crew on site." },
    ],
    process: [
      { title: "Review access", text: "Share site photos, gate widths, elevations, overhead hazards, and the planned pump position." },
      { title: "Match equipment", text: "The placement needs are reviewed to coordinate an appropriate pumping approach." },
      { title: "Align the schedule", text: "Dispatch confirms the delivery sequence and planned placement window." },
      { title: "Complete the pour", text: "The delivery and pumping teams coordinate through the final load." },
    ],
    faqs: [
      { question: "When is pumping recommended?", answer: "Pumping is commonly used when the truck cannot reach the forms directly, when the placement is elevated, or when volume and pace make direct discharge impractical." },
      { question: "What access information should I provide?", answer: "Include street width, setup space, gate openings, distance to placement, grade changes, overhead lines, and photos of the proposed equipment path." },
      { question: "Does the pump arrive before the concrete?", answer: "The pumping team generally needs setup time before the first load. Dispatch will confirm the sequence for your specific project." },
      { question: "Is pumping priced separately?", answer: "Equipment and placement requirements affect pricing. Submit the project details for a current, project-specific estimate." },
    ],
  },
  {
    slug: "color-specialty-mixes",
    name: "Color & specialty mixes",
    shortName: "Color & specialty",
    number: "03",
    summary:
      "Davis Colors, supplementary cementitious materials, and project-specific additives for performance and finish goals.",
    description:
      "Star’s long relationship with Davis Colors supports a wide range of integral color options. Class F Pozzolan, slag, and other specified additives can also be incorporated to help meet project requirements.",
    image: "/media/color.jpg",
    imageAlt: "Integral concrete color samples",
    projectTypes: [
      "Architectural flatwork",
      "Colored patios and walkways",
      "Decorative driveways",
      "Commercial hardscape",
      "Specified performance mixes",
      "Projects using Pozzolan or slag",
    ],
    benefits: [
      { title: "Integral color", text: "Color is blended through the batch instead of applied only to the surface." },
      { title: "Broad selection", text: "Davis Colors offers a practical palette for residential and commercial hardscape." },
      { title: "Specification support", text: "Share the plans and requirements so the team can review available mix options." },
    ],
    process: [
      { title: "Choose the goal", text: "Identify the visual finish, performance requirement, or project specification." },
      { title: "Review options", text: "Discuss color, cementitious materials, additives, and finish expectations." },
      { title: "Approve the selection", text: "Confirm the selected mix and understand that site conditions and finishing affect final appearance." },
      { title: "Schedule the batch", text: "Dispatch coordinates production and delivery for the planned placement." },
    ],
    faqs: [
      { question: "Can I choose concrete color from a chart?", answer: "Yes. Ask the office for the current Davis Colors chart and availability. Physical samples and site-specific mockups are recommended for critical finishes." },
      { question: "Will the finished color match a screen exactly?", answer: "No. Cement, aggregate, water, curing, finishing, lighting, and display settings can all affect perceived color." },
      { question: "Do you offer Class F Pozzolan and slag?", answer: "Star states that both materials are available for applicable mixes. Confirm current specifications and availability with the office." },
      { question: "How do I get specialty-mix pricing?", answer: "Send the project specification, expected volume, delivery location, and desired placement date for a current quote." },
    ],
  },
];

export type Project = {
  slug: string;
  title: string;
  category: "Residential" | "Commercial" | "Outdoor" | "Delivery";
  location: string;
  image: string;
  imageAlt: string;
  scope: string;
  timeline: string;
  materials: string;
  challenge: string;
  result: string;
  source?: string;
};

export const projects: Project[] = [
  {
    slug: "residential-form-and-rebar",
    title: "Residential form & rebar preparation",
    category: "Residential",
    location: "San Jose",
    image: "/media/yelp-03.jpg",
    imageAlt: "Residential concrete forms and reinforcing steel prepared before placement",
    scope: "Formwork and reinforcement prepared for a multi-panel residential placement.",
    timeline: "Phased residential pour",
    materials: "Ready-mix concrete, reinforcing steel, timber forms",
    challenge: "Organizing multiple sections around an occupied backyard with limited access.",
    result: "A placement plan divided the work into clear sections for controlled finishing.",
    source: "Customer-uploaded project photo on Yelp",
  },
  {
    slug: "backyard-concrete-grid",
    title: "Backyard concrete grid",
    category: "Outdoor",
    location: "South Bay",
    image: "/media/yelp-04.jpg",
    imageAlt: "Finished backyard concrete panels in a geometric grid",
    scope: "Geometric concrete panels for an updated residential outdoor area.",
    timeline: "Residential flatwork",
    materials: "Ready-mix concrete and formed control joints",
    challenge: "Maintaining consistent panel geometry and finish across the yard.",
    result: "A crisp panel layout creates a durable, structured outdoor surface.",
    source: "Customer-uploaded project photo on Yelp",
  },
  {
    slug: "limited-access-patio",
    title: "Limited-access patio placement",
    category: "Residential",
    location: "San Jose",
    image: "/media/yelp-05.jpg",
    imageAlt: "Concrete hose placing material into residential patio forms",
    scope: "Pumped placement through a home to backyard patio forms.",
    timeline: "Single-day placement",
    materials: "Pumped ready-mix concrete and reinforcing steel",
    challenge: "Reaching backyard forms without direct truck access.",
    result: "A coordinated hose path moved the mix to each formed section efficiently.",
    source: "Customer-uploaded project photo on Yelp",
  },
  {
    slug: "commercial-slab-placement",
    title: "High-volume commercial slab",
    category: "Commercial",
    location: "Bay Area",
    image: "/media/fleet.jpg",
    imageAlt: "Large commercial slab placement with multiple concrete pumps and trucks",
    scope: "Large reinforced slab placed in planned sequences with multiple pumps.",
    timeline: "Scheduled multi-load placement",
    materials: "Commercial ready-mix concrete and reinforcing steel",
    challenge: "Maintaining delivery cadence across a large footprint and multiple pump positions.",
    result: "Coordinated dispatch supported continuous placement across the prepared slab.",
  },
  {
    slug: "fleet-ready-delivery",
    title: "Fleet-ready local delivery",
    category: "Delivery",
    location: "San Jose",
    image: "/media/plant.jpg",
    imageAlt: "Star Quality Concrete ready-mix delivery truck",
    scope: "Local ready-mix production and dispatch for Bay Area jobsites.",
    timeline: "Scheduled by dispatch",
    materials: "Project-specific ready-mix concrete",
    challenge: "Matching mix, timing, route, and site access to the crew’s placement window.",
    result: "A structured order gives dispatch the information needed to coordinate delivery.",
  },
];

export type ServiceArea = {
  slug: string;
  city: string;
  region: string;
  dispatch: "San Jose" | "South County";
  intro: string;
  localNote: string;
  nearby: string[];
};

export const serviceAreas: ServiceArea[] = [
  { slug: "san-jose", city: "San Jose", region: "Santa Clara County", dispatch: "San Jose", intro: "Local ready-mix delivery and coordinated pumping for residential, commercial, and public-facing work throughout San Jose.", localNote: "The Seventh Street facility supports projects across central, north, east, and south San Jose. Share the jobsite address early so dispatch can review route and access conditions.", nearby: ["Santa Clara", "Campbell", "Milpitas"] },
  { slug: "santa-clara", city: "Santa Clara", region: "Santa Clara County", dispatch: "San Jose", intro: "Ready-mix and placement coordination for Santa Clara construction teams, property owners, and commercial sites.", localNote: "Commercial corridors and active sites benefit from clear delivery sequencing, staging notes, and pump setup details in the initial request.", nearby: ["San Jose", "Sunnyvale", "Milpitas"] },
  { slug: "campbell", city: "Campbell", region: "Santa Clara County", dispatch: "San Jose", intro: "Residential and light-commercial concrete delivery for Campbell foundations, driveways, patios, and remodels.", localNote: "Narrow residential streets and backyard placements often need careful access planning. Add gate dimensions and site photos to the estimate request.", nearby: ["San Jose", "Los Gatos", "Santa Clara"] },
  { slug: "sunnyvale", city: "Sunnyvale", region: "Santa Clara County", dispatch: "San Jose", intro: "Scheduled concrete delivery for Sunnyvale residential improvements, commercial slabs, and structural work.", localNote: "Include any time-window, staging, or traffic constraints so dispatch can review the planned delivery cadence with your team.", nearby: ["Santa Clara", "Milpitas", "San Jose"] },
  { slug: "milpitas", city: "Milpitas", region: "Santa Clara County", dispatch: "San Jose", intro: "Ready-mix concrete and pumping coordination for Milpitas industrial, commercial, and residential projects.", localNote: "Industrial sites should include gate procedures, truck routing, PPE rules, and contact information for the on-site coordinator.", nearby: ["San Jose", "Santa Clara", "Sunnyvale"] },
  { slug: "los-gatos", city: "Los Gatos", region: "Santa Clara County", dispatch: "San Jose", intro: "Concrete delivery planning for Los Gatos homes, remodels, retaining structures, and outdoor work.", localNote: "Hillside grades, narrow access, and long hose paths can affect placement planning. Photos and measurements help the team review requirements.", nearby: ["Campbell", "San Jose", "Morgan Hill"] },
  { slug: "morgan-hill", city: "Morgan Hill", region: "South County", dispatch: "South County", intro: "South County ready-mix service for Morgan Hill homes, agricultural properties, contractors, and commercial projects.", localNote: "Rural and hillside properties should include driveway grade, turnaround space, overhead clearance, and distance to the forms.", nearby: ["Gilroy", "San Jose", "Hollister"] },
  { slug: "gilroy", city: "Gilroy", region: "South County", dispatch: "South County", intro: "Local concrete delivery and placement coordination for Gilroy residential, commercial, and agricultural work.", localNote: "The South County dispatch team can review site access, project volume, mix requirements, and placement timing for Gilroy jobs.", nearby: ["Morgan Hill", "Hollister", "San Jose"] },
  { slug: "hollister", city: "Hollister", region: "San Benito County", dispatch: "South County", intro: "Ready-mix service planning for Hollister foundations, slabs, flatwork, and rural property improvements.", localNote: "Longer routes and rural access make accurate timing and directions especially important. Include a site contact and detailed delivery notes.", nearby: ["Gilroy", "Morgan Hill", "San Jose"] },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getServiceArea(slug: string) {
  return serviceAreas.find((area) => area.slug === slug);
}

