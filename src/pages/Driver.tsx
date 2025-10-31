import { useState } from "react";
import { MapPin, Phone, Navigation, Menu, DollarSign, Weight, Dog, Cat, Clock, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import MapBackground from "@/components/MapBackground";
import FloatingCard from "@/components/FloatingCard";

interface TripRequest {
  id: string;
  clientName: string;
  clientPhone: string;
  petType: "dog" | "cat";
  breed: string;
  weight: number;
  pickup: string;
  destination: string;
  distance: number;
  fare: number;
  notes?: string;
  isNightTime: boolean;
}

const mockRequests: TripRequest[] = [
  {
    id: "1",
    clientName: "María González",
    clientPhone: "+52 123 456 7890",
    petType: "dog",
    breed: "Golden Retriever",
    weight: 28,
    pickup: "Calle Norte 123",
    destination: "Clínica Veterinaria San Pedro",
    distance: 5.2,
    fare: 180,
    notes: "Perro muy tranquilo, usa correa azul",
    isNightTime: false,
  },
  {
    id: "2",
    clientName: "Carlos Ramírez",
    clientPhone: "+52 987 654 3210",
    petType: "cat",
    breed: "Siamés",
    weight: 4.5,
    pickup: "Av. Central 456",
    destination: "Hospital Veterinario 24hrs",
    distance: 8.5,
    fare: 320,
    notes: "Gato nervioso, mantener transportadora cerrada",
    isNightTime: true,
  },
];

const Driver = () => {
  const [requests, setRequests] = useState<TripRequest[]>(mockRequests);
  const [activeTrip, setActiveTrip] = useState<TripRequest | null>(null);
  const [showDetails, setShowDetails] = useState<string | null>(null);

  const handleAcceptTrip = (trip: TripRequest) => {
    setActiveTrip(trip);
    setRequests(requests.filter((r) => r.id !== trip.id));
    setShowDetails(null);
    toast.success(`Viaje aceptado: ${trip.clientName}`);
  };

  const handleRejectTrip = (tripId: string) => {
    setRequests(requests.filter((r) => r.id !== tripId));
    setShowDetails(null);
    toast.info("Viaje rechazado");
  };

  const handleCompleteTrip = () => {
    toast.success("¡Viaje completado exitosamente!");
    setActiveTrip(null);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <MapBackground showVeterinaries showVehicles />

      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md shadow-soft">
        <div className="flex items-center justify-between px-4 py-3">
          <button className="p-2 hover:bg-accent rounded-lg transition-colors">
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-2">
            <Badge className="bg-status-online text-white px-3 py-1">En Línea</Badge>
          </div>
          <button className="p-2 hover:bg-accent rounded-full transition-colors">
            <UserIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Active Trip Indicator */}
      {activeTrip && (
        <div className="fixed top-20 left-4 right-4 z-40">
          <Card className="p-4 bg-primary/10 border-primary shadow-large">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center animate-pulse">
                  <Navigation className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold">{activeTrip.clientName}</p>
                  <p className="text-xs text-muted-foreground">En camino...</p>
                </div>
              </div>
              <Button onClick={handleCompleteTrip} size="sm" variant="default">
                Completar
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Trip Requests - Uber-style cards */}
      {!activeTrip && requests.length > 0 && (
        <FloatingCard position="bottom" size="md">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Nuevas Solicitudes</h2>
              <Badge variant="secondary">{requests.length}</Badge>
            </div>

            <div className="space-y-3 max-h-[50vh] overflow-y-auto">
              {requests.map((request) => (
                <Card
                  key={request.id}
                  className="p-4 border-0 bg-accent/30 hover:bg-accent/50 transition-all cursor-pointer"
                  onClick={() => setShowDetails(showDetails === request.id ? null : request.id)}
                >
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {request.petType === "dog" ? (
                          <Dog className="h-8 w-8 text-primary" />
                        ) : (
                          <Cat className="h-8 w-8 text-primary" />
                        )}
                        <div>
                          <p className="font-semibold">{request.breed}</p>
                          <p className="text-xs text-muted-foreground">{request.weight} kg</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary">${request.fare}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{request.distance} km</span>
                        </div>
                      </div>
                    </div>

                    {/* Route Info */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground">Recoger</p>
                          <p className="font-medium">{request.pickup}</p>
                        </div>
                      </div>
                      <div className="ml-1 border-l-2 border-dashed border-muted h-4" />
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-status-online flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground">Destino</p>
                          <p className="font-medium">{request.destination}</p>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {showDetails === request.id && (
                      <div className="space-y-3 pt-3 border-t animate-fade-in">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{request.clientName}</span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-muted-foreground">{request.clientPhone}</span>
                        </div>

                        {request.notes && (
                          <div className="p-3 bg-muted/50 rounded-lg text-sm">
                            <p className="text-xs text-muted-foreground mb-1">Notas:</p>
                            <p>{request.notes}</p>
                          </div>
                        )}

                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRejectTrip(request.id);
                            }}
                            className="flex-1 h-12 rounded-xl"
                          >
                            Rechazar
                          </Button>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAcceptTrip(request);
                            }}
                            className="flex-1 h-12 rounded-xl"
                          >
                            Aceptar
                          </Button>
                        </div>
                      </div>
                    )}

                    {!showDetails && (
                      <p className="text-xs text-center text-muted-foreground">
                        Toca para ver detalles
                      </p>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </FloatingCard>
      )}

      {/* No requests state */}
      {!activeTrip && requests.length === 0 && (
        <FloatingCard position="center" size="sm">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <Navigation className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Todo listo</h3>
            <p className="text-muted-foreground">
              No hay solicitudes en este momento
            </p>
          </div>
        </FloatingCard>
      )}

      {/* Active Trip Details */}
      {activeTrip && (
        <FloatingCard position="bottom" size="lg">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-1">Viaje en Curso</h2>
              <Badge className="bg-primary">Activo</Badge>
            </div>

            {/* Pet Info */}
            <Card className="p-4 bg-accent/30 border-0">
              <div className="flex items-center gap-4">
                {activeTrip.petType === "dog" ? (
                  <Dog className="h-12 w-12 text-primary" />
                ) : (
                  <Cat className="h-12 w-12 text-primary" />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{activeTrip.breed}</h3>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span>{activeTrip.petType === "dog" ? "Perro" : "Gato"}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Weight className="h-3 w-3" />
                      <span>{activeTrip.weight} kg</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">${activeTrip.fare}</p>
                </div>
              </div>
            </Card>

            {/* Client Info */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Cliente</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <UserIcon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{activeTrip.clientName}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-3 w-3" />
                    <span>{activeTrip.clientPhone}</span>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="rounded-full">
                  Llamar
                </Button>
              </div>
            </div>

            {/* Route */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">Ruta</p>
              <div className="space-y-2">
                <div className="flex items-start gap-3 p-3 bg-accent/20 rounded-xl">
                  <div className="w-3 h-3 rounded-full bg-primary mt-1" />
                  <div>
                    <p className="text-xs text-muted-foreground">Recoger en</p>
                    <p className="font-medium">{activeTrip.pickup}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-accent/20 rounded-xl">
                  <MapPin className="h-5 w-5 text-status-online flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Destino</p>
                    <p className="font-medium">{activeTrip.destination}</p>
                  </div>
                </div>
              </div>
            </div>

            {activeTrip.notes && (
              <div className="p-4 bg-muted/50 rounded-xl">
                <p className="text-xs text-muted-foreground mb-2">Notas importantes:</p>
                <p className="text-sm">{activeTrip.notes}</p>
              </div>
            )}

            <Button 
              onClick={handleCompleteTrip} 
              size="lg" 
              className="w-full h-14 text-base rounded-xl bg-status-online hover:bg-status-online/90"
            >
              Completar Viaje
            </Button>
          </div>
        </FloatingCard>
      )}
    </div>
  );
};

export default Driver;
