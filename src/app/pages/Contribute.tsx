import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { 
  Github, 
  Heart, 
  Code, 
  Bug, 
  Lightbulb, 
  Users, 
  Star, 
  GitBranch,
  MessageSquare,
  Package,
  Zap,
  Shield
} from "lucide-react";

export default function Contribute() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
              <Github className="w-10 h-10 text-orange-600" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            {t('contribute.title')}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {t('contribute.subtitle')}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a 
              href="https://github.com/moonrockyy/restaurant-menu-builder" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white">
                <Github className="w-5 h-5 mr-2" />
                {t('contribute.viewOnGithub')}
              </Button>
            </a>
            <Link to="/">
              <Button size="lg" variant="outline">
                {t('contribute.backToHome')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Project Stats */}
      <section className="container mx-auto px-4 py-16 bg-card">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">{t('contribute.projectStats')}</h2>
            <p className="text-lg text-muted-foreground">
              {t('contribute.projectStatsSubtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Star className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground mb-1">1,247</div>
                <div className="text-sm text-muted-foreground">{t('contribute.githubStars')}</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <GitBranch className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground mb-1">89</div>
                <div className="text-sm text-muted-foreground">{t('contribute.contributors')}</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <Code className="w-8 h-8 text-green-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground mb-1">342</div>
                <div className="text-sm text-muted-foreground">{t('contribute.pullRequests')}</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <Bug className="w-8 h-8 text-red-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground mb-1">156</div>
                <div className="text-sm text-muted-foreground">{t('contribute.issuesResolved')}</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Ways to Contribute */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">{t('contribute.howYouCanContribute')}</h2>
          <p className="text-lg text-muted-foreground">
            {t('contribute.howYouCanContributeSubtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('contribute.codeContributions')}</h3>
              <p className="text-muted-foreground mb-4">
                {t('contribute.codeContributionsDesc')}
              </p>
              <a 
                href="https://github.com/moonrockyy/restaurant-menu-builder/issues" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button variant="outline" size="sm">
                  {t('contribute.viewIssues')}
                </Button>
              </a>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                <Bug className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('contribute.reportBugs')}</h3>
              <p className="text-muted-foreground mb-4">
                {t('contribute.reportBugsDesc')}
              </p>
              <a 
                href="https://github.com/moonrockyy/restaurant-menu-builder/issues/new?template=bug_report.md" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button variant="outline" size="sm">
                  {t('contribute.reportBug')}
                </Button>
              </a>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('contribute.featureRequests')}</h3>
              <p className="text-muted-foreground mb-4">
                {t('contribute.featureRequestsDesc')}
              </p>
              <a 
                href="https://github.com/moonrockyy/restaurant-menu-builder/issues/new?template=feature_request.md" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button variant="outline" size="sm">
                  {t('contribute.suggestFeature')}
                </Button>
              </a>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('contribute.documentation')}</h3>
              <p className="text-muted-foreground mb-4">
                {t('contribute.documentationDesc')}
              </p>
              <a 
                href="https://github.com/moonrockyy/restaurant-menu-builder/tree/main/docs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button variant="outline" size="sm">
                  {t('contribute.improveDocs')}
                </Button>
              </a>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('contribute.communitySupport')}</h3>
              <p className="text-muted-foreground mb-4">
                {t('contribute.communitySupportDesc')}
              </p>
              <a 
                href="https://github.com/moonrockyy/restaurant-menu-builder/discussions" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button variant="outline" size="sm">
                  {t('contribute.joinDiscussions')}
                </Button>
              </a>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('contribute.spreadTheWord')}</h3>
              <p className="text-muted-foreground mb-4">
                {t('contribute.spreadTheWordDesc')}
              </p>
              <a 
                href="https://github.com/moonrockyy/restaurant-menu-builder" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button variant="outline" size="sm">
                  {t('contribute.starProject')}
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Development Setup */}
      <section className="container mx-auto px-4 py-16 bg-card">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">{t('contribute.developmentSetup')}</h2>
            <p className="text-lg text-muted-foreground">
              {t('contribute.developmentSetupSubtitle')}
            </p>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-orange-600" />
                {t('contribute.quickStartGuide')}
              </h3>
              
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <code className="text-sm text-foreground">
                    # {t('contribute.cloneRepo')}<br/>
                    git clone https://github.com/moonrockyy/restaurant-menu-builder.git<br/><br/>
                    # {t('contribute.installDeps')}<br/>
                    npm install<br/><br/>
                    # {t('contribute.startDevServer')}<br/>
                    npm run dev
                  </code>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Zap className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="font-semibold mb-1">{t('contribute.reactVite')}</h4>
                    <p className="text-sm text-muted-foreground">Type-safe development</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Zap className="w-6 h-6 text-green-600" />
                    </div>
                    <h4 className="font-semibold mb-1">React 18 + Vite</h4>
                    <p className="text-sm text-muted-foreground">Modern development stack</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Shield className="w-6 h-6 text-purple-600" />
                    </div>
                    <h4 className="font-semibold mb-1">MIT License</h4>
                    <p className="text-sm text-muted-foreground">Open source forever</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
