import { Dog, Cat } from "lucide-react";
import { Card } from "@/components/ui/card";
import dogIcon from "@/assets/dog-icon.png";
import catIcon from "@/assets/cat-icon.png";

interface PetSelectorProps {
  selectedType: "dog" | "cat" | "";
  onSelect: (type: "dog" | "cat") => void;
}

const PetSelector = ({ selectedType, onSelect }: PetSelectorProps) => {
  return (
    <div>
      <label className="text-sm font-medium mb-3 block">Tipo de Mascota</label>
      <div className="grid grid-cols-2 gap-4">
        <Card
          className={`p-6 cursor-pointer transition-all hover:shadow-medium ${
            selectedType === "dog"
              ? "border-primary border-2 bg-primary/5 shadow-medium"
              : "border-border hover:border-primary/50"
          }`}
          onClick={() => onSelect("dog")}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <img src={dogIcon} alt="Perro" className="h-16 w-16 object-contain" />
              {selectedType === "dog" && (
                <div className="absolute -top-1 -right-1 h-6 w-6 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground text-xs">✓</span>
                </div>
              )}
            </div>
            <div className="text-center">
              <p className="font-semibold">Perro</p>
              <p className="text-xs text-muted-foreground">Dog</p>
            </div>
          </div>
        </Card>

        <Card
          className={`p-6 cursor-pointer transition-all hover:shadow-medium ${
            selectedType === "cat"
              ? "border-primary border-2 bg-primary/5 shadow-medium"
              : "border-border hover:border-primary/50"
          }`}
          onClick={() => onSelect("cat")}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <img src={catIcon} alt="Gato" className="h-16 w-16 object-contain" />
              {selectedType === "cat" && (
                <div className="absolute -top-1 -right-1 h-6 w-6 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground text-xs">✓</span>
                </div>
              )}
            </div>
            <div className="text-center">
              <p className="font-semibold">Gato</p>
              <p className="text-xs text-muted-foreground">Cat</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PetSelector;
