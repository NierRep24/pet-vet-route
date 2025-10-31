import { useState } from "react";
import { MapPin, Clock, Search, Menu, User as UserIcon, ChevronRight, PawPrint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import MapBackground from "@/components/MapBackground";
import FloatingCard from "@/components/FloatingCard";
import PetSelector from "@/components/PetSelector";
import PriceEstimator from "@/components/PriceEstimator";

interface Veterinary {
  id: string;
  name: string;
  address: string;
  distance: number;
  status: "online" | "offline" | "extended";
  accepts: string[];
  rating: number;
}

const mockVeterinaries: Veterinary[] = [
  {
    id: "1",
    name: "Clínica Veterinaria San Pedro",
    address: "Av. Principal 123",
    distance: 2.5,
    status: "online",
    accepts: ["Perros", "Gatos", "Aves"],
    rating: 4.8,
  },
  {
    id: "2",
    name: "Hospital Veterinario 24hrs",
    address: "Calle Central 456",
    distance: 3.8,
    status: "extended",
    accepts: ["Perros", "Gatos", "Exóticos"],
    rating: 4.9,
  },
  {
    id: "3",
    name: "VetCare Center",
    address: "Blvd. Norte 789",
    distance: 5.2,
    status: "offline",
    accepts: ["Perros", "Gatos"],
    rating: 4.6,
  },
];

const User = () => {
  const [step, setStep] = useState<"select-vet" | "pet-details" | "confirm">("select-vet");
  const [selectedVet, setSelectedVet] = useState<Veterinary | null>(null);
  const [petType, setPetType] = useState<"dog" | "cat" | "">("");
  const [petDetails, setPetDetails] = useState({
    breed: "",
    weight: "",
    notes: "",
  });

  const handleVetSelect = (vet: Veterinary) => {
    setSelectedVet(vet);
    setStep("pet-details");
    toast.success(`Veterinaria seleccionada: ${vet.name}`);
  };

  const handlePetDetailsSubmit = () => {
    if (!petType || !petDetails.breed || !petDetails.weight) {
      toast.error("Por favor completa todos los campos");
      return;
    }
    setStep("confirm");
  };

  const handleConfirmTrip = () => {
    toast.success("¡Viaje solicitado exitosamente! Un conductor será asignado pronto.");
    setTimeout(() => {
      setStep("select-vet");
      setSelectedVet(null);
      setPetType("");
      setPetDetails({ breed: "", weight: "", notes: "" });
    }, 2000);
  };

  const getStatusBadge = (status: "online" | "offline" | "extended") => {
    const variants = {
      online: { label: "Abierto", className: "bg-status-online text-white" },
      offline: { label: "Cerrado", className: "bg-status-offline text-white" },
      extended: { label: "24h", className: "bg-status-extended text-white" },
    };
    return variants[status];
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <MapBackground showVeterinaries />

      {/* Top Bar - Uber style */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md shadow-soft">
        <div className="flex items-center justify-between px-4 py-3">
          <button className="p-2 hover:bg-accent rounded-lg transition-colors">
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-2">
            <PawPrint className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">PetTransport</span>
          </div>
          <button className="p-2 hover:bg-accent rounded-full transition-colors">
            <UserIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Search Bar - Fixed below header */}
      {step === "select-vet" && (
        <div className="fixed top-16 left-0 right-0 z-40 px-4 py-3">
          <div className="bg-card rounded-2xl shadow-floating border border-border p-4">
            <div className="flex items-center gap-3">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Buscar veterinaria..."
                className="border-0 focus-visible:ring-0 text-base p-0"
              />
            </div>
          </div>
        </div>
      )}

      {/* Floating Content Cards */}
      {step === "select-vet" && (
        <FloatingCard position="bottom" size="lg">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Veterinarias Cercanas</h2>
            <div className="space-y-3">
              {mockVeterinaries.map((vet) => {
                const status = getStatusBadge(vet.status);
                return (
                  <Card
                    key={vet.id}
                    className="p-4 hover:shadow-medium transition-all cursor-pointer border-0 bg-accent/30"
                    onClick={() => handleVetSelect(vet)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{vet.name}</h3>
                          <Badge className={status.className + " text-xs px-2 py-0.5"}>
                            {status.label}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{vet.distance} km</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-500">★</span>
                            <span>{vet.rating}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {vet.accepts.slice(0, 2).map((animal) => (
                            <span key={animal} className="text-xs text-muted-foreground">
                              {animal}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </FloatingCard>
      )}

      {step === "pet-details" && selectedVet && (
        <FloatingCard position="bottom" size="lg" onClose={() => setStep("select-vet")}>
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-1">Datos de tu Mascota</h2>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {selectedVet.name}
              </p>
            </div>

            <PetSelector
              selectedType={petType}
              onSelect={(type) => setPetType(type)}
            />

            <div className="space-y-4">
              <div>
                <Label htmlFor="breed" className="text-base">Raza</Label>
                <Input
                  id="breed"
                  placeholder="Ej: Golden Retriever"
                  value={petDetails.breed}
                  onChange={(e) => setPetDetails({ ...petDetails, breed: e.target.value })}
                  className="mt-2 h-12 text-base"
                />
              </div>

              <div>
                <Label htmlFor="weight" className="text-base">Peso (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="Ej: 15"
                  value={petDetails.weight}
                  onChange={(e) => setPetDetails({ ...petDetails, weight: e.target.value })}
                  className="mt-2 h-12 text-base"
                />
              </div>

              <div>
                <Label htmlFor="notes" className="text-base">Notas (opcional)</Label>
                <Input
                  id="notes"
                  placeholder="Comportamiento, necesidades especiales..."
                  value={petDetails.notes}
                  onChange={(e) => setPetDetails({ ...petDetails, notes: e.target.value })}
                  className="mt-2 h-12 text-base"
                />
              </div>
            </div>

            <Button 
              onClick={handlePetDetailsSubmit} 
              size="lg" 
              className="w-full h-14 text-base rounded-xl"
            >
              Continuar
            </Button>
          </div>
        </FloatingCard>
      )}

      {step === "confirm" && selectedVet && (
        <FloatingCard position="bottom" size="lg" onClose={() => setStep("pet-details")}>
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Confirmar Viaje</h2>

            <Card className="p-4 bg-accent/30 border-0">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <PawPrint className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{petDetails.breed}</h3>
                  <p className="text-sm text-muted-foreground">
                    {petType === "dog" ? "Perro" : "Gato"} • {petDetails.weight} kg
                  </p>
                </div>
              </div>
            </Card>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 bg-accent/20 rounded-xl">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Destino</p>
                  <p className="font-medium">{selectedVet.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedVet.address}</p>
                </div>
              </div>

              <PriceEstimator distance={selectedVet.distance} />
            </div>

            <Button 
              onClick={handleConfirmTrip} 
              size="lg" 
              className="w-full h-14 text-base rounded-xl bg-primary hover:bg-primary-hover"
            >
              Confirmar y Solicitar
            </Button>
          </div>
        </FloatingCard>
      )}
    </div>
  );
};

export default User;
