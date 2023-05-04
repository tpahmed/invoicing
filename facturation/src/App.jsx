import SideBar from './components/SideBar'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import Container from './components/Container'
import ListerSociete from './components/ListerSociete'
import AjouterSociete from './components/AjouterSociete'
import ListerClient from './components/ListerClient'
import ListerProduit from './components/ListerProduit'
import AjouterProduit from './components/AjouterProduit'
import ModifierProduit from './components/ModifierProduit'
import AjouterClient from './components/AjouterClient'
import GereCategorie from './components/GereCategorie'
import SideBarContext from './contexts/SideBarContext'
import CreeFacture from './components/CreeFacture'
import GereFacture from './components/GereFacture'
import AfficherFacture from './components/AfficherFacture'

function App() {

  return (
    <div className="App">
      <BrowserRouter basename='/'>
        <SideBarContext>
          <NavBar/>
          <SideBar/>
        </SideBarContext>
        <Routes>
          <Route index path='accueil' element={<Container>hi</Container>}/>
          <Route path='societe/list' element={<Container><ListerSociete/></Container>}/>
          <Route path='societe/ajouter' element={<Container><AjouterSociete/></Container>}/>
          <Route path='client/list' element={<Container><ListerClient/></Container>}/>
          <Route path='client/ajouter' element={<Container><AjouterClient/></Container>}/>
          <Route path='produit/gere' element={<Container><GereCategorie/></Container>}/>
          <Route path='produit/list' element={<Container><ListerProduit/></Container>}/>
          <Route path='produit/ajouter' element={<Container><AjouterProduit/></Container>}/>
          <Route path='produit/modifier/:id' element={<Container><ModifierProduit/></Container>}/>
          <Route path='facture/ajouter' element={<Container><CreeFacture/></Container>}/>
          <Route path='facture/view/:id' element={<AfficherFacture/>}/>
          <Route path='facture/gere' element={<Container><GereFacture/></Container>}/>
          <Route path='*' element={<Navigate to={'facture/ajouter'}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
