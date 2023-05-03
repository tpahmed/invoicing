import SideBar from './components/SideBar'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import Container from './components/Container'
import ListerSociete from './components/ListerSociete'
import AjouterSociete from './components/AjouterSociete'
import ListerClient from './components/ListerClient'
import AjouterClient from './components/AjouterClient'

function App() {

  return (
    <div className="App">
      <BrowserRouter basename='/'>
        <NavBar/>
        <SideBar/>
        <Routes>
          <Route index path='accueil' element={<Container>hi</Container>}/>
          <Route path='societe/list' element={<Container><ListerSociete/></Container>}/>
          <Route path='societe/ajouter' element={<Container><AjouterSociete/></Container>}/>
          <Route path='client/list' element={<Container><ListerClient/></Container>}/>
          <Route path='client/ajouter' element={<Container><AjouterClient/></Container>}/>
          <Route path='produit/gere/prod' element={<></>}/>
          <Route path='produit/gere/cat' element={<></>}/>
          <Route path='facture/ajouter' element={<></>}/>
          <Route path='facture/gere' element={<></>}/>
          <Route path='*' element={<Navigate to={'accueil'}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
