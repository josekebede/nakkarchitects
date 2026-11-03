// Clients shown in the sliding logo strip on the home page.
//
// To add a logo:
//   1. Put the file in public/clients/ (SVG is best; otherwise a PNG at least 600px wide
//      with a transparent background).
//   2. Set `logo` below to its path, for example '/clients/abay-homes.svg'.
//
// Clients whose `logo` is null are left out of the strip. If none have a logo the
// whole section stays hidden, so nothing half-finished is ever shown on the site.

export const clients = [
  { name: 'Abay Technical & Trading', logo: null },
  { name: 'Abay Homes Real Estate', logo: null },
  { name: 'Ethiopian Nuclear Energy Commission', logo: null },
  { name: 'Dousin', logo: null },
  { name: 'Mebri', logo: null },
  { name: 'Pace Cigar Lounge & Bar', logo: null },
  { name: 'Scoops & Bites', logo: null },
  { name: 'Ayzon Boutique Clinic', logo: null },
  { name: 'Hasset Academy', logo: null }
]
