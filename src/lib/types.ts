export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  coverImage: string;
  videoUrl?: string;
  year: string;
  client: string;
  description: string;
  fullDescription: string;
  deliverables: string[];
  gallery: string[];
  isFeatured: boolean;
  order: number;
  status: 'published' | 'draft';
  isDemo?: boolean;
}

export interface Reel {
  id: string;
  title: string;
  category: string;
  videoUrl: string;
  coverImage: string;
  description?: string;
  duration?: string;
  order: number;
  published: boolean;
  isDemo?: boolean;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  image: string;
  focalPoint?: 'center' | 'top' | 'bottom';
  link?: string;
}

export interface HomepageMedia {
  hero: {
    videoUrl: string;
    posterImage: string;
    title: string;
    subtitle: string;
    ctaPrimaryText: string;
    ctaSecondaryText: string;
  };
  intro: {
    headline: string;
    description: string;
    subtext: string;
  };
  services: ServiceItem[];
  parallaxBg: string;
  aboutImage: string;
  aboutHeadline: string;
  aboutText: string;
  ctaBg: string;
  ctaTitle: string;
  ctaButtonText: string;
  virtualTourBg: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  logoUrl?: string;
  faviconUrl?: string;
  whatsappNumber: string;
  whatsappDefaultMessage: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  instagram: string;
  youtube: string;
  vimeo: string;
  metaTitle: string;
  metaDescription: string;
  footerText: string;
}

export interface Quote {
  id: string;
  serviceType: string;
  sector: string;
  description: string;
  location?: string;
  targetDate?: string;
  fullName: string;
  phone: string;
  email: string;
  status: 'new' | 'in_progress' | 'completed' | 'archived';
  notes?: string;
  createdAt: string;
}

export interface DatabaseSchema {
  projects: Project[];
  reels: Reel[];
  media: HomepageMedia;
  settings: SiteSettings;
  quotes: Quote[];
}
