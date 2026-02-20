import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../app/components/ui/card';
import { Badge } from '../app/components/ui/badge';
import { Button } from '../app/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';
import { ProfessionalTemplate } from '../data/professional-templates';

interface ProfessionalTemplateCardProps {
  template: ProfessionalTemplate;
  onSelect: (templateId: string) => void;
}

export function ProfessionalTemplateCard({ template, onSelect }: ProfessionalTemplateCardProps) {
  const { t } = useTranslation();
  const renderTemplatePreview = () => {
    switch (template.id) {
      case 'vintage-bistro':
        return (
          <div className="relative h-48 overflow-hidden" style={{ 
            background: `linear-gradient(135deg, #8B4513 0%, #D2691E 100%), ${template.backgroundPattern}`
          }}>
            <div className="absolute inset-0 p-4">
              {/* Ornate border decoration */}
              <div className="border-4 border-double border-amber-900/30 rounded-lg p-3 h-full bg-amber-50/90 backdrop-blur-sm">
                <div className="text-center mb-2">
                  <div className="text-lg font-serif text-amber-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Le Petit Bistro
                  </div>
                  <div className="text-xs text-amber-700 italic">Traditional French cuisine</div>
                </div>
                
                {/* Menu items preview */}
                <div className="space-y-1 text-xs">
                  <div className="border-b border-amber-900/20 pb-1">
                    <div className="font-serif text-amber-800">Boeuf Bourguignon</div>
                    <div className="text-amber-600">28.50</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="font-serif text-amber-800">Confit de Canard</div>
                    <div className="text-amber-600">26.00</div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-2 right-2">
                  <div className="text-amber-700 text-xs">⚜ 1924</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'japanese-izakaya':
        return (
          <div className="relative h-48 overflow-hidden" style={{ 
            background: `linear-gradient(135deg, #DC143C 0%, #FFB6C1 100%), ${template.backgroundPattern}`
          }}>
            <div className="absolute inset-0 p-4">
              {/* Cherry blossom decoration */}
              <div className="absolute top-0 left-0 w-full h-8 opacity-20">
                <div className="flex justify-center space-x-2">
                  <span className="text-2xl">🌸</span>
                  <span className="text-2xl">🌸</span>
                  <span className="text-2xl">🌸</span>
                </div>
              </div>
              
              <div className="bg-white/95 backdrop-blur rounded-lg p-3 h-full">
                <div className="text-center mb-2">
                  <div className="text-lg font-bold text-red-800" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>
                    桜居酒屋
                  </div>
                  <div className="text-xs text-red-600">Sakura Izakaya</div>
                </div>
                
                {/* Menu items preview */}
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between items-center border-b border-red-900/20 pb-1">
                    <div className="font-bold text-red-800">🍣 Maguro (Tuna)</div>
                    <div className="text-red-600 font-bold">18.00</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="font-bold text-red-800">🍤 Sake (Salmon)</div>
                    <div className="text-red-600">15.00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'mediterranean-taverna':
        return (
          <div className="relative h-48 overflow-hidden" style={{ 
            background: `linear-gradient(135deg, #1E40AF 0%, #06B6D4 100%), ${template.backgroundPattern}`
          }}>
            <div className="absolute inset-0 p-4">
              {/* Olive branch decoration */}
              <div className="absolute top-2 right-2 text-green-700 opacity-30">
                <span className="text-xl">🌿</span>
              </div>
              
              <div className="bg-white/95 backdrop-blur rounded-lg p-3 h-full">
                <div className="text-center mb-2">
                  <div className="text-lg font-bold text-blue-900" style={{ fontFamily: 'Georgia, serif' }}>
                    Αιγαίο Ταβέρνα
                  </div>
                  <div className="text-xs text-blue-600">Aegean Taverna</div>
                </div>
                
                {/* Menu items preview */}
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between items-center border-b border-blue-900/20 pb-1">
                    <div className="font-bold text-blue-800">Tzatziki</div>
                    <div className="text-blue-600">8.00</div>
                    <span className="bg-green-100 text-green-800 text-xs px-1 rounded">🌱</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="font-bold text-blue-800">Moussaka</div>
                    <div className="text-blue-600">24.00</div>
                    <span className="bg-red-100 text-red-800 text-xs px-1 rounded">⭐</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'rustic-farmhouse':
        return (
          <div className="relative h-48 overflow-hidden" style={{ 
            background: `linear-gradient(135deg, #92400E 0%, #F59E0B 100%), ${template.backgroundPattern}`
          }}>
            <div className="absolute inset-0 p-4">
              {/* Wood grain texture overlay */}
              <div className="absolute inset-0 opacity-20">
                <div className="h-full w-full bg-repeat" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='wood' x='0' y='0' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Crect width='100' height='100' fill='%2392400E'/%3E%3Cpath d='M0 50 L100 50' stroke='%23783516' stroke-width='0.5' fill='none'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23wood)'/%3E%3C/svg%3E")`
                }}></div>
              </div>
              
              <div className="bg-amber-50/90 backdrop-blur rounded-lg p-3 h-full relative z-10">
                <div className="text-center mb-2">
                  <div className="text-lg font-bold text-amber-900" style={{ fontFamily: 'Merriweather, serif' }}>
                    The Farmhouse Table
                  </div>
                  <div className="text-xs text-amber-700">Farm-to-table comfort food</div>
                </div>
                
                {/* Menu items preview */}
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between items-center border-b border-amber-900/20 pb-1">
                    <div className="font-bold text-amber-800">🥗 Farmhouse Salad</div>
                    <div className="text-amber-600">12.00</div>
                    <span className="bg-green-100 text-green-800 text-xs px-1 rounded">🌱</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="font-bold text-amber-800">🍗 Fried Chicken</div>
                    <div className="text-amber-600">22.00</div>
                    <span className="bg-red-100 text-red-800 text-xs px-1 rounded">⭐</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'art-deco-speakeasy':
        return (
          <div className="relative h-48 overflow-hidden" style={{ 
            background: `linear-gradient(135deg, #111827 0%, #D97706 100%), ${template.backgroundPattern}`
          }}>
            <div className="absolute inset-0 p-4">
              {/* Art deco geometric pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="h-full w-full bg-repeat" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D97706' fill-opacity='0.3'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z'/%3E%3Ccircle cx='30' cy='30' r='5' fill='%23D97706'/%3E%3C/g%3E%3C/svg%3E")`
                }}></div>
              </div>
              
              <div className="bg-gray-900/95 backdrop-blur rounded-lg p-3 h-full relative z-10">
                <div className="text-center mb-2">
                  <div className="text-lg font-bold text-amber-400" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                    THE GOLDEN KEY
                  </div>
                  <div className="text-xs text-amber-300">Speakeasy Cocktails</div>
                </div>
                
                {/* Menu items preview */}
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between items-center border-b border-amber-700/30 pb-1">
                    <div className="font-bold text-amber-200">🍸 Bee's Knees</div>
                    <div className="text-amber-400">16.00</div>
                    <span className="bg-amber-700 text-amber-200 text-xs px-1 rounded">⭐</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="font-bold text-amber-200">🍸 Sidecar</div>
                    <div className="text-amber-400">18.00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'nordic-minimal':
        return (
          <div className="relative h-48 overflow-hidden" style={{ 
            background: `linear-gradient(135deg, #F9FAFB 0%, #E2E8F0 100%), ${template.backgroundPattern}`
          }}>
            <div className="absolute inset-0 p-4">
              {/* Birch wood pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="h-full w-full bg-repeat" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%239CA3AF' stroke-width='0.5' fill='none'%3E%3Cline x1='0' y1='20' x2='80' y2='20'/%3E%3Cline x1='0' y1='40' x2='80' y2='40'/%3E%3Cline x1='0' y1='60' x2='80' y2='60'/%3E%3C/g%3E%3C/svg%3E")`
                }}></div>
              </div>
              
              <div className="bg-white/95 backdrop-blur rounded-lg p-3 h-full relative z-10">
                <div className="text-center mb-2">
                  <div className="text-lg font-light text-gray-800" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Nordic Kitchen
                  </div>
                  <div className="text-xs text-gray-600">Modern Scandinavian cuisine</div>
                </div>
                
                {/* Menu items preview */}
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between items-center border-b border-gray-300 pb-1">
                    <div className="font-medium text-gray-800">Røget Rødbeter</div>
                    <div className="text-gray-600">14.00</div>
                    <span className="bg-green-100 text-green-800 text-xs px-1 rounded">🌱</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="font-medium text-gray-800">Frikadeller</div>
                    <div className="text-gray-600">24.00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'tropical-beach-bar':
        return (
          <div className="relative h-48 overflow-hidden" style={{ 
            background: `linear-gradient(135deg, #10B981 0%, #14B8A6 100%), ${template.backgroundPattern}`
          }}>
            <div className="absolute inset-0 p-4">
              {/* Palm leaf decoration */}
              <div className="absolute top-0 left-0 w-full h-8 opacity-20">
                <div className="flex justify-center space-x-3">
                  <span className="text-2xl">🌴</span>
                  <span className="text-2xl">🌴</span>
                  <span className="text-2xl">🌴</span>
                </div>
              </div>
              
              <div className="bg-white/95 backdrop-blur rounded-lg p-3 h-full">
                <div className="text-center mb-2">
                  <div className="text-lg font-bold text-teal-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Paradise Beach Bar
                  </div>
                  <div className="text-xs text-teal-600">Tropical cocktails & vibes</div>
                </div>
                
                {/* Menu items preview */}
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between items-center border-b border-teal-700/20 pb-1">
                    <div className="font-bold text-teal-800">🍹 Mai Tai</div>
                    <div className="text-teal-600">15.00</div>
                    <span className="bg-red-100 text-red-800 text-xs px-1 rounded">⭐</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="font-bold text-teal-800">🌶️ Jerk Chicken</div>
                    <div className="text-teal-600">18.00</div>
                    <span className="bg-orange-100 text-orange-800 text-xs px-1 rounded">🌶️</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'industrial-brewery':
        return (
          <div className="relative h-48 overflow-hidden" style={{ 
            background: `linear-gradient(135deg, #EA580C 0%, #92400E 100%), ${template.backgroundPattern}`
          }}>
            <div className="absolute inset-0 p-4">
              {/* Copper pipe decoration */}
              <div className="absolute top-2 left-2 text-amber-600 opacity-30">
                <span className="text-xl">⚗</span>
              </div>
              
              <div className="bg-gray-900/95 backdrop-blur rounded-lg p-3 h-full">
                <div className="text-center mb-2">
                  <div className="text-lg font-bold text-amber-400" style={{ fontFamily: 'Roboto Condensed, sans-serif' }}>
                    COPPER TANK BREWERY
                  </div>
                  <div className="text-xs text-amber-300">Craft beer & gastropub</div>
                </div>
                
                {/* Menu items preview */}
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between items-center border-b border-amber-700/30 pb-1">
                    <div className="font-bold text-amber-200">IPA Hop Bomb</div>
                    <div className="text-amber-400">8.00</div>
                    <span className="bg-amber-700 text-amber-200 text-xs px-1 rounded">⭐</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="font-bold text-amber-200">Stout Engine</div>
                    <div className="text-amber-400">9.00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'moroccan-riad':
        return (
          <div className="relative h-48 overflow-hidden" style={{ 
            background: `linear-gradient(135deg, #7C3AED 0%, #EC4899 100%), ${template.backgroundPattern}`
          }}>
            <div className="absolute inset-0 p-4">
              {/* Moroccan geometric pattern */}
              <div className="absolute inset-0 opacity-15">
                <div className="h-full w-full bg-repeat" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23EC4899' fill-opacity='0.3'%3E%3Cpath d='M20 0 L40 20 L20 40 L0 20 Z'/%3E%3Cpath d='M0 0 L20 20 L0 40 L40 20 Z'/%3E%3C/g%3E%3C/svg%3E")`
                }}></div>
              </div>
              
              <div className="bg-purple-50/95 backdrop-blur rounded-lg p-3 h-full relative z-10">
                <div className="text-center mb-2">
                  <div className="text-lg font-serif text-purple-900" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    Riad Al-Mounia
                  </div>
                  <div className="text-xs text-purple-600">Authentic Moroccan cuisine</div>
                </div>
                
                {/* Menu items preview */}
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between items-center border-b border-purple-900/20 pb-1">
                    <div className="font-serif text-purple-800">Lamb Tagine</div>
                    <div className="text-purple-600">26.00</div>
                    <span className="bg-red-100 text-red-800 text-xs px-1 rounded">⭐</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="font-serif text-purple-800">Hummus</div>
                    <div className="text-purple-600">14.00</div>
                    <span className="bg-green-100 text-green-800 text-xs px-1 rounded">🌱</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'victorian-tea-room':
        return (
          <div className="relative h-48 overflow-hidden" style={{ 
            background: `linear-gradient(135deg, #FCE7F3 0%, #E0E7FF 100%), ${template.backgroundPattern}`
          }}>
            <div className="absolute inset-0 p-4">
              {/* Lace pattern overlay */}
              <div className="absolute inset-0 opacity-20">
                <div className="h-full w-full bg-repeat" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23BE185D' stroke-width='0.5' fill='none'%3E%3Ccircle cx='15' cy='15' r='8'/%3E%3Ccircle cx='15' cy='15' r='12'/%3E%3C/g%3E%3C/svg%3E")`
                }}></div>
              </div>
              
              <div className="bg-pink-50/95 backdrop-blur rounded-lg p-3 h-full relative z-10">
                <div className="text-center mb-2">
                  <div className="text-lg font-serif text-pink-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                    The Rose Garden
                  </div>
                  <div className="text-xs text-pink-600">Victorian tea room</div>
                </div>
                
                {/* Menu items preview */}
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between items-center border-b border-pink-900/20 pb-1">
                    <div className="font-serif text-pink-800">Royal Tea Service</div>
                    <div className="text-pink-600">28.00</div>
                    <span className="bg-pink-100 text-pink-800 text-xs px-1 rounded">⭐</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="font-serif text-pink-800">Victoria Sponge</div>
                    <div className="text-pink-600">8.00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'cyberpunk-future-diner':
        return (
          <div className="relative h-48 overflow-hidden" style={{ 
            background: `linear-gradient(135deg, #A855F7 0%, #EC4899 100%), ${template.backgroundPattern}`
          }}>
            <div className="absolute inset-0 p-4">
              {/* Neon glow effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent"></div>
              
              <div className="bg-gray-900/95 backdrop-blur rounded-lg p-3 h-full relative z-10">
                <div className="text-center mb-2">
                  <div className="text-lg font-bold text-purple-400" style={{ fontFamily: 'Orbitron, monospace' }}>
                    NEON DINER 2077
                  </div>
                  <div className="text-xs text-purple-300">Cyberpunk dining</div>
                </div>
                
                {/* Menu items preview */}
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between items-center border-b border-purple-700/30 pb-1">
                    <div className="font-bold text-purple-300">Neon Noodles</div>
                    <div className="text-purple-400">18.00</div>
                    <span className="bg-purple-700 text-purple-300 text-xs px-1 rounded">⭐</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="font-bold text-purple-300">Plasma Cola</div>
                    <div className="text-purple-400">6.00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'sushi-omakase':
        return (
          <div className="relative h-48 overflow-hidden" style={{ 
            background: `linear-gradient(135deg, #1F2937 0%, #374151 100%), ${template.backgroundPattern}`
          }}>
            <div className="absolute inset-0 p-4">
              {/* Bamboo texture */}
              <div className="absolute inset-0 opacity-15">
                <div className="h-full w-full bg-repeat" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%236B7280' stroke-width='1' fill='none'%3E%3Cline x1='0' y1='15' x2='60' y2='15'/%3E%3Cline x1='0' y1='30' x2='60' y2='30'/%3E%3Cline x1='0' y1='45' x2='60' y2='45'/%3E%3C/g%3E%3C/svg%3E")`
                }}></div>
              </div>
              
              <div className="bg-gray-100/95 backdrop-blur rounded-lg p-3 h-full relative z-10">
                <div className="text-center mb-2">
                  <div className="text-lg font-bold text-gray-900" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>
                    かいせき
                  </div>
                  <div className="text-xs text-gray-600">Kaiseki Omakase</div>
                </div>
                
                {/* Menu items preview */}
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between items-center border-b border-gray-900/20 pb-1">
                    <div className="font-bold text-gray-800">Nigiri Selection</div>
                    <div className="text-gray-600">28.00</div>
                    <span className="bg-red-100 text-red-800 text-xs px-1 rounded">⭐</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="font-bold text-gray-800">Sashimi Platter</div>
                    <div className="text-gray-600">32.00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'southern-comfort':
        return (
          <div className="relative h-48 overflow-hidden" style={{ 
            background: `linear-gradient(135deg, #1D4ED8 0%, #312E81 100%), ${template.backgroundPattern}`
          }}>
            <div className="absolute inset-0 p-4">
              {/* Gingham pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="h-full w-full bg-repeat" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='10' height='10' fill='%231D4ED8'/%3E%3Crect x='10' y='10' width='10' height='10' fill='%23312E81'/%3E%3C/svg%3E")`
                }}></div>
              </div>
              
              <div className="bg-blue-50/95 backdrop-blur rounded-lg p-3 h-full relative z-10">
                <div className="text-center mb-2">
                  <div className="text-lg font-bold text-blue-900" style={{ fontFamily: 'Merriweather, serif' }}>
                    Mama's Kitchen
                  </div>
                  <div className="text-xs text-blue-600">Southern comfort food</div>
                </div>
                
                {/* Menu items preview */}
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between items-center border-b border-blue-900/20 pb-1">
                    <div className="font-bold text-blue-800">Fried Green Tomatoes</div>
                    <div className="text-blue-600">9.00</div>
                    <span className="bg-red-100 text-red-800 text-xs px-1 rounded">⭐</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="font-bold text-blue-800">Chicken Fried Steak</div>
                    <div className="text-blue-600">22.00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl text-gray-400 mb-2">📋</div>
              <div className="text-gray-600 text-sm">Professional Template</div>
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
