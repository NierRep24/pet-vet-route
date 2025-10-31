import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PawPrint, Users, Car, Shield, Clock, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-pets.jpg";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/5">
      {/* Navigation */}
      <nav className="bg-card/80 backdrop-blur-md shadow-soft border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PawPrint className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                PetTransport
              </h1>
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" size="sm" onClick={() => navigate("/user")}>
                Cliente
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate("/driver")}>
                Conductor
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate("/admin")}>
                Admin
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-up">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Transporte Seguro para tu{" "}
                <span className="bg-gradient-hero bg-clip-text text-transparent">
                  Mejor Amigo
                </span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Conectamos a tus mascotas con veterinarias de confianza. Viajes seguros,
                conductores capacitados, y seguimiento en tiempo real.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="hero"
                  size="lg"
                  onClick={() => navigate("/user")}
                  className="text-lg"
                >
                  Solicitar Viaje
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate("/driver")}
                  className="text-lg"
                >
                  Ser Conductor
                </Button>
              </div>
            </div>
            <div className="relative animate-fade-in">
              <div className="relative rounded-2xl overflow-hidden shadow-large">
                <img
                  src={heroImage}
                  alt="Transporte de mascotas"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-large border border-border">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-status-online/10 rounded-lg">
                    <Shield className="h-6 w-6 text-status-online" />
                  </div>
                  <div>
                    <p className="font-semibold">100% Seguro</p>
                    <p className="text-sm text-muted-foreground">Conductores verificados</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">¿Por qué elegirnos?</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Diseñado especialmente para el cuidado y transporte seguro de tus mascotas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8 hover:shadow-medium transition-all text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Servicio 24/7</h4>
              <p className="text-muted-foreground">
                Disponible las 24 horas para emergencias y consultas veterinarias
              </p>
            </Card>

            <Card className="p-8 hover:shadow-medium transition-all text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-status-online/10 rounded-2xl mb-4">
                <MapPin className="h-8 w-8 text-status-online" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Seguimiento en Vivo</h4>
              <p className="text-muted-foreground">
                Monitorea el viaje de tu mascota en tiempo real desde tu dispositivo
              </p>
            </Card>

            <Card className="p-8 hover:shadow-medium transition-all text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-status-extended/10 rounded-2xl mb-4">
                <Shield className="h-8 w-8 text-status-extended" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Conductores Capacitados</h4>
              <p className="text-muted-foreground">
                Personal entrenado en manejo y cuidado de animales domésticos
              </p>
            </Card>

            <Card className="p-8 hover:shadow-medium transition-all text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
                <PawPrint className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Especializado en Mascotas</h4>
              <p className="text-muted-foreground">
                Vehículos acondicionados específicamente para el transporte de animales
              </p>
            </Card>

            <Card className="p-8 hover:shadow-medium transition-all text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-status-online/10 rounded-2xl mb-4">
                <Users className="h-8 w-8 text-status-online" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Red de Veterinarias</h4>
              <p className="text-muted-foreground">
                Acceso a las mejores clínicas y hospitales veterinarios de la ciudad
              </p>
            </Card>

            <Card className="p-8 hover:shadow-medium transition-all text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-status-extended/10 rounded-2xl mb-4">
                <Car className="h-8 w-8 text-status-extended" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Tarifas Transparentes</h4>
              <p className="text-muted-foreground">
                Conoce el costo exacto antes de confirmar tu viaje, sin sorpresas
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-hero p-12 text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold text-primary-foreground">
                ¿Listo para transportar a tu mascota?
              </h3>
              <p className="text-lg text-primary-foreground/90">
                Únete a miles de dueños que confían en nosotros para el cuidado de sus
                mascotas
              </p>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate("/user")}
                className="text-lg shadow-large hover:shadow-soft"
              >
                Comenzar Ahora
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <PawPrint className="h-6 w-6 text-primary" />
              <span className="font-semibold">PetTransport</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              © 2025 PetTransport. Transporte seguro para tus mascotas.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
