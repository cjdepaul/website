import type { RouteObject } from 'react-router';
import Home from '@/pages/home';
import CelestialCalender from '@/pages/celestialcalender';
import Satellites from '@/pages/satellites';
import SpaceLaunches from '@/pages/spacelaunches';
import SpaceWeather from '@/pages/spaceweather';
import Ellen from '@/pages/ellen';
import NotFound from '@/pages/notfound';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/celestial-calendar',
        element: <CelestialCalender />
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