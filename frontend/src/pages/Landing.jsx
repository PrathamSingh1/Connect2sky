import React from 'react'
import { Link } from 'react-router-dom'

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
            <div className='hero-heading'>
                <h1><span style={{color: "#725CAD"}}>Connect</span> to your loved once</h1>
                <p>Cover a distance by Connect2sky</p>
                <div role='button' className='btn'>
                    <Link to={"/auth"}>Get Started</Link>
                </div>
            </div>
            <div className='mobile'>
                <img src="/mobile.png" alt="" />
            </div>
        </div>
    </div>
  )
}

export default Landing