export interface TemplateData {
  id: string;
  name: string;
  category: string;
  description: string;
  preview: string;
  features: string[];
  color: string;
  menuData: {
    restaurant: {
      name: string;
      description: string;
      logo?: string;
      backgroundImage?: string;
      primaryColor: string;
      secondaryColor: string;
      fontFamily: string;
    };
    categories: {
      id: string;
      name: string;
      description?: string;
      items: {
        id: string;
        name: string;
        description: string;
        price: string;
        dietary?: string[];
        popular?: boolean;
        spicy?: boolean;
      }[];
    }[];
  };
}

export const templates: TemplateData[] = [
  {
    id: "modern-cafe",
    name: "Modern Cafe",
    category: "cafe",
    description: "Clean, minimalist design perfect for coffee shops and modern cafes",
    preview: "/templates/modern-cafe.jpg",
    features: ["Clean layout", "Minimal aesthetic", "Warm color scheme"],
    color: "from-amber-500 to-orange-600",
    menuData: {
      restaurant: {
        name: "Artisan Coffee House",
        description: "Specialty coffee & artisanal bites since 2019",
        primaryColor: "#D97706",
        secondaryColor: "#F59E0B",
        fontFamily: "Inter"
      },
      categories: [
        {
          id: "coffee",
          name: "Coffee & Espresso",
          description: "Handcrafted beverages",
          items: [
            {
              id: "1",
              name: "Cappuccino",
              description: "Espresso with steamed milk foam",
              price: "$4.50",
              popular: true
            },
            {
              id: "2",
              name: "Latte",
              description: "Smooth espresso with steamed milk",
              price: "$5.00"
            },
            {
              id: "3",
              name: "Cold Brew",
              description: "24-hour steeped, served over ice",
              price: "$4.00"
            },
            {
              id: "4",
              name: "Americano",
              description: "Espresso with hot water",
              price: "$3.50"
            }
          ]
        },
        {
          id: "pastries",
          name: "Pastries & Baked Goods",
          description: "Fresh daily",
          items: [
            {
              id: "5",
              name: "Croissant",
              description: "Buttery, flaky French pastry",
              price: "$3.50",
              popular: true
            },
            {
              id: "6",
              name: "Blueberry Muffin",
              description: "Fresh baked with real blueberries",
              price: "$4.00"
            },
            {
              id: "7",
              name: "Chocolate Chip Cookie",
              description: "Warm, gooey, homemade",
              price: "$2.50"
            }
          ]
        },
        {
          id: "breakfast",
          name: "Breakfast Sandwiches",
          description: "Served all day",
          items: [
            {
              id: "8",
              name: "Avocado Toast",
              description: "Sourdough, avocado, poached egg",
              price: "$8.50",
              popular: true
            },
            {
              id: "9",
              name: "Breakfast Burrito",
              description: "Eggs, cheese, potatoes, salsa",
              price: "$7.50"
            }
          ]
        }
      ]
    }
  },
  {
    id: "elegant-restaurant",
    name: "Elegant Restaurant",
    category: "restaurant",
    description: "Sophisticated template for fine dining and upscale restaurants",
    preview: "/templates/elegant-restaurant.jpg",
    features: ["Professional appearance", "Classic typography", "Refined color palette"],
    color: "from-blue-500 to-indigo-600",
    menuData: {
      restaurant: {
        name: "Bella Vista",
        description: "Fine Italian dining with panoramic city views",
        primaryColor: "#1E40AF",
        secondaryColor: "#312E81",
        fontFamily: "Playfair Display"
      },
      categories: [
        {
          id: "appetizers",
          name: "Antipasti",
          description: "Traditional Italian starters",
          items: [
            {
              id: "1",
              name: "Bruschetta Classica",
              description: "Toasted bread with tomatoes, basil, garlic",
              price: "$14.00"
            },
            {
              id: "2",
              name: "Carpaccio di Manzo",
              description: "Thinly sliced raw beef with arugula",
              price: "$18.00",
              popular: true
            },
            {
              id: "3",
              name: "Calamari Fritti",
              description: "Crispy fried squid with marinara",
              price: "$16.00"
            }
          ]
        },
        {
          id: "pasta",
          name: "Primi Piatti",
          description: "House-made pasta",
          items: [
            {
              id: "4",
              name: "Tagliatelle al Ragù",
              description: "Fresh pasta with traditional bolognese",
              price: "$24.00",
              popular: true
            },
            {
              id: "5",
              name: "Linguine alle Vongole",
              description: "Pasta with fresh clams, white wine, garlic",
              price: "$26.00"
            },
            {
              id: "6",
              name: "Risotto ai Funghi",
              description: "Creamy mushroom risotto with truffle oil",
              price: "$22.00"
            }
          ]
        },
        {
          id: "mains",
          name: "Secondi Piatti",
          description: "Main courses",
          items: [
            {
              id: "7",
              name: "Branzino al Forno",
              description: "Mediterranean sea bass with herbs",
              price: "$32.00",
              popular: true
            },
            {
              id: "8",
              name: "Osso Buco",
              description: "Braised veal shank with saffron risotto",
              price: "$36.00"
            },
            {
              id: "9",
              name: "Filetto di Manzo",
              description: "Grilled beef tenderloin with red wine reduction",
              price: "$42.00"
            }
          ]
        }
      ]
    }
  },
  {
    id: "bakery-boutique",
    name: "Bakery Boutique",
    category: "bakery",
    description: "Charming and sweet design perfect for bakeries and dessert shops",
    preview: "/templates/bakery-boutique.jpg",
    features: ["Charming layout", "Sweet color palette", "Artistic typography"],
    color: "from-pink-500 to-rose-600",
    menuData: {
      restaurant: {
        name: "Sweet Dreams Bakery",
        description: "Handcrafted desserts & artisanal breads",
        primaryColor: "#EC4899",
        secondaryColor: "#F43F5E",
        fontFamily: "Dancing Script"
      },
      categories: [
        {
          id: "cakes",
          name: "Cakes & Tortes",
          description: "Celebration cakes and daily specials",
          items: [
            {
              id: "1",
              name: "Chocolate Lava Cake",
              description: "Warm chocolate cake with molten center",
              price: "$8.50",
              popular: true
            },
            {
              id: "2",
              name: "Red Velvet Cake",
              description: "Classic southern cake with cream cheese frosting",
              price: "$7.50"
            },
            {
              id: "3",
              name: "Tiramisu",
              description: "Italian coffee-flavored dessert",
              price: "$8.00"
            }
          ]
        },
        {
          id: "pastries",
          name: "Pastries",
          description: "Fresh daily selection",
          items: [
            {
              id: "4",
              name: "Pain au Chocolat",
              description: "French chocolate croissant",
              price: "$4.50",
              popular: true
            },
            {
              id: "5",
              name: "Fruit Tart",
              description: "Fresh seasonal fruits on pastry cream",
              price: "$6.00"
            },
            {
              id: "6",
              name: "Éclair",
              description: "Choux pastry with vanilla cream",
              price: "$4.00"
            }
          ]
        },
        {
          id: "bread",
          name: "Artisanal Breads",
          description: "Baked fresh daily",
          items: [
            {
              id: "7",
              name: "Sourdough Boule",
              description: "Traditional fermented bread",
              price: "$6.00",
              popular: true
            },
            {
              id: "8",
              name: "Whole Wheat Loaf",
              description: "Nutritious and hearty",
              price: "$5.50"
            },
            {
              id: "9",
              name: "French Baguette",
              description: "Classic crusty bread",
              price: "$4.00"
            }
          ]
        }
      ]
    }
  },
  {
    id: "wine-bar",
    name: "Wine Bar",
    category: "bar",
    description: "Elegant and sophisticated design for wine bars and lounges",
    preview: "/templates/wine-bar.jpg",
    features: ["Sophisticated styling", "Elegant typography", "Curated sections"],
    color: "from-purple-500 to-violet-600",
    menuData: {
      restaurant: {
        name: "Vino Lounge",
        description: "Curated wine selection & artisanal small plates",
        primaryColor: "#7C3AED",
        secondaryColor: "#6D28D9",
        fontFamily: "Cormorant Garamond"
      },
      categories: [
        {
          id: "red-wine",
          name: "Red Wines",
          description: "Bold and complex selections",
          items: [
            {
              id: "1",
              name: "Cabernet Sauvignon",
              description: "Napa Valley 2021 - Rich, full-bodied",
              price: "$18/glass",
              popular: true
            },
            {
              id: "2",
              name: "Pinot Noir",
              description: "Oregon 2022 - Elegant, earthy notes",
              price: "$16/glass"
            },
            {
              id: "3",
              name: "Malbec",
              description: "Argentina 2021 - Smooth, dark fruit",
              price: "$14/glass"
            }
          ]
        },
        {
          id: "white-wine",
          name: "White Wines",
          description: "Crisp and refreshing",
          items: [
            {
              id: "4",
              name: "Chardonnay",
              description: "California 2022 - Oaked, buttery",
              price: "$15/glass",
              popular: true
            },
            {
              id: "5",
              name: "Sauvignon Blanc",
              description: "New Zealand 2022 - Bright, citrusy",
              price: "$14/glass"
            },
            {
              id: "6",
              name: "Pinot Grigio",
              description: "Italy 2021 - Light, crisp",
              price: "$13/glass"
            }
          ]
        },
        {
          id: "small-plates",
          name: "Small Plates",
          description: "Perfect pairings",
          items: [
            {
              id: "7",
              name: "Charcuterie Board",
              description: "Selection of cured meats & cheeses",
              price: "$24.00",
              popular: true
            },
            {
              id: "8",
              name: "Bruschetta Trio",
              description: "Three varieties of toasted bread",
              price: "$16.00"
            },
            {
              id: "9",
              name: "Olives & Marinated Vegetables",
              description: "Mediterranean selection",
              price: "$12.00"
            }
          ]
        }
      ]
    }
  },
  {
    id: "pizzeria-classic",
    name: "Classic Pizzeria",
    category: "pizza",
    description: "Traditional Italian pizzeria template with authentic charm",
    preview: "/templates/pizzeria-classic.jpg",
    features: ["Authentic Italian style", "Traditional layout", "Inviting atmosphere"],
    color: "from-red-500 to-orange-600",
    menuData: {
      restaurant: {
        name: "Da Mario Pizzeria",
        description: "Authentic Neapolitan pizza since 1985",
        primaryColor: "#DC2626",
        secondaryColor: "#EA580C",
        fontFamily: "Merriweather"
      },
      categories: [
        {
          id: "classic-pizza",
          name: "Pizze Classiche",
          description: "Traditional favorites",
          items: [
            {
              id: "1",
              name: "Margherita",
              description: "Tomato, mozzarella, fresh basil",
              price: "$14.00",
              popular: true
            },
            {
              id: "2",
              name: "Marinara",
              description: "Tomato, garlic, oregano, olive oil",
              price: "$12.00"
            },
            {
              id: "3",
              name: "Quattro Stagioni",
              description: "Ham, mushrooms, artichokes, olives",
              price: "$18.00"
            }
          ]
        },
        {
          id: "specialty-pizza",
          name: "Pizze Speciali",
          description: "House specialties",
          items: [
            {
              id: "4",
              name: "Diavola",
              description: "Spicy salami, mozzarella, chili",
              price: "$17.00",
              popular: true
            },
            {
              id: "5",
              name: "Prosciutto e Funghi",
              description: "Ham, mushrooms, mozzarella",
              price: "$19.00"
            },
            {
              id: "6",
              name: "Tartufo",
              description: "Truffle cream, mushrooms, mozzarella",
              price: "$22.00"
            }
          ]
        },
        {
          id: "sides",
          name: "Contorni",
          description: "Side dishes",
          items: [
            {
              id: "7",
              name: "Insalata Caprese",
              description: "Fresh mozzarella, tomatoes, basil",
              price: "$10.00",
              popular: true
            },
            {
              id: "8",
              name: "Bruschetta",
              description: "Toasted bread, tomatoes, garlic",
              price: "$8.00"
            },
            {
              id: "9",
              name: "Garlic Bread",
              description: "Toasted bread with garlic butter",
              price: "$6.00"
            }
          ]
        }
      ]
    }
  },
  {
    id: "seafood-fresh",
    name: "Fresh Seafood",
    category: "seafood",
    description: "Ocean-inspired design for seafood restaurants and coastal dining",
    preview: "/templates/seafood-fresh.jpg",
    features: ["Fresh ocean colors", "Oceanic feel", "Premium quality focus"],
    color: "from-cyan-500 to-blue-600",
    menuData: {
      restaurant: {
        name: "Ocean's Bounty",
        description: "Fresh seafood & coastal cuisine",
        primaryColor: "#0891B2",
        secondaryColor: "#0E7490",
        fontFamily: "Lora"
      },
      categories: [
        {
          id: "starters",
          name: "Appetizers",
          description: "Fresh from the sea",
          items: [
            {
              id: "1",
              name: "Oysters on the Half Shell",
              description: "Fresh daily with mignonette sauce",
              price: "$18/dozen",
              popular: true
            },
            {
              id: "2",
              name: "Shrimp Cocktail",
              description: "Jumbo shrimp with cocktail sauce",
              price: "$16.00"
            },
            {
              id: "3",
              name: "Crab Cakes",
              description: "Lump crab with remoulade",
              price: "$14.00"
            }
          ]
        },
        {
          id: "soups-salads",
          name: "Soups & Salads",
          description: "Light and fresh",
          items: [
            {
              id: "4",
              name: "New England Clam Chowder",
              description: "Creamy, hearty, traditional",
              price: "$8.00",
              popular: true
            },
            {
              id: "5",
              name: "Seafood Salad",
              description: "Mixed seafood over mixed greens",
              price: "$16.00"
            },
            {
              id: "6",
              name: "Lobster Bisque",
              description: "Rich and velvety",
              price: "$10.00"
            }
          ]
        },
        {
          id: "mains",
          name: "Main Courses",
          description: "Fresh catches",
          items: [
            {
              id: "7",
              name: "Grilled Salmon",
              description: "Atlantic salmon with lemon butter",
              price: "$28.00",
              popular: true
            },
            {
              id: "8",
              name: "Lobster Tail",
              description: "Steamed with drawn butter",
              price: "$36.00"
            },
            {
              id: "9",
              name: "Seafood Paella",
              description: "Spanish rice with mixed seafood",
              price: "$32.00"
            }
          ]
        }
      ]
    }
  },
  {
    id: "gourmet-kitchen",
    name: "Gourmet Kitchen",
    category: "fine-dining",
    description: "Luxurious template for high-end restaurants and gourmet dining",
    preview: "/templates/gourmet-kitchen.jpg",
    features: ["Premium design", "Exquisite details", "Memorable experience"],
    color: "from-emerald-500 to-green-600",
    menuData: {
      restaurant: {
        name: "Le Gourmet",
        description: "Contemporary fine dining & culinary artistry",
        primaryColor: "#059669",
        secondaryColor: "#047857",
        fontFamily: "Cormorant"
      },
      categories: [
        {
          id: "tasting-menu",
          name: "Tasting Menu",
          description: "Chef's selection - 7 courses",
          items: [
            {
              id: "1",
              name: "Tasting Menu",
              description: "Seven-course journey with wine pairing",
              price: "$185/person",
              popular: true
            }
          ]
        },
        {
          id: "appetizers",
          name: "Hors d'oeuvres",
          description: "Elegant beginnings",
          items: [
            {
              id: "2",
              name: "Foie Gras Torchon",
              description: "Seared foie gras with brioche",
              price: "$28.00",
              popular: true
            },
            {
              id: "3",
              name: "Osetra Caviar",
              description: "Russian caviar with traditional accompaniments",
              price: "$95.00"
            },
            {
              id: "4",
              name: "Lobster Consommé",
              description: "Clarified broth with lobster dumplings",
              price: "$24.00"
            }
          ]
        },
        {
          id: "mains",
          name: "Plats Principaux",
          description: "Main courses",
          items: [
            {
              id: "5",
              name: "Wagyu Beef Tenderloin",
              description: "A5 Japanese wagyu with truffle sauce",
              price: "$125.00",
              popular: true
            },
            {
              id: "6",
              name: "Dover Sole Meunière",
              description: "Pan-fried with lemon butter",
              price: "$68.00"
            },
            {
              id: "7",
              name: "Rack of Lamb",
              description: "Herb-crusted with mint jus",
              price: "$58.00"
            }
          ]
        }
      ]
    }
  },
  {
    id: "minimalist-modern",
    name: "Minimalist Modern",
    category: "modern",
    description: "Clean and contemporary design for modern food businesses",
    preview: "/templates/minimalist-modern.jpg",
    features: ["Clean lines", "Simple elegance", "Effective presentation"],
    color: "from-gray-500 to-slate-600",
    menuData: {
      restaurant: {
        name: "The Modern Kitchen",
        description: "Contemporary cuisine with global influences",
        primaryColor: "#6B7280",
        secondaryColor: "#475569",
        fontFamily: "Poppins"
      },
      categories: [
        {
          id: "small-plates",
          name: "Small Plates",
          description: "Shareable dishes",
          items: [
            {
              id: "1",
              name: "Beef Tartare",
              description: "Wagyu beef, quail egg, capers",
              price: "$18.00",
              popular: true
            },
            {
              id: "2",
              name: "Scallop Crudo",
              description: "Hokkaido scallops, citrus, herbs",
              price: "$16.00"
            },
            {
              id: "3",
              name: "Mushroom Toast",
              description: "Wild mushrooms, truffle, sourdough",
              price: "$14.00"
            }
          ]
        },
        {
          id: "mains",
          name: "Main Courses",
          description: "Contemporary dishes",
          items: [
            {
              id: "4",
              name: "Duck Confit",
              description: "Crispy duck leg, parsnip purée",
              price: "$32.00",
              popular: true
            },
            {
              id: "5",
              name: "Black Cod",
              description: "Miso-glazed, seasonal vegetables",
              price: "$36.00"
            },
            {
              id: "6",
              name: "Ribeye Steak",
              description: "Grass-fed, bone marrow butter",
              price: "$48.00"
            }
          ]
        },
        {
          id: "desserts",
          name: "Desserts",
          description: "Sweet endings",
          items: [
            {
              id: "7",
              name: "Deconstructed Cheesecake",
              description: "Cream cheese foam, graham crumble",
              price: "$12.00",
              popular: true
            },
            {
              id: "8",
              name: "Chocolate Sphere",
              description: "Dark chocolate, salted caramel",
              price: "$14.00"
            },
            {
              id: "9",
              name: "Seasonal Fruit Tart",
              description: "Fresh fruits, pastry cream",
              price: "$10.00"
            }
          ]
        }
      ]
    }
  }
];

export function getTemplateById(id: string): TemplateData | undefined {
  return templates.find(template => template.id === id);
}
