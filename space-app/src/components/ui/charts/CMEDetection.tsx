import { AlertTriangle, ShieldCheck, Zap } from "lucide-react";

export default function CMEDetection({
  severity,
  arrivalTime,
}: {
  severity: 0 | 1 | 2;
  arrivalTime: string;
}) {
  const severityMap = {
    0: {
      label: "Safe",
      color: "text-green-400",
      icon: <ShieldCheck className="w-5 h-5 text-green-400" />,
    },
    1: {
      label: "Glancing Blow",
      color: "text-yellow-400",
      icon: <AlertTriangle className="w-5 h-5 text-yellow-400" />,
    },
    2: {
      label: "Direct Hit",
      color: "text-red-500",
      icon: <Zap className="w-5 h-5 text-red-500" />,
    },
  };

  const { label, color, icon } = severityMap[severity] || severityMap[0];

  return (
    <div className="bg-sidebar rounded-lg shadow-lg text-center space-y-2 w-full flex flex-col justify-center items-center">
      <h2 className="text-lg font-semibold text-white">CME Detection</h2>
      <div
        className={`flex items-center justify-center gap-2 font-bold ${color}`}
      >
        {icon}
        <span>Severity: {label}</span>
      </div>
      {severity > 0 && (
        <p className="text-sm text-muted-foreground">
          Estimated Arrival:{" "}
          {new Date(arrivalTime).toLocaleString(undefined, {
            dateStyle: "long",
            timeStyle: "short",
          })}
        </p>
      )}
    </div>
  );
}
