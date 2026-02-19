import { Card } from "./ui/card";
import { type Template, type MenuData, type BackgroundSettings } from "../types/menu";

interface MenuPreviewProps {
  template: Template;
  menuData: MenuData;
  backgroundSettings?: BackgroundSettings;
}

export function MenuPreview({ template, menuData, backgroundSettings }: MenuPreviewProps) {
  // Group items by category
  const groupedItems = menuData.items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof menuData.items>);

  const categories = Object.keys(groupedItems).sort();

  const getCategoryTitle = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1) + "s";
  };

  // Get background styles
  const getBackgroundStyles = () => {
    if (backgroundSettings?.type === "custom" && backgroundSettings.imageUrl) {
      return {
        backgroundImage: `url(${backgroundSettings.imageUrl})`,
        backgroundSize: backgroundSettings.size,
        backgroundPosition: backgroundSettings.position.replace('-', ' '),
        backgroundRepeat: backgroundSettings.size === "repeat" ? "repeat" : "no-repeat",
        opacity: backgroundSettings.opacity / 100,
        filter: `brightness(${backgroundSettings.brightness}%) blur(${backgroundSettings.blur}px)`,
      };
    }
    return {
      backgroundColor: template.backgroundColor,
    };
  };

  return (
    <Card
      className="shadow-2xl overflow-hidden relative"
      style={{ 
        backgroundColor: template.backgroundColor,
        backgroundImage: template.backgroundGradient || (backgroundSettings?.type === "custom" && backgroundSettings.imageUrl ? `url(${backgroundSettings.imageUrl})` : undefined),
        backgroundSize: backgroundSettings?.type === "custom" ? backgroundSettings.size : "cover",
        backgroundPosition: backgroundSettings?.type === "custom" ? backgroundSettings.position.replace('-', ' ') : "center",
        backgroundRepeat: backgroundSettings?.type === "custom" ? (backgroundSettings.size === "repeat" ? "repeat" : "no-repeat") : "no-repeat",
        fontFamily: template.fontFamily || "inherit",
      }}
    >
      {/* Custom Background Layer */}
      {backgroundSettings?.type === "custom" && backgroundSettings.imageUrl && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${backgroundSettings.imageUrl})`,
            backgroundSize: backgroundSettings.size,
            backgroundPosition: backgroundSettings.position.replace('-', ' '),
            backgroundRepeat: backgroundSettings.size === "repeat" ? "repeat" : "no-repeat",
            opacity: backgroundSettings.opacity / 100,
            filter: `brightness(${backgroundSettings.brightness}%) blur(${backgroundSettings.blur}px)`,
          }}
        />
      )}
      <div className="p-8 md:p-12 relative z-10" style={{ fontFamily: template.fontFamily || "inherit" }}>
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: template.primaryColor, fontFamily: template.fontFamily || "inherit" }}
          >
            {menuData.businessName || "Your Business Name"}
          </h1>
          {menuData.businessDescription && (
            <p
              className="text-lg md:text-xl max-w-2xl mx-auto"
              style={{ color: template.textColor, opacity: 0.8, fontFamily: template.fontFamily || "inherit" }}
            >
              {menuData.businessDescription}
            </p>
          )}
          <div
            className="w-24 h-1 mx-auto mt-6 rounded"
            style={{ backgroundColor: template.accentColor }}
          />
        </div>

        {/* Menu Items */}
        {menuData.items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-500 text-lg">
              Your menu items will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {categories.map((category) => (
              <div key={category}>
                <h2
                  className="text-2xl md:text-3xl font-semibold mb-6 pb-2 border-b-2"
                  style={{
                    color: template.primaryColor,
                    borderColor: template.accentColor,
                    fontFamily: template.fontFamily || "inherit",
                  }}
                >
                  {getCategoryTitle(category)}
                </h2>
                <div className="space-y-6">
                  {groupedItems[category].map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-start gap-4"
                    >
                      <div className="flex-1">
                        <div className="flex items-baseline gap-3 mb-2">
                          <h3
                            className="text-xl font-semibold"
                            style={{ color: template.textColor, fontFamily: template.fontFamily || "inherit" }}
                          >
                            {item.name}
                          </h3>
                          <div
                            className="flex-1 border-b-2 border-dotted"
                            style={{
                              borderColor: template.textColor,
                              opacity: 0.2,
                            }}
                          />
                        </div>
                        {item.description && (
                          <p
                            className="text-sm md:text-base"
                            style={{
                              color: template.textColor,
                              opacity: 0.7,
                              fontFamily: template.fontFamily || "inherit",
                            }}
                          >
                            {item.description}
                          </p>
                        )}
                      </div>
                      <div
                        className="text-xl font-bold flex-shrink-0"
                        style={{ color: template.primaryColor, fontFamily: template.fontFamily || "inherit" }}
                      >
                        ${item.price}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        {menuData.items.length > 0 && (
          <div className="mt-12 pt-8 border-t-2" style={{ borderColor: template.accentColor }}>
            <p
              className="text-center text-sm"
              style={{ 
                color: template.textColor, 
                opacity: 0.6, 
                fontFamily: template.fontFamily || "inherit" 
              }}
            >
              Thank you for dining with us
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
