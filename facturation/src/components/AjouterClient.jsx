import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './AjouterClient.css';
import axios from 'axios';

export default function AjouterClient() {
    const [Client,SetClient] = useState({Nom:'',Adresse:'',Email:'',Id_Nat:'',telzone:'',tel:''});
    const Navigator = useNavigate();
    const Ajouter = ()=>{
        axios.post('//localhost:4444/client',Client).then(e=>{
            Navigator('/client/list')
        });
    }
  return (
    <div className="AjouterClient">
        <div className="AjouterClient-Line">
            <h1 style={{ color:"var(--Green)" }}>Ajouter Client</h1>
        </div>
        <div className="AjouterClient-Line">
            <input type='text' placeholder='Nom' value={Client.Nom} onChange={(e)=>SetClient({...Client, Nom:e.target.value})}/>
            <input type='text' placeholder='Cart Nationale' value={Client.Id_Nat} onChange={(e)=>SetClient({...Client, Id_Nat:e.target.value})}/>
            <input type='text' placeholder='Email' value={Client.Email} onChange={(e)=>SetClient({...Client, Email:e.target.value})}/>
        </div>
        <div className="AjouterClient-Line">
            <div>
                <input type='text' maxLength={"3"} value={Client.telzone} onChange={(e)=>SetClient({...Client, telzone:e.target.value})} id='AjouterClient-zone' placeholder='Zone'/>
                <input type='text' maxLength={"9"} value={Client.tel} onChange={(e)=>SetClient({...Client, tel:e.target.value})} placeholder='Telephone'/>
            </div>
            <textarea placeholder='Adresse' value={Client.Adresse} onChange={(e)=>SetClient({...Client, Adresse:e.target.value})}></textarea>
        </div>
        <div className="AjouterClient-Line">
            <button className="AjouterClient-Button" onClick={Ajouter}>
                Ajouter
            </button>
        </div>
    </div>
  )
}