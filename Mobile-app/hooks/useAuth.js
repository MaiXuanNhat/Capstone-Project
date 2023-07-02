import { useContext } from 'react'
import UserContext from '../contexts/AuthContext'

const useAuth = () => {
  return useContext(UserContext)
}

export default useAuth