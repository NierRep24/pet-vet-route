import { Car, MapPin } from "lucide-react";

interface Vehicle {
  id: string;
  driver: string;
  status: "available" | "in-transit" | "offline";
  location: { lat: number; lng: number };
  currentTrip?: {
    pickup: string;
    destination: string;
    petType: "dog" | "cat";
    eta: string;
  };
}

interface AdminMapProps {
  vehicles: Vehicle[];
}

const AdminMap = ({ vehicles }: AdminMapProps) => {
  const getStatusColor = (status: "available" | "in-transit" | "offline") => {
    switch (status) {
      case "available":
        return "bg-status-online";
      case "in-transit":
        return "bg-primary";
      case "offline":
        return "bg-status-offline";
    }
  };

  return (
    <div className="relative h-[500px] bg-gradient-to-br from-accent/20 to-primary/10 rounded-lg overflow-hidden">
      {/* Grid background to simulate map */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="admin-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path
                d="M 50 0 L 0 0 0 50"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#admin-grid)" />
        </svg>
      </div>

      {/* Veterinaries - static locations */}
      <div className="absolute top-[20%] left-[30%] group">
        <div className="relative">
          <div className="w-8 h-8 bg-status-online rounded-full flex items-center justify-center shadow-large border-2 border-card animate-pulse">
            <MapPin className="h-5 w-5 text-card" />
          </div>
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-card border border-border rounded-lg shadow-large p-2 whitespace-nowrap text-xs">
              <p className="font-semibold">Clínica San Pedro</p>
              <p className="text-muted-foreground">Abierto</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-[60%] left-[60%] group">
        <div className="relative">
          <div className="w-8 h-8 bg-status-extended rounded-full flex items-center justify-center shadow-large border-2 border-card animate-pulse">
            <MapPin className="h-5 w-5 text-card" />
          </div>
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-card border border-border rounded-lg shadow-large p-2 whitespace-nowrap text-xs">
              <p className="font-semibold">Hospital 24hrs</p>
              <p className="text-muted-foreground">24 Horas</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-[40%] right-[20%] group">
        <div className="relative">
          <div className="w-8 h-8 bg-status-offline rounded-full flex items-center justify-center shadow-large border-2 border-card">
            <MapPin className="h-5 w-5 text-card" />
          </div>
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-card border border-border rounded-lg shadow-large p-2 whitespace-nowrap text-xs">
              <p className="font-semibold">VetCare Center</p>
              <p className="text-muted-foreground">Cerrado</p>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle markers with real-time simulation */}
      {vehicles.map((vehicle, index) => (
        <div
          key={vehicle.id}
          className="absolute transition-all duration-1000 ease-in-out group"
          style={{
            top: `${35 + index * 20}%`,
            left: `${40 + index * 15}%`,
          }}
        >
          <div className="relative">
            <div
              className={`${getStatusColor(
                vehicle.status
              )} w-10 h-10 rounded-full flex items-center justify-center shadow-large border-2 border-card ${
                vehicle.status === "in-transit" ? "animate-pulse" : ""
              }`}
            >
              <Car className="h-5 w-5 text-card" />
            </div>

            {/* Vehicle info tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              <div className="bg-card border border-border rounded-lg shadow-large p-3 whitespace-nowrap min-w-[200px]">
                <p className="font-semibold text-sm">{vehicle.driver}</p>
                <p className="text-xs text-muted-foreground mb-1">ID: {vehicle.id}</p>
                <div className="flex items-center gap-2 text-xs">
                  <div
                    className={`w-2 h-2 rounded-full ${getStatusColor(vehicle.status)}`}
                  />
                  <span>
                    {vehicle.status === "available" && "Disponible"}
                    {vehicle.status === "in-transit" && "En Viaje"}
                    {vehicle.status === "offline" && "Fuera de Línea"}
                  </span>
                </div>
                {vehicle.currentTrip && (
                  <div className="mt-2 pt-2 border-t text-xs">
                    <p className="text-muted-foreground">
                      Destino: {vehicle.currentTrip.destination}
                    </p>
                    <p className="text-muted-foreground">ETA: {vehicle.currentTrip.eta}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Status indicator */}
            {vehicle.status === "in-transit" && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-ping" />
            )}
          </div>
        </div>
      ))}

      {/* Map legend */}
      <div className="absolute bottom-4 right-4 bg-card/95 backdrop-blur-sm p-4 rounded-lg shadow-medium space-y-3">
        <div>
          <p className="text-xs font-semibold mb-2">Estado de Vehículos</p>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <Car className="h-3 w-3 text-status-online" />
              <span>Disponible</span>
            </div>
            <div className="flex items-center gap-2">
              <Car className="h-3 w-3 text-primary" />
              <span>En Viaje</span>
            </div>
            <div className="flex items-center gap-2">
              <Car className="h-3 w-3 text-status-offline" />
              <span>Fuera de Línea</span>
            </div>
          </div>
        </div>
        <div className="border-t pt-3">
          <p className="text-xs font-semibold mb-2">Veterinarias</p>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <MapPin className="h-3 w-3 text-status-online" />
              <span>Abierto</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-3 w-3 text-status-extended" />
              <span>24 Horas</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-3 w-3 text-status-offline" />
              <span>Cerrado</span>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time indicator */}
      <div className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-medium flex items-center gap-2">
        <div className="w-2 h-2 bg-status-online rounded-full animate-pulse" />
        <span className="text-xs font-medium">Tiempo Real</span>
      </div>
    </div>
  );
};

export default AdminMap;
