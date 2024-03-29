import React, {createContext, useEffect, useState, useCallback} from 'react';
import {useHistory} from 'react-router-dom';
import jwt_Decode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});
function AuthContextProvider({children}) {
    const history = useHistory();
    const [authState, setAuthState] = useState({user: null, status: "pending"});

    const logoutFunction = useCallback( function logoutFunction() {
        localStorage.clear();
        setAuthState({user: null, token: null, status: "done"});
        history.push("/");
    },[history]);

    const fetchUserData = useCallback( async function fetchUserData(JWToken) {
        const decoded = jwt_Decode(JWToken);
        const username = decoded.sub;
        localStorage.setItem("token", JWToken);

        try {
            const result = await axios.get(`http://localhost:8080/api/user/${username}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JWToken}`,
                }
            });
            setAuthState({
                user: {
                    firstname: result.data.firstname,
                    lastname: result.data.lastname,
                    username: result.data.username,
                    email: result.data.email,
                    id: result.data.id,
                    roles: result.data.roles

                },
                token:JWToken,
                status: "done",
            });

        } catch (e) {
            logoutFunction();
        }
    },[logoutFunction]);

    useEffect(() => {
        if (authState.user!== null) return
        const token = localStorage.getItem("token")
        if (token !== null && authState.user === null) {
            fetchUserData(token);
        }else {
            setAuthState ({user: null, status: "done"})
        }
    }, [authState.user, fetchUserData]);

    async function loginFunction(JWToken) {
        localStorage.setItem("token", JWToken);
        fetchUserData(JWToken);


    };


    const data = {
        ...authState,
        authState: authState,
        login: loginFunction,
        logout: logoutFunction,
    };


    return (
        <AuthContext.Provider value={data}>
            {authState.status === "done" ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}
export default AuthContextProvider;