import { useContext,createContext } from "react";
import {navIcons} from "../../data/navicons";

const NavContext=createContext();

export function useNavLinksValue(){
    return useContext(NavContext);
}


//since this also requires Navbar and all the pages, we pass this to the whole APP

export default function NavContextComponent({children}){
  
    return (
        <NavContext.Provider value={{navIcons}}>
            {children}
        </NavContext.Provider>
    )
}