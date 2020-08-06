import React, {useEffect, useState} from 'react';
import {auth, functions, deadAuth, ui} from './fire';
import 'firebaseui/dist/firebaseui.css';
import {LinearProgress} from '@material-ui/core';
import Home from "./components/Home";
import Users from './components/Users';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


const App = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        auth.onAuthStateChanged(async user => {
            if (user) {
                let {uid, displayName, email} = user;
                getUserFromDB(uid, displayName, email);
            } else {
                setLoading(false);
                const uiConfig = {
                    callbacks: {
                        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                            // User successfully signed in.
                            // Return type determines whether we continue the redirect automatically
                            // or whether we leave that to developer to handle.
                            console.log(authResult);
                            let {uid, displayName, email} = authResult;
                            getUserFromDB(uid, displayName, email);
                            return true;
                        },
                        uiShown: function () {
                            // The widget is rendered.
                            // Hide the loader.
                            document.getElementById('loader').style.display = 'none';
                        }
                    },
                    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
                    signInFlow: 'popup',
                    signInSuccessUrl: window.location.href,
                    signInOptions: [
                        // Leave the lines as is for the providers you want to offer your users.
                        deadAuth.GoogleAuthProvider.PROVIDER_ID,
                        deadAuth.FacebookAuthProvider.PROVIDER_ID,
                        deadAuth.TwitterAuthProvider.PROVIDER_ID,
                        deadAuth.GithubAuthProvider.PROVIDER_ID,
                    ],
                    // Terms of service url.
                    tosUrl: '<your-tos-url>',
                    // Privacy policy url.
                    privacyPolicyUrl: '<your-privacy-policy-url>'
                };
                ui.start('#firebaseui-auth-container', uiConfig);
            }
        });
    }, []);

    const logout = () => {
        auth.signOut()
            .then(() => {
                setUser(null);
            })
    };

    const getUserFromDB = (uid, displayName, email) => {
        let getUser = functions.httpsCallable('getUser');
        getUser(({uid, displayName, email}))
            .then(({data}) => {
                setUser(data.user);
                setLoading(false);
            });
    };

    return (
        <div>
            {
                loading ?
                    <LinearProgress/>
                    :
                    user ?
                        <div>
                            <Router>
                                <Switch>
                                    <Route exact path={'/'}
                                           component={props =>
                                               <Home {...props}
                                                     user={user}
                                                     logout={logout}
                                               />
                                           }
                                    />
                                    <Route exact path={'/users'}
                                           component={props =>
                                               <Users {...props}
                                                     user={user}
                                                     logout={logout}
                                               />
                                           }
                                    />
                                </Switch>
                            </Router>
                        </div> :
                        <div>
                            <h1>Welcome to My Awesome App</h1>
                            <div id="firebaseui-auth-container"/>
                            <div id="loader">Loading...</div>
                        </div>
            }
        </div>
    );
};

export default App;
