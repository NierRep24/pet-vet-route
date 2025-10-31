import { useState } from "react";
import { MapPin, Clock, DollarSign, Dog, Cat, Weight, Phone, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

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

  const handleAcceptTrip = (trip: TripRequest) => {
    setActiveTrip(trip);
    setRequests(requests.filter((r) => r.id !== trip.id));
    toast.success(`Viaje aceptado: ${trip.clientName}`);
  };

  const handleRejectTrip = (tripId: string) => {
    setRequests(requests.filter((r) => r.id !== tripId));
    toast.info("Viaje rechazado");
  };

  const handleCompleteTrip = () => {
    toast.success("¡Viaje completado exitosamente!");
    setActiveTrip(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      <header className="bg-card shadow-soft border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">Panel de Conductor</h1>
            <Badge className="bg-status-online">En Línea</Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Active Trip */}
        {activeTrip && (
          <Card className="p-6 bg-gradient-primary border-primary animate-slide-up">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Viaje en Curso</h2>
                <Badge variant="secondary">Activo</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Información del Cliente</h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="text-muted-foreground">Nombre:</span>{" "}
                        <span className="font-medium">{activeTrip.clientName}</span>
                      </p>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{activeTrip.clientPhone}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Ruta</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-muted-foreground text-xs">Recoger en:</p>
                          <p className="font-medium">{activeTrip.pickup}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Navigation className="h-4 w-4 text-status-online flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-muted-foreground text-xs">Destino:</p>
                          <p className="font-medium">{activeTrip.destination}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Información de la Mascota</h3>
                    <div className="flex items-start gap-4 p-4 bg-card rounded-lg">
                      {activeTrip.petType === "dog" ? (
                        <Dog className="h-10 w-10 text-primary flex-shrink-0" />
                      ) : (
                        <Cat className="h-10 w-10 text-primary flex-shrink-0" />
                      )}
                      <div className="space-y-1">
                        <p className="font-medium">{activeTrip.breed}</p>
                        <p className="text-sm text-muted-foreground">
                          {activeTrip.petType === "dog" ? "Perro" : "Gato"}
                        </p>
                        <div className="flex items-center gap-1 text-sm">
                          <Weight className="h-3 w-3" />
                          <span>{activeTrip.weight} kg</span>
                        </div>
                      </div>
                    </div>
                    {activeTrip.notes && (
                      <div className="mt-3 p-3 bg-accent/50 rounded-lg text-sm">
                        <p className="text-muted-foreground text-xs mb-1">Notas:</p>
                        <p>{activeTrip.notes}</p>
                      </div>
                    )}
                  </div>

                  <div className="p-4 bg-card rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Tarifa del viaje:</span>
                      <span className="text-2xl font-bold text-primary">${activeTrip.fare}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{activeTrip.distance} km</span>
                      {activeTrip.isNightTime && (
                        <Badge variant="secondary" className="text-xs">Tarifa nocturna</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <Button onClick={handleCompleteTrip} variant="status" size="lg" className="w-full">
                Completar Viaje
              </Button>
            </div>
          </Card>
        )}

        {/* Trip Requests */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Solicitudes Disponibles ({requests.length})
          </h2>

          {requests.length === 0 && !activeTrip && (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">No hay solicitudes disponibles en este momento</p>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {requests.map((request) => (
              <Card key={request.id} className="p-6 hover:shadow-medium transition-all animate-fade-in">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{request.clientName}</h3>
                      <p className="text-sm text-muted-foreground">{request.clientPhone}</p>
                    </div>
                    {request.isNightTime && (
                      <Badge className="bg-status-extended">Nocturno</Badge>
                    )}
                  </div>

                  <div className="flex items-start gap-4 p-3 bg-accent/30 rounded-lg">
                    {request.petType === "dog" ? (
                      <Dog className="h-8 w-8 text-primary flex-shrink-0" />
                    ) : (
                      <Cat className="h-8 w-8 text-primary flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">{request.breed}</p>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                        <span>{request.petType === "dog" ? "Perro" : "Gato"}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Weight className="h-3 w-3" />
                          <span>{request.weight} kg</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">Recoger:</p>
                        <p>{request.pickup}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Navigation className="h-4 w-4 text-status-online flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">Destino:</p>
                        <p>{request.destination}</p>
                      </div>
                    </div>
                  </div>

                  {request.notes && (
                    <div className="p-3 bg-muted/50 rounded text-sm">
                      <p className="text-xs text-muted-foreground mb-1">Notas:</p>
                      <p>{request.notes}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                    <div>
                      <p className="text-xs text-muted-foreground">Tarifa estimada</p>
                      <p className="text-2xl font-bold text-primary">${request.fare}</p>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{request.distance} km</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => handleRejectTrip(request.id)}
                      className="flex-1"
                    >
                      Rechazar
                    </Button>
                    <Button
                      onClick={() => handleAcceptTrip(request)}
                      disabled={!!activeTrip}
                      className="flex-1"
                    >
                      Aceptar Viaje
                    </Button>
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

export default Driver;
