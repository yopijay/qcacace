// Libraries
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

// Core 
import { GlobalPrvdr } from 'core/context/GlobalCntxt.func';  // Provider
import { ProfilePrvdr } from 'core/context/ProfileCntxt.func'; // Provider

// Layouts
import Signin from './pages/signin';
import Main from './pages/main';

const App = () => {
    const client = new QueryClient();
    localStorage.setItem('nav', window.location.pathname === '/' ? 'home' : localStorage.getItem('nav'));
    
    return (
        <Router>
            <QueryClientProvider client= { client }>
                <GlobalPrvdr><Routes><Route path= "*" element= { localStorage.getItem('token') ? <ProfilePrvdr><Main /></ProfilePrvdr> : <Signin /> } /></Routes></GlobalPrvdr>
                <ReactQueryDevtools initialIsOpen= { false } position= "bottom-right" />
            </QueryClientProvider>
        </Router>
    );
}

export default App;