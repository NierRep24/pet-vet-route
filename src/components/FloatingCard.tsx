import { ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingCardProps {
  children: ReactNode;
  className?: string;
  onClose?: () => void;
  position?: "bottom" | "center" | "top";
  size?: "sm" | "md" | "lg" | "xl";
}

const FloatingCard = ({ 
  children, 
  className, 
  onClose,
  position = "bottom",
  size = "md"
}: FloatingCardProps) => {
  const positionClasses = {
    bottom: "bottom-0 left-0 right-0 rounded-t-3xl",
    center: "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-3xl mx-4",
    top: "top-0 left-0 right-0 rounded-b-3xl"
  };

  const sizeClasses = {
    sm: "max-h-[40vh]",
    md: "max-h-[60vh]",
    lg: "max-h-[75vh]",
    xl: "max-h-[90vh]"
  };

  return (
    <div 
      className={cn(
        "fixed bg-card shadow-floating border-t border-border z-40 overflow-auto",
        positionClasses[position],
        sizeClasses[size],
        "animate-slide-up",
        className
      )}
    >
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-accent rounded-full transition-colors z-50"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>
      )}
      
      {/* Drag handle indicator */}
      {position === "bottom" && (
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1.5 bg-muted rounded-full" />
        </div>
      )}
      
      <div className="p-6 pb-8">
        {children}
      </div>
    </div>
  );
};

export default FloatingCard;
