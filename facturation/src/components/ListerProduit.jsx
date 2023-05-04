import { useNavigate } from 'react-router-dom';
import Reflechir from '../assets/Reflechir.svg'
import { useState, useEffect } from 'react';
import Plus from '../assets/Plus.svg'
import Bin from '../assets/Bin.svg'
import Pen from '../assets/Pen.svg'
import './ListerProduit.css';
import axios from 'axios';

export default function ListerProduit() {
  const [search,setSearch] = useState('');
  const [Produit,setProduit] = useState([]);
  const Navigator = useNavigate();
  async function Update(){
    const response = await axios.get('//localhost:4444/produit');
    setProduit(response.data.data);
  }
  useEffect(()=>{
    Update()
  },[]);
  const Supprimer = (id)=>{
    axios.delete('//localhost:4444/produit',{
        data:{id}
    }).then((e)=>{
        Update();
    });
};
  return (
    <div className="ListerProduit">
        <div className="ListerProduit-Options">
          <input type='text' placeholder='Chercher une Produit' value={search} onChange={(e)=>setSearch(e.target.value)}/>
          <img src={Plus} alt='Ajouter' onClick={()=>Navigator('/produit/ajouter')} />
          <img src={Reflechir} alt='Reflechir' onClick={Update}/>
        </div>
        <div className="ListerProduit-List">
          <table className="ListerProduit-table">
            <thead>
              <tr>
                <th>Categorie</th>
                <th>Description</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Modifier</th>
                <th>Supprimer</th>
              </tr>
            </thead>
            <tbody>
            
                {
                  Produit.filter((e)=>{
                    for (let elem in e){
                      if(`${e[elem]}`.toUpperCase().includes(search.toUpperCase())){
                        return e;
                      }
                    }
                  }).map((e)=>(
                    <tr key={e.id_produit}>
                      <td>{e.products_cat}</td>
                      <td>{e.Description}</td>
                      <td>{e.Stock}</td>
                      <td>{e.Price}</td>
                      <td><button onClick={()=>Navigator(`/produit/modifier/${e.id_produit}`)}><img src={Pen} alt={`Modifier ${e.Description}`} width={'50px'}/></button></td>
                      <td><button onClick={()=>Supprimer(e.id_produit)}><img src={Bin} alt={`Supprimer ${e.Description}`} width={'50px'}/></button></td>
                    </tr>
                  ))
                }
            </tbody>
          </table>
        </div>
    </div>
  )
}
