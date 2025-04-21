import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createContext } from 'react'
export const UScontext = createContext()
const Appwraper = () => {
  const [user, setUser] = useState(false)
  const [shopkeeper, setShopkeeper] = useState(false)
   

  return (
    <>
      <UScontext.Provider value={{user,setUser,shopkeeper,setShopkeeper}}  >
            <App/>
      </UScontext.Provider>
    </>
  )

}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Appwraper />
  </StrictMode>,
)
