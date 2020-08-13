import React, { createContext, useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';

import api from '../services/api'
const AuthContext = createContext({ signed: false, user: {} });

function Sign() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                token: 'ALeKk02G0qQyeFUIPxUx1xiaaCNsi_e2Yew',
                user: {
                    name: 'Thiago Bueno',
                    email: 'thiago@nerdetcetera.com'
                }
            })
        }, 2000);
    })
}

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(true);
    const [device, setDevice] = useState(null)

    useEffect(() => {
        async function loadStorageData() {
            const storageUser = await AsyncStorage.getItem('@RNAuth:user');
            const storageToken = await AsyncStorage.getItem('@RNAuth:token');

            console.log('oi')
            if (storageUser && storageToken) {
                setUser(JSON.parse(storageUser));
                setLoading(false);
            } else if (!storageUser && !storageToken) {
                setLoading(false);
            }
        }

        loadStorageData();
    }, [])

    async function signIn(user) {
        // Função para fazer o login na api
        let { email, name } = user

        const response = await api.post('autenticate', { email, name })
        setUser(response.data.user)
        setToken(response.data.token)

        //await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
        //await AsyncStorage.setItem('@RNAuth:token', response.token);
    }

    function signOut() {
        AsyncStorage.clear().then(() => {
            setUser(null);
        });
    }

    function forceLogout() {
        setUser(null)
        setToken(null)
    }

    async function forceLogin() {
        const email = 'Benzito'
		const name = 'Benzito'

		const response = await api.post('autenticate', { email, name })
        setUser(response.data.user)
        setToken(response.data.token)
    }

    function chosenDevice(device) {
        setDevice(device)
    }

    return (
        <AuthContext.Provider 
            value={{ signed: !!user, user, token, signIn, signOut, loading, forceLogin, forceLogout, device, chosenDevice }} 
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
