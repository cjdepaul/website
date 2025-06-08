<?php

namespace App\Http\Controllers;

class SpaceWeatherController extends Controller
{
    public function getSpaceWeather()
    {
        return response()->json([
            'scales' => $this->getcurrentScales(),
            'speed' => $this->getSpeed(),
            'density' => $this->getDensity(),
            'bz' => $this->getBz(),
            'bt' => $this->getBt(),
            'kp' => $this->getKp(),
            'CME_detection' => $this->getCme(),
            'flares' => $this->getFlares(),
            'aurora_chance' => $this->getAurora(lon: 0, lat: -81)

        ]);
    }

    /**
     * Fetches the current and 24-hour scales from NOAA's SWPC service.
     *
     * @return array | string
     */
    private function getcurrentScales()
    {
        $url = 'http://services.swpc.noaa.gov/products/noaa-scales.json';
        $response = file_get_contents($url);
        if ($response === false) {
            return 'Error fetching current scales data';
        }
        $data = json_decode($response, true);
        $returnData = [
            'current_scales' => [
                'G' => $data['0']['G']['Scale'],
                'S' => $data['0']['S']['Scale'],
                'R' => $data['0']['R']['Scale'],
            ],
            '24h_scales' => [
                'G' => $data['-1']['G']['Scale'],
                'S' => $data['-1']['S']['Scale'],
                'R' => $data['-1']['R']['Scale'],
            ]
        ];
        return $returnData;
    }
    /**
     * Fetches the solar wind speed data from NOAA's SWPC service.
     * This data is a from one week ago to current.
     * Last array element is the current speed.
     *
     * @return array | string
     */
    private function getSpeed()
    {
        $url = 'https://services.swpc.noaa.gov/products/geospace/propagated-solar-wind.json';
        $response = file_get_contents($url);
        $speed_array = [];
        if ($response === false) {
            return 'Error fetching speed data';
        }
        $data = json_decode($response, true);
        $first = true;
        foreach ($data as $item) {
            if ($first) {
                $first = false;
                continue;
            }
            $speed_array[] = $item[1];
        }
        return $speed_array;
    }

    /**
     * Fetches the solar wind density data from NOAA's SWPC service.
     * This data is a from one week ago to current.
     * Last array element is the current density.
     *
     * @return array | string
     */
    private function getDensity()
    {
        $url = 'https://services.swpc.noaa.gov/products/geospace/propagated-solar-wind.json';
        $response = file_get_contents($url);
        $density_array = [];
        if ($response === false) {
            return 'Error fetching density data';
        }
        $data = json_decode($response, true);
        $first = true;
        foreach ($data as $item) {
            if ($first) {
                $first = false;
                continue;
            }
            $density_array[] = $item[2];
        }
        return $density_array;
    }

    /**
     * Fetches the Bz and Bt data from NOAA's SWPC service.
     * This data is a from one week ago to current.
     * Last array element is the current Bz and Bt.
     *
     * @return array | string
     */
    private function getBz()
    {
        $url = 'https://services.swpc.noaa.gov/products/geospace/propagated-solar-wind.json';
        $response = file_get_contents($url);
        $bz_array = [];
        if ($response === false) {
            return 'Error fetching Bz data';
        }
        $data = json_decode($response, true);
        $first = true;
        foreach ($data as $item) {
            if ($first) {
                $first = false;
                continue;
            }
            if ($item[6] === null) {
                continue;
            }
            $bz_array[] = $item[6];
        }
        return $bz_array;
    }

    /**
     * Fetches the Bt data from NOAA's SWPC service.
     * This data is a from one week ago to current.
     * Last array element is the current Bt.
     *
     * @return array | string
     */
    private function getBt()
    {
        $url = 'https://services.swpc.noaa.gov/products/geospace/propagated-solar-wind.json';
        $response = file_get_contents($url);
        $bt_array = [];
        if ($response === false) {
            return 'Error fetching Bt data';
        }
        $data = json_decode($response, true);
        $first = true;
        foreach ($data as $item) {
            if ($first) {
                $first = false;
                continue;
            }
            if ($item[7] === null) {
                continue;
            }
            $bt_array[] = $item[7];
        }
        return $bt_array;
    }

    /**
     * Fetches the Kp index data from NOAA's SWPC service.
     * This data is a from one week ago to current.
     * Last array element is the current Kp index.
     *
     * @return array | string
     */
    private function getKp()
    {
        $url = 'https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json';
        $response = file_get_contents($url);
        if ($response === false) {
            return 'Error fetching Kp data';
        }
        $data = json_decode($response, true);
        $kp_array = [];
        $first = true;
        foreach ($data as $item) {
            if ($first) {
                $first = false;
                continue;
            }
                $kp_array[] = $item[1];
        
            $kp_array[] = $item[1];
        }
        return $kp_array;
    }
    /**
     * Fetches the CME detection data.
     * This will see if there is a CME headed towards Earth.
     * Data looks back 3 days from today.
     *
     * @return array | string
     */
    private function getCme()
    {
        $currentDate = date('Y-m-d');
        $yesterdayDate = date('Y-m-d', strtotime('-3 day'));
        $url = 'https://kauai.ccmc.gsfc.nasa.gov/DONKI/WS/get/CME?startDate=' . $yesterdayDate . '&endDate=' . $currentDate;

            $response = file_get_contents($url);
            if ($response === false) {
                return "Error fetching CME data";
            }
            
            $cmes = json_decode($response, true);
            if (empty($cmes)) {
                return "No CME data available";
            }

            $most_severe_cme = null;
            $severity = -1; 
            $estimated_shock_arrival_time = null;
            // looks through each CME and calculates based on lat and lon if it will hit Earth
            foreach ($cmes as $cme) {
                foreach ($cme['cmeAnalyses'] ?? [] as $analysis) {
                    $lat = $analysis['latitude'] ?? null;
                    $lon = $analysis['longitude'] ?? null;
                    $half_angle = $analysis['halfAngle'] ?? null;
                    $enlil_list = $analysis['enlilList'] ?? [];
                    
                    if ($lat === null || $lon === null || $half_angle === null) {
                        continue;
                    }

                    $earth_gb = false;
                    foreach ($enlil_list as $enlil) { //checks for earthGB meaning it will partially hit Earth
                        if ($enlil['isEarthGB'] ?? false) {
                            $earth_gb = true;
                            break;
                        }
                    }

                    $current_severity = 0;
                    if ($earth_gb) {
                        $current_severity = 1;
                    }
                    if (($lat == 0 && $lon == 0) || 
                        ($lat - $half_angle <= 0 && 0 <= $lat + $half_angle && 
                         $lon - $half_angle <= 0 && 0 <= $lon + $half_angle)) {
                        $current_severity = 2;
                    }

                    if ($current_severity > $severity) {
                        $severity = $current_severity;
                        $most_severe_cme = $analysis;
                        if (!empty($enlil_list)) {
                            $estimated_shock_arrival_time = $enlil_list[0]['estimatedShockArrivalTime'] ?? null;
                        }
                    }
                }
            }

            return $most_severe_cme ? [$severity, $estimated_shock_arrival_time] : null;
    }

    /**
     * Collects 7 days worth of solar flare data from NOAA's SWPC service.
     * 
     * @return array | string
     */
    private function getFlares()
    {
        $url = 'https://services.swpc.noaa.gov/json/goes/primary/xray-flares-7-day.json';
        $response = file_get_contents($url);
        if ($response === false) {
            return 'Error fetching flares data';
        }
        $data = json_decode($response, true);
        $flares = [];
        foreach ($data as $item) {
            $flares[] = [
                'begin_time' => $item['begin_time'],
                'begin' => $item['begin_class'],
                'max_time' => $item['max_time'],
                'max' => $item['max_class'],
                'end_time' => $item['end_time'],
                'end' => $item['end_class'],

            ];
        }
        return $flares;
    }


    // Eventualy this function or another could be used to make a custom graphic of the auroral oval
    /**
     * Fetches the aurora chance based on latitude and longitude.
     * Uses NOAA's OVATION aurora service.
     *
     * @param float $lon Longitude
     * @param float $lat Latitude
     * @return string | int | null
     */
    private function getAurora($lon, $lat)
    {
        $lat = round($lat);
        $lon = round($lon);
        $lon = $lon < 0 ? $lon + 360 : $lon;
        $url = 'https://services.swpc.noaa.gov/json/ovation_aurora_latest.json';
        $response = file_get_contents($url);
        if ($response === false) {
            return 'Error fetching aurora data';
        }
        $data = json_decode($response, true);
        $data = $data['coordinates'];
        foreach ($data as $item) {
            if ($item[1] == $lat && $item[0] == $lon) {
                return $item[2];
            }
        }
    }

}