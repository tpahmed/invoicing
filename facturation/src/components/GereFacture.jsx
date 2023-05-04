import Reflechir from '../assets/Reflechir.svg'
import { useEffect, useState } from 'react';
import Yes from '../assets/Yes.svg'
import No from '../assets/No.svg'
import Plus from '../assets/Plus.svg'
import Info from '../assets/Info.svg'
import './GereFacture.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function GereFacture() {
    const [search,setSearch] = useState('');
    const [FactureName,setFactureName] = useState('');
    const [Factures,setFactures] = useState([]);
    const Navigator = useNavigate();
    const Payer = (id)=>{
        axios.post(`//localhost:4444/facture/${FactureName}`).then((e)=>{
            Update();
        });
    };

  async function Update(){
    const response = await axios.get('//localhost:4444/facture');
    setFactures(response.data.data);
  }
  useEffect(()=>{
    Update()
  },[]);
  return (
    <div className="GereFacture">
        <div className="GereFacture-Options">
            <div>
                <input type='text' placeholder='Chercher une Facture' value={search} onChange={(e)=>setSearch(e.target.value)}/>
                <img src={Reflechir} alt='Reflechir' onClick={Update} />
                <img src={Plus} alt='Ajouter' onClick={()=>Navigator('/facture/ajouter')} />
            </div>
            <div>

                <input type='text' placeholder='No Facture' value={FactureName} onChange={(e)=>setFactureName(e.target.value)}/>
                <button className="GereFacture-Button" onClick={Payer}>
                    Payer
                </button>
            </div>
        </div>
        <div className="GereFacture-List">
          <table className="GereFacture-table">
            <thead>
              <tr>
                <th>Facture</th>
                <th>Date</th>
                <th>Note</th>
                <th>Total</th>
                <th>Payé</th>
                <th>Inspecter</th>
              </tr>
            </thead>
            <tbody>
            
                {
                  Factures.filter((e)=>{
                    for (let elem in e){
                      if(`${e[elem]}`.toUpperCase().includes(search.toUpperCase())){
                        return e;
                      }
                    }
                  }).map((e)=>(
                    <tr key={e.no_inv}>
                      <td>{e.no_inv}</td>
                      <td>{new Date(Date.parse(e.Date_inv)).toLocaleDateString('en-GB').replace(/\//gi,'.')}</td>
                      <td>{e.Note}</td>
                      <td>${e.Total*(100+e.Taxes)/100}</td>
                      <td><img src={e.Payed ? Yes : No} alt={e.Payed ? 'Oui' : 'Non'} width={'40px'} /></td>
                      <td><button onClick={()=>Navigator(`/facture/view/${e.no_inv}`)}><img src={Info} alt={`Inspecter ${e.no_inv}`} width={'40px'} /></button></td>
                    </tr>
                  ))
                }
            </tbody>
          </table>
        </div>
    </div>
  )
}
