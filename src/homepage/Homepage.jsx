import React, { useContext } from 'react';
import UserContext from '../auth/UserContext';

// This is my Homepage component. It displays a welcome message to the user. If the user is logged in, it will display a welcome message with the user's name. If the user is not logged in, it will display a message asking the user to login.

function Homepage() {
    const { currentUser } = useContext(UserContext);


    return (
        <div className="Homepage">
            <h1 className="homepage-h1">
                Who in the heck knows that at KFG?!
            </h1>
                {currentUser ? (
                    <React.Fragment>
                        <h2> Glad you came back, {currentUser.username || currentUser.firstname}!</h2>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <h3> Need Help? Login above and let's get started.</h3>
                    </React.Fragment>)}

            <p className="homepage-p">Whether you are brand new at KFG, or you've been here for 20 years, there are times that it would be helpful to search for a teammate that could help you with something.  Of course, you could go ask your mentor who you should ask, but why not use this tool instead?   </p>
        </div>
        
    );
}

export default Homepage;
