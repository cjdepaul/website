import type { RouteObject } from 'react-router';
import Home from '@/pages/home';
import Satellites from '@/pages/satellites';
import SpaceLaunches from '@/pages/spacelaunches';
import SpaceWeather from '@/pages/spaceweather';
import Ellen from '@/pages/ellen';
import NotFound from '@/pages/notfound';
import CelestialCalendarPage from '@/pages/celestialcalender';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/celestial-events-calendar',
        element: <CelestialCalendarPage />
    },
    {
        path: '/satellites',
        element: <Satellites />
    },
    {
        path: '/space-launches',
        element: <SpaceLaunches />
    },
    {
        path: '/space-weather',
        element: <SpaceWeather />
    },
    {
        path: '/ellen',
        element: <Ellen />
    },
    {
        path: '*',
        element: <NotFound />
    }
];