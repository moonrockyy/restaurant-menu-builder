import { useState, useCallback, useRef } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Card } from "./ui/card";
import { type Template, type MenuData, type BackgroundSettings, type MenuItem } from "../types/menu";

interface EditableMenuPreviewProps {
  template: Template;
  menuData: MenuData;
  backgroundSettings?: BackgroundSettings;
  onMenuDataChange?: (menuData: MenuData) => void;
}

const ItemType = {
  MENU_ITEM: 'menu_item',
};

interface DraggableMenuItemProps {
  item: MenuItem;
  index: number;
  template: Template;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  onItemEdit: (itemId: string, field: keyof MenuItem, value: string) => void;
}

const DraggableMenuItem: React.FC<DraggableMenuItemProps> = ({ 
  item, 
  index, 
  template, 
  moveItem, 
  onItemEdit 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editField, setEditField] = useState<'name' | 'description' | null>(null);
  const [editValue, setEditValue] = useState('');

  const [{ isDragging }, drag] = useDrag({
    type: ItemType.MENU_ITEM,
    item: { id: item.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType.MENU_ITEM,
    hover: (item: { index: number }, monitor) => {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  const handleDoubleClick = (field: 'name' | 'description') => {
    setEditField(field);
    setEditValue(field === 'name' ? item.name : item.description || '');
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editField && editValue.trim()) {
      onItemEdit(item.id, editField, editValue.trim());
    }
    setIsEditing(false);
    setEditField(null);
    setEditValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditField(null);
      setEditValue('');
    }
  };

  return (
    <div
      ref={ref}
      className={`flex justify-between items-start gap-4 transition-opacity ${isDragging ? 'opacity-50' : 'opacity-100'}`}
      style={{ cursor: 'move' }}
    >
      <div className="flex-1">
        <div className="flex items-baseline gap-3 mb-2">
          {isEditing && editField === 'name' ? (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={handleSave}
              onKeyDown={handleKeyDown}
              className="text-xl font-semibold bg-transparent border-b-2 border-blue-500 outline-none"
              style={{ 
                color: template.textColor, 
                fontFamily: template.fontFamily || "inherit" 
              }}
              autoFocus
            />
          ) : (
            <h3
              className="text-xl font-semibold cursor-text hover:bg-gray-100 px-1 rounded"
              style={{ 
                color: template.textColor, 
                fontFamily: template.fontFamily || "inherit" 
              }}
              onDoubleClick={() => handleDoubleClick('name')}
              title="Double-click to edit"
            >
              {item.name}
            </h3>
          )}
          <div
            className="flex-1 border-b-2 border-dotted"
            style={{
              borderColor: template.textColor,
              opacity: 0.2,
            }}
          />
        </div>
        {isEditing && editField === 'description' ? (
          <textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="text-sm md:text-base bg-transparent border-b-2 border-blue-500 outline-none w-full resize-none"
            style={{
              color: template.textColor,
              opacity: 0.7,
              fontFamily: template.fontFamily || "inherit",
            }}
            rows={2}
            autoFocus
          />
        ) : item.description ? (
          <p
            className="text-sm md:text-base cursor-text hover:bg-gray-100 px-1 rounded"
            style={{
              color: template.textColor,
              opacity: 0.7,
              fontFamily: template.fontFamily || "inherit",
            }}
            onDoubleClick={() => handleDoubleClick('description')}
            title="Double-click to edit"
          >
            {item.description}
          </p>
        ) : (
          <p
            className="text-sm md:text-base cursor-text hover:bg-gray-100 px-1 rounded opacity-50"
            style={{
              color: template.textColor,
              fontFamily: template.fontFamily || "inherit",
            }}
            onDoubleClick={() => handleDoubleClick('description')}
            title="Double-click to add description"
          >
            Click to add description...
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
  );
};

export function EditableMenuPreview({ 
  template, 
  menuData, 
  backgroundSettings, 
  onMenuDataChange 
}: EditableMenuPreviewProps) {
  const [isEditingBusiness, setIsEditingBusiness] = useState(false);
  const [editField, setEditField] = useState<'name' | 'description' | null>(null);
  const [editValue, setEditValue] = useState('');

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

  const moveItem = useCallback((dragIndex: number, hoverIndex: number, category: string) => {
    const newItems = [...groupedItems[category]];
    const draggedItem = newItems[dragIndex];
    newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, draggedItem);

    const updatedMenuData = {
      ...menuData,
      items: menuData.items.map(item => {
        if (item.category === category) {
          const categoryItems = newItems;
          return categoryItems.find(newItem => newItem.id === item.id) || item;
        }
        return item;
      })
    };

    onMenuDataChange?.(updatedMenuData);
  }, [menuData, groupedItems, onMenuDataChange]);

  const handleBusinessEdit = (field: 'name' | 'description') => {
    setEditField(field);
    setEditValue(field === 'name' ? menuData.businessName : menuData.businessDescription || '');
    setIsEditingBusiness(true);
  };

  const handleBusinessSave = () => {
    if (editField && editValue.trim()) {
      const updatedMenuData = {
        ...menuData,
        [editField === 'name' ? 'businessName' : 'businessDescription']: editValue.trim()
      };
      onMenuDataChange?.(updatedMenuData);
    }
    setIsEditingBusiness(false);
    setEditField(null);
    setEditValue('');
  };

  const handleBusinessKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleBusinessSave();
    } else if (e.key === 'Escape') {
      setIsEditingBusiness(false);
      setEditField(null);
      setEditValue('');
    }
  };

  const handleItemEdit = (itemId: string, field: keyof MenuItem, value: string) => {
    const updatedMenuData = {
      ...menuData,
      items: menuData.items.map(item =>
        item.id === itemId ? { ...item, [field]: value } : item
      )
    };
    onMenuDataChange?.(updatedMenuData);
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
    <DndProvider backend={HTML5Backend}>
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
            {isEditingBusiness && editField === 'name' ? (
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={handleBusinessSave}
                onKeyDown={handleBusinessKeyDown}
                className="text-4xl md:text-5xl font-bold bg-transparent border-b-2 border-blue-500 outline-none text-center mb-4"
                style={{ 
                  color: template.primaryColor, 
                  fontFamily: template.fontFamily || "inherit" 
                }}
                autoFocus
              />
            ) : (
              <h1
                className="text-4xl md:text-5xl font-bold mb-4 cursor-text hover:bg-gray-100 px-2 rounded inline-block"
                style={{ 
                  color: template.primaryColor, 
                  fontFamily: template.fontFamily || "inherit" 
                }}
                onDoubleClick={() => handleBusinessEdit('name')}
                title="Double-click to edit"
              >
                {menuData.businessName || "Your Business Name"}
              </h1>
            )}
            
            {isEditingBusiness && editField === 'description' ? (
              <textarea
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={handleBusinessSave}
                onKeyDown={handleBusinessKeyDown}
                className="text-lg md:text-xl max-w-2xl mx-auto bg-transparent border-b-2 border-blue-500 outline-none text-center resize-none"
                style={{ 
                  color: template.textColor, 
                  opacity: 0.8, 
                  fontFamily: template.fontFamily || "inherit" 
                }}
                rows={2}
                autoFocus
              />
            ) : menuData.businessDescription || isEditingBusiness ? (
              <p
                className="text-lg md:text-xl max-w-2xl mx-auto cursor-text hover:bg-gray-100 px-2 rounded inline-block"
                style={{ 
                  color: template.textColor, 
                  opacity: 0.8, 
                  fontFamily: template.fontFamily || "inherit" 
                }}
                onDoubleClick={() => handleBusinessEdit('description')}
                title="Double-click to edit"
              >
                {menuData.businessDescription || "Your business description"}
              </p>
            ) : (
              <p
                className="text-lg md:text-xl max-w-2xl mx-auto cursor-text hover:bg-gray-100 px-2 rounded inline-block opacity-50"
                style={{ 
                  color: template.textColor, 
                  fontFamily: template.fontFamily || "inherit" 
                }}
                onDoubleClick={() => handleBusinessEdit('description')}
                title="Double-click to add description"
              >
                Click to add business description...
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
                    {groupedItems[category].map((item, index) => (
                      <DraggableMenuItem
                        key={item.id}
                        item={item}
                        index={index}
                        template={template}
                        moveItem={(dragIndex, hoverIndex) => moveItem(dragIndex, hoverIndex, category)}
                        onItemEdit={handleItemEdit}
                      />
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
    </DndProvider>
  );
}
