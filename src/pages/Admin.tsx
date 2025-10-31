import { useState } from "react";
import { Car, MapPin, Clock, TrendingUp, Users, PawPrint } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AdminMap from "@/components/AdminMap";

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

interface Stats {
  activeTrips: number;
  availableDrivers: number;
  completedToday: number;
  revenue: number;
}

const mockVehicles: Vehicle[] = [
  {
    id: "1",
    driver: "Juan Pérez",
    status: "in-transit",
    location: { lat: 19.432608, lng: -99.133209 },
    currentTrip: {
      pickup: "Calle Norte 123",
      destination: "Clínica San Pedro",
      petType: "dog",
      eta: "15 min",
    },
  },
  {
    id: "2",
    driver: "Ana López",
    status: "available",
    location: { lat: 19.442608, lng: -99.143209 },
  },
  {
    id: "3",
    driver: "Carlos Martínez",
    status: "in-transit",
    location: { lat: 19.422608, lng: -99.123209 },
    currentTrip: {
      pickup: "Av. Central 456",
      destination: "Hospital Veterinario 24hrs",
      petType: "cat",
      eta: "8 min",
    },
  },
];

const mockStats: Stats = {
  activeTrips: 2,
  availableDrivers: 1,
  completedToday: 24,
  revenue: 4850,
};

const Admin = () => {
  const [vehicles] = useState<Vehicle[]>(mockVehicles);
  const [stats] = useState<Stats>(mockStats);

  const getStatusBadge = (status: "available" | "in-transit" | "offline") => {
    const variants = {
      available: { label: "Disponible", className: "bg-status-online" },
      "in-transit": { label: "En Viaje", className: "bg-primary" },
      offline: { label: "Fuera de Línea", className: "bg-status-offline" },
    };
    const variant = variants[status];
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      <header className="bg-card shadow-soft border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PawPrint className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Panel de Administración</h1>
            </div>
            <Badge className="bg-gradient-primary px-4 py-2">Admin</Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6 hover:shadow-medium transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Car className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Viajes Activos</p>
                <p className="text-2xl font-bold">{stats.activeTrips}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-medium transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-status-online/10 rounded-lg">
                <Users className="h-6 w-6 text-status-online" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Conductores Disponibles</p>
                <p className="text-2xl font-bold">{stats.availableDrivers}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-medium transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent rounded-lg">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completados Hoy</p>
                <p className="text-2xl font-bold">{stats.completedToday}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-medium transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-status-extended/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-status-extended" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ingresos Hoy</p>
                <p className="text-2xl font-bold">${stats.revenue}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Map */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Mapa en Tiempo Real</h2>
          <AdminMap vehicles={vehicles} />
        </Card>

        {/* Vehicles List */}
        <div>
          <h2 className="text-xl font-bold mb-4">Vehículos y Conductores</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {vehicles.map((vehicle) => (
              <Card key={vehicle.id} className="p-6 hover:shadow-medium transition-all">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Car className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">{vehicle.driver}</p>
                        <p className="text-xs text-muted-foreground">ID: {vehicle.id}</p>
                      </div>
                    </div>
                    {getStatusBadge(vehicle.status)}
                  </div>

                  {vehicle.currentTrip ? (
                    <div className="space-y-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Viaje en Curso</span>
                        <Badge variant="secondary" className="text-xs">
                          ETA: {vehicle.currentTrip.eta}
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-muted-foreground">Origen:</p>
                            <p>{vehicle.currentTrip.pickup}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-status-online flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-muted-foreground">Destino:</p>
                            <p>{vehicle.currentTrip.destination}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <Badge variant="secondary">
                          {vehicle.currentTrip.petType === "dog" ? "🐕 Perro" : "🐱 Gato"}
                        </Badge>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-muted/30 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">
                        {vehicle.status === "available"
                          ? "Esperando asignación"
                          : "Fuera de servicio"}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>
                      {vehicle.location.lat.toFixed(6)}, {vehicle.location.lng.toFixed(6)}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
