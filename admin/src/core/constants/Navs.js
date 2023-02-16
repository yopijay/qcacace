// Libraries
import React from 'react';

// Tools
const PetProgram = React.lazy(() => import('pages/main/tools/pet-programs'));

// Maintenance
const Appointment = React.lazy(() => import('pages/main/maintenance/appointment'));
const Category = React.lazy(() => import('pages/main/maintenance/category'));
const Breed = React.lazy(() => import('pages/main/maintenance/breed'));
const Coat = React.lazy(() => import('pages/main/maintenance/coat'));
const LifeStages = React.lazy(() => import('pages/main/maintenance/lifestages'));
const Tags = React.lazy(() => import('pages/main/maintenance/tags'));
const Pets = React.lazy(() => import('pages/main/maintenance/pets'));
const Users = React.lazy(() => import('pages/main/maintenance/users'));

// Evaluate
const Documents = React.lazy(() => import('pages/main/evaluate/documents'));
const Interview = React.lazy(() => import('pages/main/evaluate/interview'));
const Payment = React.lazy(() => import('pages/main/evaluate/payment'));
const Releasing = React.lazy(() => import('pages/main/evaluate/release'));

export const Navs = () => ([
    {
        title: 'Main', access: [ 'superadmin', 'admin', 'evaluator' ], nav: [
            { path: '/', label: 'Dashboard', name: 'home', component: 'DASHBOARD'  }
        ]
    },
    {
        title: 'Tools', access: [ 'superadmin', 'admin', 'evaluator' ], nav: [
            { path: '/tools/petprogram', label: 'Pet Program', name: 'petprogram', component: <PetProgram /> },
            { path: '/tools/missing', label: 'Missing Pets', name: 'missing-pets', component: 'MISSING PETS' },
            { path: '/tools/adopt', label: 'Adopt Pet', name: 'adopt-pet', component: 'ADOPT PET' }
        ]
    },
    {
        title: 'Evaluate', access: [ 'superadmin', 'admin', 'evaluator' ], nav: [
            { path: '/evaluate/documents', label: 'Documents', name: 'documents', component: <Documents /> },
            { path: '/evaluate/interview', label: 'Interview', name: 'interview', component: <Interview /> },
            { path: '/evaluate/payment', label: 'Payment', name: 'payment', component: <Payment /> },
            { path: '/evaluate/releasing', label: 'Releasing', name: 'releasing', component: <Releasing /> }
        ]
    },
    {
        title: 'Maintenance', access: [ 'superadmin', 'admin', ], nav: [
            { path: '/maintenance/appointment', label: 'Appointment', name: 'appointment', component: <Appointment /> },
            { path: '/maintenance/category', label: 'Category', name: 'category', component: <Category /> },
            { path: '/maintenance/breed', label: 'Breed', name: 'breed', component: <Breed /> },
            { path: '/maintenance/lifestages', label: 'Life Stages', name: 'lifestages', component: <LifeStages /> },
            { path: '/maintenance/coat', label: 'Coat', name: 'coat', component: <Coat /> },
            { path: '/maintenance/tags', label: 'Tags', name: 'tags', component: <Tags /> },
            { path: '/maintenance/pet', label: 'Pets', name: 'pets', component: <Pets /> },
            { path: '/maintenance/users', label: 'Users', name: 'Users', component: <Users /> }
        ]
    }
])