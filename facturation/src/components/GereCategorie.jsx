import Reflechir from '../assets/Reflechir.svg'
import { useEffect, useState } from 'react';
import Bin from '../assets/Bin.svg'
import Yes from '../assets/Yes.svg'
import No from '../assets/No.svg'
import './GereCategorie.css';
import axios from 'axios';

export default function GereCategorie() {
    const [search,setSearch] = useState('');
    const [CategorieName,setCategorieName] = useState('');
    const [service,setService] = useState(false);
    const [Categorie,setCategorie] = useState([]);
    const Ajouter = ()=>{
        axios.post('//localhost:4444/cat',{CategorieName,service}).then(()=>{
            setService(false);
            setCategorieName('');
            Update();
        });
    };
    const Supprimer = (id)=>{
        axios.delete('//localhost:4444/cat',{
            data:{id}
        }).then((e)=>{
            Update();
        });
    };

  async function Update(){
    const response = await axios.get('//localhost:4444/cat');
    setCategorie(response.data.data);
  }
  useEffect(()=>{
    Update()
  },[]);
  return (
    <div className="GereCategorie">
        <div className="GereCategorie-Options">
            <div>
                <input type='text' placeholder='Chercher une Categorie' value={search} onChange={(e)=>setSearch(e.target.value)}/>
                <img src={Reflechir} alt='Reflechir' onClick={Update} />
            </div>
            <div>

                <input type='text' placeholder='Categorie' value={CategorieName} onChange={(e)=>setCategorieName(e.target.value)}/>
                <span>Service :</span>
                <div className='GereCategorie-CheckBox' onClick={()=>setService(!service)}><div className='GereCategorie-CheckBox-check' style={{ visibility: service ? "visible" : "hidden" }}></div></div>
                <button className="GereCategorie-Button" onClick={Ajouter}>
                    Ajouter
                </button>
            </div>
        </div>
        <div className="GereCategorie-List">
          <table className="GereCategorie-table">
            <thead>
              <tr>
                <th>Categorie</th>
                <th>Service</th>
                <th>Nbr Produits</th>
                <th>Supprimer</th>
              </tr>
            </thead>
            <tbody>
            
                {
                  Categorie.filter((e)=>{
                    for (let elem in e){
                      if(`${e[elem]}`.toUpperCase().includes(search.toUpperCase())){
                        return e;
                      }
                    }
                  }).map((e)=>(
                    <tr key={e.id_categorie}>
                      <td>{e.Titre}</td>
                      <td><img src={e.Service ? Yes : No} alt={e.Service ? 'Oui' : 'Non'}  width={'50px'}/></td>
                      <td>{e.products_count}</td>
                      <td><button style={{ "borderColor":e.products_count == 0 ? null : 'var(--Red)' }} onClick={e.products_count == 0 ? ()=>Supprimer(e.id_categorie) : ()=>{}}><img src={Bin} alt={`Supprimer ${e.Titre}`} width={'50px'}/></button></td>
                    </tr>
                  ))
                }
            </tbody>
          </table>
        </div>
    </div>
  )
}
