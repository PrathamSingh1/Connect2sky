import React from 'react'

const Landing = () => {
  return (
    <div className='landingPageContainer'>
        <nav>
            <div className='navHeader'>
                <h2>Connect2sky</h2>
            </div>
            <div className='navlist'>
                <p>Join as Guest</p>
                <p>Register</p>
                <div role='button'>
                    <p>Login</p>
                </div>
            </div>
        </nav>

        <div className="landingMainContainer">
            <div></div>
            <div></div>
        </div>
    </div>
  )
}

export default Landing