import { Card, CardContent } from "./ui/card";
import { type Template } from "../types/menu";

interface TemplateSelectorProps {
  templates: Template[];
  onSelectTemplate: (template: Template) => void;
}

export function TemplateSelector({ templates, onSelectTemplate }: TemplateSelectorProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">
          Choose Your Template
        </h2>
        <p className="text-slate-600">
          Select a design that matches your business style
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card
            key={template.id}
            className="cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 border-2 hover:border-orange-500"
            onClick={() => onSelectTemplate(template)}
          >
            <CardContent className="pt-6">
              {/* Template Preview */}
              <div
                className="h-48 rounded-lg mb-4 p-6 flex flex-col justify-between"
                style={{ backgroundColor: template.backgroundColor }}
              >
                <div>
                  <div
                    className="text-2xl font-bold mb-2"
                    style={{ color: template.primaryColor }}
                  >
                    Menu
                  </div>
                  <div
                    className="h-2 w-24 rounded"
                    style={{ backgroundColor: template.accentColor }}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div
                      className="h-3 w-32 rounded"
                      style={{ backgroundColor: template.textColor, opacity: 0.7 }}
                    />
                    <div
                      className="h-3 w-12 rounded"
                      style={{ backgroundColor: template.primaryColor, opacity: 0.5 }}
                    />
                  </div>
                  <div
                    className="h-2 w-full rounded"
                    style={{ backgroundColor: template.textColor, opacity: 0.3 }}
                  />
                  <div className="flex justify-between items-center mt-3">
                    <div
                      className="h-3 w-28 rounded"
                      style={{ backgroundColor: template.textColor, opacity: 0.7 }}
                    />
                    <div
                      className="h-3 w-12 rounded"
                      style={{ backgroundColor: template.primaryColor, opacity: 0.5 }}
                    />
                  </div>
                </div>
              </div>

              {/* Template Info */}
              <div>
                <h3 className="text-xl font-semibold mb-1">{template.name}</h3>
                <p className="text-sm text-slate-600 mb-3">{template.description}</p>
                <div className="flex gap-2">
                  <div
                    className="w-6 h-6 rounded-full border-2 border-slate-200"
                    style={{ backgroundColor: template.primaryColor }}
                  />
                  <div
                    className="w-6 h-6 rounded-full border-2 border-slate-200"
                    style={{ backgroundColor: template.accentColor }}
                  />
                  <div
                    className="w-6 h-6 rounded-full border-2 border-slate-200"
                    style={{ backgroundColor: template.backgroundColor }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
