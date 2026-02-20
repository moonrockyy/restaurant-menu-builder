import React from 'react';
import { Template } from '../app/types/menu';

interface ProfessionalMenuPreviewProps {
  template: Template;
  menuData: any;
}

export function ProfessionalMenuPreview({ template, menuData }: ProfessionalMenuPreviewProps) {
  const renderItalianMenu = () => (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-800 to-red-900 text-white p-8 text-center">
          <h1 className="text-4xl font-serif mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            {menuData.businessName || "Bella Vista Trattoria"}
          </h1>
          <p className="text-lg italic opacity-90">
            {menuData.businessDescription || "Authentic Italian Cuisine Since 1985"}
          </p>
          <div className="mt-4 flex justify-center space-x-8 text-sm">
            <span>📞 (555) 123-4567</span>
            <span>📍 123 Main Street</span>
            <span>🕐 Open Daily 11AM-10PM</span>
          </div>
        </div>

        {/* Menu Content */}
        <div className="p-8">
          {/* Antipasti */}
          <div className="mb-12">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-serif text-red-800 mb-2">Antipasti</h2>
              <div className="w-24 h-1 bg-red-800 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-serif text-xl text-gray-800 mb-2">Bruschetta Classica</h3>
                <p className="text-gray-600 mb-2">Toasted bread with fresh tomatoes, basil, garlic, and extra virgin olive oil</p>
                <div className="flex justify-between items-center">
                  <span className="text-red-600 font-semibold">14.00</span>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Vegetarian</span>
                </div>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-serif text-xl text-gray-800 mb-2">Carpaccio di Manzo</h3>
                <p className="text-gray-600 mb-2">Thinly sliced raw beef with arugula, parmesan, and lemon dressing</p>
                <div className="flex justify-between items-center">
                  <span className="text-red-600 font-semibold">18.00</span>
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Chef's Special</span>
                </div>
              </div>
            </div>
          </div>

          {/* Primi Piatti */}
          <div className="mb-12">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-serif text-red-800 mb-2">Primi Piatti</h2>
              <div className="w-24 h-1 bg-red-800 mx-auto"></div>
            </div>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-serif text-xl text-gray-800 mb-2">Tagliatelle al Ragù</h3>
                <p className="text-gray-600 mb-2">Fresh egg pasta with traditional bolognese sauce, slow-cooked for 6 hours</p>
                <div className="flex justify-between items-center">
                  <span className="text-red-600 font-semibold">24.00</span>
                  <div className="flex space-x-2">
                    <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">🌶️ Spicy</span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">🍷 Wine Pairing Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desserts */}
          <div className="mb-12">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-serif text-red-800 mb-2">Dolci</h2>
              <div className="w-24 h-1 bg-red-800 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="font-serif text-xl text-gray-800 mb-2">Tiramisù</h3>
                <p className="text-gray-600 mb-2">Classic Italian dessert with coffee-soaked ladyfingers and mascarpone</p>
                <span className="text-red-600 font-semibold">8.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderModernCafeMenu = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                {menuData.businessName || "Artisan Coffee House"}
              </h1>
              <p className="opacity-90">{menuData.businessDescription || "Specialty Coffee & Artisanal Bites"}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">☕</div>
              <div className="text-sm">Est. 2019</div>
            </div>
          </div>
        </div>

        {/* Menu Categories */}
        <div className="p-6">
          {/* Coffee Section */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl">☕</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Coffee & Espresso</h2>
                <p className="text-gray-600">Handcrafted beverages</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "Cappuccino", desc: "Espresso with steamed milk foam", price: "4.50", popular: true },
                { name: "Latte", desc: "Smooth espresso with steamed milk", price: "5.00" },
                { name: "Cold Brew", desc: "24-hour steeped, served over ice", price: "4.00" },
                { name: "Americano", desc: "Espresso with hot water", price: "3.50" },
                { name: "Macchiato", desc: "Espresso marked with foam", price: "4.25" },
                { name: "Mocha", desc: "Espresso with chocolate and steamed milk", price: "5.50" }
              ].map((item, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                  {item.popular && (
                    <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full inline-block mb-2">
                      ⭐ Popular
                    </div>
                  )}
                  <h3 className="font-semibold text-lg text-gray-800 mb-1">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{item.desc}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-amber-600 font-bold text-lg">${item.price}</span>
                    <div className="flex space-x-1">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">🌱</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pastries Section */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl">🥐</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Pastries & Baked Goods</h2>
                <p className="text-gray-600">Fresh daily</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Croissant", desc: "Buttery, flaky French pastry", price: "3.50", popular: true },
                { name: "Blueberry Muffin", desc: "Fresh baked with real blueberries", price: "4.00" },
                { name: "Chocolate Chip Cookie", desc: "Warm, gooey, homemade", price: "2.50" },
                { name: "Cinnamon Roll", desc: "Swirled with cream cheese frosting", price: "4.50" }
              ].map((item, idx) => (
                <div key={idx} className="text-center bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  {item.popular && (
                    <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full inline-block mb-2">
                      ⭐ Popular
                    </div>
                  )}
                  <div className="text-3xl mb-2">🥐</div>
                  <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
                  <p className="text-gray-600 text-xs mb-2">{item.desc}</p>
                  <span className="text-amber-600 font-bold">${item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderElegantFineDining = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto bg-gradient-to-b from-white to-gray-50 rounded-lg shadow-2xl">
        {/* Elegant Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-repeat" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20 L40 20 L20 40 L0 20 Z'/%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>
          <div className="relative z-10">
            <h1 className="text-4xl font-light tracking-wider mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              {menuData.businessName || "Le Gourmet"}
            </h1>
            <p className="text-lg italic opacity-80 tracking-wide">
              {menuData.businessDescription || "Contemporary Fine Dining & Culinary Artistry"}
            </p>
            <div className="mt-6 flex justify-center space-x-12 text-sm tracking-wide">
              <span>✦ Reservations Recommended</span>
              <span>✦ Jacket Required</span>
              <span>✦ Tasting Menu Available</span>
            </div>
          </div>
        </div>

        {/* Tasting Menu */}
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-light tracking-wide text-slate-800 mb-3">Tasting Menu</h2>
            <p className="text-gray-600 italic mb-4">Seven-course journey with wine pairing</p>
            <div className="inline-block">
              <span className="text-3xl font-light text-slate-800">$185</span>
              <span className="text-gray-600 ml-2">per person</span>
            </div>
          </div>

          {/* Course Progress */}
          <div className="space-y-8">
            {[
              { course: "First", name: "Amuse-Bouche", desc: "Oyster with champagne mignonette", wine: "Dom Pérignon 2012" },
              { course: "Second", name: "Foie Gras Torchon", desc: "Seared foie gras with brioche and fig jam", wine: "Sauternes 2018" },
              { course: "Third", name: "Lobster Consommé", desc: "Clarified broth with lobster dumplings", wine: "Chablis Grand Cru 2019" },
              { course: "Fourth", name: "Wagyu Beef Tenderloin", desc: "A5 Japanese wagyu with truffle sauce", wine: "Bordeaux 2015" },
              { course: "Fifth", name: "Dover Sole Meunière", desc: "Pan-fried with lemon butter", wine: "Muscadet 2020" },
              { course: "Sixth", name: "Cheese Course", desc: "Artisanal selection with accompaniments", wine: "Port 2017" },
              { course: "Seventh", name: "Dessert Degustation", desc: "Chocolate sphere with salted caramel", wine: "Sauternes 2018" }
            ].map((item, idx) => (
              <div key={idx} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="text-sm font-light text-gray-500 mr-3">{item.course}</span>
                      <h3 className="text-xl font-light text-slate-800">{item.name}</h3>
                    </div>
                    <p className="text-gray-600 mb-2 leading-relaxed">{item.desc}</p>
                    <div className="flex items-center text-sm">
                      <span className="text-gray-500 mr-2">Wine Pairing:</span>
                      <span className="text-slate-700 italic">{item.wine}</span>
                    </div>
                  </div>
                  <div className="ml-8 text-right">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mb-2"></div>
                    <div className="text-xs text-gray-500">Course {idx + 1}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderMexicanTaqueria = () => (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Colorful Header */}
        <div className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white p-6 relative">
          <div className="absolute inset-0 opacity-20">
            <div className="h-full w-full bg-repeat" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M30 10 L35 20 L40 10 L45 20 L50 10 L55 20 L60 10 L60 60 L50 60 L45 50 L40 60 L35 50 L30 60 L20 60 L15 50 L10 60 L0 60 L0 10 L5 20 L10 10 L15 20 L20 10 Z'/%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>
          <div className="relative z-10 text-center">
            <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              {menuData.businessName || "Taquería El Sol"}
            </h1>
            <p className="text-xl opacity-90">
              {menuData.businessDescription || "Auténtica Comida Mexicana"}
            </p>
            <div className="mt-3 flex justify-center space-x-6 text-sm">
              <span>🌮 Tacos • 🌯 Burritos • 🥗 Bowls</span>
              <span>🌶️ Salsa Bar • 🍻 Cerveza Fría</span>
            </div>
          </div>
        </div>

        {/* Menu Content */}
        <div className="p-6">
          {/* Tacos Section */}
          <div className="mb-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-red-600 mb-2">🌮 Tacos</h2>
              <div className="w-32 h-1 bg-gradient-to-r from-red-600 to-orange-500 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "Carne Asada", desc: "Grilled steak, onions, cilantro, salsa verde", price: "3.50", spicy: true, popular: true },
                { name: "Al Pastor", desc: "Marinated pork, pineapple, onions, cilantro", price: "3.00", spicy: false },
                { name: "Carnitas", desc: "Slow-cooked pork, pico de gallo, guacamole", price: "3.25", spicy: false },
                { name: "Pollo Asado", desc: "Grilled chicken, peppers, onions, sour cream", price: "2.75", spicy: false },
                { name: "Barbacoa", desc: "Slow-cooked beef, cilantro, onions, consommé", price: "3.75", spicy: true },
                { name: "Pescado", desc: "Grilled fish, cabbage slaw, chipotle mayo", price: "4.00", spicy: true }
              ].map((item, idx) => (
                <div key={idx} className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-4 border-2 border-red-200 hover:shadow-lg transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                    <div className="flex space-x-1">
                      {item.spicy && <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">🌶️</span>}
                      {item.popular && <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded">⭐</span>}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{item.desc}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-red-600">${item.price}</span>
                    <span className="text-xs text-gray-500">each</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sides and Drinks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-2xl font-bold text-orange-600 mb-4">🥗 Sides & Extras</h2>
              <div className="space-y-3">
                {[
                  { name: "Mexican Rice", price: "2.00" },
                  { name: "Refried Beans", price: "2.00" },
                  { name: "Guacamole", price: "3.00" },
                  { name: "Chips & Salsa", price: "2.50" },
                  { name: "Elote (Mexican Corn)", price: "3.50" }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-yellow-50 rounded p-3">
                    <span className="font-medium">{item.name}</span>
                    <span className="font-bold text-orange-600">${item.price}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-yellow-600 mb-4">🍻 Beverages</h2>
              <div className="space-y-3">
                {[
                  { name: "Jarritos (Various)", price: "2.50" },
                  { name: "Mexican Coke", price: "2.00" },
                  { name: "Horchata", price: "3.00" },
                  { name: "Jamaica", price: "3.00" },
                  { name: "Tamarindo", price: "3.00" },
                  { name: "Corona Extra", price: "4.00" },
                  { name: "Modelo Especial", price: "4.50" }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-red-50 rounded p-3">
                    <span className="font-medium">{item.name}</span>
                    <span className="font-bold text-red-600">${item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render different menu styles based on template
  if (template.id === 'elegant-restaurant' || template.id?.includes('elegant')) {
    return renderItalianMenu();
  } else if (template.id === 'modern-cafe' || template.id?.includes('cafe')) {
    return renderModernCafeMenu();
  } else if (template.id === 'gourmet-kitchen' || template.id?.includes('gourmet')) {
    return renderElegantFineDining();
  } else if (template.id === 'pizzeria-classic' || template.id?.includes('pizzeria')) {
    return renderMexicanTaqueria(); // Using Mexican as example of vibrant menu
  } else {
    return renderModernCafeMenu(); // Default
  }
}
