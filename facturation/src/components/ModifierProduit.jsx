import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ModifierProduit.css';
import axios from 'axios';

export default function ModifierProduit() {
    const [Produit,SetProduit] = useState({});
    const [Categories,setCategories] = useState([]);
    const [Categorie,setCategorie] = useState('');
    const {id} = useParams();
    const Navigator = useNavigate();
    const Modifier = ()=>{
        axios.post(`//localhost:4444/produit/${id}`,Produit).then(e=>{
            Navigator('/produit/list');
        });
    }
    async function Update(){
        const response1 = await axios.get('//localhost:4444/cat');
        setCategories(response1.data.data);
        const response2 = await axios.get(`//localhost:4444/produit/${id}`);
        if (!response2.data.success){
            Navigator('/produit/list')
        }
        SetProduit(response2.data.data[0]);
    }
    useEffect(()=>{
        Update()
    },[]);
    useEffect(()=>{
        axios.get(`//localhost:4444/cat/${Produit.id_categorie}`).then((e)=>{
            setCategorie(e.data.data[0].Titre);
        });
    },[Produit]);
    useEffect(()=>{
        Categories.forEach((e)=>{
            if (e.Titre === Categorie){
                SetProduit({...Produit,id_categorie:e.id_categorie})
            }
        })
    },[Categorie]);
    return (
    <div className="ModifierProduit">
        <div className="ModifierProduit-Line">
            <h1 style={{ color:"var(--Green)" }}>Modifier Produit</h1>
        </div>
        <div className="ModifierProduit-Line">
            <input type='text' placeholder='Description' value={Produit.Description} onChange={(e)=>SetProduit({...Produit, Description:e.target.value})}/>
            
            <input list='Categories' className='ModifierProduit-Cat-input' type='text' placeholder='Categorie' value={Categorie} onChange={(e)=>{setCategorie(e.target.value);}}/>
            <datalist id='Categories' className='ModifierProduit-Cat-select' >
                {Categories.map((e)=><option key={e.id_categorie} value={e.Titre} >{e.Titre}</option>)}
            </datalist>
        </div>
        <div className="ModifierProduit-Line">
            <input type='text' placeholder='Stock' value={Produit.Stock} onChange={(e)=>!isNaN(Number(e.target.value)) ? SetProduit({...Produit, Stock:e.target.value}) : ''}/>
            
            <input type='text' placeholder='Prix' value={Produit.Price} onChange={(e)=>!isNaN(Number(e.target.value)) ? SetProduit({...Produit, Price:e.target.value}) : ''}/>
        </div>
        <div className="ModifierProduit-Line">
            <button className="ModifierProduit-Button" onClick={Modifier}>
                Modifier
            </button>
        </div>
    </div>
  )
}