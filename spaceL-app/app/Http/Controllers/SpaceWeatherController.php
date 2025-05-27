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
            'CME' => $this->getCme(),
            'flares' => $this->getFlares(),
            'Aurora' => $this->getAurora()

        ]);
    }

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
    private function getSpeed()
    {
        // Logic to get speed
        return 'Speed Data';
    }
    private function getDensity()
    {
        // Logic to get density
        return 'Density Data';
    }
    private function getBz()
    {
        // Logic to get Bz
        return 'Bz Data';
    }
    private function getBt()
    {
        // Logic to get Bt
        return 'Bt Data';
    }
    private function getKp()
    {
        // Logic to get Kp
        return 'Kp Data';
    }
    private function getCme()
    {
        // Logic to get CME
        return 'CME Data';
    }
    private function getFlares()
    {
        // Logic to get Flares
        return 'Flares Data';
    }
    private function getAurora()
    {
        // Logic to get Aurora
        return 'Aurora Data';
    }

}