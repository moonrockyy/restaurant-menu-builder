export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  customCategory?: string;
}

export interface BackgroundSettings {
  type: "template" | "custom";
  imageUrl?: string;
  opacity: number;
  size: "cover" | "contain" | "repeat" | "stretch";
  position: "center" | "top" | "bottom" | "left" | "right" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
  blur: number;
  brightness: number;
}

export interface MenuData {
  menuId?: string;
  templateId: string;
  businessName: string;
  businessDescription: string;
  primaryColor: string;
  items: MenuItem[];
  customCategories?: CustomCategory[];
  backgroundSettings?: BackgroundSettings;
  createdAt?: string;
  updatedAt?: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  primaryColor: string;
  backgroundColor: string;
  backgroundGradient?: string;
  textColor: string;
  accentColor: string;
  style: "elegant" | "modern" | "casual" | "minimalist" | "vintage" | "rustic" | "industrial" | "tropical" | "chic" | "bold";
  fontFamily?: string;
  layout: "single-column" | "two-column" | "grid" | "split" | "centered" | "magazine";
  headerStyle: "classic" | "modern" | "decorative" | "minimal" | "bold";
  categoryStyle: "underline" | "boxed" | "background" | "bordered" | "minimal";
  itemStyle: "simple" | "detailed" | "card" | "highlighted" | "minimal";
  decorativeElements?: {
    borders: boolean;
    dividers: boolean;
    icons: boolean;
    patterns: boolean;
  };
  backgroundPattern?: "none" | "subtle-dots" | "lines" | "crosshatch" | "geometric" | "organic";
}

export interface CustomCategory {
  id: string;
  name: string;
  order: number;
}

export const templates: Template[] = [
  {
    id: "apple-elegant",
    name: "Apple Elegant",
    description: "Clean, minimalist design with subtle gradients",
    primaryColor: "#1D1D1F",
    backgroundColor: "#667eea",
    backgroundGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    textColor: "#FFFFFF",
    accentColor: "#007AFF",
    style: "modern",
    fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
    layout: "single-column",
    headerStyle: "modern",
    categoryStyle: "underline",
    itemStyle: "simple",
    decorativeElements: {
      borders: false,
      dividers: true,
      icons: false,
      patterns: false
    },
    backgroundPattern: "none"
  },
  {
    id: "apple-warm",
    name: "Apple Warm",
    description: "Cozy design with warm sunset gradients",
    primaryColor: "#FF6B35",
    backgroundColor: "#FF6B35",
    backgroundGradient: "linear-gradient(135deg, #FF6B35 0%, #FF9558 100%)",
    textColor: "#FFFFFF",
    accentColor: "#FF9500",
    style: "casual",
    fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
    layout: "two-column",
    headerStyle: "classic",
    categoryStyle: "background",
    itemStyle: "detailed",
    decorativeElements: {
      borders: false,
      dividers: true,
      icons: false,
      patterns: false
    },
    backgroundPattern: "none"
  },
  {
    id: "apple-cool",
    name: "Apple Cool",
    description: "Fresh design with cool blue gradients",
    primaryColor: "#007AFF",
    backgroundColor: "#007AFF",
    backgroundGradient: "linear-gradient(135deg, #667eea 0%, #007AFF 100%)",
    textColor: "#FFFFFF",
    accentColor: "#0051D5",
    style: "modern",
    fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
    layout: "grid",
    headerStyle: "modern",
    categoryStyle: "boxed",
    itemStyle: "card",
    decorativeElements: {
      borders: true,
      dividers: false,
      icons: true,
      patterns: false
    },
    backgroundPattern: "subtle-dots"
  },
  {
    id: "apple-midnight",
    name: "Apple Midnight",
    description: "Dark, sophisticated design with deep gradients",
    primaryColor: "#FFFFFF",
    backgroundColor: "#1C1C1E",
    backgroundGradient: "linear-gradient(135deg, #1C1C1E 0%, #2D2D30 100%)",
    textColor: "#FFFFFF",
    accentColor: "#007AFF",
    style: "elegant",
    fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
    layout: "single-column",
    headerStyle: "bold",
    categoryStyle: "bordered",
    itemStyle: "highlighted",
    decorativeElements: {
      borders: true,
      dividers: true,
      icons: false,
      patterns: false
    },
    backgroundPattern: "none"
  },
  {
    id: "vintage-chalkboard",
    name: "Vintage Chalkboard",
    description: "Classic chalkboard design with decorative borders",
    primaryColor: "#FFFFFF",
    backgroundColor: "#2C3E50",
    backgroundGradient: "linear-gradient(135deg, #2C3E50 0%, #34495E 100%)",
    textColor: "#FFFFFF",
    accentColor: "#E74C3C",
    style: "vintage",
    fontFamily: "Playfair Display, Georgia, serif",
    layout: "centered",
    headerStyle: "decorative",
    categoryStyle: "bordered",
    itemStyle: "detailed",
    decorativeElements: {
      borders: true,
      dividers: true,
      icons: true,
      patterns: true
    },
    backgroundPattern: "crosshatch"
  },
  {
    id: "rustic-wood",
    name: "Rustic Wood",
    description: "Warm wooden texture with earthy tones",
    primaryColor: "#8B4513",
    backgroundColor: "#D2691E",
    backgroundGradient: "linear-gradient(135deg, #8B4513 0%, #D2691E 100%)",
    textColor: "#FFFFFF",
    accentColor: "#FFD700",
    style: "rustic",
    fontFamily: "Merriweather, Georgia, serif",
    layout: "single-column",
    headerStyle: "classic",
    categoryStyle: "background",
    itemStyle: "simple",
    decorativeElements: {
      borders: true,
      dividers: true,
      icons: false,
      patterns: true
    },
    backgroundPattern: "lines"
  },
  {
    id: "industrial-concrete",
    name: "Industrial Concrete",
    description: "Modern industrial design with raw textures",
    primaryColor: "#333333",
    backgroundColor: "#666666",
    backgroundGradient: "linear-gradient(135deg, #333333 0%, #666666 100%)",
    textColor: "#FFFFFF",
    accentColor: "#FF6B35",
    style: "industrial",
    fontFamily: "Roboto Condensed, Arial, sans-serif",
    layout: "two-column",
    headerStyle: "bold",
    categoryStyle: "minimal",
    itemStyle: "minimal",
    decorativeElements: {
      borders: true,
      dividers: false,
      icons: false,
      patterns: false
    },
    backgroundPattern: "geometric"
  },
  {
    id: "tropical-paradise",
    name: "Tropical Paradise",
    description: "Vibrant tropical design with palm leaf patterns",
    primaryColor: "#00A86B",
    backgroundColor: "#228B22",
    backgroundGradient: "linear-gradient(135deg, #00A86B 0%, #FFD700 100%)",
    textColor: "#FFFFFF",
    accentColor: "#FF69B4",
    style: "tropical",
    fontFamily: "Poppins, Arial, sans-serif",
    layout: "magazine",
    headerStyle: "decorative",
    categoryStyle: "boxed",
    itemStyle: "card",
    decorativeElements: {
      borders: false,
      dividers: true,
      icons: true,
      patterns: true
    },
    backgroundPattern: "organic"
  },
  {
    id: "chic-minimal",
    name: "Chic Minimal",
    description: "Elegant minimalist design with subtle accents",
    primaryColor: "#000000",
    backgroundColor: "#F8F8F8",
    backgroundGradient: "linear-gradient(135deg, #FFFFFF 0%, #F8F8F8 100%)",
    textColor: "#000000",
    accentColor: "#C0C0C0",
    style: "chic",
    fontFamily: "Helvetica Neue, Arial, sans-serif",
    layout: "single-column",
    headerStyle: "minimal",
    categoryStyle: "underline",
    itemStyle: "minimal",
    decorativeElements: {
      borders: false,
      dividers: false,
      icons: false,
      patterns: false
    },
    backgroundPattern: "none"
  },
  {
    id: "bold-restaurant",
    name: "Bold Restaurant",
    description: "Eye-catching design with bold typography and colors",
    primaryColor: "#FF0000",
    backgroundColor: "#FFFFFF",
    backgroundGradient: "linear-gradient(135deg, #FF0000 0%, #FFD700 100%)",
    textColor: "#000000",
    accentColor: "#FF0000",
    style: "bold",
    fontFamily: "Bebas Neue, Impact, sans-serif",
    layout: "split",
    headerStyle: "bold",
    categoryStyle: "background",
    itemStyle: "highlighted",
    decorativeElements: {
      borders: true,
      dividers: true,
      icons: true,
      patterns: false
    },
    backgroundPattern: "none"
  },
  {
    id: "magazine-layout",
    name: "Magazine Layout",
    description: "Professional magazine-style design with multiple columns",
    primaryColor: "#2C3E50",
    backgroundColor: "#FFFFFF",
    backgroundGradient: "linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 100%)",
    textColor: "#2C3E50",
    accentColor: "#E74C3C",
    style: "modern",
    fontFamily: "Georgia, Times, serif",
    layout: "magazine",
    headerStyle: "classic",
    categoryStyle: "bordered",
    itemStyle: "detailed",
    decorativeElements: {
      borders: true,
      dividers: true,
      icons: false,
      patterns: false
    },
    backgroundPattern: "lines"
  },
  {
    id: "cafe-cozy",
    name: "Cafe Cozy",
    description: "Warm cafe design with coffee cup accents",
    primaryColor: "#6F4E37",
    backgroundColor: "#F5DEB3",
    backgroundGradient: "linear-gradient(135deg, #6F4E37 0%, #F5DEB3 100%)",
    textColor: "#3E2723",
    accentColor: "#FF6B35",
    style: "casual",
    fontFamily: "Comfortaa, cursive",
    layout: "two-column",
    headerStyle: "decorative",
    categoryStyle: "boxed",
    itemStyle: "card",
    decorativeElements: {
      borders: true,
      dividers: false,
      icons: true,
      patterns: true
    },
    backgroundPattern: "subtle-dots"
  },
  
];
