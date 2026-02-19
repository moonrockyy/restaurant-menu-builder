import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { projectId } from "/utils/supabase/info";
import { templates, type Template, type MenuData } from "../types/menu";
import { MenuPreview } from "../components/MenuPreview";
import { Menu } from "lucide-react";

export default function MenuView() {
  const { slug } = useParams<{ slug: string }>();
  const [loading, setLoading] = useState(true);
  const [menuData, setMenuData] = useState<MenuData | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError("Invalid menu link");
      setLoading(false);
      return;
    }

    fetchMenu();
  }, [slug]);

  const fetchMenu = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b6941cdd/menu/public/${slug}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          setError("Menu not found");
        } else {
          setError("Failed to load menu");
        }
        setLoading(false);
        return;
      }

      const data = await response.json();
      if (data.menu) {
        setMenuData(data.menu);
        const template = templates.find((t) => t.id === data.menu.templateId);
        if (template) {
          setSelectedTemplate(template);
        } else {
          setError("Template not found");
        }
      } else {
        setError("Menu not found");
      }
    } catch (error) {
      console.error("Error fetching menu:", error);
      setError("Failed to load menu");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading menu...</p>
        </div>
      </div>
    );
  }

  if (error || !menuData || !selectedTemplate) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="text-center max-w-md mx-auto px-4">
          <Menu className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Menu Not Found</h1>
          <p className="text-slate-600">{error || "The menu you're looking for doesn't exist."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <MenuPreview template={selectedTemplate} menuData={menuData} />
      </div>
    </div>
  );
}
