import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../components/ui/accordion";
import { Coffee, Utensils, ChefHat, Star, Quote, Building, Github, HelpCircle, MessageSquare, Zap, Shield, Users } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export default function Landing() {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="space-y-8">
            <h2 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
              {t('landing.hero.title')}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t('landing.hero.subtitle')}
            </p>
            <div className="flex gap-4">
              <Link to={user ? "/dashboard" : "/signup"}>
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700 hover:scale-105 transition-transform duration-300">
                  {user ? t('landing.hero.goToDashboard') : t('landing.hero.startCreating')}
                </Button>
              </Link>
              <Link to={user ? "/menu-builder" : "/login"}>
                <Button size="lg" variant="outline" className="hover:scale-105 transition-transform duration-300">
                  {user ? t('landing.hero.createMenu') : t('landing.hero.viewTemplates')}
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <ImageWithFallback
              src="/cafe.avif"
              alt="Restaurant"
              className="rounded-xl shadow-2xl w-full h-[400px] md:h-[500px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-light text-foreground mb-4">
            {t('landing.features.title')}
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('landing.features.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
          <div className="text-center group">
            <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-6 mx-auto transition-all duration-300 group-hover:scale-110 group-hover:bg-stone-200">
              <Utensils className="w-7 h-7 text-stone-700 transition-transform duration-300 group-hover:rotate-12" />
            </div>
            <h4 className="text-lg font-medium text-foreground mb-3 transition-colors duration-300 group-hover:text-orange-600">{t('landing.features.restaurantMenus.title')}</h4>
            <p className="text-muted-foreground text-sm leading-relaxed transition-opacity duration-300 group-hover:opacity-80">
              {t('landing.features.restaurantMenus.description')}
            </p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-6 mx-auto transition-all duration-300 group-hover:scale-110 group-hover:bg-amber-100">
              <Coffee className="w-7 h-7 text-amber-700 transition-transform duration-300 group-hover:rotate-12" />
            </div>
            <h4 className="text-lg font-medium text-foreground mb-3 transition-colors duration-300 group-hover:text-orange-600">{t('landing.features.cafeMenus.title')}</h4>
            <p className="text-muted-foreground text-sm leading-relaxed transition-opacity duration-300 group-hover:opacity-80">
              {t('landing.features.cafeMenus.description')}
            </p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-6 mx-auto transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-100">
              <ChefHat className="w-7 h-7 text-emerald-700 transition-transform duration-300 group-hover:rotate-12" />
            </div>
            <h4 className="text-lg font-medium text-foreground mb-3 transition-colors duration-300 group-hover:text-orange-600">{t('landing.features.customStyle.title')}</h4>
            <p className="text-muted-foreground text-sm leading-relaxed transition-opacity duration-300 group-hover:opacity-80">
              {t('landing.features.customStyle.description')}
            </p>
          </div>
        </div>
      </section>

         {/* Trusted Companies Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-foreground mb-4">{t('landing.trusted.title')}</h3>
          <p className="text-lg text-muted-foreground mb-8">
            {t('landing.trusted.subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
          <div className="flex items-center justify-center">
            <img src="/logos/golden-dragon.svg" alt="The Golden Dragon" className="w-12 h-12" />
            <span className="ml-2 text-lg font-semibold text-foreground">The Golden Dragon</span>
          </div>
          <div className="flex items-center justify-center">
            <img src="/logos/urban-grind.svg" alt="Urban Grind" className="w-12 h-12" />
            <span className="ml-2 text-lg font-semibold text-foreground">Urban Grind</span>
          </div>
          <div className="flex items-center justify-center">
            <img src="/logos/bella-vista.svg" alt="Bella Vista" className="w-12 h-12" />
            <span className="ml-2 text-lg font-semibold text-foreground">Bella Vista</span>
          </div>
          <div className="flex items-center justify-center">
            <img src="/logos/sunrise-cafe.svg" alt="Sunrise Cafe" className="w-12 h-12" />
            <span className="ml-2 text-lg font-semibold text-foreground">Sunrise Cafe</span>
          </div>
          <div className="flex items-center justify-center">
            <img src="/logos/ocean-breeze.svg" alt="Ocean Breeze" className="w-12 h-12" />
            <span className="ml-2 text-lg font-semibold text-foreground">Ocean Breeze</span>
          </div>
          <div className="flex items-center justify-center">
            <img src="/logos/mountain-view.svg" alt="Mountain View" className="w-12 h-12" />
            <span className="ml-2 text-lg font-semibold text-foreground">Mountain View</span>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-bold text-foreground">5,000+</span> {t('landing.trusted.stats')}
          </p>
        </div>
      </section>

    

      
      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-2xl p-12 text-center text-white">
          <h3 className="text-4xl font-bold mb-4">{t('landing.cta.title')}</h3>
          <p className="text-xl mb-8 text-orange-50">
            {t('landing.cta.subtitle')}
          </p>
          <Link to={user ? "/dashboard" : "/signup"}>
            <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-slate-50">
              {user ? t('landing.cta.goToDashboard') : t('landing.cta.createMenuNow')}
            </Button>
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-foreground mb-4">{t('landing.testimonials.title')}</h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('landing.testimonials.subtitle')}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-orange-50 to-white dark:from-orange-950/20 dark:to-card">
            <div className="absolute -top-4 left-6">
              <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center shadow-lg">
                <Quote className="w-6 h-6 text-white" />
              </div>
            </div>
            <CardContent className="pt-12 pb-6">
              <div className="flex items-center gap-1 mb-4">
                <Star className="w-5 h-5 fill-orange-400 text-orange-400" />
                <Star className="w-5 h-5 fill-orange-400 text-orange-400" />
                <Star className="w-5 h-5 fill-orange-400 text-orange-400" />
                <Star className="w-5 h-5 fill-orange-400 text-orange-400" />
                <Star className="w-5 h-5 fill-orange-400 text-orange-400" />
              </div>
              <blockquote className="text-foreground mb-6 leading-relaxed">
                "{t('landing.testimonials.sarah.quote')}"
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-orange-600">SC</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{t('landing.testimonials.sarah.name')}</h4>
                  <p className="text-sm text-muted-foreground">{t('landing.testimonials.sarah.role')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-card">
            <div className="absolute -top-4 left-6">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <Quote className="w-6 h-6 text-white" />
              </div>
            </div>
            <CardContent className="pt-12 pb-6">
              <div className="flex items-center gap-1 mb-4">
                <Star className="w-5 h-5 fill-blue-400 text-blue-400" />
                <Star className="w-5 h-5 fill-blue-400 text-blue-400" />
                <Star className="w-5 h-5 fill-blue-400 text-blue-400" />
                <Star className="w-5 h-5 fill-blue-400 text-blue-400" />
                <Star className="w-5 h-5 fill-blue-400 text-blue-400" />
              </div>
              <blockquote className="text-foreground mb-6 leading-relaxed">
                "{t('landing.testimonials.mike.quote')}"
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-blue-600">MR</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{t('landing.testimonials.mike.name')}</h4>
                  <p className="text-sm text-muted-foreground">{t('landing.testimonials.mike.role')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-white dark:from-green-950/20 dark:to-card">
            <div className="absolute -top-4 left-6">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
                <Quote className="w-6 h-6 text-white" />
              </div>
            </div>
            <CardContent className="pt-12 pb-6">
              <div className="flex items-center gap-1 mb-4">
                <Star className="w-5 h-5 fill-green-400 text-green-400" />
                <Star className="w-5 h-5 fill-green-400 text-green-400" />
                <Star className="w-5 h-5 fill-green-400 text-green-400" />
                <Star className="w-5 h-5 fill-green-400 text-green-400" />
                <Star className="w-5 h-5 fill-green-400 text-green-400" />
              </div>
              <blockquote className="text-foreground mb-6 leading-relaxed">
                "{t('landing.testimonials.emily.quote')}"
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-green-600">EW</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{t('landing.testimonials.emily.name')}</h4>
                  <p className="text-sm text-muted-foreground">{t('landing.testimonials.emily.role')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

   


      {/* Sample Projects Section */}
      {/* <section className="container mx-auto px-4 py-16 bg-card">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-foreground mb-4">See MenuCraft in Action</h3>
          <p className="text-lg text-muted-foreground mb-8">
            Real mobile mockups showing how restaurants use MenuCraft to create stunning menus
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-2 hover:shadow-lg transition-shadow overflow-hidden">
            <div className="relative">
              <div className="mx-auto w-48 h-96 bg-gray-900 rounded-3xl p-2 shadow-2xl">
                <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
                  <div className="bg-gradient-to-br from-red-600 to-red-800 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-white rounded"></div>
                      <div className="flex-1 h-4 bg-white/20 rounded"></div>
                    </div>
                    <div className="text-center text-white">
                      <h4 className="text-lg font-bold">Bella Vista</h4>
                    </div>
                  </div>
                  <div className="p-3 space-y-2">
                    <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                    <div className="flex justify-between mt-4">
                      <div className="w-8 h-8 bg-red-100 rounded"></div>
                      <div className="w-8 h-8 bg-green-100 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-gray-900 rounded-full"></div>
            </div>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow overflow-hidden">
            <div className="relative">
              <div className="mx-auto w-48 h-96 bg-gray-900 rounded-3xl p-2 shadow-2xl">
                <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
                  <div className="bg-gradient-to-br from-green-600 to-green-800 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-white rounded"></div>
                      <div className="flex-1 h-4 bg-white/20 rounded"></div>
                    </div>
                    <div className="text-center text-white">
                      <h4 className="text-lg font-bold">Urban Grind</h4>
                    </div>
                  </div>
                  <div className="p-3 space-y-2">
                    <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                    <div className="flex justify-between mt-4">
                      <div className="w-8 h-8 bg-green-100 rounded"></div>
                      <div className="w-8 h-8 bg-orange-100 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-gray-900 rounded-full"></div>
            </div>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow overflow-hidden">
            <div className="relative">
              <div className="mx-auto w-48 h-96 bg-gray-900 rounded-3xl p-2 shadow-2xl">
                <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
                  <div className="bg-gradient-to-br from-orange-600 to-orange-800 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-white rounded"></div>
                      <div className="flex-1 h-4 bg-white/20 rounded"></div>
                    </div>
                    <div className="text-center text-white">
                      <h4 className="text-lg font-bold">Sunset BBQ</h4>
                    </div>
                  </div>
                  <div className="p-3 space-y-2">
                    <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                    <div className="flex justify-between mt-4">
                      <div className="w-8 h-8 bg-orange-100 rounded"></div>
                      <div className="w-8 h-8 bg-red-100 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-gray-900 rounded-full"></div>
            </div>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow overflow-hidden">
            <div className="relative">
              <div className="mx-auto w-48 h-96 bg-gray-900 rounded-3xl p-2 shadow-2xl">
                <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-white rounded"></div>
                      <div className="flex-1 h-4 bg-white/20 rounded"></div>
                    </div>
                    <div className="text-center text-white">
                      <h4 className="text-lg font-bold">Ocean Breeze</h4>
                    </div>
                  </div>
                  <div className="p-3 space-y-2">
                    <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                    <div className="flex justify-between mt-4">
                      <div className="w-8 h-8 bg-blue-100 rounded"></div>
                      <div className="w-8 h-8 bg-green-100 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-gray-900 rounded-full"></div>
            </div>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow overflow-hidden">
            <div className="relative">
              <div className="mx-auto w-48 h-96 bg-gray-900 rounded-3xl p-2 shadow-2xl">
                <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
                  <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-white rounded"></div>
                      <div className="flex-1 h-4 bg-white/20 rounded"></div>
                    </div>
                    <div className="text-center text-white">
                      <h4 className="text-lg font-bold">Golden Dragon</h4>
                    </div>
                  </div>
                  <div className="p-3 space-y-2">
                    <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                    <div className="flex justify-between mt-4">
                      <div className="w-8 h-8 bg-purple-100 rounded"></div>
                      <div className="w-8 h-8 bg-pink-100 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-gray-900 rounded-full"></div>
            </div>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow overflow-hidden">
            <div className="relative">
              <div className="mx-auto w-48 h-96 bg-gray-900 rounded-3xl p-2 shadow-2xl">
                <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
                  <div className="bg-gradient-to-br from-pink-600 to-pink-800 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-white rounded"></div>
                      <div className="flex-1 h-4 bg-white/20 rounded"></div>
                    </div>
                    <div className="text-center text-white">
                      <h4 className="text-lg font-bold">Sweet Dreams</h4>
                    </div>
                  </div>
                  <div className="p-3 space-y-2">
                    <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                    <div className="flex justify-between mt-4">
                      <div className="w-8 h-8 bg-pink-100 rounded"></div>
                      <div className="w-8 h-8 bg-yellow-100 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-gray-900 rounded-full"></div>
            </div>
          </Card>
        </div>
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Join 5,000+ restaurants already using MenuCraft on mobile devices
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
              Try Mobile Demo
            </Button>
          </Link>
        </div>
      </section> */}

      {/* Buy Me a Coffee Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-2xl p-12 text-center border-2 border-orange-100 dark:border-orange-900/30">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
              <Coffee className="w-8 h-8 text-orange-600" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-foreground mb-3">{t('landing.coffee.title')}</h3>
          <p className="text-lg text-muted-foreground mb-6 max-w-md mx-auto">
            {t('landing.coffee.subtitle')}
          </p>
          <a
            href="https://buymeacoffee.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">
              <Coffee className="w-5 h-5 mr-2" />
              {t('landing.coffee.button')}
            </Button>
          </a>
        </div>
      </section>
        {/* FAQ Section */}
      <section className="container mx-auto px-4 py-16 bg-card">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-foreground mb-4">{t('landing.faq.title')}</h3>
          <p className="text-lg text-muted-foreground mb-8">
            {t('landing.faq.subtitle')}
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left">
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-orange-600" />
                  <span className="font-semibold">{t('landing.faq.q1.question')}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground leading-relaxed">
                  {t('landing.faq.q1.answer')}
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-orange-600" />
                  <span className="font-semibold">{t('landing.faq.q2.question')}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground leading-relaxed">
                  {t('landing.faq.q2.answer')}
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-orange-600" />
                  <span className="font-semibold">{t('landing.faq.q3.question')}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground leading-relaxed">
                  {t('landing.faq.q3.answer')}
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-orange-600" />
                  <span className="font-semibold">{t('landing.faq.q4.question')}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground leading-relaxed">
                  {t('landing.faq.q4.answer')}
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-orange-600" />
                  <span className="font-semibold">{t('landing.faq.q5.question')}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground leading-relaxed">
                  {t('landing.faq.q5.answer')}
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      
    </div>
  );
}
