// Libraries
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import React from 'react';

const Dashboard = React.lazy(() => import('pages/main/dashboard'));
// const Attendance = React.lazy(() => import('pages/main/attendance'));
// const DSF = React.lazy(() => import('pages/main/daily-symptoms'));

const Company = React.lazy(() => import('pages/maintenance/company'));
const Department = React.lazy(() => import('pages/maintenance/department'));
const Position = React.lazy(() => import('pages/maintenance/position'));
const User = React.lazy(() => import('pages/maintenance/user'));
const Category = React.lazy(() => import('pages/maintenance/category'));
const Brand = React.lazy(() => import('pages/maintenance/brand'));
// const Teams = React.lazy(() => import('pages/maintenance/teams'));

// const OfficeSupplies = React.lazy(() => import('pages/requests/office-supplies'));

// const OfficeSuppliesApproval = React.lazy(() => import('pages/approval/office-supplies'));

// const OfficeSuppliesScan = React.lazy(() => import('pages/scan/office-supplies'));
// const DailySymptomsScan = React.lazy(() => import('pages/scan/daily-symptoms'));

const AssetIssuance = React.lazy(() => import('pages/issuance/assets'));

const AssetWarehouse = React.lazy(() => import('pages/warehouse/assets'));
const Supplies = React.lazy(() => import('pages/warehouse/supplies'));

// const AssetReport = React.lazy(() => import('pages/warehouse/assets/layouts/report'));

// const Assign = React.lazy(() => import('../../pages/issuance/assets'));
// const TestReport = React.lazy(() => import('../../pages/issuance/test-report'));

export const Nav = () => (
    [
        { 
            title: 'Main', nav: [
                { path: '/', label: 'Dashboard', name: 'home', component: <Dashboard /> },
                // { path: '/attendance', label: 'Attendance', name: 'attendance', component: <Attendance /> },
                // { path: '/daily-symptoms', label: 'Daily Symptoms Form', name: 'daily_symptoms', component: <DSF /> },
                // { path: '/free-meal', label: 'Free Meal', name: 'free_meal', component: "Free Meal" }
            ] 
        },
        {
            title: 'Scan', nav: [
                // { path: '/scan/daily-symptoms', label: 'Daily Symptoms', name: 'daily_symptoms_scan', component: <DailySymptomsScan /> },
                // { path: '/scan/free-meal', label: 'Free Meal', name: 'free_meal_scan', component: "Free Meal" },
                // { path: '/scan/office-supplies', label: 'Official Supplies', name: 'office_supplies_scan', component: <OfficeSuppliesScan /> }
            ]
        },
        { 
            title: 'Request', nav: [
                // { path: '/request/leave', label: 'Leave', name: 'leave', component: "Leave" },
                // { path: '/request/overtime', label: 'Overtime', name: 'overtime', component: "Overtime" },
                // { path: '/request/official-business', label: 'Official Business', name: 'official_business', component: "Official Business" },
                // { path: '/request/office-supplies', label: 'Office Supplies', name: 'office_supplies', component: <OfficeSupplies /> },
                // { path: '/request/it-support', label: 'IT Support', name: 'it_support', component: "IT Support" },
                // { path: '/request/vehicle', label: 'Vehicle', name: 'vehicle', component: "Vehicle" }
            ]
        },
        { 
            title: 'Maintenance', nav: [
                { path: '/maintenance/company', label: 'Company', name: 'company', component: <Company /> },
                { path: '/maintenance/department', label: 'Department', name: 'department', component: <Department /> },
                { path: '/maintenance/position', label: 'Position', name: 'position', component: <Position /> },
                { path: '/maintenance/user', label: 'User', name: 'user', component: <User /> },
                { path: '/maintenance/category', label: 'Category', name: 'category', component: <Category /> },
                { path: '/maintenance/brand', label: 'Brand', name: 'brand', component: <Brand /> },
                // { path: '/maintenance/teams', label: 'Teams', name: 'teams', component: <Teams /> },
            ]
        },
        {
            title: 'Approval', nav: [
                // { path: '/approval/office-supplies', label: 'Office Supplies', name: 'office_supplies_approval', component: <OfficeSuppliesApproval /> }
            ]
        },
        { 
            title: 'Issuance', nav: [
                { path: '/issuance/assets', label: 'Assets Issuance', name: 'assets_issuance', component: <AssetIssuance /> }
            ]
        },
        { 
            title: 'Warehouse', nav: [
                { path: '/warehouse/assets', label: 'Assets', name: 'assets_warehouse', component: <AssetWarehouse /> },
                { path: '/warehouse/supplies', label: 'Office Supplies', name: 'supplies_warehouse', component: <Supplies /> },
                // { path: '/warehouse/products', label: 'Products', name: 'products_warehouse', component: 'Products' },
            ]
        },
        {
            title: 'Reports', nav: [
                // { path: '/report/leave', label: 'Leave', name: 'leave_report', component: "Leave" },
                // { path: '/report/overtime', label: 'Overtime', name: 'overtime_report', component: "Overtime" },
                // { path: '/report/official-business', label: 'Official Business', name: 'official_business_report', component: "Official Business" },
                // { path: '/report/office-supplies', label: 'Office Supplies', name: 'office_supplies_report', component: "Office Supplies" },
                // { path: '/report/it-support', label: 'IT Support', name: 'it_support_report', component: "IT Support" },
                // { path: '/report/vehicle', label: 'Vehicle', name: 'vehicle_report', component: "Vehicle" },
                // { path: '/report/assets', label: 'Assets', name: 'assets_report', component: <AssetReport /> }
            ]
        }
    ]
)

export const General = () => ([
    { path: '/', label: 'Dashboard', name: 'home', icon: solid('gauge') },
    // { path: '/attendance', label: 'Attendance', name: 'attendance', icon: solid('clipboard-user') },
    // { path: '/daily-symptoms', label: 'Daily Symptoms Form', name: 'daily_symptoms', icon: solid('file-waveform') }
]);

export const Request = () => ([
    // { path: '/request/office-supplies', label: 'Office Supplies', name: 'office_supplies', icon: solid('boxes-packing') }
]);

export const Maintenance = () => ([
    { path: '/maintenance/company', label: 'Company', name: 'company', icon: solid('building') },
    { path: '/maintenance/department', label: 'Department', name: 'department', icon: solid('building-user') },
    { path: '/maintenance/position', label: 'Position', name: 'position', icon: solid('user-tie') },
    { path: '/maintenance/user', label: 'User', name: 'user', icon: solid('user-plus') },
    { path: '/maintenance/category', label: 'Category', name: 'category', icon: solid('list') },
    { path: '/maintenance/brand', label: 'Brand', name: 'brand', icon: solid('building') },
    // { path: '/maintenance/teams', label: 'Teams', name: 'teams', icon: solid('people-group') },
]);

export const Approval = () => ([
    // { path: '/approval/office-supplies', label: 'Office Supplies', name: 'office_supplies_approval', icon: solid('boxes-packing') }
]);

export const Issuance = () => ([
    { path: '/issuance/assets', label: 'Assets Issuance', name: 'assets_issuance', icon: solid('circle-check') }
]);

export const Warehouse = () => ([
    { path: '/warehouse/assets', label: 'Assets', name: 'assets_warehouse', icon: solid('boxes-packing') },
    { path: '/warehouse/supplies', label: 'Office Supplies', name: 'supplies_warehouse', icon: solid('pen') },
    // { path: '/warehouse/products', label: 'Products', name: 'products_warehouse', icon: solid('boxes-stacked') },
]);

export const Reports = () => ([
    // { path: '/report/leave', label: 'Leave', name: 'leave_report', icon: solid('file-waveform') },
    // { path: '/report/overtime', label: 'Overtime', name: 'overtime_report', icon: solid('file-waveform') },
    // { path: '/report/official-business', label: 'Official Business', name: 'official_business_report', icon: solid('briefcase') },
    // { path: '/report/office-supplies', label: 'Office Supplies', name: 'office_supplies_report', icon: solid('boxes-packing') },
    // { path: '/report/it-support', label: 'IT Support', name: 'it_support_report', icon: solid('ticket-simple') },
    // { path: '/report/vehicle', label: 'Vehicle', name: 'vehicle_report', icon: solid('car-side') },
    // { path: '/report/assets', label: 'Assets', name: 'assets_report', icon: solid('boxes-packing') }
]);

export const Scan = () => ([
    // { path: '/scan/daily-symptoms', label: 'Daily Symptoms', name: 'daily_symptoms_scan', icon: solid('file-waveform') },
    // { path: '/scan/free-meal', label: 'Free Meal', name: 'free_meal_scan', icon: solid('bowl-food') },
    // { path: '/scan/office-supplies', label: 'Official Supplies', name: 'office_supplies_scan', icon: solid('boxes-packing') }
]);