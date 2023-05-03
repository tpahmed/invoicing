import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './AjouterSociete.css';
import axios from 'axios';

export default function AjouterSociete() {
    const [Societe,SetSociete] = useState({Raison_S:'',Adresse:'',Email:'',Patente:'',telzone:'',tel:''});
    const Navigator = useNavigate();
    const Ajouter = ()=>{
        axios.post('//localhost:4444/societe',Societe).then(e=>{
            Navigator('/societe/list')
        });
    }
    return (
    <div className="AjouterSociete">
        <div className="AjouterSociete-Line">
            <h1 style={{ color:"var(--Green)" }}>Ajouter Societe</h1>
        </div>
        <div className="AjouterSociete-Line">
            <input type='text' placeholder='Raison Sociale' value={Societe.Raison_S} onChange={(e)=>SetSociete({...Societe, Raison_S:e.target.value})}/>
            <input type='text' placeholder='Patente' value={Societe.Patente} onChange={(e)=>SetSociete({...Societe, Patente:e.target.value})}/>
            <input type='text' placeholder='Email' value={Societe.Email} onChange={(e)=>SetSociete({...Societe, Email:e.target.value})}/>
        </div>
        <div className="AjouterSociete-Line">
            <div>
                <input type='text' maxLength={"3"} value={Societe.telzone} onChange={(e)=>SetSociete({...Societe, telzone:e.target.value})} id='AjouterSociete-zone' placeholder='Zone'/>
                <input type='text' maxLength={"9"} value={Societe.tel} onChange={(e)=>SetSociete({...Societe, tel:e.target.value})} placeholder='Telephone'/>
            </div>
            <textarea placeholder='Adresse' value={Societe.Adresse} onChange={(e)=>SetSociete({...Societe, Adresse:e.target.value})}></textarea>
        </div>
        <div className="AjouterSociete-Line">
            <button className="AjouterSociete-Button" onClick={Ajouter}>
                Ajouter
            </button>
        </div>
    </div>
  )
}