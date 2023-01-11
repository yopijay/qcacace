// Libraries
import { Route, Routes } from "react-router-dom";

// Layouts
import SignIn from './sign-in';
import ForgotPassword from './forgot-password';

const Index = () => { 

    return (
        <Routes>
            <Route exact path= "/" element= { <SignIn /> } />
            <Route exact path= "/forgot-password" elemet= { <ForgotPassword /> } />
        </Routes>
    );
}

export default Index;