import { PageTitle, PageDescription, PageDivider } from "@/components/ui/page";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import SpaceAreaChart from "@/components/ui/charts/spaceArea";
import AuroraChance from "@/components/ui/charts/AuroraChance";
import { Skeleton } from "@mui/material";

type SpaceWeatherData = {
  scales: {
    current_scales: {
      G: string;
      S: string;
      R: string;
    };
    "24h_scales": {
      G: string;
      S: string;
      R: string;
    };
  };
  speed: number[];
  density: number[];
  bt: number[];
  bz: number[];
  CME_detection: [];
  flares: Array<{
    begin_time: string;
    begin: string;
    max_time: string;
    max: string;
    end_time: string;
    end: string;
  }>;
  aurora_chance: number;
};

export default function SpaceWeather() {
  const { data, isLoading, error } = useQuery<SpaceWeatherData>({
    queryKey: ["spaceWeather"],
    queryFn: async () => {
      const response = await api.get("/api/v1/space-weather");
      return response.data;
    },
    refetchInterval: 60000, // Refetch every minute
  });

  if (isLoading)
    return (
      <div>
        <PageTitle>Space Weather</PageTitle>
        <PageDescription>
          This page will display information about space weather.
        </PageDescription>
        <PageDivider />
        <div className="grid grid-cols-3 gap-4 p-4">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="border rounded p-4 h-60">
              <Skeleton
                sx={{
                  bgcolor: "var(--sidebar)",
                }}
                variant="rectangular"
                width="100%"
                height="100%"
              />
            </div>
          ))}
        </div>
      </div>
    );
  if (error) return <div>Error loading space weather data</div>;
  if (!data) return <div>No data available</div>;

  return (
    <div>
      <PageTitle>Space Weather</PageTitle>
      <PageDescription>
        This page will display information about space weather.
      </PageDescription>
      <PageDivider />

      <div className="grid grid-cols-3 gap-4 p-4">
        <div className="border rounded p-4 h-60">
          <SpaceAreaChart
            data={data.speed.map((value, index) => ({
              time: new Date(
                Date.now() - (data.speed.length - index - 1) * 60000
              ).toISOString(),
              value: value,
            }))}
            timeRange="1h"
            unit="km/s"
            name="Solar Wind Speed"
          />
        </div>
        <div className="border rounded p-4 h-60">
          <SpaceAreaChart
            data={data.density.map((value, index) => ({
              time: new Date(
                Date.now() - (data.density.length - index - 1) * 60000
              ).toISOString(),
              value: value,
            }))}
            timeRange="1h"
            unit="p/cm^3"
            name="Solar Wind Density"
          />
        </div>
        <div className="border rounded p-4 h-60">
          <SpaceAreaChart
            data={data.bt.map((value, index) => ({
              time: new Date(
                Date.now() - (data.bt.length - index - 1) * 60000
              ).toISOString(),
              value: value,
              unit: "nT",
            }))}
            timeRange="1h"
            unit="nT"
            name="Interplanetary Magnetic Field Bt"
          />
        </div>

        {/* Row 2 */}
        <div className="border rounded p-4 h-60">
          <SpaceAreaChart
            data={data.bz.map((value, index) => ({
              time: new Date(
                Date.now() - (data.bz.length - index - 1) * 60000
              ).toISOString(),
              value: value,
            }))}
            timeRange="1h"
            unit="nT"
            name="Bz"
          />
        </div>
        <div className="border rounded p-4 h-60">
          {/* Chart 5 - Solar Flares Timeline */}
        </div>
        <div className="border rounded p-4 h-60">
          {/* Chart 6 - CME Detection */}
        </div>

        {/* Row 3 */}
        <div className="border rounded p-4 h-60">
          {/* Chart 7 - Current Scales Status */}
        </div>
        <div className="border rounded p-4 h-60">
          {/* Chart 8 - 24h Scales Forecast */}
        </div>
        <div className="border rounded p-4 h-60">
          <AuroraChance chance={data.aurora_chance} />
        </div>
      </div>
    </div>
  );
}
