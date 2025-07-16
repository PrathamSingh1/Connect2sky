import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Authentication from './pages/Authentication';


function App() {
  

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/auth' element={<Authentication />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
