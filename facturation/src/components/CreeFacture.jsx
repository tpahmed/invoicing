import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Add from '../assets/Plus.svg'
import Bin from '../assets/Bin.svg'
import './CreeFacture.css';
import axios from 'axios';

export default function CreeFacture() {
    const [Facture,SetFacture] = useState({no_inv:'',id_client:'',id_societe:'',Note:''});
    const [Categorie,SetCategorie] = useState('')
    const [Produit,SetProduit] = useState({id_categorie:'',id_produit:'',max_qte:0,Qte:'',Total:''});
    const [Produits,SetProduits] = useState([]);
    const [ProduitsCommander,SetProduitsCommander] = useState([]);
    const [Clients,SetClients] = useState([])
    const [Societes,SetSocietes] = useState([])
    const [Tax,SetTax] = useState(20);
    const [Categories,SetCategories] = useState([])
    const Navigator = useNavigate();
    const dt = new Date();

    
    const AjouterProd = ()=>{
        SetProduitsCommander([...ProduitsCommander,{no_inv:`F${dt.getFullYear()}${Facture.no_inv}`,id_categorie:Produit.id_categorie,id_produit:Produit.id_produit,Item:Categorie,Description:Produit.Description,Qte:Produit.Qte,Price:Produit.Price,Total:Produit.Total}]);
        SetCategorie('');
    }
    
    const Cree = ()=>{
        axios.post('//localhost:4444/facture',{...Facture,no_fac:`F${dt.getFullYear()}${Facture.no_inv}`,Taxes:Tax,Total:ProduitsCommander.reduce((prev,curr,indx)=>ProduitsCommander[indx].Total+prev,0),Date_inv:`${dt.getFullYear()}-${dt.getMonth()+1}-${dt.getDay()}`,ProduitsCommander}).then(e=>{
            Navigator('/facture/gere');
        });
    }

    useEffect(()=>{
        axios.get('//localhost:4444/facture/num').then(e=>{
            SetFacture({...Facture,no_inv:e.data.data.num})
        });
        axios.get('//localhost:4444/client').then(e=>{
            SetClients(e.data.data)
        });
        axios.get('//localhost:4444/societe').then(e=>{
            SetSocietes(e.data.data)
        });
        axios.get('//localhost:4444/cat').then(e=>{
            SetCategories(e.data.data)
        })
        axios.get('//localhost:4444/produit').then(e=>{
            SetProduits(e.data.data)
        })
    },[]);
    useEffect(()=>{
        for (let e in Categories){
            if (Categories[e].Titre === Categorie){
                SetProduit({...Produit,id_categorie:Categories[e].id_categorie})
                return
            }
        }
        SetProduit({...Produit,id_categorie:'',id_produit:'',Description:'',max_qte:'',Qte:''})
    },[Categorie]);
    useEffect(()=>{
        for (let e in Produits){
            if (Produits[e].id_produit == Produit.id_produit){
                SetProduit({...Produit,Description:Produits[e].Description,max_qte:Produits[e].Stock})
                return
            }
        }
        SetProduit({...Produit,id_produit:'',Description:'',max_qte:'',Qte:''})
    },[Produit.id_produit]);
    useEffect(()=>{
        Produits.forEach((e)=>{
            if (e.id_produit == Produit.id_produit){
                SetProduit({...Produit,Price:e.Price,Total:Produit.Qte*e.Price})
            }
        })
    },[Produit.Qte]);
    return (
    <div className="CreeFacture">
        <div className="CreeFacture-Line">
            <h1 style={{ color:"var(--Green)" }}>Cree Facture</h1>
            <div className='CreeFacture-InfoInitial'>
                <div>Numero Facture : <span>#F{dt.getFullYear()}{Facture.no_inv}</span></div>
                <div>Date : <span>{dt.getDay()}.{dt.getMonth()+1}.{dt.getFullYear()}</span></div>

            </div>
        </div>
        <div className="CreeFacture-Line">
            <input list='Client' type='text' placeholder='Client' value={Facture.id_client} onChange={(e)=>{SetFacture({...Facture,id_client:e.target.value});}}/>
            <datalist id='Client' >
                {Clients.map((e)=><option key={e.id_client} value={e.id_client} >{e.Nom}</option>)}
            </datalist>
            <input list='Societes' type='text' placeholder='Societe' value={Facture.id_societe} onChange={(e)=>{SetFacture({...Facture,id_societe:e.target.value});}}/>
            <datalist id='Societes' >
                {Societes.map((e)=><option key={e.id_societe} value={e.id_societe} >{e.Raison_S}</option>)}
            </datalist>
        </div>
        <div className="CreeFacture-Line">
            <input list='Categories' type='text' placeholder='Item' value={Categorie} onChange={(e)=>{SetCategorie(e.target.value);}}/>
            <datalist id='Categories' >
                {Categories.map((e)=><option key={e.id_categorie} value={e.Titre} >{e.Titre}</option>)}
            </datalist>
            <input list='Produits' type='text' placeholder='Description' style={Produit.id_categorie ? null : { visibility:'hidden' }} value={Produit.id_produit} onChange={(e)=>{SetProduit({...Produit,id_produit:e.target.value});}}/>
            <datalist id='Produits' >
                {Produits.filter(e=>e.id_categorie === Produit.id_categorie && e.Stock != 0).map((e)=><option key={e.id_produit} value={e.id_produit} >{e.Description}</option>)}
            </datalist>
            <input type='text' placeholder='Qte.' style={Produit.id_produit ? null : { visibility:'hidden' }} value={Produit.Qte} onChange={(e)=>{!isNaN(Number(e.target.value)) && Number(e.target.value) <= Produit.max_qte ? SetProduit({...Produit,Qte:e.target.value}) : ''}}/>
            <img src={Add} alt="Ajouter Produit" style={Number(Produit.Qte) ? null : { visibility:'hidden' }} onClick={AjouterProd} width={'40px'} />
        </div>
        <div className="CreeFacture-Line">
            <div className="CreeFacture-List">
                <table className='CreeFacture-table'>
                    <thead>
                    <tr>
                        <th>Item</th>
                        <th>Description</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th>Supprimer</th>
                    </tr>
                    </thead>
                    <tbody>
                    
                        {
                        ProduitsCommander.map((e)=>(
                            <tr key={e.id_produit}>
                                <td>{e.Item}</td>
                                <td>{e.Description}</td>
                                <td>{e.Qte}</td>
                                <td>${e.Price}</td>
                                <td>${e.Total}</td>
                                <td><img src={Bin} alt={`Supprimer ${e.Description}`} width={'30px'} onClick={()=>SetProduitsCommander(ProduitsCommander.filter((el)=>el.id_produit != e.id_produit))} /></td>
                            </tr>
                        ))
                        }
                    </tbody>
                    <tfoot style={{ fontFamily:"Inter-Bold" }}>
                        <tr>
                            <td colSpan={2} rowSpan={3}>Tax : <input type='text' id='CreeFacture-Tax' value={Tax} onChange={(e)=>{!isNaN(Number(e.target.value)) && Number(e.target.value) < 100 ? SetTax(Number(e.target.value)) : ''}}/>%</td>
                            <td colSpan={2}>SubTotal</td>
                            <td>{ProduitsCommander.reduce((prev,curr,indx)=>ProduitsCommander[indx].Total+prev,0)}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td colSpan={2}>Tax</td>
                            <td>-${(ProduitsCommander.reduce((prev,curr,indx)=>ProduitsCommander[indx].Total+prev,0)*Tax)/100}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td colSpan={2} style={{ fontSize:'1.5em',fontWeight:"1000" }}>Total Amount</td>
                            <td>${ProduitsCommander.reduce((prev,curr,indx)=>ProduitsCommander[indx].Total+prev,0)+(ProduitsCommander.reduce((prev,curr,indx)=>ProduitsCommander[indx].Total+prev,0)*Tax)/100}</td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
        <div className="CreeFacture-Line">
            <textarea value={Facture.Note} placeholder='Note' onChange={e=>SetFacture({...Facture,Note:e.target.value})}></textarea>
        </div>
        <div className="CreeFacture-Line">
            <button className="CreeFacture-Button" onClick={Cree}>
                Cree
            </button>
        </div>
    </div>
  )
}