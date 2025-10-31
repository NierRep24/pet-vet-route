import { useState } from "react";
import { MapPin, Clock, DollarSign, PawPrint, Weight, Dog, Cat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import VeterinaryMap from "@/components/VeterinaryMap";
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
    // Reset form
    setTimeout(() => {
      setStep("select-vet");
      setSelectedVet(null);
      setPetType("");
      setPetDetails({ breed: "", weight: "", notes: "" });
    }, 2000);
  };

  const getStatusBadge = (status: "online" | "offline" | "extended") => {
    const variants = {
      online: { label: "Abierto", className: "bg-status-online" },
      offline: { label: "Cerrado", className: "bg-status-offline" },
      extended: { label: "24 Horas", className: "bg-status-extended" },
    };
    const variant = variants[status];
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      <header className="bg-card shadow-soft border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <PawPrint className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">PetTransport</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Progress Steps */}
        <div className="flex justify-center gap-4 mb-8">
          {["select-vet", "pet-details", "confirm"].map((s, idx) => (
            <div
              key={s}
              className={`flex items-center gap-2 ${
                step === s ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === s ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                {idx + 1}
              </div>
              <span className="hidden sm:inline text-sm font-medium">
                {s === "select-vet" && "Seleccionar Veterinaria"}
                {s === "pet-details" && "Datos de Mascota"}
                {s === "confirm" && "Confirmar"}
              </span>
            </div>
          ))}
        </div>

        {/* Step 1: Select Veterinary */}
        {step === "select-vet" && (
          <div className="space-y-6 animate-fade-in">
            <VeterinaryMap veterinaries={mockVeterinaries} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockVeterinaries.map((vet) => (
                <Card
                  key={vet.id}
                  className="p-6 hover:shadow-medium transition-all cursor-pointer"
                  onClick={() => handleVetSelect(vet)}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-lg">{vet.name}</h3>
                      {getStatusBadge(vet.status)}
                    </div>
                    
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{vet.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{vet.distance} km de distancia</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Atiende:</p>
                      <div className="flex flex-wrap gap-2">
                        {vet.accepts.map((animal) => (
                          <Badge key={animal} variant="secondary" className="text-xs">
                            {animal}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-yellow-500">★</span>
                      <span className="font-medium">{vet.rating}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Pet Details */}
        {step === "pet-details" && selectedVet && (
          <div className="max-w-2xl mx-auto space-y-6 animate-slide-up">
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Datos de tu Mascota</h2>
                  <p className="text-muted-foreground">
                    Destino: <span className="font-medium text-foreground">{selectedVet.name}</span>
                  </p>
                </div>

                <PetSelector
                  selectedType={petType}
                  onSelect={(type) => setPetType(type)}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="breed">Raza</Label>
                    <Input
                      id="breed"
                      placeholder="Ej: Golden Retriever"
                      value={petDetails.breed}
                      onChange={(e) => setPetDetails({ ...petDetails, breed: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="weight">Peso (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="Ej: 15"
                      value={petDetails.weight}
                      onChange={(e) => setPetDetails({ ...petDetails, weight: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Notas adicionales (opcional)</Label>
                  <Input
                    id="notes"
                    placeholder="Comportamiento, necesidades especiales, etc."
                    value={petDetails.notes}
                    onChange={(e) => setPetDetails({ ...petDetails, notes: e.target.value })}
                  />
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep("select-vet")} className="flex-1">
                    Volver
                  </Button>
                  <Button onClick={handlePetDetailsSubmit} className="flex-1">
                    Continuar
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Step 3: Confirm Trip */}
        {step === "confirm" && selectedVet && (
          <div className="max-w-2xl mx-auto space-y-6 animate-slide-up">
            <Card className="p-6">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Confirmar Viaje</h2>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-accent/50 rounded-lg">
                    {petType === "dog" ? (
                      <Dog className="h-12 w-12 text-primary flex-shrink-0" />
                    ) : (
                      <Cat className="h-12 w-12 text-primary flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{petDetails.breed}</h3>
                      <p className="text-sm text-muted-foreground">
                        {petType === "dog" ? "Perro" : "Gato"} • {petDetails.weight} kg
                      </p>
                      {petDetails.notes && (
                        <p className="text-sm mt-2">{petDetails.notes}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between py-2 border-b">
                      <span className="text-muted-foreground">Destino:</span>
                      <span className="font-medium">{selectedVet.name}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                      <span className="text-muted-foreground">Distancia:</span>
                      <span className="font-medium">{selectedVet.distance} km</span>
                    </div>
                  </div>

                  <PriceEstimator distance={selectedVet.distance} />
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep("pet-details")} className="flex-1">
                    Volver
                  </Button>
                  <Button onClick={handleConfirmTrip} variant="hero" size="lg" className="flex-1">
                    Confirmar y Solicitar
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default User;
