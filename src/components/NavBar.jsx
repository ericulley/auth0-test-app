
import { useAuth0 } from '@auth0/auth0-react'
import { useState } from 'react'

const NavBar = () => {

    const { user, isLoading, loginWithPopup, logout } = useAuth0()

    const [access, setAccess] = useState("")

    const login = async () => {
        loginWithPopup().then(() => {
            if (!user) {
                setAccess("Access Denied: Please logout and try again.")
            }
        })
    }

    return (
        <nav id="navbar-container">
          <p>Auth0</p>
          <div id="auth-panel">
            {!isLoading && !user && !access && (
                <button onClick={login}>Log In</button>
            )}

            {!isLoading && !user && access && <p>{access}</p>}

            {!isLoading && (
                <button onClick={() => {logout()}}>Log Out</button>
            )}
          </div>
        </nav>
    )
}

export default NavBar