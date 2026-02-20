import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Settings, Lock } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ManagementSection() {
  const { t } = useTranslation();
  
  return (
    <Card 
      className="group relative overflow-hidden border-2 border-gray-200 dark:border-gray-700 opacity-75 cursor-not-allowed bg-gradient-to-br from-gray-50/50 to-gray-100/30 dark:from-gray-900/20 dark:to-gray-800/10"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gray-500/10 rounded-full blur-3xl" />
      <div className="absolute top-4 right-4">
        <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
          {t('management.comingSoon')}
        </Badge>
      </div>
      <CardHeader className="relative">
        <div className="w-14 h-14 bg-gradient-to-br from-gray-400 to-gray-500 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
          <Settings className="w-7 h-7 text-white" />
        </div>
        <CardTitle className="text-xl">{t('management.title')}</CardTitle>
        <CardDescription className="text-base">
          {t('management.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative">
        <Button variant="outline" className="w-full border-2" disabled>
          <Lock className="w-4 h-4 mr-2" />
          {t('management.comingSoon')}
        </Button>
      </CardContent>
    </Card>
  );
}
