import React, { createContext, useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';

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
    const [loading, setLoading] = useState(true);

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

    async function signIn() {
        // Função para fazer o login na api
        const response = await auth.Signin()
        setUser(response.user)

        await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
        await AsyncStorage.setItem('@RNAuth:token', response.token);
    }

    function signOut() {
        AsyncStorage.clear().then(() => {
            setUser(null);
        });
    }

    function forceLogout() {
        setUser(null)
    }

    async function forceLogin() {
        let json = await Sign()
        setUser(json.user)
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut, loading, forceLogin, forceLogout }} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
