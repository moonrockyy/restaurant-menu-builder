import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Menu, ArrowLeft, Plus, Trash2, Save, Eye } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@supabase/supabase-js";
import { projectId, publicAnonKey } from "/utils/supabase/info";
import { templates, type Template, type MenuData, type MenuItem } from "../types/menu";
import { TemplateSelector } from "../components/TemplateSelector";
import { MenuPreview } from "../components/MenuPreview";
import { ThemeToggle } from "../components/ThemeToggle";

export default function MenuBuilder() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [step, setStep] = useState<"template" | "editor">("template");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [menuData, setMenuData] = useState<MenuData>({
    templateId: "",
    businessName: "",
    businessDescription: "",
    primaryColor: "",
    items: [],
  });
  const [showItemDialog, setShowItemDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  // Form states for new/edit item
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemCategory, setItemCategory] = useState("appetizer");

  useEffect(() => {
    checkAuthAndLoadMenu();
  }, [searchParams]);

  useEffect(() => {
    const viewMode = searchParams.get("view");
    if (viewMode === "preview") {
      setShowPreview(true);
    }
  }, [searchParams]);

  const checkAuthAndLoadMenu = async () => {
    const token = localStorage.getItem("access_token");
    const userStr = localStorage.getItem("user");

    if (!token || !userStr) {
      navigate("/login");
      return;
    }

    try {
      const menuId = searchParams.get("menuId");
      
      // If menuId is provided, load that specific menu
      if (menuId) {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-b6941cdd/menu/${menuId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.menu) {
            const template = templates.find((t) => t.id === data.menu.templateId);
            if (template) {
              setSelectedTemplate(template);
              setMenuData(data.menu);
              setStep("editor");
            }
          }
        }
      } else {
        // Load latest menu if no menuId specified
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-b6941cdd/menu`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.menu) {
            const template = templates.find((t) => t.id === data.menu.templateId);
            if (template) {
              setSelectedTemplate(template);
              setMenuData(data.menu);
              setStep("editor");
            }
          }
        }
      }
    } catch (error) {
      console.error("Error loading menu:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateSelect = (template: Template) => {
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;

    setSelectedTemplate(template);
    setMenuData({
      templateId: template.id,
      businessName: user?.user_metadata?.businessName || "",
      businessDescription: "",
      primaryColor: template.primaryColor,
      items: [],
    });
    setStep("editor");
  };

  const handleOpenItemDialog = (item?: MenuItem) => {
    if (item) {
      setEditingItem(item);
      setItemName(item.name);
      setItemDescription(item.description);
      setItemPrice(item.price);
      setItemCategory(item.category);
    } else {
      setEditingItem(null);
      setItemName("");
      setItemDescription("");
      setItemPrice("");
      setItemCategory("appetizer");
    }
    setShowItemDialog(true);
  };

  const handleSaveItem = () => {
    if (!itemName || !itemPrice) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newItem: MenuItem = {
      id: editingItem?.id || `item-${Date.now()}`,
      name: itemName,
      description: itemDescription,
      price: itemPrice,
      category: itemCategory,
    };

    if (editingItem) {
      // Update existing item
      setMenuData({
        ...menuData,
        items: menuData.items.map((item) =>
          item.id === editingItem.id ? newItem : item
        ),
      });
      toast.success("Item updated");
    } else {
      // Add new item
      setMenuData({
        ...menuData,
        items: [...menuData.items, newItem],
      });
      toast.success("Item added");
    }

    setShowItemDialog(false);
  };

  const handleDeleteItem = (itemId: string) => {
    setMenuData({
      ...menuData,
      items: menuData.items.filter((item) => item.id !== itemId),
    });
    toast.success("Item deleted");
  };

  const handleSaveMenu = async () => {
    // Validation checks
    if (!selectedTemplate) {
      toast.error("Please select a template first");
      return;
    }

    if (!menuData.templateId) {
      toast.error("Template not selected. Please go back and choose a template.");
      return;
    }

    if (!menuData.businessName || menuData.businessName.trim() === "") {
      toast.error("Please enter your business name");
      return;
    }

    if (menuData.items.length === 0) {
      toast.error("Please add at least one menu item");
      return;
    }

    setSaving(true);

    try {
      // Refresh session to get a valid token
      const supabase = createClient(
        `https://${projectId}.supabase.co`,
        publicAnonKey
      );

      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !session?.access_token) {
        console.error("Session error:", sessionError);
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        setSaving(false);
        navigate("/login");
        return;
      }

      // Update stored token with fresh one
      localStorage.setItem("access_token", session.access_token);
      localStorage.setItem("user", JSON.stringify(session.user));

      // Ensure menuData has all required fields
      const menuToSave = {
        ...menuData,
        templateId: selectedTemplate.id,
        primaryColor: selectedTemplate.primaryColor,
      };

      console.log("Saving menu:", menuToSave);

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b6941cdd/menu`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify(menuToSave),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        console.error("Save failed:", responseData);
        throw new Error(responseData.error || `Failed to save menu: ${response.status}`);
      }

      const menuId = responseData.menuId || responseData.menu?.menuId;
      
      if (menuId) {
        toast.success("Menu saved successfully!");
        // Small delay to ensure toast is visible
        setTimeout(() => {
          navigate(`/menu/${menuId}`);
        }, 500);
      } else {
        toast.success("Menu saved successfully!");
        setTimeout(() => {
          navigate("/dashboard");
        }, 500);
      }
    } catch (error) {
      console.error("Error saving menu:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to save menu";
      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (showPreview && selectedTemplate) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
        <header className="border-b bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link to="/dashboard" className="flex items-center gap-2">
              <Menu className="w-8 h-8 text-orange-600" />
              <h1 className="text-2xl font-bold text-slate-900">MenuCraft</h1>
            </Link>
            <Button onClick={() => setShowPreview(false)} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </header>
        <div className="container mx-auto px-4 py-8">
          <MenuPreview template={selectedTemplate} menuData={menuData} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Menu className="w-8 h-8 text-orange-600" />
            <h1 className="text-2xl font-bold text-foreground">MenuCraft</h1>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button onClick={() => navigate("/dashboard")} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {step === "template" && (
          <TemplateSelector
            templates={templates}
            onSelectTemplate={handleTemplateSelect}
          />
        )}

        {step === "editor" && selectedTemplate && (
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                Build Your Menu
              </h2>
              <p className="text-slate-600">
                Template: {selectedTemplate.name}
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Editor Panel */}
              <div className="lg:col-span-1 space-y-6">
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <div>
                      <Label htmlFor="businessName">Business Name</Label>
                      <Input
                        id="businessName"
                        value={menuData.businessName}
                        onChange={(e) =>
                          setMenuData({ ...menuData, businessName: e.target.value })
                        }
                        placeholder="My Restaurant"
                      />
                    </div>
                    <div>
                      <Label htmlFor="businessDescription">Description</Label>
                      <Textarea
                        id="businessDescription"
                        value={menuData.businessDescription}
                        onChange={(e) =>
                          setMenuData({
                            ...menuData,
                            businessDescription: e.target.value,
                          })
                        }
                        placeholder="A brief description of your business"
                        rows={3}
                      />
                    </div>
                    <Button
                      onClick={() => setStep("template")}
                      variant="outline"
                      className="w-full"
                    >
                      Change Template
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-semibold">Menu Items ({menuData.items.length})</h3>
                      <Button
                        onClick={() => handleOpenItemDialog()}
                        size="sm"
                        className="bg-orange-600 hover:bg-orange-700"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add
                      </Button>
                    </div>

                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {menuData.items.length === 0 ? (
                        <p className="text-sm text-slate-500 text-center py-8">
                          No items yet. Click "Add" to create your first item.
                        </p>
                      ) : (
                        menuData.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{item.name}</p>
                              <p className="text-xs text-slate-500 capitalize">{item.category}</p>
                            </div>
                            <div className="flex items-center gap-2 ml-2">
                              <span className="text-sm font-medium">${item.price}</span>
                              <Button
                                onClick={() => handleOpenItemDialog(item)}
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0"
                              >
                                <span className="sr-only">Edit</span>
                                ✏️
                              </Button>
                              <Button
                                onClick={() => handleDeleteItem(item.id)}
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-2">
                  <Button
                    onClick={() => setShowPreview(true)}
                    variant="outline"
                    className="flex-1"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleSaveMenu();
                    }}
                    disabled={saving}
                    className="flex-1 bg-orange-600 hover:bg-orange-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? "Saving..." : "Save Menu"}
                  </Button>
                </div>
              </div>

              {/* Preview Panel */}
              <div className="lg:col-span-2">
                <MenuPreview template={selectedTemplate} menuData={menuData} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Item Dialog */}
      <Dialog open={showItemDialog} onOpenChange={setShowItemDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Edit Menu Item" : "Add Menu Item"}
            </DialogTitle>
            <DialogDescription>
              Fill in the details for your menu item
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="itemName">Item Name *</Label>
              <Input
                id="itemName"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="Grilled Salmon"
              />
            </div>
            <div>
              <Label htmlFor="itemDescription">Description</Label>
              <Textarea
                id="itemDescription"
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
                placeholder="Fresh Atlantic salmon with seasonal vegetables"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="itemPrice">Price *</Label>
              <Input
                id="itemPrice"
                value={itemPrice}
                onChange={(e) => setItemPrice(e.target.value)}
                placeholder="24.99"
                type="number"
                step="0.01"
              />
            </div>
            <div>
              <Label htmlFor="itemCategory">Category</Label>
              <Select value={itemCategory} onValueChange={setItemCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="appetizer">Appetizer</SelectItem>
                  <SelectItem value="main">Main Course</SelectItem>
                  <SelectItem value="dessert">Dessert</SelectItem>
                  <SelectItem value="beverage">Beverage</SelectItem>
                  <SelectItem value="side">Side Dish</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 pt-4">
              <Button
                onClick={() => setShowItemDialog(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveItem}
                className="flex-1 bg-orange-600 hover:bg-orange-700"
              >
                {editingItem ? "Update" : "Add"} Item
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
