import { useNavigate } from 'react-router-dom';
import Reflechir from '../assets/Reflechir.svg'
import Plus from '../assets/Plus.svg'
import { useEffect, useState } from 'react';
import './ListerClient.css';
import axios from 'axios';

export default function ListerClient() {
  const [search,setSearch] = useState('');
  const [Client,setClient] = useState([]);
  const Navigator = useNavigate();
  async function Update(){
    const response = await axios.get('//localhost:4444/client');
    setClient(response.data.data);
  }
  useEffect(()=>{
    Update()
  },[]);
  return (
    <div className="ListerClient">
        <div className="ListerClient-Options">
          <input type='text' placeholder='Chercher un Client' value={search} onChange={(e)=>setSearch(e.target.value)}/>
          <img src={Plus} alt='Ajouter' onClick={()=>Navigator('/Client/ajouter')} />
          <img src={Reflechir} alt='Reflechir' onClick={Update} />
        </div>
        <div className="ListerClient-List">
          <table className="ListerClient-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Adresse</th>
                <th>Email</th>
                <th>Tel</th>
                <th>Id Nationale</th>
              </tr>
            </thead>
            <tbody>
            
                {
                  Client.filter((e)=>{
                    console.log(e)
                    for (let elem in e){
                      if(`${e[elem]}`.toUpperCase().includes(search.toUpperCase())){
                        return e;
                      }
                    }
                  }).map((e)=>(
                    <tr key={e.id_client}>
                      <td>{e.Nom}</td>
                      <td>{e.Adresse}</td>
                      <td>{e.Email}</td>
                      <td>{e.Tel}</td>
                      <td>{e.Id_Nat}</td>
                    </tr>
                  ))
                }
            </tbody>
          </table>
        </div>
    </div>
  )
}
