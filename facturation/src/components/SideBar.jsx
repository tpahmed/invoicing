import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import Home from '../assets/Home.svg'
import Department from '../assets/Department.svg'
import Client from '../assets/Client.svg'
import Package from '../assets/Package.svg'
import Bill from '../assets/Bill.svg'
import Add from '../assets/Add.svg'
import List from '../assets/List.svg'
import Gerer from '../assets/Manage.svg'

import './SideBar.css'


export default function SideBar() {
  const Location = useLocation();
  const Navigator = useNavigate();
  return (
    <div className="SideBar">
      <div className={`SideBar-Option ${Location.pathname.toLowerCase().includes('accueil') ? 'SideBar-Option-Selected' : ''}`}>
        <div className='SideBar-Button' onClick={()=>Navigator('accueil')}>
          <img src={Home} alt='Page Principale'/>
          <span>Principale</span>
        </div>
      </div>
      <div className={`SideBar-Option ${Location.pathname.toLowerCase().includes('societe') ? 'SideBar-Option-Selected' : ''}`}>
        <div className='SideBar-Button' onClick={()=>Navigator('societe/list')}>
          <img src={Department} alt='Gererr les Societes'/>
          <span>Societes</span>
        </div>
        <div className="SideBar-SubPage">
          <div onClick={()=>Navigator('societe/list')} className={`SideBar-SubPage-Option ${Location.pathname.toLowerCase().includes('societe/list') ? 'SideBar-SubPage-Option-Selected' : ''}`}>
            <img src={List} alt='Lister les Societes'/>
            <span>Lister les Societes</span>
          </div>
          <div onClick={()=>Navigator('societe/ajouter')} className={`SideBar-SubPage-Option ${Location.pathname.toLowerCase().includes('societe/ajouter') ? 'SideBar-SubPage-Option-Selected' : ''}`}>
            <img src={Add} alt='Ajouter une Societe'/>
            <span>Ajouter une Societe</span>
          </div>
        </div>
      </div>
      <div className={`SideBar-Option ${Location.pathname.toLowerCase().includes('client') ? 'SideBar-Option-Selected' : ''}`}>
        <div className='SideBar-Button' onClick={()=>Navigator('client/list')}>
          <img src={Client} alt='Gererr les Clients'/>
          <span>Clients</span>
        </div>
        <div className="SideBar-SubPage">
          <div onClick={()=>Navigator('client/list')} className={`SideBar-SubPage-Option ${Location.pathname.toLowerCase().includes('client/list') ? 'SideBar-SubPage-Option-Selected' : ''}`}>
            <img src={List} alt='Lister les Clients'/>
            <span>Lister les Clients</span>
          </div>
          <div onClick={()=>Navigator('client/ajouter')} className={`SideBar-SubPage-Option ${Location.pathname.toLowerCase().includes('client/ajouter') ? 'SideBar-SubPage-Option-Selected' : ''}`}>
            <img src={Add} alt='Ajouter un Client'/>
            <span>Ajouter un Client</span>
          </div>
        </div>
      </div>
      <div className={`SideBar-Option ${Location.pathname.toLowerCase().includes('produit') ? 'SideBar-Option-Selected' : ''}`}>
        <div className='SideBar-Button' onClick={()=>Navigator('produit/gere/prod')}>
          <img src={Package} alt='Gererr les Produits et Services'/>
          <span>Produits et Services</span>
        </div>
        <div className="SideBar-SubPage">
          <div onClick={()=>Navigator('produit/gere/prod')} className={`SideBar-SubPage-Option ${Location.pathname.toLowerCase().includes('produit/gere/prod') ? 'SideBar-SubPage-Option-Selected' : ''}`}>
            <img src={Gerer} alt='Gerer les Categorie'/>
            <span>Gerer les Categorie</span>
          </div>
          <div onClick={()=>Navigator('produit/gere/cat')} className={`SideBar-SubPage-Option ${Location.pathname.toLowerCase().includes('produit/gere/cat') ? 'SideBar-SubPage-Option-Selected' : ''}`}>
            <img src={Gerer} alt='Gerer les Produits et Services'/>
            <span>Gerer les Produits et Services</span>
          </div>
        </div>
      </div>
      <div className={`SideBar-Option ${Location.pathname.toLowerCase().includes('facture') ? 'SideBar-Option-Selected' : ''}`}>
        <div className='SideBar-Button' onClick={()=>Navigator('facture/gere')}>
          <img src={Bill} alt='Facturation'/>
          <span>Facturation</span>
        </div>
        <div className="SideBar-SubPage">
          <div onClick={()=>Navigator('facture/gere')} className={`SideBar-SubPage-Option ${Location.pathname.toLowerCase().includes('facture/gere') ? 'SideBar-SubPage-Option-Selected' : ''}`}>
            <img src={Gerer} alt='Gerer les Facture'/>
            <span>Gerer les Facture</span>
          </div>
          <div onClick={()=>Navigator('facture/ajouter')} className={`SideBar-SubPage-Option ${Location.pathname.toLowerCase().includes('facture/ajouter') ? 'SideBar-SubPage-Option-Selected' : ''}`}>
            <img src={Add} alt='Ajouter une Facture'/>
            <span>Ajouter une Facture</span>
          </div>
        </div>
      </div>
    </div>
  )
}

