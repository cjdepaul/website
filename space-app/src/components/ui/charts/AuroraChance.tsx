import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";

export default function AuroraChance({ chance }: { chance: number }) {
  const intensity = Math.min(1, chance / 100);
  const glowColor = `rgba(167, 139, 250, ${0.4 + 0.6 * intensity})`;

  const data = [
    {
      name: "Aurora Chance",
      value: chance,
      fill: glowColor,
    },
  ];

  return (
    <div className="flex flex-col items-center pt-3">
      <div className="relative">
        <RadialBarChart
          width={180}
          height={180}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          barSize={18}
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />

          <RadialBar
            background={{ fill: "#27272a" }}
            dataKey="value"
            cornerRadius={10}
            filter="url(#glow)"
          />
        </RadialBarChart>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-foreground text-2xl font-bold">{chance}%</p>
          <p className="text-xs text-muted-foreground">Aurora Chance</p>
        </div>
      </div>
    </div>
  );
}