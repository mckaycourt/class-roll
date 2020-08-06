import React, {useEffect, useState} from 'react';
import Menu from "./Menu";
import {functions} from '../fire';

const Home = ({user, logout}) => {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const getClasses = functions.httpsCallable('getClasses');
        getClasses(({user}))
            .then(({data}) => {
                const {classes} = data;
                setClasses(classes);
            })
            .catch(err => {
                console.error(err.message);
            })
    },[user]);

    return (
        <div>
            <Menu user={user} logout={logout}/>
            <div style={{margin: '8px'}}>
                {
                    classes.map((c, key) => (
                        <div key={key}>{c.name}</div>
                    ))
                }
            </div>
        </div>
    )
};

export default Home;