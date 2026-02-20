import { useState } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { LayoutTemplate, Plus, Sparkles } from "lucide-react";

interface CreateMenuDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateMenuDialog({ isOpen, onClose }: CreateMenuDialogProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleChooseTemplate = () => {
    onClose();
    navigate("/template-selector");
  };

  const handleCreateFromScratch = () => {
    onClose();
    navigate("/menu-builder");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            {t('createMenuDialog.title')}
          </DialogTitle>
          <DialogDescription className="text-center">
            {t('createMenuDialog.subtitle')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 gap-4 py-6">
          <Button
            onClick={handleChooseTemplate}
            className="h-24 flex flex-col items-center justify-center gap-3 hover:scale-105 transition-transform"
            variant="outline"
          >
            <LayoutTemplate className="h-8 w-8" />
            <span className="font-medium">{t('createMenuDialog.chooseTemplate')}</span>
            <span className="text-sm text-muted-foreground">
              {t('createMenuDialog.templateDescription')}
            </span>
          </Button>
          
          <Button
            onClick={handleCreateFromScratch}
            className="h-24 flex flex-col items-center justify-center gap-3 hover:scale-105 transition-transform"
          >
            <Plus className="h-8 w-8" />
            <span className="font-medium">{t('createMenuDialog.createFromScratch')}</span>
            <span className="text-sm text-muted-foreground">
              {t('createMenuDialog.scratchDescription')}
            </span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
