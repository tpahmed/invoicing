import { SideBar_Context } from '../contexts/SideBarContext'
import Logo from '../assets/logo.svg'
import Menu from '../assets/Menu.svg'
import './NavBar.css'
import { useContext } from 'react'

export default function NavBar() {
  const {Toggle,SetToggle} = useContext(SideBar_Context);
  return (
    <div className="NavBar"><button onClick={()=>SetToggle(!Toggle)}><img src={Menu} alt={`Toggleer`} width={'30px'} style={Toggle ? { rotate:"90deg" } : null}/></button><img src={Logo} alt="Logo"/></div>
  )
}
