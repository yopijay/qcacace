// Libraries
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from '@emotion/react';

// Layout
import Main from './pages';

// Core
import { GlobalPrvdr } from 'core/context/GlobalCntxt.func'; // Conntext
import { theme } from 'core/global/theme/index.style'; // Theme

const App = () => {
    const client = new QueryClient();
    localStorage.setItem('nav', window.location.pathname === '/' ? 'home' : localStorage.getItem('nav'));
    
    return (
        <ThemeProvider theme= { theme() }>
            <Router>
                <QueryClientProvider client= { client }>
                    <GlobalPrvdr><Routes><Route path= "*" element= { <Main /> } /></Routes></GlobalPrvdr>
                    <ReactQueryDevtools initialIsOpen= { false } position= "bottom-right" />
                </QueryClientProvider>
            </Router>
        </ThemeProvider>
    );
}

export default App;