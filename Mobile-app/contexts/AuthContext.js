import React, { createContext, useEffect, useMemo, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import axiosClient from '../api/axiosClient'
import auth from '../api/auth'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [token, setToken] = useState(null)
  const [authUser, setAuthUser] = useState(null)

  const handleLogin = async (credentials, navigation) => {
    try {
      const response = await auth.login(credentials)
      if (response.request.status === 200) {
        await AsyncStorage.setItem('token', response.data.token)
        setToken(response.data.token)
        console.log(response.data.message)
        navigation.navigate('Home')
      }
    } catch (error) {
      //TODO: hiển bị thông báo theo từng error code (error.request.status === 404)
      console.log(error)
    }
  }

  const handleLogout = async (navigation) => {
    await AsyncStorage.setItem('token', '')
    await AsyncStorage.setItem('authUser', '')
    setToken(null)
    setAuthUser(null)
    navigation.navigate('Login')
  }

  const checkAuthStatus = async () => {
    const storedToken = await AsyncStorage.getItem('token')

    if (storedToken !== null) {
      // Set authenticate token to axios
      axiosClient.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${storedToken}`

      if (token) {
        // Set new authenticate token to axios
        axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
        await AsyncStorage.setItem('token', token)

        // Get current user's data
        auth
          .getAuthenticatedUser()
          .then(async (response) => {
             {
              await AsyncStorage.setItem(
                'authUser',
                JSON.stringify(response.data),
              )
              setAuthUser(response.data)
              console.log('Get authentication info successfully!')
            }
          })
          .catch((error) => {
            console.log(token)
            console.log('Get authentication info error:', error)
          })
      } else {
        // User already logged in, set stored token to token state
        setToken(storedToken)
      }
    } else {
      // User logged out
      console.log('User logged out!')
    }
  }

  useEffect(() => {
    checkAuthStatus()
  }, [token])

  const providedValue = useMemo(
    () => ({
      isLoading,
      setIsLoading,
      token,
      authUser,
      handleLogin,
      handleLogout,
    }),
    [isLoading, setIsLoading, token, authUser, handleLogin, handleLogout],
  )

  return (
    <AuthContext.Provider value={providedValue}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext