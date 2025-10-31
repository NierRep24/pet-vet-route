import { MapPin, Navigation } from "lucide-react";
import { ReactNode } from "react";

interface MapBackgroundProps {
  children?: ReactNode;
  showVeterinaries?: boolean;
  showVehicles?: boolean;
  vehiclePositions?: Array<{ id: string; lat: number; lng: number; status: string }>;
}

const MapBackground = ({ 
  children, 
  showVeterinaries = false, 
  showVehicles = false,
  vehiclePositions = []
}: MapBackgroundProps) => {
  return (
    <div className="fixed inset-0 w-full h-full">
      {/* Map Background - Uber-style */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background/50 to-primary/5">
        {/* Grid overlay for map effect */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="map-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path
                  d="M 60 0 L 0 0 0 60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#map-grid)" />
          </svg>
        </div>

        {/* Street-like lines for realism */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="30%" x2="100%" y2="35%" stroke="currentColor" strokeWidth="2" />
          <line x1="0" y1="60%" x2="100%" y2="58%" stroke="currentColor" strokeWidth="3" />
          <line x1="20%" y1="0" x2="25%" y2="100%" stroke="currentColor" strokeWidth="2" />
          <line x1="70%" y1="0" x2="68%" y2="100%" stroke="currentColor" strokeWidth="2" />
        </svg>

        {/* Veterinary markers */}
        {showVeterinaries && (
          <>
            <div className="absolute top-[25%] left-[35%] animate-bounce-subtle" style={{ animationDelay: "0s" }}>
              <div className="w-8 h-8 bg-status-online rounded-full shadow-large border-2 border-card flex items-center justify-center">
                <MapPin className="h-5 w-5 text-card" />
              </div>
            </div>
            <div className="absolute top-[55%] right-[30%] animate-bounce-subtle" style={{ animationDelay: "0.3s" }}>
              <div className="w-8 h-8 bg-status-extended rounded-full shadow-large border-2 border-card flex items-center justify-center">
                <MapPin className="h-5 w-5 text-card" />
              </div>
            </div>
            <div className="absolute bottom-[30%] left-[25%] animate-bounce-subtle" style={{ animationDelay: "0.6s" }}>
              <div className="w-8 h-8 bg-status-offline rounded-full shadow-large border-2 border-card flex items-center justify-center">
                <MapPin className="h-5 w-5 text-card" />
              </div>
            </div>
          </>
        )}

        {/* Vehicle markers */}
        {showVehicles && vehiclePositions.map((vehicle, idx) => (
          <div
            key={vehicle.id}
            className="absolute transition-all duration-1000"
            style={{
              top: `${40 + idx * 15}%`,
              left: `${35 + idx * 20}%`,
            }}
          >
            <div className={`w-10 h-10 rounded-full shadow-large border-2 border-card flex items-center justify-center ${
              vehicle.status === 'in-transit' ? 'bg-primary animate-pulse' : 'bg-status-online'
            }`}>
              <Navigation className="h-5 w-5 text-card" />
            </div>
          </div>
        ))}

        {/* Current location pulse */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="absolute inset-0 w-16 h-16 bg-primary/20 rounded-full animate-ping" />
            <div className="relative w-6 h-6 bg-primary rounded-full border-4 border-card shadow-large" />
          </div>
        </div>
      </div>

      {/* Content overlay */}
      {children}
    </div>
  );
};

export default MapBackground;
