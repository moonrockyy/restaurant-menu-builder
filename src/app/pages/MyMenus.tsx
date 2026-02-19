import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { 
  Menu, 
  ArrowLeft, 
  Edit, 
  Eye, 
  Trash2,
  Plus,
  Package,
  Calendar,
  ExternalLink,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@supabase/supabase-js";
import { projectId, publicAnonKey } from "/utils/supabase/info";
import { ThemeToggle } from "../components/ThemeToggle";
import type { MenuData } from "../types/menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";

export default function MyMenus() {
  const [menus, setMenus] = useState<MenuData[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [menuToDelete, setMenuToDelete] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    const token = localStorage.getItem("access_token");
    const userStr = localStorage.getItem("user");

    if (!token || !userStr) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b6941cdd/menus`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMenus(data.menus || []);
      } else {
        toast.error("Failed to load menus");
      }
    } catch (error) {
      console.error("Error fetching menus:", error);
      toast.error("Failed to load menus");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMenu = async () => {
    if (!menuToDelete) return;

    const token = localStorage.getItem("access_token");
    if (!token) {
      toast.error("Not authenticated");
      return;
    }

    try {
      // Note: You'll need to add a delete endpoint to the backend
      // For now, we'll just show a message
      toast.info("Delete functionality coming soon!");
      setDeleteDialogOpen(false);
      setMenuToDelete(null);
      // After backend is updated, uncomment:
      // await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-b6941cdd/menu/${menuToDelete}`, {
      //   method: "DELETE",
      //   headers: { Authorization: `Bearer ${token}` },
      // });
      // fetchMenus();
    } catch (error) {
      console.error("Error deleting menu:", error);
      toast.error("Failed to delete menu");
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Unknown";
    }
  };

  const getMenuUrl = (menuId?: string) => {
    if (!menuId) return "#";
    return `${window.location.origin}/menu/${menuId}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-orange-600 mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your menus...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Menu className="w-8 h-8 text-orange-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
              MenuCraft
            </h1>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button onClick={() => navigate("/menu-builder")} className="bg-orange-600 hover:bg-orange-700">
              <Plus className="w-4 h-4 mr-2" />
              New Menu
            </Button>
            <Button onClick={() => navigate("/dashboard")} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">My Menus</h1>
          <p className="text-lg text-muted-foreground">
            Manage and edit all your saved menus
          </p>
        </div>

        {menus.length === 0 ? (
          <Card className="border-2 border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Package className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No menus yet</h3>
              <p className="text-muted-foreground mb-6 text-center max-w-md">
                Create your first menu to get started. You can create multiple menus for different occasions or locations.
              </p>
              <Button onClick={() => navigate("/menu-builder")} className="bg-orange-600 hover:bg-orange-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Menu
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menus.map((menu) => (
              <Card
                key={menu.menuId}
                className="group relative overflow-hidden border-2 hover:border-orange-500 transition-all hover:shadow-xl"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-colors" />
                <CardHeader className="relative">
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-xl line-clamp-1">{menu.businessName || "Untitled Menu"}</CardTitle>
                    <Badge variant="outline" className="ml-2">
                      {menu.items?.length || 0} items
                    </Badge>
                  </div>
                  {menu.businessDescription && (
                    <CardDescription className="line-clamp-2">
                      {menu.businessDescription}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="relative space-y-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Package className="w-4 h-4" />
                      <span>{menu.items?.length || 0} items</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(menu.updatedAt || menu.createdAt)}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => navigate(`/menu-builder?menuId=${menu.menuId}`)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    {menu.menuId && (
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => window.open(getMenuUrl(menu.menuId), "_blank")}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the menu.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setMenuToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteMenu}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
