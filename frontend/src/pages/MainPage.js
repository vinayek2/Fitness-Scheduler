import React from 'react'; 
import { useNavigate } from 'react-router-dom';

function MainPage(){
    const navigate = useNavigate();
    const handleSignUp = () => {
        console.log("Sign Up button clicked");
        navigate('/signup')
    };
    const handleSignIn = () => {
        console.log("Sign In button clicked");
        navigate('/signin')
    };
    return(
        <section>
            <h1>Hello this is Main Page</h1>
            <button onClick = {handleSignUp}> Sign Up </button>
            <button onClick = {handleSignIn}> Sign In </button>
        </section>

    ); 
}

export default MainPage;