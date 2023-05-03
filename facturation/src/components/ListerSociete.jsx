import { useNavigate } from 'react-router-dom';
import Reflechir from '../assets/Reflechir.svg'
import { useState, useEffect } from 'react';
import Plus from '../assets/Plus.svg'
import './ListerSociete.css';
import axios from 'axios';

export default function ListerSociete() {
  const [search,setSearch] = useState('');
  const [Societe,setSociete] = useState([]);
  const Navigator = useNavigate();
  async function Update(){
    const response = await axios.get('//localhost:4444/societe');
    setSociete(response.data.data);
  }
  useEffect(()=>{
    Update()
  },[]);
  return (
    <div className="ListerSociete">
        <div className="ListerSociete-Options">
          <input type='text' placeholder='Chercher une societe' value={search} onChange={(e)=>setSearch(e.target.value)}/>
          <img src={Plus} alt='Ajouter' onClick={()=>Navigator('/societe/ajouter')} />
          <img src={Reflechir} alt='Reflechir' onClick={Update}/>
        </div>
        <div className="ListerSociete-List">
          <table className="ListerSociete-table">
            <thead>
              <tr>
                <th>Patente</th>
                <th>Raison Social</th>
                <th>Adresse</th>
                <th>Email</th>
                <th>Tel</th>
                <th>Factures Réalisé</th>
              </tr>
            </thead>
            <tbody>
            
                {
                  Societe.filter((e)=>{
                    for (let elem in e){
                      if(`${e[elem]}`.toUpperCase().includes(search.toUpperCase())){
                        return e;
                      }
                    }
                  }).map((e)=>(
                    <tr key={e.id_societe}>
                      <td>{e.Patente}</td>
                      <td>{e.Raison_S}</td>
                      <td>{e.Adresse}</td>
                      <td>{e.Email}</td>
                      <td>{e.Tel}</td>
                      <td>{e.invoice_count}</td>
                    </tr>
                  ))
                }
            </tbody>
          </table>
        </div>
    </div>
  )
}
