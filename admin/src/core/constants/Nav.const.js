// Libraries
import React from 'react';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const Dashboard = React.lazy(() => import('pages/main/dashboard'));

// Tools
const Adoption = React.lazy(() => import('pages/main/tools/adoption'));

// Maintenance
const Users = React.lazy(() => import('pages/main/maintenance/users'));
const Category = React.lazy(() => import('pages/main/maintenance/category'));
const Breed =  React.lazy(() => import('pages/main/maintenance/breed'));
const Pets = React.lazy(() => import('pages/main/maintenance/pets'));

export const  Nav  = () => ([
    {
        title: 'Main', nav: [
            { path: '/', label: 'Dashboard', name: 'home', component: <Dashboard /> }
        ]
    },
    {
        title: 'Tools', nav: [
            { path: '/tools/adoption', label: 'Adoption', name: 'adoption', component: <Adoption /> }
        ]
    },
    {
        title: 'Maintenance', nav: [
            { path: '/maintenance/users', label: 'Users', name: 'users', component: <Users /> },
            { path: '/maintenance/category', label: 'Category', name: 'category', component: <Category /> },
            { path: '/maintenance/breed', label: 'Breed', name: 'breed', component: <Breed /> },
            { path: '/maintenance/pets', label: 'Pets', name: 'pets', component: <Pets /> }
        ]
    }
]);