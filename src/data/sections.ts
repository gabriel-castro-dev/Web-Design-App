// Display order and labels. Sections not listed here still show up (appended, titleized)
// as soon as a folder exists under design-references/.
export const SECTION_ORDER: Record<string, string> = {
  'web-app': 'Web App',
  pricing: 'Pricing',
  team: 'Team',
  'scroll-effects': 'Scroll Effects',
  'logo-marquee': 'Logo Marquee',
  auth: 'Auth',
  blog: 'Blog',
  footer: 'Footer',
  lists: 'Lists & Items',
}

export const SUBTYPE_LABELS: Record<string, string> = {
  dashboard: 'Dashboard',
  crm: 'CRM',
  tasks: 'Tasks',
  calendar: 'Calendar',
  chat: 'Chat',
  profile: 'Profile',
  settings: 'Settings',
  files: 'Files',
  'data-table': 'Data Table',
  editor: 'Editor',
  map: 'Map',
  payments: 'Payments',
  ecommerce: 'E-commerce',
  email: 'Email',
  health: 'Health',
  booking: 'Booking',
  login: 'Login',
  signup: 'Sign up',
}

export const titleize = (id: string) =>
  id.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

export const sectionLabel = (id: string) => SECTION_ORDER[id] ?? titleize(id)
export const subtypeLabel = (id: string) => SUBTYPE_LABELS[id] ?? titleize(id)
