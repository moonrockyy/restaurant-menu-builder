import { useState } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ArrowRight, Coffee, Utensils, Cake, Wine, Pizza, Salad, Fish, ChefHat, Star } from "lucide-react";
import { templates, getTemplateById } from "../../data/templates";
import { professionalTemplates, getProfessionalTemplateById } from "../../data/professional-templates";
import { TemplateCard } from "../../components/TemplateCard";
import { ProfessionalTemplateCard } from "../../components/ProfessionalTemplateCard";
import Pagination from "../components/Pagination";

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "cafe": return <Coffee className="w-6 h-6" />;
    case "restaurant": return <Utensils className="w-6 h-6" />;
    case "bakery": return <Cake className="w-6 h-6" />;
    case "bar": return <Wine className="w-6 h-6" />;
    case "pizza": return <Pizza className="w-6 h-6" />;
    case "seafood": return <Fish className="w-6 h-6" />;
    case "fine-dining": return <ChefHat className="w-6 h-6" />;
    case "modern": return <Star className="w-6 h-6" />;
    default: return <Utensils className="w-6 h-6" />;
  }
};

export default function TemplateSelector() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const categories = [
    { id: "all", name: t('templates.categories.all') },
    { id: "cafe", name: t('templates.categories.cafe') },
    { id: "restaurant", name: t('templates.categories.restaurant') },
    { id: "bakery", name: t('templates.categories.bakery') },
    { id: "bar", name: t('templates.categories.bar') },
    { id: "pizza", name: t('templates.categories.pizza') },
    { id: "seafood", name: t('templates.categories.seafood') },
    { id: "fine-dining", name: t('templates.categories.fineDining') },
    { id: "modern", name: t('templates.categories.modern') },
  ];

  const allTemplates = [...templates, ...professionalTemplates];
  
  const filteredTemplates = selectedCategory === "all" 
    ? allTemplates 
    : allTemplates.filter(template => template.category === selectedCategory);

  // Pagination calculations
  const totalPages = Math.ceil(filteredTemplates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTemplates = filteredTemplates.slice(startIndex, endIndex);

  // Reset to page 1 when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTemplate = (templateId: string) => {
    navigate(`/menu-builder?template=${templateId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('templates.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('templates.subtitle')}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap gap-2 p-1 bg-muted/50 rounded-lg">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "ghost"}
                onClick={() => handleCategoryChange(category.id)}
                className="text-sm"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentTemplates.map((template) => {
            // Check if it's a professional template
            const isProfessional = professionalTemplates.some(pt => pt.id === template.id);
            
            if (isProfessional) {
              const profTemplate = professionalTemplates.find(pt => pt.id === template.id);
              return profTemplate ? (
                <ProfessionalTemplateCard 
                  key={template.id}
                  template={profTemplate}
                  onSelect={handleSelectTemplate}
                />
              ) : null;
            } else {
              return (
                <TemplateCard 
                  key={template.id}
                  template={template}
                  onSelect={handleSelectTemplate}
                />
              );
            }
          })}
        </div>

        {/* No Results */}
        {currentTemplates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {t('templates.noResults')}
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
            totalItems={filteredTemplates.length}
          />
        )}
      </div>
    </div>
  );
}
