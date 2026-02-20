import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Menu, ArrowLeft, Plus, Trash2, Save, Share2, Image, Settings } from "lucide-react";
import { toast } from "sonner";
import { templates as oldTemplates, type Template, type MenuData, type MenuItem, type BackgroundSettings, type CustomCategory } from "../types/menu";
import { templates as newTemplates, getTemplateById } from "../../data/templates";
import { professionalTemplates, getProfessionalTemplateById } from "../../data/professional-templates";
import { TemplateSelector } from "../components/TemplateSelector";
import { MenuPreview } from "../components/MenuPreview";
import { EditableMenuPreview } from "../components/EditableMenuPreview";
import { ProfessionalMenuPreview } from "../../components/ProfessionalMenuPreview";
import { useAuth } from "../contexts/AuthContext";

export default function MenuBuilder() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { token, user, loading: authLoading, getValidToken } = useAuth();
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
  const [useProfessionalPreview, setUseProfessionalPreview] = useState(true);
  const [useEditablePreview, setUseEditablePreview] = useState(false);
  const [shareableId, setShareableId] = useState<string | null>(null);
  const [showBackgroundDialog, setShowBackgroundDialog] = useState(false);
  const [backgroundSettings, setBackgroundSettings] = useState<BackgroundSettings>({
    type: "template",
    opacity: 100,
    size: "cover",
    position: "center",
    blur: 0,
    brightness: 100,
  });
  const [customCategories, setCustomCategories] = useState<CustomCategory[]>([]);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  // Form states for new/edit item
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemCategory, setItemCategory] = useState("appetizer");
  const [itemCustomCategory, setItemCustomCategory] = useState("");

  useEffect(() => {
    if (!authLoading) {
      checkAuthAndLoadMenu();
    }
  }, [searchParams, authLoading]);

  useEffect(() => {
    const templateParam = searchParams.get("template");
    if (templateParam && !loading && !authLoading) {
      // Check both new and professional templates
      let template = getTemplateById(templateParam);
      let profTemplate = getProfessionalTemplateById(templateParam);
      
      if (template) {
        // Convert to Template format for selector
        const compatibleTemplate: Template = {
          id: template.id,
          name: template.name,
          description: template.description,
          primaryColor: template.menuData.restaurant.primaryColor,
          backgroundColor: template.menuData.restaurant.secondaryColor,
          textColor: "#FFFFFF",
          accentColor: template.menuData.restaurant.primaryColor,
          style: "modern" as const,
          fontFamily: template.menuData.restaurant.fontFamily,
          layout: "single-column" as const,
          headerStyle: "modern" as const,
          categoryStyle: "underline" as const,
          itemStyle: "simple" as const,
          decorativeElements: {
            borders: false,
            dividers: true,
            icons: false,
            patterns: false
          },
          backgroundPattern: "none" as const
        };
        
        setSelectedTemplate(compatibleTemplate);
        
        // Convert template menu data to existing format
        const convertedItems: MenuItem[] = [];
        template.menuData.categories.forEach(category => {
          category.items.forEach(item => {
            convertedItems.push({
              id: item.id,
              name: item.name,
              description: item.description,
              price: item.price,
              category: category.id,
              customCategory: category.name
            });
          });
        });

        setMenuData({
          templateId: template.id,
          businessName: template.menuData.restaurant.name,
          businessDescription: template.menuData.restaurant.description,
          primaryColor: template.menuData.restaurant.primaryColor,
          items: convertedItems,
        });
        setStep("editor");
      } else if (profTemplate) {
        // Convert professional template to Template format
        const compatibleTemplate: Template = {
          id: profTemplate.id,
          name: profTemplate.name,
          description: profTemplate.description,
          primaryColor: profTemplate.menuData.restaurant.primaryColor,
          backgroundColor: profTemplate.menuData.restaurant.secondaryColor,
          textColor: "#FFFFFF",
          accentColor: profTemplate.menuData.restaurant.primaryColor,
          style: "modern" as const,
          fontFamily: profTemplate.menuData.restaurant.fontFamily,
          layout: "single-column" as const,
          headerStyle: "modern" as const,
          categoryStyle: "underline" as const,
          itemStyle: "simple" as const,
          decorativeElements: {
            borders: false,
            dividers: true,
            icons: false,
            patterns: false
          },
          backgroundPattern: "none" as const
        };
        
        setSelectedTemplate(compatibleTemplate);
        
        // Convert template menu data to existing format
        const convertedItems: MenuItem[] = [];
        profTemplate.menuData.categories.forEach(category => {
          category.items.forEach(item => {
            convertedItems.push({
              id: item.id,
              name: item.name,
              description: item.description,
              price: item.price,
              category: category.id,
              customCategory: category.name
            });
          });
        });

        setMenuData({
          templateId: profTemplate.id,
          businessName: profTemplate.menuData.restaurant.name,
          businessDescription: profTemplate.menuData.restaurant.description,
          primaryColor: profTemplate.menuData.restaurant.primaryColor,
          items: convertedItems,
        });
        setStep("editor");
      }
    }
  }, [searchParams, loading, authLoading]);

  useEffect(() => {
    const viewMode = searchParams.get("view");
    if (viewMode === "preview") {
      setShowPreview(true);
    }
  }, [searchParams]);

  const handleTemplateSelect = (template: Template) => {
    // Check if this is a new template (from our data/templates.ts)
    const newTemplate = getTemplateById(template.id);
    const profTemplate = getProfessionalTemplateById(template.id);
    
    if (newTemplate) {
      // Convert new template format to old format for compatibility
      const compatibleTemplate: Template = {
        id: newTemplate.id,
        name: newTemplate.name,
        description: newTemplate.description,
        primaryColor: newTemplate.menuData.restaurant.primaryColor,
        backgroundColor: newTemplate.menuData.restaurant.secondaryColor,
        textColor: "#FFFFFF",
        accentColor: newTemplate.menuData.restaurant.primaryColor,
        style: "modern" as const,
        fontFamily: newTemplate.menuData.restaurant.fontFamily,
        layout: "single-column" as const,
        headerStyle: "modern" as const,
        categoryStyle: "underline" as const,
        itemStyle: "simple" as const,
        decorativeElements: {
          borders: false,
          dividers: true,
          icons: false,
          patterns: false
        },
        backgroundPattern: "none" as const
      };

      setSelectedTemplate(compatibleTemplate);
      
      // Convert template menu data to existing format
      const convertedItems: MenuItem[] = [];
      newTemplate.menuData.categories.forEach(category => {
        category.items.forEach(item => {
          convertedItems.push({
            id: item.id,
            name: item.name,
            description: item.description,
            price: item.price,
            category: category.id,
            customCategory: category.name
          });
        });
      });

      setMenuData({
        templateId: newTemplate.id,
        businessName: newTemplate.menuData.restaurant.name,
        businessDescription: newTemplate.menuData.restaurant.description,
        primaryColor: newTemplate.menuData.restaurant.primaryColor,
        items: convertedItems,
      });
    } else if (profTemplate) {
      // Convert professional template format to old format for compatibility
      const compatibleTemplate: Template = {
        id: profTemplate.id,
        name: profTemplate.name,
        description: profTemplate.description,
        primaryColor: profTemplate.menuData.restaurant.primaryColor,
        backgroundColor: profTemplate.menuData.restaurant.secondaryColor,
        textColor: "#FFFFFF",
        accentColor: profTemplate.menuData.restaurant.primaryColor,
        style: "modern" as const,
        fontFamily: profTemplate.menuData.restaurant.fontFamily,
        layout: "single-column" as const,
        headerStyle: "modern" as const,
        categoryStyle: "underline" as const,
        itemStyle: "simple" as const,
        decorativeElements: {
          borders: false,
          dividers: true,
          icons: false,
          patterns: false
        },
        backgroundPattern: "none" as const
      };

      setSelectedTemplate(compatibleTemplate);
      
      // Convert template menu data to existing format
      const convertedItems: MenuItem[] = [];
      profTemplate.menuData.categories.forEach(category => {
        category.items.forEach(item => {
          convertedItems.push({
            id: item.id,
            name: item.name,
            description: item.description,
            price: item.price,
            category: category.id,
            customCategory: category.name
          });
        });
      });

      setMenuData({
        templateId: profTemplate.id,
        businessName: profTemplate.menuData.restaurant.name,
        businessDescription: profTemplate.menuData.restaurant.description,
        primaryColor: profTemplate.menuData.restaurant.primaryColor,
        items: convertedItems,
      });
    } else {
      // Use old template as-is
      setSelectedTemplate(template);
      setMenuData({
        templateId: template.id,
        businessName: user?.user_metadata?.businessName || "",
        businessDescription: "",
        primaryColor: template.primaryColor,
        items: [],
      });
    }
    setStep("editor");
  };

  const checkAuthAndLoadMenu = async () => {
    console.log('MenuBuilder: Checking authentication...');
    const validToken = await getValidToken();
    console.log('MenuBuilder: Valid token result:', validToken ? 'Success' : 'Failed');
    
    if (!validToken || !user) {
      console.log('MenuBuilder: Redirecting to login due to auth failure');
      toast.error("Please log in to continue");
      navigate("/login");
      return;
    }

    try {
      const menuId = searchParams.get("menuId");
      
      // If menuId is provided, load that specific menu
      if (menuId) {
        const response = await fetch(
          `https://nyqfsuwxrzrfnrslpgfj.supabase.co/functions/v1/make-server-b6941cdd/menu/${menuId}`,
          {
            headers: {
              Authorization: `Bearer ${validToken}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.menu) {
            const template = oldTemplates.find((t: Template) => t.id === data.menu.templateId);
            if (template) {
              setSelectedTemplate(template);
              setMenuData(data.menu);
              setBackgroundSettings(data.menu.backgroundSettings || {
                type: "template",
                opacity: 100,
                size: "cover",
                position: "center",
                blur: 0,
                brightness: 100,
              });
              setStep("editor");
            }
          }
        }
      } else {
        // Load latest menu if no menuId specified
        console.log('MenuBuilder: Loading latest menu...');
        
        try {
          const response = await fetch(
            `https://nyqfsuwxrzrfnrslpgfj.supabase.co/functions/v1/make-server-b6941cdd/menus`,
            {
              headers: {
                Authorization: `Bearer ${validToken}`,
              },
            }
          );

          console.log('MenuBuilder: Menus API response status:', response.status);
          console.log('MenuBuilder: Menus API response ok:', response.ok);

          if (response.ok) {
            const data = await response.json();
            console.log('MenuBuilder: Menus data received:', data);
            
            if (data.menus && data.menus.length > 0) {
              // Get the most recent menu
              const latestMenu = data.menus[0];
              console.log('MenuBuilder: Latest menu found:', latestMenu);
              
              const template = oldTemplates.find((t: Template) => t.id === latestMenu.templateId);
              if (template) {
                setSelectedTemplate(template);
                setMenuData(latestMenu);
                setBackgroundSettings(latestMenu.backgroundSettings || {
                  type: "template",
                  opacity: 100,
                  size: "cover",
                  position: "center",
                  blur: 0,
                  brightness: 100,
                });
                setStep("editor");
              }
            } else {
              console.log('MenuBuilder: No menus found for user');
            }
          } else {
            const errorText = await response.text();
            console.error('MenuBuilder: Menus API error:', {
              status: response.status,
              statusText: response.statusText,
              body: errorText
            });
            
            // Enhanced error handling with specific messages
            let errorMessage = `Failed to load menus (${response.status})`;
            
            if (response.status === 401) {
              errorMessage = "Authentication failed. Please try logging out and logging back in.";
              // Run diagnostic to help debug
              if (window.authDebug) {
                console.log('🔍 Running authentication diagnostic...');
                window.authDebug.runFullDiagnostic();
              }
            } else if (response.status === 403) {
              errorMessage = "Access forbidden. You don't have permission to access these menus.";
            } else if (response.status >= 500) {
              errorMessage = "Server error. Please try again later.";
            }
            
            toast.error(errorMessage);
          }
        } catch (fetchError) {
          console.error('MenuBuilder: Network error while fetching menus:', fetchError);
          toast.error("Network error. Please check your connection and try again.");
        }
      }
    } catch (error) {
      console.error("Error loading menu:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("Image size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setBackgroundSettings(prev => ({
          ...prev,
          type: "custom",
          imageUrl: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundSettingsChange = (key: keyof BackgroundSettings, value: any) => {
    setBackgroundSettings(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) {
      toast.error("Please enter a category name");
      return;
    }

    const newCategory: CustomCategory = {
      id: `category-${Date.now()}`,
      name: newCategoryName.trim(),
      order: customCategories.length,
    };

    setCustomCategories(prev => [...prev, newCategory]);
    setNewCategoryName("");
    toast.success("Category added successfully!");
  };

  const handleDeleteCategory = (categoryId: string) => {
    setCustomCategories(prev => prev.filter(cat => cat.id !== categoryId));
    toast.success("Category deleted successfully!");
  };

  const handleOpenItemDialog = (item?: MenuItem) => {
    if (item) {
      setEditingItem(item);
      setItemName(item.name);
      setItemDescription(item.description);
      setItemPrice(item.price);
      setItemCategory(item.category);
      setItemCustomCategory(item.customCategory || "");
    } else {
      setEditingItem(null);
      setItemName("");
      setItemDescription("");
      setItemPrice("");
      setItemCategory("appetizer");
      setItemCustomCategory("");
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
      customCategory: itemCustomCategory || undefined,
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

  const generateShareableId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleGetLink = async () => {
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

    const validToken = await getValidToken();
    if (!validToken) {
      toast.error("Please log in again");
      navigate("/login");
      return;
    }

    try {
      // Generate a unique shareable ID
      const uniqueId = generateShareableId();
      setShareableId(uniqueId);

      // Save menu with shareable ID
      const menuToSave = {
        ...menuData,
        templateId: selectedTemplate.id,
        primaryColor: selectedTemplate.primaryColor,
        shareableId: uniqueId,
        backgroundSettings: backgroundSettings.type === "custom" ? backgroundSettings : undefined,
      };

      const response = await fetch(
        `https://nyqfsuwxrzrfnrslpgfj.supabase.co/functions/v1/make-server-b6941cdd/menu`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${validToken}`,
          },
          body: JSON.stringify(menuToSave),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to save menu: ${response.status}`);
      }

      const shareableUrl = `${window.location.origin}/menu/${uniqueId}`;
      
      // Copy to clipboard
      await navigator.clipboard.writeText(shareableUrl);
      
      toast.success(`Shareable link copied to clipboard! ${shareableUrl}`);
      
    } catch (error) {
      console.error("Error generating link:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to generate shareable link";
      toast.error(errorMessage);
    }
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
      const validToken = await getValidToken();
      if (!validToken) {
        toast.error("Please log in again");
        setSaving(false);
        navigate("/login");
        return;
      }

      // Ensure menuData has all required fields
      const menuToSave = {
        ...menuData,
        templateId: selectedTemplate.id,
        primaryColor: selectedTemplate.primaryColor,
        backgroundSettings: backgroundSettings.type === "custom" ? backgroundSettings : undefined,
      };

      console.log("Saving menu:", menuToSave);

      const response = await fetch(
        `https://nyqfsuwxrzrfnrslpgfj.supabase.co/functions/v1/make-server-b6941cdd/menu`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${validToken}`,
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

  if (loading || authLoading) {
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
              <img src="/logo.svg" alt="MenuCraft" className="w-8 h-8" />
              <h1 className="text-2xl font-bold text-slate-900">MenuCraft</h1>
            </Link>
            <Button onClick={() => setShowPreview(false)} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </header>
        <div className="container mx-auto px-4 py-8">
          <MenuPreview 
            template={selectedTemplate} 
            menuData={menuData} 
            backgroundSettings={backgroundSettings}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {step === "template" && (
          <TemplateSelector
            templates={oldTemplates}
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
                    <Button
                      onClick={() => setShowBackgroundDialog(true)}
                      variant="outline"
                      className="w-full"
                    >
                      {/* <Settings className="w-4 h-4 mr-2" /> */}
                      Background Settings
                    </Button>
                    <Button
                      onClick={() => setShowCategoryDialog(true)}
                      variant="outline"
                      className="w-full"
                    >
                      {/* <Plus className="w-4 h-4 mr-2" /> */}
                      Manage Categories
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
                    onClick={handleGetLink}
                    variant="outline"
                    className="flex-1"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Get A Link
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
                {useEditablePreview ? (
                  <EditableMenuPreview 
                    template={selectedTemplate} 
                    menuData={menuData} 
                    backgroundSettings={backgroundSettings}
                    onMenuDataChange={setMenuData}
                  />
                ) : useProfessionalPreview ? (
                  <ProfessionalMenuPreview 
                    template={selectedTemplate} 
                    menuData={menuData} 
                  />
                ) : (
                  <MenuPreview 
                    template={selectedTemplate} 
                    menuData={menuData} 
                    backgroundSettings={backgroundSettings}
                  />
                )}
                <div className="mt-4 flex justify-center gap-2">
                  <Button
                    onClick={() => {
                      setUseEditablePreview(!useEditablePreview);
                      setUseProfessionalPreview(false);
                    }}
                    variant="outline"
                    size="sm"
                  >
                    {useEditablePreview ? "Show Simple Preview" : "Show Editable Preview"}
                  </Button>
                  {!useEditablePreview && (
                    <Button
                      onClick={() => setUseProfessionalPreview(!useProfessionalPreview)}
                      variant="outline"
                      size="sm"
                    >
                      {useProfessionalPreview ? "Show Simple Preview" : "Show Professional Preview"}
                    </Button>
                  )}
                </div>
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
                  {customCategories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="itemCustomCategory">Custom Category</Label>
              <Input
                id="itemCustomCategory"
                value={itemCustomCategory}
                onChange={(e) => setItemCustomCategory(e.target.value)}
                placeholder="Enter custom category name"
              />
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

      {/* Background Settings Dialog */}
      <Dialog open={showBackgroundDialog} onOpenChange={setShowBackgroundDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Background Settings</DialogTitle>
            <DialogDescription>
              Customize your menu background with an image and adjust properties
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {/* Image Upload */}
            <div className="space-y-2">
              <Label htmlFor="backgroundImage">Background Image</Label>
              <div className="flex items-center space-x-4">
                <Input
                  id="backgroundImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="flex-1"
                />
                {backgroundSettings.imageUrl && (
                  <Button
                    variant="outline"
                    onClick={() => handleBackgroundSettingsChange("imageUrl", undefined)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
              {backgroundSettings.imageUrl && (
                <div className="mt-2">
                  <img
                    src={backgroundSettings.imageUrl}
                    alt="Background preview"
                    className="w-full h-32 object-cover rounded-lg border"
                  />
                </div>
              )}
            </div>

            {/* Background Type */}
            <div className="space-y-2">
              <Label>Background Type</Label>
              <Select
                value={backgroundSettings.type}
                onValueChange={(value) => handleBackgroundSettingsChange("type", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="template">Use Template Background</SelectItem>
                  <SelectItem value="custom">Use Custom Image</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Size */}
            <div className="space-y-2">
              <Label>Size</Label>
              <Select
                value={backgroundSettings.size}
                onValueChange={(value) => handleBackgroundSettingsChange("size", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cover">Cover (fills entire background)</SelectItem>
                  <SelectItem value="contain">Contain (fits image within background)</SelectItem>
                  <SelectItem value="stretch">Stretch (stretches image to fill)</SelectItem>
                  <SelectItem value="repeat">Repeat (tiles the image)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Position */}
            <div className="space-y-2">
              <Label>Position</Label>
              <Select
                value={backgroundSettings.position}
                onValueChange={(value) => handleBackgroundSettingsChange("position", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="top">Top</SelectItem>
                  <SelectItem value="bottom">Bottom</SelectItem>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                  <SelectItem value="top-left">Top Left</SelectItem>
                  <SelectItem value="top-right">Top Right</SelectItem>
                  <SelectItem value="bottom-left">Bottom Left</SelectItem>
                  <SelectItem value="bottom-right">Bottom Right</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Opacity */}
            <div className="space-y-2">
              <Label htmlFor="opacity">Opacity: {backgroundSettings.opacity}%</Label>
              <Input
                id="opacity"
                type="range"
                min="0"
                max="100"
                value={backgroundSettings.opacity}
                onChange={(e) => handleBackgroundSettingsChange("opacity", parseInt(e.target.value))}
              />
            </div>

            {/* Brightness */}
            <div className="space-y-2">
              <Label htmlFor="brightness">Brightness: {backgroundSettings.brightness}%</Label>
              <Input
                id="brightness"
                type="range"
                min="50"
                max="150"
                value={backgroundSettings.brightness}
                onChange={(e) => handleBackgroundSettingsChange("brightness", parseInt(e.target.value))}
              />
            </div>

            {/* Blur */}
            <div className="space-y-2">
              <Label htmlFor="blur">Blur: {backgroundSettings.blur}px</Label>
              <Input
                id="blur"
                type="range"
                min="0"
                max="10"
                value={backgroundSettings.blur}
                onChange={(e) => handleBackgroundSettingsChange("blur", parseInt(e.target.value))}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                onClick={() => setShowBackgroundDialog(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={() => setShowBackgroundDialog(false)}
                className="flex-1 bg-orange-600 hover:bg-orange-700"
              >
                Apply Settings
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Category Management Dialog */}
      <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Manage Categories</DialogTitle>
            <DialogDescription>
              Create and manage custom categories for your menu items
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {/* Add New Category */}
            <div className="space-y-2">
              <Label htmlFor="newCategoryName">New Category Name</Label>
              <div className="flex gap-2">
                <Input
                  id="newCategoryName"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="e.g., Desserts"
                  className="flex-1"
                />
                <Button
                  onClick={handleAddCategory}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Existing Categories */}
            <div className="space-y-2">
              <Label>Existing Categories</Label>
              {customCategories.length === 0 ? (
                <p className="text-sm text-gray-500">No custom categories yet. Add one above!</p>
              ) : (
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {customCategories.map((category) => (
                    <div key={category.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{category.name}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                onClick={() => setShowCategoryDialog(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
