import {useState, useEffect} from 'react';
import {useQuery} from '@apollo/client';
import {getUser} from '../queries';

export function useCurrentUser(username, password){
    const [me, getMe] = useState(null);
    const currentUser = useQuery(getUser, {variables:{username:username, password:password}}).data;
    useEffect(()=>{
        getMe(currentUser);
    });
    console.log(me);
    
}