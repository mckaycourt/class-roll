import React, {useEffect, useState} from 'react';
import {functions} from '../fire';
import Menu from './Menu';

const Users = ({user, logout}) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        let getUsers = functions.httpsCallable('getUsers');
        getUsers()
            .then(({data}) => {
                setUsers(data.users);
            });
    }, []);

    return (
        <div>
            <Menu user={user} logout={logout}/>
            <div style={{margin: '8px'}}>
                {
                    users.map((user, key) => (
                        <div key={key}>
                            {
                                user.displayName
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
};

export default Users;