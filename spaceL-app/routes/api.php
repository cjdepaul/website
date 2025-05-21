<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CelestialEvents;

Route::prefix('v1')->group(function () {
    Route::get('/status', function () {
        return response()->json(['status' => 'API is running']);
    });
    Route::get('/celestial-events', [CelestialEvents::class, 'getCelestialEvents']);
});

// This could be an example for authentification needs
// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
