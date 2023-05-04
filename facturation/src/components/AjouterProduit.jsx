import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AjouterProduit.css';
import axios from 'axios';

export default function AjouterProduit() {
    const [Produit,SetProduit] = useState({Description:'',Categorie:'',Stock:'',Prix:''});
    const [Categories,setCategories] = useState([]);
    const [Categorie,setCategorie] = useState('');
    
    const Navigator = useNavigate();
    const Ajouter = ()=>{
        axios.post('//localhost:4444/produit',Produit).then(e=>{
            Navigator('/produit/list');
        });
    }
    async function Update(){
        const response = await axios.get('//localhost:4444/cat');
        setCategories(response.data.data);
    }
    useEffect(()=>{
        Update()
    },[]);
    useEffect(()=>{
        Categories.forEach((e)=>{
            if (e.Titre === Categorie){
                SetProduit({...Produit,Categorie:e.id_categorie})
            }
        })
    },[Categorie]);
    return (
    <div className="AjouterProduit">
        <div className="AjouterProduit-Line">
            <h1 style={{ color:"var(--Green)" }}>Ajouter Produit</h1>
        </div>
        <div className="AjouterProduit-Line">
            <input type='text' placeholder='Description' value={Produit.Description} onChange={(e)=>SetProduit({...Produit, Description:e.target.value})}/>
            
            <input list='Categories' className='AjouterProduit-Cat-input' type='text' placeholder='Categorie' value={Categorie} onChange={(e)=>{setCategorie(e.target.value);}}/>
            <datalist id='Categories' className='AjouterProduit-Cat-select' >
                {Categories.map((e)=><option key={e.id_categorie} value={e.Titre} >{e.Titre}</option>)}
            </datalist>
        </div>
        <div className="AjouterProduit-Line">
            <input type='text' placeholder='Stock' value={Produit.Stock} onChange={(e)=>!isNaN(Number(e.target.value)) ? SetProduit({...Produit, Stock:e.target.value}) : ''}/>
            
            <input type='text' placeholder='Prix' value={Produit.Prix} onChange={(e)=>!isNaN(Number(e.target.value)) ? SetProduit({...Produit, Prix:e.target.value}) : ''}/>
        </div>
        <div className="AjouterProduit-Line">
            <button className="AjouterProduit-Button" onClick={Ajouter}>
                Ajouter
            </button>
        </div>
    </div>
  )
}