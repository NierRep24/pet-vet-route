import { DollarSign, Clock } from "lucide-react";

interface PriceEstimatorProps {
  distance: number;
}

const PriceEstimator = ({ distance }: PriceEstimatorProps) => {
  const currentHour = new Date().getHours();
  const isNightTime = currentHour >= 22 || currentHour < 6;
  const baseFare = 50;
  const perKmRate = 15;
  const nightSurcharge = 1.5;

  let fare = baseFare + distance * perKmRate;
  if (isNightTime) {
    fare *= nightSurcharge;
  }

  return (
    <div className="p-6 bg-gradient-primary rounded-lg space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-lg font-medium">Tarifa Estimada</span>
        {isNightTime && (
          <div className="flex items-center gap-1 text-xs bg-status-extended/20 text-status-extended px-3 py-1 rounded-full">
            <Clock className="h-3 w-3" />
            <span>Tarifa nocturna (+50%)</span>
          </div>
        )}
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between text-muted-foreground">
          <span>Tarifa base</span>
          <span>${baseFare}</span>
        </div>
        <div className="flex items-center justify-between text-muted-foreground">
          <span>Distancia ({distance} km × ${perKmRate})</span>
          <span>${(distance * perKmRate).toFixed(2)}</span>
        </div>
        {isNightTime && (
          <div className="flex items-center justify-between text-status-extended">
            <span>Recargo nocturno (50%)</span>
            <span>+${((fare / nightSurcharge) * 0.5).toFixed(2)}</span>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-primary/20">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">Total</span>
          <div className="flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-primary" />
            <span className="text-3xl font-bold text-primary">{fare.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        {isNightTime
          ? "Tarifa nocturna aplicada (10:00 PM - 6:00 AM)"
          : "Tarifa diurna (6:00 AM - 10:00 PM)"}
      </p>
    </div>
  );
};

export default PriceEstimator;
