import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../app/components/ui/card';
import { Badge } from '../app/components/ui/badge';
import { Button } from '../app/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';
import { TemplateData } from '../data/templates';

interface TemplateCardProps {
  template: TemplateData;
  onSelect: (templateId: string) => void;
}

export function TemplateCard({ template, onSelect }: TemplateCardProps) {
  const { t } = useTranslation();
  const renderTemplatePreview = () => {
    switch (template.id) {
      case 'modern-cafe':
        return (
          <div className="relative h-48 bg-gradient-to-br from-amber-50 to-orange-50 overflow-hidden">
            <div className="absolute inset-0 p-4">
              <div className="bg-white rounded-lg shadow-sm p-3 mb-2">
                <div className="text-lg font-bold text-gray-800" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Artisan Coffee House
                </div>
                <div className="text-xs text-gray-600">Specialty Coffee & Artisanal Bites</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-amber-100 rounded p-2">
                  <div className="text-xs font-semibold text-amber-800">Cappuccino</div>
                  <div className="text-xs text-amber-600">$4.50</div>
                </div>
                <div className="bg-orange-100 rounded p-2">
                  <div className="text-xs font-semibold text-orange-800">Croissant</div>
                  <div className="text-xs text-orange-600">$3.50</div>
                </div>
              </div>
              <div className="absolute bottom-2 left-2 right-2">
                <div className="flex space-x-1">
                  <div className="h-1 bg-amber-500 rounded-full flex-1"></div>
                  <div className="h-1 bg-orange-500 rounded-full flex-1"></div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'elegant-restaurant':
        return (
          <div className="relative h-48 bg-gradient-to-br from-red-900 to-red-800 overflow-hidden">
            <div className="absolute inset-0 p-4">
              <div className="text-center text-white mb-3">
                <div className="text-xl font-serif" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Bella Vista
                </div>
                <div className="text-xs opacity-80">Fine Italian Dining</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded p-2 mb-2">
                <div className="text-white text-xs font-serif mb-1">Antipasti</div>
                <div className="text-white/80 text-xs">Bruschetta Classica</div>
                <div className="text-white/80 text-xs">Carpaccio di Manzo</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded p-2">
                <div className="text-white text-xs font-serif mb-1">Primi Piatti</div>
                <div className="text-white/80 text-xs">Tagliatelle al Ragù</div>
              </div>
              <div className="absolute bottom-2 left-2 right-2">
                <div className="flex justify-center space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                  <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'gourmet-kitchen':
        return (
          <div className="relative h-48 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
            <div className="absolute inset-0 p-4">
              <div className="text-center text-white mb-3">
                <div className="text-xl font-light tracking-wider" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  Le Gourmet
                </div>
                <div className="text-xs opacity-70 tracking-wide">Contemporary Fine Dining</div>
              </div>
              <div className="space-y-2">
                <div className="border-l-2 border-amber-500 pl-2">
                  <div className="text-white text-xs font-light">Tasting Menu</div>
                  <div className="text-amber-500 text-xs font-light">Seven Courses</div>
                </div>
                <div className="border-l border-white/30 pl-2">
                  <div className="text-white/80 text-xs font-light">Foie Gras Torchon</div>
                  <div className="text-white/60 text-xs font-light">Dom Pérignon 2012</div>
                </div>
                <div className="border-l border-white/30 pl-2">
                  <div className="text-white/80 text-xs font-light">Wagyu Beef Tenderloin</div>
                  <div className="text-white/60 text-xs font-light">Bordeaux 2015</div>
                </div>
              </div>
              <div className="absolute bottom-2 left-2 right-2 text-center">
                <div className="text-amber-500 text-xs font-light tracking-widest">$185 PER PERSON</div>
              </div>
            </div>
          </div>
        );
      
      case 'bakery-boutique':
        return (
          <div className="relative h-48 bg-gradient-to-br from-pink-50 to-rose-50 overflow-hidden">
            <div className="absolute inset-0 p-4">
              <div className="text-center mb-3">
                <div className="text-xl font-bold text-pink-800" style={{ fontFamily: 'Dancing Script, cursive' }}>
                  Sweet Dreams Bakery
                </div>
                <div className="text-xs text-pink-600">Handcrafted Desserts</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white rounded-lg shadow-sm p-2 text-center">
                  <div className="text-2xl mb-1">🧁</div>
                  <div className="text-xs font-semibold text-gray-800">Cupcakes</div>
                  <div className="text-xs text-pink-600">$3.00</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-2 text-center">
                  <div className="text-2xl mb-1">🥐</div>
                  <div className="text-xs font-semibold text-gray-800">Croissants</div>
                  <div className="text-xs text-pink-600">$4.50</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-2 text-center">
                  <div className="text-2xl mb-1">🍰</div>
                  <div className="text-xs font-semibold text-gray-800">Cakes</div>
                  <div className="text-xs text-pink-600">$8.50</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-2 text-center">
                  <div className="text-2xl mb-1">🍪</div>
                  <div className="text-xs font-semibold text-gray-800">Cookies</div>
                  <div className="text-xs text-pink-600">$2.50</div>
                </div>
              </div>
              <div className="absolute bottom-2 left-2 right-2">
                <div className="flex justify-center space-x-1">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'wine-bar':
        return (
          <div className="relative h-48 bg-gradient-to-br from-purple-900 to-violet-900 overflow-hidden">
            <div className="absolute inset-0 p-4">
              <div className="text-center text-white mb-3">
                <div className="text-xl font-serif" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  Vino Lounge
                </div>
                <div className="text-xs opacity-80">Curated Wine Selection</div>
              </div>
              <div className="space-y-2">
                <div className="bg-white/10 backdrop-blur rounded p-2">
                  <div className="text-white text-xs font-semibold mb-1">Red Wines</div>
                  <div className="flex justify-between text-xs">
                    <span className="text-white/80">Cabernet Sauvignon</span>
                    <span className="text-purple-300">$18</span>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded p-2">
                  <div className="text-white text-xs font-semibold mb-1">White Wines</div>
                  <div className="flex justify-between text-xs">
                    <span className="text-white/80">Chardonnay</span>
                    <span className="text-purple-300">$15</span>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded p-2">
                  <div className="text-white text-xs font-semibold mb-1">Small Plates</div>
                  <div className="flex justify-between text-xs">
                    <span className="text-white/80">Charcuterie Board</span>
                    <span className="text-purple-300">$24</span>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-2 left-2 right-2">
                <div className="text-center text-xs text-purple-300">🍷 Wine Bar & Lounge</div>
              </div>
            </div>
          </div>
        );
      
      case 'pizzeria-classic':
        return (
          <div className="relative h-48 bg-gradient-to-br from-red-600 to-orange-600 overflow-hidden">
            <div className="absolute inset-0 p-4">
              <div className="text-center text-white mb-3">
                <div className="text-2xl font-bold" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                  Da Mario Pizzeria
                </div>
                <div className="text-xs opacity-90">Authentic Neapolitan Pizza</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white/20 backdrop-blur rounded p-2">
                  <div className="text-white text-xs font-bold mb-1">🍕 Margherita</div>
                  <div className="text-white text-xs">Tomato, mozzarella, basil</div>
                  <div className="text-yellow-300 text-xs font-bold">$14</div>
                </div>
                <div className="bg-white/20 backdrop-blur rounded p-2">
                  <div className="text-white text-xs font-bold mb-1">🍕 Diavola</div>
                  <div className="text-white text-xs">Spicy salami, chili</div>
                  <div className="text-yellow-300 text-xs font-bold">$17</div>
                </div>
              </div>
              <div className="absolute bottom-2 left-2 right-2">
                <div className="flex justify-center space-x-2 text-white text-xs">
                  <span>🍕</span>
                  <span>🇮🇹</span>
                  <span>🔥</span>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'seafood-fresh':
        return (
          <div className="relative h-48 bg-gradient-to-br from-cyan-600 to-blue-700 overflow-hidden">
            <div className="absolute inset-0 p-4">
              <div className="text-center text-white mb-3">
                <div className="text-xl font-bold">Ocean's Bounty</div>
                <div className="text-xs opacity-90">Fresh Seafood & Coastal Cuisine</div>
              </div>
              <div className="space-y-2">
                <div className="bg-white/10 backdrop-blur rounded p-2">
                  <div className="text-white text-xs font-semibold mb-1">🦪 Oysters</div>
                  <div className="text-white/80 text-xs">Fresh daily with mignonette</div>
                  <div className="text-cyan-300 text-xs font-bold">$18/dozen</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded p-2">
                  <div className="text-white text-xs font-semibold mb-1">🦞 Lobster Tail</div>
                  <div className="text-white/80 text-xs">Steamed with drawn butter</div>
                  <div className="text-cyan-300 text-xs font-bold">$36</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded p-2">
                  <div className="text-white text-xs font-semibold mb-1">🐟 Grilled Salmon</div>
                  <div className="text-white/80 text-xs">Atlantic salmon with lemon butter</div>
                  <div className="text-cyan-300 text-xs font-bold">$28</div>
                </div>
              </div>
              <div className="absolute bottom-2 left-2 right-2">
                <div className="text-center text-xs text-cyan-200">🌊 Fresh From the Ocean</div>
              </div>
            </div>
          </div>
        );
      
      case 'minimalist-modern':
        return (
          <div className="relative h-48 bg-gradient-to-br from-gray-50 to-slate-100 overflow-hidden">
            <div className="absolute inset-0 p-4">
              <div className="text-center mb-3">
                <div className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  The Modern Kitchen
                </div>
                <div className="text-xs text-gray-600">Contemporary Cuisine</div>
              </div>
              <div className="space-y-3">
                <div className="border-b border-gray-300 pb-2">
                  <div className="text-gray-900 text-sm font-semibold">Beef Tartare</div>
                  <div className="text-gray-600 text-xs">Wagyu beef, quail egg, capers</div>
                  <div className="text-gray-900 text-sm font-bold">$18</div>
                </div>
                <div className="border-b border-gray-300 pb-2">
                  <div className="text-gray-900 text-sm font-semibold">Duck Confit</div>
                  <div className="text-gray-600 text-xs">Crispy duck leg, parsnip purée</div>
                  <div className="text-gray-900 text-sm font-bold">$32</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-gray-900 text-sm font-semibold">Black Cod</div>
                  <div className="text-gray-900 text-sm font-bold">$36</div>
                </div>
              </div>
              <div className="absolute bottom-2 left-2 right-2">
                <div className="h-px bg-gray-400"></div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl text-gray-400 mb-2">📋</div>
              <div className="text-gray-600 text-sm">Menu Template</div>
            </div>
          </div>
        );
    }
  };

  return (
    <Card 
      className="group cursor-pointer overflow-hidden border-2 hover:shadow-xl transition-all duration-300 hover:scale-105"
      onClick={() => onSelect(template.id)}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
      
      {/* Template Preview */}
      {renderTemplatePreview()}

      <CardHeader>
        <div className="flex items-start justify-between">
          <Badge variant="secondary" className="text-xs">
            {template.category}
          </Badge>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-3 h-3 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30'}`} 
              />
            ))}
          </div>
        </div>
        <CardTitle className="text-lg group-hover:text-orange-600 transition-colors">
          {template.name}
        </CardTitle>
        <CardDescription className="text-sm">
          {template.description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">
            <span className="font-medium">Features:</span>
            <ul className="mt-1 space-y-1">
              {template.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Button className="w-full mt-4 group-hover:shadow-lg transition-all duration-300 group-hover:bg-orange-600 group-hover:border-orange-600">
          {t('templates.useTemplate')}
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
      </CardContent>
    </Card>
  );
}
