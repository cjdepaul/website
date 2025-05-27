<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


class SpaceWeatherController extends Controller
{
    public function getSpaceWeather()
    {
        return response()->json([
            'current_scales' => $this->getcurrentScales(),
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
        // Logic to get current scales
        return 'Current Scales Data';
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