import { createContext,useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import Back from '../assets/Back.svg'

export const SideBar_Context = createContext();

export default function SideBarContext({children}) {
    const [Toggle,SetToggle] = useState(false);
    const Location = useLocation();
    const Navigator = useNavigate();
    if (!Location.pathname.includes('facture/view')){
      return (
        <SideBar_Context.Provider value={{ Toggle,SetToggle }}>{children}</SideBar_Context.Provider>
      )
    }
    return <div className="NavBack-Back" onClick={()=>Navigator('/facture/gere')}><img src={Back} alt="Retourne" width={'40px'} /></div>;
}
