import { UserPage } from './pages/UserPage';
import LoginPage from './pages/LoginPage'
import DataPage from './pages/DataPage'
import { Routes, Route } from 'react-router-dom';
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/datapage' element={<DataPage />} />
        <Route path='/datapage/:id' element={<UserPage />} />
      </Routes>
    </>
  )
}

export default App
