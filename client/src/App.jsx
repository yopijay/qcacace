// Libraries
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

// Layout
// import SignIn from './pages/main/signin';
// import Main from './pages/main';

// Context Provider
import { GlobalPrvdr } from 'core/context/GlobalCntxt.func';
import { ProfilePrvdr } from 'core/context/ProfileCntxt.func';

const App = () => {
    const client = new QueryClient();
    localStorage.setItem('nav', window.location.pathname === '/' ? 'home' : localStorage.getItem('nav'));
    
    return (
        <Router>
            <QueryClientProvider client= { client }>
                {/* <GlobalPrvdr><Routes><Route path= "*" element= { localStorage.getItem('token') ? <ProfilePrvdr><Main /></ProfilePrvdr> : <SignIn /> } /></Routes></GlobalPrvdr> */}
                <ReactQueryDevtools initialIsOpen= { false } position= "bottom-right" />
            </QueryClientProvider>
        </Router>
    );
}

export default App;