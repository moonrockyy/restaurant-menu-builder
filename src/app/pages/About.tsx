import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { 
  Coffee, 
  Utensils, 
  ChefHat, 
  Star, 
  Zap, 
  Palette, 
  Smartphone,
  Users,
  Award,
  Globe,
  Heart
} from "lucide-react";

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            {t('about.title')}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {t('about.subtitle')}
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                {t('about.startCreatingFree')}
              </Button>
            </Link>
            <Link to="/">
              <Button size="lg" variant="outline">
                {t('about.backToHome')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="container mx-auto px-4 py-16 bg-card">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">{t('about.ourStory')}</h2>
            <p className="text-lg text-muted-foreground">
              {t('about.storySubtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-foreground mb-6 leading-relaxed">
                {t('about.storyParagraph1')}
              </p>
              <p className="text-foreground mb-6 leading-relaxed">
                {t('about.storyParagraph2')}
              </p>
              <p className="text-foreground leading-relaxed">
                {t('about.storyParagraph3')}
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-950/20 dark:to-orange-950/10 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">5,000+</div>
                    <div className="text-sm text-muted-foreground">{t('about.restaurants')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">25+</div>
                    <div className="text-sm text-muted-foreground">{t('about.templates')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">50K+</div>
                    <div className="text-sm text-muted-foreground">{t('about.menusCreated')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">99.9%</div>
                    <div className="text-sm text-muted-foreground">{t('about.uptime')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">{t('about.whyChooseMenucraft')}</h2>
          <p className="text-lg text-muted-foreground">
            {t('about.whyChooseSubtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-4">
                <Palette className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('about.professionalTemplates')}</h3>
              <p className="text-muted-foreground">
                {t('about.professionalTemplatesDesc')}
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('about.lightningFast')}</h3>
              <p className="text-muted-foreground">
                {t('about.lightningFastDesc')}
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                <Smartphone className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('about.mobileOptimized')}</h3>
              <p className="text-muted-foreground">
                {t('about.mobileOptimizedDesc')}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Values */}
      <section className="container mx-auto px-4 py-16 bg-card">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">{t('about.ourValues')}</h2>
          <p className="text-lg text-muted-foreground">
            {t('about.ourValuesSubtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{t('about.customerFirst')}</h3>
            <p className="text-sm text-muted-foreground">
              {t('about.customerFirstDesc')}
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{t('about.qualityDriven')}</h3>
            <p className="text-sm text-muted-foreground">
              {t('about.qualityDrivenDesc')}
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{t('about.passionForFood')}</h3>
            <p className="text-sm text-muted-foreground">
              {t('about.passionForFoodDesc')}
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{t('about.globalImpact')}</h3>
            <p className="text-sm text-muted-foreground">
              {t('about.globalImpactDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">{t('about.readyToTransform')}</h2>
          <p className="text-xl mb-8 text-orange-50">
            {t('about.readyToTransformSubtitle')}
          </p>
          <Link to="/signup">
            <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-slate-50">
              {t('about.getStartedFree')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
