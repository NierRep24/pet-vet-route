import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Veterinary {
  id: string;
  name: string;
  address: string;
  distance: number;
  status: "online" | "offline" | "extended";
  accepts: string[];
  rating: number;
}

interface VeterinaryMapProps {
  veterinaries: Veterinary[];
}

const VeterinaryMap = ({ veterinaries }: VeterinaryMapProps) => {
  const getStatusColor = (status: "online" | "offline" | "extended") => {
    switch (status) {
      case "online":
        return "bg-status-online";
      case "offline":
        return "bg-status-offline";
      case "extended":
        return "bg-status-extended";
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative h-[400px] bg-gradient-to-br from-accent/30 to-primary/20">
        {/* Mapa simulado con marcadores */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="relative w-full h-full">
            {/* Grid background to simulate map */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Veterinary markers */}
            {veterinaries.map((vet, index) => (
              <div
                key={vet.id}
                className="absolute animate-bounce-subtle"
                style={{
                  top: `${20 + index * 25}%`,
                  left: `${25 + index * 20}%`,
                  animationDelay: `${index * 0.2}s`,
                }}
              >
                <div className="relative group cursor-pointer">
                  <div
                    className={`${getStatusColor(
                      vet.status
                    )} w-6 h-6 rounded-full flex items-center justify-center shadow-large border-2 border-card`}
                  >
                    <MapPin className="h-4 w-4 text-card" />
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    <div className="bg-card border border-border rounded-lg shadow-large p-3 whitespace-nowrap">
                      <p className="font-semibold text-sm">{vet.name}</p>
                      <p className="text-xs text-muted-foreground">{vet.distance} km</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Current location marker */}
            <div
              className="absolute animate-pulse"
              style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
            >
              <div className="w-4 h-4 bg-primary rounded-full border-4 border-primary-foreground shadow-large" />
            </div>
          </div>
        </div>

        {/* Map legend */}
        <div className="absolute bottom-4 right-4 bg-card/95 backdrop-blur-sm p-4 rounded-lg shadow-medium">
          <p className="text-xs font-semibold mb-2">Estado de Veterinarias</p>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-status-online" />
              <span>Abierto</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-status-offline" />
              <span>Cerrado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-status-extended" />
              <span>24 Horas</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VeterinaryMap;
