import type { RouteObject } from 'react-router';
import Home from '@/pages/home';


export const routes: RouteObject[] = [
    {
        path: '/',
        element: <Home />
    }
];