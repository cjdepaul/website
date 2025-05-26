<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


class SpaceWeatherController extends Controller
{
    public function getSpaceWeather()
    {
        return response()->json([
            'weather' => "Hello, Space Weather!"
        ]);
    }
}