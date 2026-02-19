export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
}

export interface MenuData {
  menuId?: string;
  templateId: string;
  businessName: string;
  businessDescription: string;
  primaryColor: string;
  items: MenuItem[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  style: "elegant" | "modern" | "casual" | "minimalist";
}

export const templates: Template[] = [
  {
    id: "midnight-noir",
    name: "Midnight Noir",
    description: "Sophisticated dark elegance with golden accents",
    primaryColor: "#1A1A2E",
    backgroundColor: "#0F0F1E",
    textColor: "#E8E8E8",
    accentColor: "#D4AF37",
    style: "elegant",
  },
  {
    id: "sunset-terrace",
    name: "Sunset Terrace",
    description: "Warm sunset hues for a cozy dining experience",
    primaryColor: "#FF6B6B",
    backgroundColor: "#FFF5E6",
    textColor: "#2C2C2C",
    accentColor: "#FFB84D",
    style: "casual",
  },
  {
    id: "ocean-breeze",
    name: "Ocean Breeze",
    description: "Fresh coastal vibes with cool aqua tones",
    primaryColor: "#00CED1",
    backgroundColor: "#E0F7FA",
    textColor: "#004D40",
    accentColor: "#4DD0E1",
    style: "modern",
  },
  {
    id: "vintage-charm",
    name: "Vintage Charm",
    description: "Nostalgic warmth with sepia-inspired palette",
    primaryColor: "#8B4513",
    backgroundColor: "#FDF6E3",
    textColor: "#3E2723",
    accentColor: "#D2691E",
    style: "casual",
  },
  {
    id: "neon-nights",
    name: "Neon Nights",
    description: "Bold and vibrant for trendy nightlife spots",
    primaryColor: "#FF00FF",
    backgroundColor: "#1A0033",
    textColor: "#FFFFFF",
    accentColor: "#00FFFF",
    style: "modern",
  },
  {
    id: "artisan-craft",
    name: "Artisan Craft",
    description: "Handcrafted feel with earthy, natural tones",
    primaryColor: "#6B4423",
    backgroundColor: "#FAF5F0",
    textColor: "#2D1810",
    accentColor: "#A0522D",
    style: "casual",
  },
  {
    id: "tropical-paradise",
    name: "Tropical Paradise",
    description: "Vibrant island energy with lush greens",
    primaryColor: "#00A86B",
    backgroundColor: "#F0FFF0",
    textColor: "#1B4332",
    accentColor: "#FFD700",
    style: "casual",
  },
  {
    id: "serene-zen",
    name: "Serene Zen",
    description: "Peaceful minimalism with soft pastels",
    primaryColor: "#9B9B9B",
    backgroundColor: "#F8F8F8",
    textColor: "#2C2C2C",
    accentColor: "#C0C0C0",
    style: "minimalist",
  },
];
