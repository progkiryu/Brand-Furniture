import './App.css'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import HomePage from '../pages/Dashboard.tsx'
import SchedulePage from '../pages/SchedulePage.tsx'
import AnalyticsPage from '../pages/AnalyticsPage.tsx'
import SettingsPage from '../pages/SettingsPage.tsx'
import NavBar from '../components/home-page/NavBar.tsx';
import {Routes, Route} from 'react-router-dom'


function App() {

  return (
    <>
      <div className="page-container">
        <NavBar/>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/dashboard' element={<HomePage/>}/>
          <Route path='/schedule' element={<MantineProvider><SchedulePage/></MantineProvider>}/>
          <Route path='/analytics' element={<AnalyticsPage/>}/>
          <Route path='/settings' element={<SettingsPage/>}/>
        </Routes>
      </div>

        
      
    </>
  )
}

export default App;
