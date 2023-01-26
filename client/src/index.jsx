// Libraries
import React from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Assets
import 'assets/font/font.css';
import 'assets/css/global.css';
import 'assets/css/scrollbar.css';

// Provider
import { GlobalPrvdr } from 'core/context/GlobalCntxt.func';

// Layouts
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <GlobalPrvdr>
            <CssBaseline />
            <App />
            <ToastContainer />
        </GlobalPrvdr>
    </React.StrictMode>
);