import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Progress } from "../components/ui/progress";
import { 
  Plus, 
  FileText, 
  Share2, 
  Edit, 
  Eye, 
  TrendingUp, 
  Package, 
  Tag,
  Sparkles,
  Copy,
  ExternalLink,
  BarChart3,
  Clock,
  CheckCircle2
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";
import type { MenuData } from "../types/menu";

interface MenuStats {
  totalItems: number;
  categories: number;
  averagePrice: number;
  completionPercentage: number;
}

export default function Dashboard() {
  const { user, token, logout } = useAuth();
  const [hasMenu, setHasMenu] = useState(false);
  const [menuData, setMenuData] = useState<MenuData | null>(null);
  const [menuStats, setMenuStats] = useState<MenuStats | null>(null);
  const [menuUrl, setMenuUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user, token]);

  const loadDashboardData = async () => {
    if (!token) return;

    try {
      // Check if user has a menu and fetch menu data
      const response = await fetch(
        `https://nyqfsuwxrzrfnrslpgfj.supabase.co/functions/v1/make-server-b6941cdd/menus`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.menus && data.menus.length > 0) {
          // Get the most recent menu
          const latestMenu = data.menus[0];
          setHasMenu(true);
          setMenuData(latestMenu);
          
          // Calculate statistics
          const items = latestMenu.items || [];
          const categories = new Set(items.map((item: any) => item.category)).size;
          const prices = items
            .map((item: any) => parseFloat(item.price) || 0)
            .filter((price: number) => price > 0);
          const averagePrice = prices.length > 0 
            ? prices.reduce((a: number, b: number) => a + b, 0) / prices.length 
            : 0;
          
          // Completion percentage (consider menu complete if has business name, description, and at least 3 items)
          const hasBusinessName = latestMenu.businessName && latestMenu.businessName.trim() !== "";
          const hasDescription = latestMenu.businessDescription && latestMenu.businessDescription.trim() !== "";
          const hasItems = items.length >= 3;
          const completionPercentage = Math.round(
            ((hasBusinessName ? 30 : 0) + 
             (hasDescription ? 20 : 0) + 
             (hasItems ? 50 : (items.length / 3) * 50))
          );

          setMenuStats({
            totalItems: items.length,
            categories,
            averagePrice,
            completionPercentage: Math.min(completionPercentage, 100),
          });

          // Set menu URL
          if (data.menu.menuId) {
            setMenuUrl(`${window.location.origin}/menu/${data.menu.menuId}`);
          }
        } else {
          setHasMenu(false);
          setMenuData(null);
          setMenuStats(null);
        }
      }
    } catch (error) {
      console.error("Error checking auth:", error);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    logout();
    navigate("/");
  };

  const handleCopyMenuLink = async () => {
    if (!menuUrl) {
      toast.error("Menu URL not available");
      return;
    }
    try {
      await navigator.clipboard.writeText(menuUrl);
      toast.success("Menu link copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  const handleShareMenu = async () => {
    if (!menuUrl) {
      toast.error("Menu URL not available");
      return;
    }
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${menuData?.businessName || "My Menu"} - MenuCraft`,
          text: `Check out my menu: ${menuData?.businessName || "My Menu"}`,
          url: menuUrl,
        });
      } else {
        await handleCopyMenuLink();
      }
    } catch (error) {
      // User cancelled or error occurred
      if (error instanceof Error && error.name !== "AbortError") {
        await handleCopyMenuLink();
      }
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                Welcome back,{" "}
                <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                  {user?.user_metadata?.name?.split(" ")[0] || "there"}!
                </span>
              </h1>
              <p className="text-lg text-muted-foreground">
                {hasMenu 
                  ? `Manage your ${menuData?.businessName || "menu"} menu`
                  : "Let's create something amazing together"}
              </p>
            </div>
            {hasMenu && menuUrl && (
              <div className="flex gap-2">
                <Button
                  onClick={handleShareMenu}
                  variant="outline"
                  className="gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
                <Button
                  onClick={handleCopyMenuLink}
                  variant="outline"
                  className="gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copy Link
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Statistics Cards */}
        {hasMenu && menuStats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="border-2 hover:border-orange-500/50 transition-all hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Items</CardTitle>
                <Package className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{menuStats.totalItems}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Menu items
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-500/50 transition-all hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Categories</CardTitle>
                <Tag className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{menuStats.categories}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Different categories
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-green-500/50 transition-all hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Price</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  ${menuStats.averagePrice.toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Per item
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-purple-500/50 transition-all hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completion</CardTitle>
                <BarChart3 className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{menuStats.completionPercentage}%</div>
                <Progress value={menuStats.completionPercentage} className="mt-2" />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Actions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Create/Edit Menu Card */}
          <Card 
            className="group relative overflow-hidden border-2 hover:border-orange-500 transition-all hover:shadow-xl cursor-pointer bg-gradient-to-br from-orange-50/50 to-orange-100/30 dark:from-orange-950/20 dark:to-orange-900/10"
            onClick={() => navigate("/menu-builder")}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-colors" />
            <CardHeader className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                {hasMenu ? (
                  <Edit className="w-7 h-7 text-white" />
                ) : (
                  <Plus className="w-7 h-7 text-white" />
                )}
              </div>
              <CardTitle className="text-xl">
                {hasMenu ? "Edit Your Menu" : "Create New Menu"}
              </CardTitle>
              <CardDescription className="text-base">
                {hasMenu 
                  ? "Update and customize your existing menu"
                  : "Start building your menu from beautiful templates"}
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <Button className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white shadow-lg">
                {hasMenu ? (
                  <>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Menu
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Get Started
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* My Menus Card */}
          <Card 
            className="group relative overflow-hidden border-2 hover:border-purple-500 transition-all hover:shadow-xl cursor-pointer bg-gradient-to-br from-purple-50/50 to-purple-100/30 dark:from-purple-950/20 dark:to-purple-900/10"
            onClick={() => navigate("/my-menus")}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-colors" />
            <CardHeader className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="text-xl">My Menus</CardTitle>
              <CardDescription className="text-base">
                View and manage all your saved menus
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <Button variant="outline" className="w-full border-2">
                <FileText className="w-4 h-4 mr-2" />
                View All Menus
              </Button>
            </CardContent>
          </Card>

          {/* View Menu Card */}
          {hasMenu && (
            <>
              <Card 
                className="group relative overflow-hidden border-2 hover:border-blue-500 transition-all hover:shadow-xl cursor-pointer bg-gradient-to-br from-blue-50/50 to-blue-100/30 dark:from-blue-950/20 dark:to-blue-900/10"
                onClick={() => navigate("/menu-builder?view=preview")}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors" />
                <CardHeader className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                    <Eye className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl">Preview Menu</CardTitle>
                  <CardDescription className="text-base">
                    See how your menu looks to customers
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  <Button variant="outline" className="w-full border-2">
                    <Eye className="w-4 h-4 mr-2" />
                    View Preview
                  </Button>
                </CardContent>
              </Card>

              {/* Public Menu Link Card */}
              {menuUrl && (
                <Card className="group relative overflow-hidden border-2 hover:border-green-500 transition-all hover:shadow-xl bg-gradient-to-br from-green-50/50 to-green-100/30 dark:from-green-950/20 dark:to-green-900/10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 transition-colors" />
                  <CardHeader className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                      <ExternalLink className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-xl">Public Menu</CardTitle>
                    <CardDescription className="text-base">
                      Share your menu with customers
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative space-y-3">
                    <div className="flex items-center gap-2 p-2 bg-background/50 rounded-lg border">
                      <code className="text-xs flex-1 truncate text-muted-foreground">
                        {menuUrl}
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleCopyMenuLink}
                        className="h-7 w-7 p-0"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full border-2"
                      onClick={() => window.open(menuUrl, "_blank")}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open Menu
                    </Button>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>

        {/* Menu Overview */}
        {hasMenu && menuData && (
          <Card className="mb-8 border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <FileText className="w-6 h-6 text-orange-600" />
                    Menu Overview
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {menuData.businessName}
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-sm">
                  {menuStats?.totalItems || 0} items
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {menuData.businessDescription && (
                <p className="text-muted-foreground mb-4">{menuData.businessDescription}</p>
              )}
              {menuData.items && menuData.items.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm mb-3">Recent Items</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {menuData.items.slice(0, 6).map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{item.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs capitalize">
                              {item.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              ${item.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {menuData.items.length > 6 && (
                    <Button
                      variant="ghost"
                      className="w-full mt-3"
                      onClick={() => navigate("/menu-builder")}
                    >
                      View All {menuData.items.length} Items
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Quick Tips / Getting Started */}
        <div className="grid md:grid-cols-2 gap-6">
          {!hasMenu ? (
            <Card className="border-2 border-dashed">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-orange-600" />
                  Getting Started
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Choose a Template</p>
                    <p className="text-sm text-muted-foreground">
                      Select from beautiful pre-designed templates that match your style
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Add Menu Items</p>
                    <p className="text-sm text-muted-foreground">
                      Add your dishes with descriptions, prices, and categories
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Customize & Share</p>
                    <p className="text-sm text-muted-foreground">
                      Customize colors, fonts, and share your menu with customers
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate("/menu-builder")}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Menu Items
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate("/menu-builder?view=preview")}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview Menu
                </Button>
                {menuUrl && (
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={handleShareMenu}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Menu Link
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {/* Tips Card */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-600" />
                Pro Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Add Descriptions</p>
                  <p className="text-xs text-muted-foreground">
                    Detailed descriptions help customers make better choices
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Organize by Categories</p>
                  <p className="text-xs text-muted-foreground">
                    Group items logically for easy navigation
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Keep Prices Updated</p>
                  <p className="text-xs text-muted-foreground">
                    Regular updates ensure accurate pricing for customers
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
