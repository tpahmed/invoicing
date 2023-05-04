import { createContext,useState } from "react"

export const SideBar_Context = createContext();

export default function SideBarContext({children}) {
    const [Toggle,SetToggle] = useState(false);
  return (
    <SideBar_Context.Provider value={{ Toggle,SetToggle }}>{children}</SideBar_Context.Provider>
  )
}
