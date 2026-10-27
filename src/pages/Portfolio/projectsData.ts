export interface ProjectSpec {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: "Residential" | "Interiors" | "Commercial" | "Renovation";
  location: string;
  year: string;
  area: string;
  client: string;
  status: string;
  disciplines: string[];
  materials: string[];
  description: string;
  conceptNarrative: string;
  spatialApproach: string;
  quote?: string;
  heroImage: string;
  galleryImages: {
    url: string;
    caption: string;
    aspectRatio?: "landscape" | "portrait" | "wide";
  }[];
  specifications: ProjectSpec[];
  media: {
    poster: string;
    video?: string;
    tileIndex: number;
    fallbackImage?: string;
  };
}

export const PROJECTS: Project[] = [
  {
    id: "courtyard-residence",
    number: "01",
    title: "Modern Courtyard Residence",
    subtitle: "Central Light Atrium & Passive Micro-Climate",
    category: "Residential",
    location: "Rambagh · Purnia, Bihar",
    year: "2025",
    area: "480 m² (5,165 sq.ft)",
    client: "Private Family Estate",
    status: "Completed",
    disciplines: ["Architecture", "Climate-Responsive Planning", "Landscape Integration"],
    materials: [
      "Locally pressed burnished red clay brick",
      "Board-formed architectural cast concrete",
      "Thermally broken double-glazed low-E fenestration",
      "Reclaimed regional sal wood & polished terrazzo"
    ],
    description:
      "A climate-attuned family sanctuary organized around a central inward-looking open courtyard. Conceived for Eastern Bihar's humid monsoons and intense summers, the design employs stack-effect thermal chimneys, deep cantilevered verandas, and porous brick screens to ensure consistent natural cross-ventilation and daylight without heat gain.",
    conceptNarrative:
      "Eastern Bihar experiences extreme seasonal swings—from dry scorching pre-monsoons to torrential rains. The Courtyard Residence answers this dual challenge through spatial introversion. Instead of perimeter windows exposed to harsh west radiation, the core living zones look inward across an open court with stone water catchment and native foliage. Warm air rises and vents out the upper clerestory louvers, drawing cool air across shaded ground plantings.",
    spatialApproach:
      "The ground floor prioritizes shared multigenerational life, featuring a fluid transition from the entrance portico through a sheltered colonnade into the double-height family hall. Private bedrooms are situated on the upper floor with screened timber balconies that catch south-easterly summer breezes.",
    quote:
      "True luxury in Bihar is not gilded finishes; it is cool moving air, shaded daylight, and silence within a growing urban fabric.",
    heroImage: "/hero-frames/sequence 02/ezgif-frame-150.jpg",
    galleryImages: [
      {
        url: "/hero-frames/sequence 02/ezgif-frame-001.jpg",
        caption: "Arrival court showing board-formed concrete lintels and deep shaded overhangs.",
        aspectRatio: "wide"
      },
      {
        url: "/hero-frames/sequence 01/ezgif-frame-300.jpg",
        caption: "Central atrium with filtered southern daylight and brick porous jali work.",
        aspectRatio: "portrait"
      },
      {
        url: "/hero-frames/sequence 02/ezgif-frame-200.jpg",
        caption: "Bespoke sal wood joinery and seamless terrazzo flooring in the living pavilion.",
        aspectRatio: "landscape"
      }
    ],
    specifications: [
      { label: "Site Orientation", value: "North-South axial alignment" },
      { label: "Ventilation Strategy", value: "Stack effect via central court & upper louvers" },
      { label: "Structural Grid", value: "Reinforced concrete frame with load-bearing masonry" },
      { label: "Thermal Mass", value: "250mm cavity brick perimeter walls" },
      { label: "Water Management", value: "Subsurface rainwater harvesting & recharge pit" },
      { label: "Completion Date", value: "November 2025" }
    ],
    media: {
      poster: "/hero-frames/sequence 02/ezgif-frame-150.jpg",
      tileIndex: 0,
      fallbackImage: "/hero-frames/sequence 02/ezgif-frame-150.jpg"
    }
  },
  {
    id: "brickwork-villa",
    number: "02",
    title: "Contemporary Brickwork Villa",
    subtitle: "Tectonic Masonry & Deep Shaded Verandas",
    category: "Residential",
    location: "Gulabbagh Road · Purnia, Bihar",
    year: "2025",
    area: "540 m² (5,810 sq.ft)",
    client: "Dr. S. K. Das & Family",
    status: "Completed",
    disciplines: ["Architecture", "Masonry Detailing", "Custom Joinery"],
    materials: [
      "Kiln-fired river clay masonry",
      "Honed Kota stone & river pebble beds",
      "Powder-coated slimline aluminium glazing",
      "Matte teak woodwork with brass hardware"
    ],
    description:
      "An architectural monograph in brickwork, exploring raw masonry craft as both structural skin and thermal barrier. Deep overhangs protect exterior facades from torrential monsoon rains, while perforated brick lattices create evolving shadow patterns across the interior living spaces.",
    conceptNarrative:
      "The villa challenges the conventional plastered brick boxes pervasive in suburban Bihar. By leaving the kiln-fired clay exposed in varied bond patterns, the facade attains depth and texture that will age gracefully over decades. The thermal mass of double-skin walls dampens daily temperature peaks by up to 6 degrees Celsius.",
    spatialApproach:
      "A linear spine connects the formal drawing room to the family pavilion, culminating in a semi-covered garden terrace. The upper level features private study alcoves overlooking the garden canopy.",
    quote:
      "Brick has a memory of the earth from which it was fired. In Purnia, it speaks of the river silt and enduring permanence.",
    heroImage: "/hero-frames/sequence 01/ezgif-frame-300.jpg",
    galleryImages: [
      {
        url: "/hero-frames/sequence 01/ezgif-frame-250.jpg",
        caption: "West elevation with stepped brick corbelling and recessed fenestration.",
        aspectRatio: "wide"
      },
      {
        url: "/hero-frames/sequence 02/ezgif-frame-120.jpg",
        caption: "Double-height stair core illuminated by high-level northern skylight.",
        aspectRatio: "portrait"
      },
      {
        url: "/hero-frames/sequence 01/ezgif-frame-180.jpg",
        caption: "Garden terrace seamlessly connecting the dining zone to outdoor foliage.",
        aspectRatio: "landscape"
      }
    ],
    specifications: [
      { label: "Site Area", value: "820 m² plot" },
      { label: "Wall Construction", value: "Exposed English bond with deep recessed joints" },
      { label: "Energy Strategy", value: "Passive solar shading with high thermal inertia" },
      { label: "Flooring", value: "Seamless honed Kota stone with brass divider inlays" },
      { label: "Fenestration", value: "Low-E insulated glazing units" },
      { label: "Studio Role", value: "Comprehensive Architectural & Interior Direction" }
    ],
    media: {
      poster: "/hero-frames/sequence 01/ezgif-frame-300.jpg",
      tileIndex: 1,
      fallbackImage: "/hero-frames/sequence 01/ezgif-frame-300.jpg"
    }
  },
  {
    id: "minimalist-interior",
    number: "03",
    title: "Warm Minimalist Residence",
    subtitle: "Bespoke Millwork & Natural Light Sculpting",
    category: "Interiors",
    location: "Line Bazar · Purnia, Bihar",
    year: "2024",
    area: "310 m² (3,335 sq.ft)",
    client: "Executive Residential Client",
    status: "Completed",
    disciplines: ["Interior Architecture", "Custom Furniture", "Lighting Choreography"],
    materials: [
      "Natural quarter-sawn white oak veneer",
      "Calacatta gold composite quartz",
      "Micro-cement seamless wall render",
      "Architectural 2700K indirect cove luminaires"
    ],
    description:
      "A complete interior transformation of a multi-storey apartment into a quiet, uncluttered haven. Flush floor-to-ceiling doors, concealed storage runs, and ambient architectural lighting strip away visual noise to foreground warmth, texture, and relaxed family gatherings.",
    conceptNarrative:
      "Modern urban life in Line Bazar is bustling and intense. This interior was designed as an acoustic and visual sanctuary. Every surface is tactile yet understated. Rather than decorative excess, spatial drama is achieved through clean proportions, soft radiused plaster corners, and indirect lighting that washes across textural linen drapery.",
    spatialApproach:
      "The layout removes awkward masonry partitions in favor of full-height oak pocket dividers, enabling the family to shift seamlessly between intimate evenings and hosting larger community gatherings.",
    quote:
      "Simplicity is not the absence of clutter; it is the presence of intention in every joint and shadow line.",
    heroImage: "/hero-frames/sequence 02/ezgif-frame-180.jpg",
    galleryImages: [
      {
        url: "/hero-frames/sequence 02/ezgif-frame-210.jpg",
        caption: "Open living salon with custom low-slung oak banquettes and concealed media wall.",
        aspectRatio: "landscape"
      },
      {
        url: "/hero-frames/sequence 01/ezgif-frame-140.jpg",
        caption: "Minimalist chef's kitchen featuring seamless composite quartz island and hidden pantry.",
        aspectRatio: "wide"
      },
      {
        url: "/hero-frames/sequence 02/ezgif-frame-080.jpg",
        caption: "Primary suite bedroom with fluted oak headboard and ambient bedtime cove lighting.",
        aspectRatio: "portrait"
      }
    ],
    specifications: [
      { label: "Interior Scope", value: "Complete turnkey spatial redesign & bespoke millwork" },
      { label: "Lighting Scheme", value: "Architectural 2700K CRI95+ warm dimming system" },
      { label: "Hardware", value: "Concealed magnetic latching and mortise handles" },
      { label: "Storage", value: "Integrated floor-to-ceiling wardrobe runs (42 linear meters)" },
      { label: "Air Conditioning", value: "Concealed ductable VRF with linear slot diffusers" },
      { label: "Acoustics", value: "Acoustic plaster ceilings with sound dampening underlayment" }
    ],
    media: {
      poster: "/hero-frames/sequence 02/ezgif-frame-180.jpg",
      tileIndex: 2,
      fallbackImage: "/hero-frames/sequence 02/ezgif-frame-180.jpg"
    }
  },
  {
    id: "urban-retail-atelier",
    number: "04",
    title: "Urban Commercial & Retail Atelier",
    subtitle: "Curated Circulation & Street Frontage Presence",
    category: "Commercial",
    location: "Bhatta Bazar Commercial Hub · Purnia",
    year: "2024",
    area: "360 m² (3,875 sq.ft)",
    client: "Boutique Retail Enterprise",
    status: "Completed",
    disciplines: ["Commercial Architecture", "Retail Interior", "Facade Engineering"],
    materials: [
      "Perforated copper anodized aluminium panels",
      "Seamless terrazzo flooring with aggregate chips",
      "Fluted acoustic wall timber panels",
      "Directional high-CRI retail track luminaires"
    ],
    description:
      "A flagship retail experience in Purnia's premier commercial district. The double-height facade engages pedestrian traffic through angled glass vitrines, while the interior choreographs a smooth, pressure-free customer journey through distinct consultation and display zones.",
    conceptNarrative:
      "Traditional commercial layouts in regional markets often suffer from congestion and visual chaos. Our response was an architectural retail monograph: clean circulation avenues, curated display alcoves, and private discussion salons that make buying a calm, premium experience.",
    spatialApproach:
      "The ground level houses high-turnover experiential collections with intuitive island displays. A sculptural architectural staircase leads to an upper VIP mezzanine dedicated to bespoke client fittings and consultations.",
    quote:
      "Commercial design is spatial storytelling. When the architecture respects the visitor, the brand requires no hard sell.",
    heroImage: "/hero-frames/sequence 02/ezgif-frame-240.jpg",
    galleryImages: [
      {
        url: "/hero-frames/sequence 01/ezgif-frame-060.jpg",
        caption: "Double-height street facade with backlit metallic fins and frameless vitrines.",
        aspectRatio: "portrait"
      },
      {
        url: "/hero-frames/sequence 02/ezgif-frame-160.jpg",
        caption: "Central display hall with fluted timber baffles and directional spot accents.",
        aspectRatio: "wide"
      },
      {
        url: "/hero-frames/sequence 01/ezgif-frame-220.jpg",
        caption: "Private client salon featuring custom leather banquettes and brass coffee bar.",
        aspectRatio: "landscape"
      }
    ],
    specifications: [
      { label: "Frontage", value: "12-meter clear glass double-height facade" },
      { label: "Floor Capacity", value: "Engineered for 7.5 kN/m² dynamic live load" },
      { label: "Lighting", value: "Dual track 3000K/4000K with narrow 15° beam spot accents" },
      { label: "Fire Safety", value: "Integrated concealed pendant sprinklers & dual fire egress" },
      { label: "HVAC", value: "Independent inverter package units with HEPA filtration" },
      { label: "Completed", value: "October 2024" }
    ],
    media: {
      poster: "/hero-frames/sequence 02/ezgif-frame-240.jpg",
      tileIndex: 3,
      fallbackImage: "/hero-frames/sequence 02/ezgif-frame-240.jpg"
    }
  },
  {
    id: "heritage-renovation",
    number: "05",
    title: "Heritage Colonial Bungalow Rework",
    subtitle: "Structural Opening, Seismic Retrofit & Modern Light Wells",
    category: "Renovation",
    location: "Old Civil Lines · Purnia, Bihar",
    year: "2025",
    area: "620 m² (6,670 sq.ft)",
    client: "Heritage Estate Preservation",
    status: "Completed",
    disciplines: ["Heritage Renovation", "Structural Retrofitting", "Adaptive Reuse"],
    materials: [
      "Traditional lime-surkhi plaster restoration",
      "Exposed structural steel I-beams in matte charcoal",
      "Restored antique Burma teak timbers",
      "Handmade encaustic cement geometric tiles"
    ],
    description:
      "A sensitive structural rework of a 60-year-old masonry bungalow. By inserting subtle steel moment frames, we eliminated oppressive load-bearing partition walls, carved out two dramatic double-height light wells, and modernized mechanical systems while honoring original colonial proportions.",
    conceptNarrative:
      "Too many historic structures in Bihar are needlessly demolished for generic concrete blocks. This project proves that legacy buildings can be seismically reinforced, thermally upgraded, and adapted into breathtaking contemporary family homes with unmatched character and height.",
    spatialApproach:
      "The formerly dark internal corridor was replaced with a sunlit atrium topped with laminated safety glass and motorized solar louvers. Modern bathrooms and a concealed chef's kitchen were discreetly integrated without disturbing load-bearing perimeter walls.",
    quote:
      "Renovation is an act of deep respect. We do not erase the past; we create an intelligent dialogue between generations.",
    heroImage: "/hero-frames/sequence 01/ezgif-frame-150.jpg",
    galleryImages: [
      {
        url: "/hero-frames/sequence 02/ezgif-frame-040.jpg",
        caption: "Main veranda showing restored round masonry columns and lime-washed walls.",
        aspectRatio: "wide"
      },
      {
        url: "/hero-frames/sequence 01/ezgif-frame-280.jpg",
        caption: "New central light well inserting natural vertical illumination into former masonry core.",
        aspectRatio: "portrait"
      },
      {
        url: "/hero-frames/sequence 02/ezgif-frame-110.jpg",
        caption: "Encaustic patterned floor tiles juxtaposed against minimal matte steel structural lintels.",
        aspectRatio: "landscape"
      }
    ],
    specifications: [
      { label: "Structure Age", value: "Original masonry built circa 1964" },
      { label: "Retrofit Method", value: "Underpinned foundations & internal structural steel portal frames" },
      { label: "Moisture Protection", value: "Chemical DPC injection and breathable lime plaster" },
      { label: "Roofing", value: "Thermal sandwich insulated roof deck concealed under clay tiles" },
      { label: "Energy Efficiency", value: "Solar photovoltaic 10kW rooftop array with battery storage" },
      { label: "Project Phase", value: "Complete Renovation & Interior Styling" }
    ],
    media: {
      poster: "/hero-frames/sequence 01/ezgif-frame-150.jpg",
      tileIndex: 4,
      fallbackImage: "/hero-frames/sequence 01/ezgif-frame-150.jpg"
    }
  },
  {
    id: "terraced-clinic-office",
    number: "06",
    title: "Terraced Healthcare & Executive Office",
    subtitle: "Hygienic Flow, Acoustical Privacy & Garden Terraces",
    category: "Commercial",
    location: "Polytechnic Chowk · Purnia, Bihar",
    year: "2026",
    area: "780 m² (8,395 sq.ft)",
    client: "Healthcare Group & Executive Chambers",
    status: "Under Construction",
    disciplines: ["Commercial Architecture", "Medical Spatial Planning", "Terrace Landscaping"],
    materials: [
      "Antibacterial solid-surface Corian joinery",
      "Perforated terracotta louvers for sun control",
      "Acoustic double-glazed operable facade",
      "Native courtyard plantings on stepped terraces"
    ],
    description:
      "A purpose-built four-storey professional medical and legal facility. Designed to provide serene patient waiting experiences, sterile clinical consultation chambers, and top-floor executive conference suites opening onto landscaped rooftop gardens with views over Purnia.",
    conceptNarrative:
      "Medical facilities often feel intimidating and clinical. By introducing stepped green terraces on each level, patients and physicians remain visually connected to green vegetation, reducing stress and improving indoor air quality.",
    spatialApproach:
      "Strict division of public patient registration, sterile treatment zones, and private physician corridors prevents cross-circulation. Step-down acoustic ceilings ensure confidential medical consultations.",
    quote:
      "Healing begins in the environment. Architecture has a moral duty to provide comfort to those in distress.",
    heroImage: "/hero-frames/sequence 02/ezgif-frame-250.jpg",
    galleryImages: [
      {
        url: "/hero-frames/sequence 01/ezgif-frame-100.jpg",
        caption: "Stepped garden terraces with perforated terracotta sun louvers on south facade.",
        aspectRatio: "wide"
      },
      {
        url: "/hero-frames/sequence 02/ezgif-frame-090.jpg",
        caption: "Acoustically isolated executive consultation suite with custom oak work desk.",
        aspectRatio: "landscape"
      },
      {
        url: "/hero-frames/sequence 01/ezgif-frame-200.jpg",
        caption: "Patient waiting lounge illuminated by soft diffused light from inner green court.",
        aspectRatio: "portrait"
      }
    ],
    specifications: [
      { label: "Building Height", value: "G+3 Storeys (15.5 meters)" },
      { label: "Accessibility", value: "100% barrier-free with bed-capable elevator & gently sloped ramps" },
      { label: "Acoustic Rating", value: "STC 52 sound isolation between consultation rooms" },
      { label: "Air Filtration", value: "HEPA 14 positive pressure air filtration in procedure rooms" },
      { label: "Greenery", value: "180 m² of stepped terrace gardens with automatic drip irrigation" },
      { label: "Expected Handover", value: "Mid 2026" }
    ],
    media: {
      poster: "/hero-frames/sequence 02/ezgif-frame-250.jpg",
      tileIndex: 5,
      fallbackImage: "/hero-frames/sequence 02/ezgif-frame-250.jpg"
    }
  }
];

export function getProjectById(id: string): Project | undefined {
  return PROJECTS.find((p) => p.id === id);
}
