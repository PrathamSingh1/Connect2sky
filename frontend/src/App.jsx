import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Authentication from './pages/Authentication';
import { AuthProvider } from './contexts/AuthContext';
import VideoMeet from './pages/VideoMeet';


function App() {
  

  return (
    <>
      <div>
        <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/auth' element={<Authentication />} />
            <Route path='/:url' element={<VideoMeet />} />
          </Routes>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
