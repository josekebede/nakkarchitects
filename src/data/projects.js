// Portfolio data. Every project belongs to exactly one category (project type).
// Images live in public/projects/<slug>/{thumb,full}/<file>.webp
// To add a project: drop its WebP files in that folder and add one entry below.

export const categories = [
  { id: "houses", name: "Houses & Villas", blurb: "Private villas and family homes, from concept visualisations to completed work." },
  { id: "apartments", name: "Apartments", blurb: "Apartment buildings and apartment interiors." },
  { id: "offices", name: "Offices & Workplaces", blurb: "Corporate and public-sector workplaces, from reception to boardroom." },
  { id: "commercial", name: "Commercial & Industrial", blurb: "Towers, retail and industrial buildings." },
  { id: "hospitality", name: "Hospitality & Dining", blurb: "Lounges, bars and cafes designed around atmosphere." },
  { id: "healthcare", name: "Healthcare", blurb: "Clinics and pharmacies planned for calm, clear patient journeys." },
  { id: "education", name: "Education & Training", blurb: "Teaching and training spaces for creative disciplines." }
]

// Old ?category= links keep working.
export const categoryAliases = {
  residence: 'houses',
  apartment: 'apartments',
  office: 'offices',
  commercial: 'commercial',
  hospitality: 'hospitality',
  institutional: 'education',
  'mixed-use': 'commercial',
  sustainable: 'houses'
}

export const kinds = {
  render: 'Design render',
  photo: 'Completed work'
}

const definitions = [
  {
    slug: "limestone-villa",
    name: "Limestone Villa",
    category: "houses",
    kind: "render",
    featured: true,
    hero: true,
    cover: "009",
    summary: "A multi-level family villa in pale limestone and black steel glazing. A double-height dining space with an open stair ties the entry court to the living areas, with a private main suite, dressing room and spa-style bathroom.",
    images: [
      { file: "001", w: 1309, h: 830, tw: 720, th: 457, alt: "Dining area and open stair behind folding glass doors" },
      { file: "002", w: 1309, h: 830, tw: 720, th: 457, alt: "Double-height dining area with sculptural stair" },
      { file: "003", w: 1309, h: 830, tw: 720, th: 457, alt: "Entry drive and stair seen from above" },
      { file: "004", w: 1309, h: 830, tw: 720, th: 457, alt: "Dining area looking toward the living room" },
      { file: "005", w: 1920, h: 1217, tw: 720, th: 456, alt: "Living room with illuminated media wall" },
      { file: "006", w: 1309, h: 830, tw: 720, th: 457, alt: "Living room and media wall, wide view" },
      { file: "007", w: 1920, h: 1217, tw: 720, th: 456, alt: "Kitchen and dining area with sculptural pendant" },
      { file: "008", w: 1310, h: 830, tw: 720, th: 456, alt: "Street facade with glass balcony and car port" },
      { file: "009", w: 1309, h: 830, tw: 720, th: 457, alt: "Entry court with landscaping" },
      { file: "010", w: 1309, h: 830, tw: 720, th: 457, alt: "Front facade with ground-floor terrace" },
      { file: "011", w: 1309, h: 830, tw: 720, th: 457, alt: "Corner view of the limestone facade" },
      { file: "012", w: 1309, h: 830, tw: 720, th: 457, alt: "Side elevation seen from the drive" },
      { file: "013", w: 1309, h: 830, tw: 720, th: 457, alt: "Bathroom with double vanity and steel-framed glazing" },
      { file: "014", w: 1309, h: 830, tw: 720, th: 457, alt: "Bathroom with freestanding tub and glass shower" },
      { file: "015", w: 1920, h: 1217, tw: 720, th: 456, alt: "Bathroom vanity and soaking tub" },
      { file: "016", w: 1920, h: 1217, tw: 720, th: 456, alt: "Main bedroom with upholstered bench" },
      { file: "017", w: 1920, h: 1217, tw: 720, th: 456, alt: "Bedroom with reading chairs by the window" },
      { file: "018", w: 1920, h: 1217, tw: 720, th: 456, alt: "Walk-in wardrobe with central island" },
      { file: "019", w: 1920, h: 1217, tw: 720, th: 456, alt: "Dressing table and wardrobe" }
    ]
  },
  {
    slug: "contemporary-villa",
    name: "Contemporary Villa",
    category: "houses",
    kind: "render",
    summary: "Exterior studies of a contemporary corner villa with timber screening, generous terraces and a landscaped frontage, shown by day and at dusk.",
    images: [
      { file: "001", w: 1920, h: 1080, tw: 720, th: 405, alt: "Evening view of the terraced facade" },
      { file: "002", w: 1920, h: 1080, tw: 720, th: 405, alt: "Corner view with landscaped frontage" },
      { file: "003", w: 1920, h: 1080, tw: 720, th: 405, alt: "Corner view with glazed balconies" },
      { file: "004", w: 1920, h: 1080, tw: 720, th: 405, alt: "Front elevation with car port" }
    ]
  },
  {
    slug: "cubic-white-villa",
    name: "Ftisum's Residence",
    category: "houses",
    kind: "render",
    summary: "A crisp white villa composed of stacked volumes, with glazed terraces, teal-tinted balustrades and a recessed entry with covered parking.",
    images: [
      { file: "001", w: 1920, h: 1080, tw: 720, th: 405, alt: "Front elevation from the street" },
      { file: "002", w: 1920, h: 1080, tw: 720, th: 405, alt: "Front facade with entry car port" },
      { file: "003", w: 1920, h: 1080, tw: 720, th: 405, alt: "Corner view with glazed terraces" },
      { file: "004", w: 1920, h: 1080, tw: 720, th: 405, alt: "Side view framed by cypress trees" },
      { file: "005", w: 1920, h: 1080, tw: 720, th: 405, alt: "Rear elevation with terrace" },
      { file: "006", w: 1920, h: 1080, tw: 720, th: 405, alt: "Facade detail with stone panel" },
      { file: "007", w: 1920, h: 1080, tw: 720, th: 405, alt: "Street-side view of the stacked volumes" },
      { file: "008", w: 1920, h: 1080, tw: 720, th: 405, alt: "Entrance and covered parking" },
      { file: "009", w: 1920, h: 1080, tw: 720, th: 405, alt: "Aerial view of the plot" }
    ]
  },
  {
    slug: "garden-terrace-villa",
    name: "Selamawit Residence",
    category: "houses",
    kind: "render",
    summary: "A multi-level white and stone villa framed by a dark tile canopy, with glass balustrades, hanging planters on the upper terraces, full-height glazing to the living and dining levels, a slatted entry gate and a landscaped garden setting.",
    images: [
      { file: "001", w: 1920, h: 1217, tw: 720, th: 456, alt: "Front elevation with a dark tile canopy frame and slatted gate" },
      { file: "002", w: 1920, h: 1219, tw: 720, th: 457, alt: "Street view with hanging planters and glass balustrades" },
      { file: "003", w: 1920, h: 1217, tw: 720, th: 456, alt: "Street corner view at dusk with the entry gate and lamp posts" },
      { file: "004", w: 1920, h: 1217, tw: 720, th: 456, alt: "Corner view from the drive with the entry gate" },
      { file: "005", w: 1920, h: 1217, tw: 720, th: 456, alt: "Aerial view of the villa, its drive and garden plot" },
      { file: "006", w: 1920, h: 1217, tw: 720, th: 456, alt: "Close view of the stacked terraces and hanging planters" },
      { file: "007", w: 1920, h: 1217, tw: 720, th: 456, alt: "Close view of the living and dining levels behind full-height glass" },
      { file: "008", w: 1920, h: 1219, tw: 720, th: 457, alt: "Corner glazing above the slatted entry gate" },
      { file: "009", w: 1920, h: 1217, tw: 720, th: 456, alt: "Side approach with a stone-clad wing and glass balconies" },
      { file: "010", w: 1920, h: 1217, tw: 720, th: 456, alt: "Side elevation with a timber slat screen and stone-clad volume" },
      { file: "011", w: 1920, h: 1217, tw: 720, th: 456, alt: "Rear corner view with cypress trees and garden wall" },
      { file: "012", w: 1920, h: 1217, tw: 720, th: 456, alt: "Front elevation at dusk with the slatted gate, car port and lit garden wall" },
      { file: "013", w: 1920, h: 1219, tw: 720, th: 457, alt: "Street corner view with the lit gate and hedged frontage" },
      { file: "014", w: 1920, h: 1217, tw: 720, th: 456, alt: "Side-angle street view with the entry gate and boundary wall" },
      { file: "015", w: 1920, h: 1217, tw: 720, th: 456, alt: "Close view of the terraced facade with hanging planters and a glass-balustrade balcony" },
      { file: "016", w: 1920, h: 1217, tw: 720, th: 456, alt: "Car port beside the double-height glazed dining and stair hall" },
      { file: "017", w: 1920, h: 1217, tw: 720, th: 456, alt: "Side elevation from the garden, with stacked terraces and a stone-clad tower" },
      { file: "018", w: 1920, h: 1217, tw: 720, th: 456, alt: "Raised corner view of the hanging planters, timber screen and glazed living levels" },
      { file: "019", w: 1920, h: 1217, tw: 720, th: 456, alt: "Street-side view with the lit gate, boundary wall and tree-lined plot" },
      { file: "020", w: 1920, h: 1217, tw: 720, th: 456, alt: "Garden-side corner view of the stone-clad tower and glazed stair hall" }
    ]
  },
  {
    slug: "villa-with-pool",
    name: "Ejigu Residence",
    category: "houses",
    kind: "photo",
    summary: "Photographs of a completed villa: a double-height living hall with a glass-block feature wall, a glazed stair landing, a marble-clad bathroom and a garden terrace with swimming pool.",
    images: [
      { file: "001", w: 1920, h: 1440, tw: 720, th: 540, alt: "Rear elevation with swimming pool and lawn" },
      { file: "002", w: 1920, h: 2560, tw: 540, th: 720, alt: "Entrance court with pool edge and glass canopy" },
      { file: "003", w: 1920, h: 2560, tw: 540, th: 720, alt: "Entrance hall with glass-block wall and stair, looking toward the pool" },
      { file: "004", w: 1920, h: 1440, tw: 720, th: 540, alt: "Double-height living hall" },
      { file: "005", w: 1920, h: 1440, tw: 720, th: 540, alt: "Living hall, wide view" },
      { file: "006", w: 1920, h: 2560, tw: 540, th: 720, alt: "Glass-block column beneath the glazed stair landing" },
      { file: "007", w: 1920, h: 2560, tw: 540, th: 720, alt: "Bathroom with freestanding tub and marble wall" },
      { file: "008", w: 1920, h: 1440, tw: 720, th: 540, alt: "Swimming pool and stone terrace" }
    ]
  },
  {
    slug: "courtyard-house",
    name: "Courtyard House",
    category: "houses",
    kind: "photo",
    summary: "Photographs of a courtyard house, showing an arched entrance and a stone-paved garden court with a sculptural steel stair.",
    images: [
      { file: "001", w: 1920, h: 1440, tw: 720, th: 540, alt: "Courtyard entrance with arched door and cobbled paving" },
      { file: "002", w: 1920, h: 1440, tw: 720, th: 540, alt: "Garden court with stone steps and sculptural stair" }
    ]
  },
  {
    slug: "mid-rise-apartment-building",
    name: "WS Apartment",
    category: "apartments",
    kind: "render",
    featured: true,
    summary: "A mid-rise apartment building with shopfronts at street level, timber-edged balconies and a landscaped rooftop terrace.",
    images: [
      { file: "001", w: 1440, h: 960, tw: 720, th: 480, alt: "Upper floors with timber-edged terraces" },
      { file: "002", w: 1920, h: 1280, tw: 720, th: 480, alt: "Rooftop terrace and upper facade" },
      { file: "003", w: 1920, h: 1280, tw: 720, th: 480, alt: "Street elevation of the building" },
      { file: "004", w: 1920, h: 1280, tw: 720, th: 480, alt: "Corner view with rooftop terrace" },
      { file: "005", w: 1920, h: 1280, tw: 720, th: 480, alt: "Ground-floor shopfronts and street" },
      { file: "006", w: 1260, h: 840, tw: 720, th: 480, alt: "Entrance and street frontage" },
      { file: "007", w: 1920, h: 1278, tw: 720, th: 479, alt: "Upper terrace levels" },
      { file: "008", w: 1440, h: 959, tw: 720, th: 480, alt: "Corner view from the street" },
      { file: "009", w: 1920, h: 1280, tw: 720, th: 480, alt: "Corner massing seen from above" },
      { file: "010", w: 1920, h: 1280, tw: 720, th: 480, alt: "Building seen from the avenue" }
    ]
  },
  {
    slug: "apartment-living-interior",
    name: "Apartment Living & Dining",
    category: "apartments",
    kind: "render",
    summary: "Living and dining interior for an apartment, using warm neutrals, tactile sofas, timber panelling and sculptural lighting to make a calm, layered home.",
    images: [
      { file: "001", w: 1920, h: 1080, tw: 720, th: 405, alt: "Living room with sectional sofa and media wall" },
      { file: "003", w: 1920, h: 1080, tw: 720, th: 405, alt: "Living area and coffee table looking toward the dining area" },
      { file: "004", w: 1920, h: 1080, tw: 720, th: 405, alt: "Sectional sofa and lit display niches" },
      { file: "005", w: 1920, h: 1080, tw: 720, th: 405, alt: "Dining area with sculptural pendant" },
      { file: "006", w: 1920, h: 1080, tw: 720, th: 405, alt: "Living room with climbing plants" },
      { file: "007", w: 1920, h: 1080, tw: 720, th: 405, alt: "Dining table and media wall" },
      { file: "008", w: 1920, h: 1080, tw: 720, th: 405, alt: "Dining area with round mirror" },
      { file: "009", w: 1920, h: 1080, tw: 720, th: 405, alt: "Living room, wide view" }
    ]
  },
  {
    slug: "open-plan-corporate-office",
    name: "Abay Technical & Trading",
    category: "offices",
    kind: "render",
    featured: true,
    summary: "A corporate office fit-out combining open-plan workstations, glazed meeting rooms, executive suites and informal lounges, organised around views of the city.",
    images: [
      { file: "001", w: 1920, h: 1280, tw: 720, th: 480, alt: "Executive lounge with shelving wall" },
      { file: "002", w: 1920, h: 1287, tw: 720, th: 483, alt: "Executive office with sculpted desk" },
      { file: "003", w: 1920, h: 1287, tw: 720, th: 483, alt: "Executive office and glazed corridor" },
      { file: "004", w: 1920, h: 1287, tw: 720, th: 483, alt: "Executive desk with glass partitions" },
      { file: "005", w: 1920, h: 1287, tw: 720, th: 483, alt: "Private office with meeting corner" },
      { file: "006", w: 1920, h: 1287, tw: 720, th: 483, alt: "Executive suite with lounge seating" },
      { file: "007", w: 1920, h: 1287, tw: 720, th: 483, alt: "Lounge area with city views" },
      { file: "008", w: 1920, h: 1287, tw: 720, th: 483, alt: "Open-plan workstations along the glazed edge" },
      { file: "009", w: 1920, h: 1287, tw: 720, th: 483, alt: "Open-plan workstations, long view" },
      { file: "010", w: 1920, h: 1287, tw: 720, th: 483, alt: "Reception hall beyond a timber partition" },
      { file: "011", w: 1920, h: 1287, tw: 720, th: 483, alt: "Reception desk with stone counter" },
      { file: "012", w: 1920, h: 1287, tw: 720, th: 483, alt: "Informal meeting lounge" },
      { file: "013", w: 1920, h: 1287, tw: 720, th: 483, alt: "Collaboration lounge with round tables" },
      { file: "014", w: 1920, h: 1287, tw: 720, th: 483, alt: "Break lounge with display wall" },
      { file: "015", w: 1920, h: 1287, tw: 720, th: 483, alt: "Glazed meeting nooks" },
      { file: "016", w: 1920, h: 1287, tw: 720, th: 483, alt: "Lounge and glazed meeting rooms" },
      { file: "017", w: 1920, h: 1287, tw: 720, th: 483, alt: "Boardroom with long table" },
      { file: "018", w: 1920, h: 1287, tw: 720, th: 483, alt: "Boardroom, angled view" },
      { file: "019", w: 1920, h: 1287, tw: 720, th: 483, alt: "Private meeting room behind a timber screen" },
      { file: "020", w: 1920, h: 1287, tw: 720, th: 483, alt: "Corridor with planting and workstations" },
      { file: "021", w: 1920, h: 1287, tw: 720, th: 483, alt: "Stair landing with wall art" }
    ]
  },
  {
    slug: "public-sector-office",
    name: "Ethiopian Nuclear Energy Commission Office",
    category: "offices",
    kind: "render",
    collaboration: "Eked Trading PLC",
    summary: "Reception and workplace interiors for a public-sector office, with a sculpted reception desk, open-plan workstations and a conference room.",
    images: [
      { file: "001", w: 1920, h: 1217, tw: 720, th: 456, alt: "Reception lounge with marble feature wall" },
      { file: "002", w: 1920, h: 1217, tw: 720, th: 456, alt: "Curved reception desk beneath a circular ceiling feature" },
      { file: "004", w: 1920, h: 1217, tw: 720, th: 456, alt: "Reception desk and waiting seats" },
      { file: "005", w: 1920, h: 1217, tw: 720, th: 456, alt: "Open-plan office around a central column" },
      { file: "006", w: 1309, h: 830, tw: 720, th: 457, alt: "Open-plan workstations beneath a slatted ceiling" },
      { file: "007", w: 1309, h: 830, tw: 720, th: 457, alt: "Workstation rows, side view" },
      { file: "008", w: 1920, h: 1217, tw: 720, th: 456, alt: "Meeting room with large conference table" }
    ]
  },
  {
    slug: "completed-office-interiors",
    name: "Abay Homes Real Estate",
    category: "offices",
    kind: "photo",
    cover: "007",
    summary: "Photographs of completed office interiors: glazed partitions, a timber-screened reception, boardrooms and executive offices finished in warm timber and textured stone.",
    images: [
      { file: "001", w: 1920, h: 2560, tw: 540, th: 720, alt: "Open-plan office with glazed partition and lounge" },
      { file: "002", w: 1920, h: 2560, tw: 540, th: 720, alt: "Reception corridor with glazed partitions" },
      { file: "003", w: 1920, h: 2560, tw: 540, th: 720, alt: "Reception desk with timber screen" },
      { file: "004", w: 1920, h: 2560, tw: 540, th: 720, alt: "Reception waiting area with red armchairs" },
      { file: "005", w: 1920, h: 2560, tw: 540, th: 720, alt: "Reception waiting area with timber slats" },
      { file: "006", w: 1920, h: 2560, tw: 540, th: 720, alt: "Glazed corridor along the workstations" },
      { file: "007", w: 1920, h: 2560, tw: 540, th: 720, alt: "Boardroom with oval table" },
      { file: "008", w: 1920, h: 2560, tw: 540, th: 720, alt: "Meeting room with long table" },
      { file: "009", w: 1920, h: 2560, tw: 540, th: 720, alt: "Executive office with textured stone wall" },
      { file: "010", w: 1920, h: 2560, tw: 540, th: 720, alt: "Executive office with feature wall" },
      { file: "011", w: 1920, h: 2560, tw: 540, th: 720, alt: "Manager's office with shelving wall" },
      { file: "012", w: 1920, h: 2560, tw: 540, th: 720, alt: "Office with round meeting table" },
      { file: "013", w: 1920, h: 2560, tw: 540, th: 720, alt: "Break lounge with coloured seating" }
    ]
  },
  {
    slug: "glass-high-rise-tower",
    name: "Dousin Mixed-Use Building",
    category: "commercial",
    kind: "render",
    summary: "A glass-clad high-rise tower of stacked, offset volumes with planted terraces, a timber-lined cantilevered sky terrace and a double-height glazed entrance, studied by day and at dusk in its waterfront setting.",
    images: [
      { file: "001", w: 1920, h: 1280, tw: 720, th: 480, alt: "Corner view of the glass tower from the avenue, with stacked terraces and a timber-lined sky terrace" },
      { file: "002", w: 1920, h: 1280, tw: 720, th: 480, alt: "White side wall and glazed facade seen from the avenue" },
      { file: "003", w: 1920, h: 1280, tw: 720, th: 480, alt: "Entrance corner with a timber soffit, glazed lobby and agave planting" },
      { file: "004", w: 1920, h: 1219, tw: 720, th: 457, alt: "Looking up at the tower from the road between palms" },
      { file: "005", w: 1920, h: 1217, tw: 720, th: 456, alt: "Slim front elevation of the tower with palms and street planting" },
      { file: "006", w: 1920, h: 1219, tw: 720, th: 457, alt: "White side wall at dusk with the tower's offset volumes" },
      { file: "007", w: 1920, h: 1217, tw: 720, th: 456, alt: "Corner view at dusk from the avenue" },
      { file: "008", w: 1920, h: 1217, tw: 720, th: 456, alt: "Tower from the paved plaza across the avenue" },
      { file: "009", w: 1920, h: 1280, tw: 720, th: 480, alt: "Lower floors, planted terrace and glazed entrance from the avenue" },
      { file: "010", w: 1920, h: 1217, tw: 720, th: 456, alt: "Street view from the road, with traffic and palms in front of the tower" },
      { file: "011", w: 1920, h: 1217, tw: 720, th: 456, alt: "Glazed entrance and timber soffit seen from the pavement at dusk" },
      { file: "012", w: 1920, h: 1217, tw: 720, th: 456, alt: "Front elevation at dusk rising above street-level planting" },
      { file: "013", w: 1920, h: 1217, tw: 720, th: 456, alt: "Aerial view of the tower and its riverside surroundings" },
      { file: "014", w: 1920, h: 1217, tw: 720, th: 456, alt: "Aerial view of the upper floors and cantilevered terrace" }
    ]
  },
  {
    slug: "menswear-store",
    name: "Mebri Menswear Store",
    category: "commercial",
    kind: "render",
    summary: "A menswear boutique in warm timber, black steel and dark marble: a glazed storefront with a fan of linear lights, slatted display walls, stepped shoe displays, lounge seating and a marble-based cash desk.",
    images: [
      { file: "001", w: 1920, h: 1217, tw: 720, th: 456, alt: "Clothing rails, mannequin and a stepped shoe display" },
      { file: "002", w: 1920, h: 1217, tw: 720, th: 456, alt: "Wide view of the shop floor with a central display table and lounge seating" },
      { file: "003", w: 1920, h: 1217, tw: 720, th: 456, alt: "Lounge seating and display tables beneath a floating ceiling panel" },
      { file: "004", w: 1920, h: 1219, tw: 720, th: 457, alt: "Central display table and slatted timber shelving wall" },
      { file: "005", w: 1920, h: 1217, tw: 720, th: 456, alt: "Shirt rails against a slatted timber wall" },
      { file: "006", w: 1920, h: 1217, tw: 720, th: 456, alt: "Display wall and hanging rails under linear ceiling lights" },
      { file: "007", w: 1920, h: 1217, tw: 720, th: 456, alt: "Feature graphic panel on a slatted wall beside a mannequin" },
      { file: "008", w: 1920, h: 1219, tw: 720, th: 457, alt: "Shop floor seen from the entrance beneath suspended linear lights" },
      { file: "009", w: 1920, h: 1217, tw: 720, th: 456, alt: "Entrance zone with lounge chairs, looking toward the street" },
      { file: "010", w: 1920, h: 1217, tw: 720, th: 456, alt: "Symmetrical view toward the cash desk between timber and black-steel shelving" },
      { file: "011", w: 1920, h: 1217, tw: 720, th: 456, alt: "Cash desk with a dark marble base and glass display top" },
      { file: "012", w: 1920, h: 1217, tw: 720, th: 456, alt: "Glazed storefront with mannequins and a fan of linear lights" }
    ]
  },
  {
    slug: "industrial-hall",
    name: "Industrial Hall",
    category: "commercial",
    kind: "photo",
    summary: "A long-span, steel-framed industrial hall photographed under construction.",
    images: [
      { file: "001", w: 1920, h: 1440, tw: 720, th: 540, alt: "Steel-framed hall under construction" }
    ]
  },
  {
    slug: "cigar-lounge",
    name: "Pace Cigar Lounge & Bar",
    category: "hospitality",
    kind: "render",
    featured: true,
    summary: "A cigar lounge and bar designed as a warm, dark and richly layered interior: leather seating, an illuminated green-stone bar, ornamental screens and a discreet street entrance.",
    images: [
      { file: "001", w: 1920, h: 1080, tw: 720, th: 405, alt: "Lounge corner with low lighting" },
      { file: "002", w: 1920, h: 1080, tw: 720, th: 405, alt: "Entry reception pedestal" },
      { file: "003", w: 1920, h: 1080, tw: 720, th: 405, alt: "Lounge seating with green leather chairs" },
      { file: "004", w: 1920, h: 1080, tw: 720, th: 405, alt: "Bar with illuminated back shelves" },
      { file: "005", w: 1920, h: 1080, tw: 720, th: 405, alt: "Bar and lounge, wide view" },
      { file: "006", w: 1920, h: 1080, tw: 720, th: 405, alt: "Street frontage at night" },
      { file: "007", w: 1920, h: 1080, tw: 720, th: 405, alt: "Street frontage at dusk" },
      { file: "008", w: 1920, h: 1080, tw: 720, th: 405, alt: "Lounge with ornamental screen and armchairs" },
      { file: "009", w: 1920, h: 1080, tw: 720, th: 405, alt: "Bar with green stools and lounge" },
      { file: "010", w: 1920, h: 1080, tw: 720, th: 405, alt: "Bar counter and shelving" },
      { file: "011", w: 1920, h: 1080, tw: 720, th: 405, alt: "Reading corner with sofa and bookshelves" },
      { file: "012", w: 1920, h: 1080, tw: 720, th: 405, alt: "Armchairs beside an ornamental screen" },
      { file: "013", w: 1920, h: 1080, tw: 720, th: 405, alt: "Bar counter with green stools" },
      { file: "014", w: 1920, h: 1080, tw: 720, th: 405, alt: "Bar back wall and stone counter" },
      { file: "015", w: 1920, h: 1080, tw: 720, th: 405, alt: "Chesterfield seating area" },
      { file: "016", w: 1920, h: 1080, tw: 720, th: 405, alt: "Lounge seating beneath feature artwork" },
      { file: "017", w: 1920, h: 1080, tw: 720, th: 405, alt: "Bar stools and private table" },
      { file: "018", w: 1920, h: 1080, tw: 720, th: 405, alt: "Bar seen across the lounge" },
      { file: "019", w: 1920, h: 1080, tw: 720, th: 405, alt: "Chesterfield sofas under chandeliers" },
      { file: "020", w: 1920, h: 1080, tw: 720, th: 405, alt: "Lounge seating area, wide view" },
      { file: "021", w: 1920, h: 1080, tw: 720, th: 405, alt: "Street frontage with glazed screen" },
      { file: "023", w: 1920, h: 1080, tw: 720, th: 405, alt: "Entrance doors with canopy lighting" },
      { file: "024", w: 1920, h: 1080, tw: 720, th: 405, alt: "Street frontage in the evening" },
      { file: "025", w: 1920, h: 1080, tw: 720, th: 405, alt: "Street frontage with warm cove lighting" },
      { file: "026", w: 1920, h: 1080, tw: 720, th: 405, alt: "Entrance doors at street level" },
      { file: "028", w: 1920, h: 1080, tw: 720, th: 405, alt: "Corridor to the restrooms with illuminated sign" },
      { file: "029", w: 1920, h: 1080, tw: 720, th: 405, alt: "Restroom corridor, long view" },
      { file: "030", w: 1920, h: 1080, tw: 720, th: 405, alt: "Corridor with chequered floor" },
      { file: "031", w: 1920, h: 1080, tw: 720, th: 405, alt: "Restroom door in a marble-lined corridor" },
      { file: "032", w: 1920, h: 1080, tw: 720, th: 405, alt: "Restroom washbasin with mirror" }
    ]
  },
  {
    slug: "ice-cream-shop",
    name: "Scoops & Bites Ice Cream Shop",
    category: "hospitality",
    kind: "render",
    cover: "004",
    summary: "A playful ice cream parlour in soft pink, sage green and terrazzo: a scalloped facade with arched windows and striped awnings, a mural-lined dining hall with booth seating, and a compact service counter.",
    images: [
      { file: "001", w: 1920, h: 1353, tw: 720, th: 507, alt: "Street frontage with a striped green awning and terrazzo wall" },
      { file: "002", w: 1920, h: 1404, tw: 720, th: 526, alt: "Entrance with folding glass doors and a striped awning" },
      { file: "003", w: 1920, h: 1353, tw: 720, th: 507, alt: "Arched shopfront windows beside a waffle-cone photo feature" },
      { file: "004", w: 1920, h: 1353, tw: 720, th: 507, alt: "Pastel scalloped facade with arched windows and outdoor counter seating" },
      { file: "005", w: 1920, h: 1404, tw: 720, th: 526, alt: "Dining hall with pink booths and rounded timber ceiling clouds" },
      { file: "006", w: 1920, h: 1353, tw: 720, th: 507, alt: "Dining hall looking toward the arched windows" },
      { file: "007", w: 1920, h: 1353, tw: 720, th: 507, alt: "Dining hall, wide view beneath the timber ceiling clouds" },
      { file: "008", w: 1920, h: 1404, tw: 720, th: 526, alt: "Seating area with an arched green door and sculptural pendant lights" },
      { file: "009", w: 1920, h: 1353, tw: 720, th: 507, alt: "Pink booth seating beneath an ice-cream pattern mural" },
      { file: "010", w: 1920, h: 1353, tw: 720, th: 507, alt: "Booth seating along the mural wall, long view" },
      { file: "011", w: 1920, h: 1353, tw: 720, th: 507, alt: "Hand-wash area with a scalloped counter and arched mirrors" },
      { file: "012", w: 1920, h: 1353, tw: 720, th: 507, alt: "Service counter with menu boards and display case" }
    ]
  },
  {
    slug: "cafe-interior",
    name: "Cafe Interior",
    category: "hospitality",
    kind: "photo",
    summary: "A compact cafe interior built around a charred-timber bar, exposed pendant lighting and a suspended timber canopy.",
    images: [
      { file: "001", w: 1920, h: 2560, tw: 540, th: 720, alt: "Cafe with timber bar and pendant lighting" }
    ]
  },
  {
    slug: "medical-clinic-and-pharmacy",
    name: "Ayzon Medical Center",
    category: "healthcare",
    kind: "render",
    featured: true,
    summary: "A medical and dental clinic with a calm reception hall, treatment rooms with city views, and a retail pharmacy finished in copper, timber and terrazzo.",
    images: [
      { file: "001", w: 1920, h: 1217, tw: 720, th: 456, alt: "Dental treatment room with city views" },
      { file: "002", w: 1309, h: 830, tw: 720, th: 457, alt: "Consulting room with reception desk" },
      { file: "003", w: 1309, h: 830, tw: 720, th: 457, alt: "Treatment room with dental chair" },
      { file: "004", w: 1309, h: 830, tw: 720, th: 457, alt: "Entrance hall with feature wall" },
      { file: "005", w: 1920, h: 1217, tw: 720, th: 456, alt: "Waiting-room doors with planting" },
      { file: "007", w: 1309, h: 830, tw: 720, th: 457, alt: "Waiting hall with lounge seating" },
      { file: "008", w: 1309, h: 830, tw: 720, th: 457, alt: "Reception desk with sculptural lighting" },
      { file: "009", w: 1309, h: 830, tw: 720, th: 457, alt: "Reception and feature wall" },
      { file: "010", w: 1309, h: 830, tw: 720, th: 457, alt: "Private lounge with wall display" },
      { file: "011", w: 1309, h: 830, tw: 720, th: 457, alt: "Waiting lounge with display screen" },
      { file: "012", w: 1309, h: 830, tw: 720, th: 457, alt: "Waiting area and corridor" },
      { file: "013", w: 1309, h: 830, tw: 720, th: 457, alt: "Pharmacy retail counter" },
      { file: "014", w: 1309, h: 830, tw: 720, th: 457, alt: "Pharmacy shelving, wide view" },
      { file: "015", w: 1309, h: 830, tw: 720, th: 457, alt: "Pharmacy and retail counter" },
      { file: "016", w: 1309, h: 830, tw: 720, th: 457, alt: "Glazed pharmacy frontage" },
      { file: "017", w: 1309, h: 830, tw: 720, th: 457, alt: "Glass entrance to the clinic" },
      { file: "018", w: 1309, h: 830, tw: 720, th: 457, alt: "Entrance atrium with glazing" },
      { file: "019", w: 1309, h: 830, tw: 720, th: 457, alt: "Treatment corridor" },
      { file: "020", w: 1309, h: 830, tw: 720, th: 457, alt: "Reception and waiting hall" }
    ]
  },
  {
    slug: "creative-training-academy",
    name: "Hasset Academy",
    category: "education",
    kind: "render",
    featured: true,
    summary: "A beauty and fashion training academy in deep red, timber and pale concrete: a runway hall, make-up studio with ring-lit mirror stations, a nail station, long study counters, a photography classroom, reception and a manager's office.",
    images: [
      { file: "001", w: 1920, h: 1217, tw: 720, th: 456, alt: "Runway hall with white chairs either side of a black catwalk" },
      { file: "002", w: 1920, h: 1217, tw: 720, th: 456, alt: "Runway hall with white chairs, concrete columns and a frosted glass wall" },
      { file: "003", w: 1920, h: 1217, tw: 720, th: 456, alt: "Runway hall seen from the far end beside mirrored panels" },
      { file: "004", w: 1920, h: 1217, tw: 720, th: 456, alt: "Runway hall with a camera on a tripod beside the catwalk" },
      { file: "005", w: 1920, h: 1217, tw: 720, th: 456, alt: "Make-up studio with mirrored workstation" },
      { file: "006", w: 1920, h: 1217, tw: 720, th: 456, alt: "Make-up studio with ring-lit mirror stations and director's chairs" },
      { file: "007", w: 1920, h: 1217, tw: 720, th: 456, alt: "Make-up studio seen through mirrored and black panel partitions" },
      { file: "008", w: 1920, h: 1217, tw: 720, th: 456, alt: "Nail station with a long marble-top table and roller blinds" },
      { file: "009", w: 1920, h: 1217, tw: 720, th: 456, alt: "Treatment beds with arched floor lamps and a nail-polish wall" },
      { file: "010", w: 1920, h: 1217, tw: 720, th: 456, alt: "Waiting chairs in front of red and timber display columns" },
      { file: "011", w: 1920, h: 1217, tw: 720, th: 456, alt: "Lift lobby with a deep-red leather wall, bench and glazed doors" },
      { file: "012", w: 1920, h: 1217, tw: 720, th: 456, alt: "Lounge with large abstract paintings, a clothing rail and herringbone floor" },
      { file: "013", w: 1920, h: 1217, tw: 720, th: 456, alt: "Manager's office with illuminated marble-block shelving" },
      { file: "014", w: 1920, h: 1217, tw: 720, th: 456, alt: "Manager's office from the entrance, with a long dark desk and abstract art" },
      { file: "015", w: 1309, h: 830, tw: 720, th: 457, alt: "Photography classroom with portrait wall" },
      { file: "016", w: 1920, h: 1217, tw: 720, th: 456, alt: "Photography classroom behind a glass wall, with print-covered walls and a studio backdrop" },
      { file: "017", w: 1920, h: 1217, tw: 720, th: 456, alt: "Long timber study counter beyond a glass partition" },
      { file: "018", w: 1920, h: 1217, tw: 720, th: 456, alt: "Long study counter beside a glazed door and an olive tree" },
      { file: "019", w: 1920, h: 1217, tw: 720, th: 456, alt: "Long study counter with grey chairs against a red textured wall" },
      { file: "020", w: 1920, h: 1217, tw: 720, th: 456, alt: "Study counter, shampoo basin and display shelving beyond" },
      { file: "021", w: 1920, h: 1217, tw: 720, th: 456, alt: "Study counter facing a textured red feature wall" },
      { file: "022", w: 1920, h: 1219, tw: 720, th: 457, alt: "Long view of the study counters and mirrored partitions beside a textured red wall" },
      { file: "023", w: 1920, h: 1217, tw: 720, th: 456, alt: "Reception desk with a red feature wall and glass coffee table" }
    ]
  }
]

const categoryNames = Object.fromEntries(categories.map((category) => [category.id, category.name]))

const toImage = (slug, image, index) => ({
  order: index + 1,
  alt: image.alt,
  thumb: `/projects/${slug}/thumb/${image.file}.webp`,
  full: `/projects/${slug}/full/${image.file}.webp`,
  width: image.w,
  height: image.h,
  thumbWidth: image.tw,
  thumbHeight: image.th
})

export const projects = definitions.map((project) => {
  const images = project.images.map((image, index) => toImage(project.slug, image, index))
  const cover = images.find((image) => image.full.endsWith(`/${project.cover}.webp`)) || images[0]

  return {
    id: project.slug,
    slug: project.slug,
    name: project.name,
    category: project.category,
    categoryLabel: categoryNames[project.category],
    kind: project.kind,
    kindLabel: kinds[project.kind],
    // Optional: a company the project was delivered with (shown under "Collaboration")
    collaboration: project.collaboration || '',
    summary: project.summary,
    featured: Boolean(project.featured),
    hero: Boolean(project.hero),
    imageCount: images.length,
    cover,
    images
  }
})
