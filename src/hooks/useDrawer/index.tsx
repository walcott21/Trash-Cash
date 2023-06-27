import { createContext, useContext, useState } from "react"

interface Props {
    open:boolean
    setOpen:React.Dispatch<React.SetStateAction<boolean>>
}

const DEFAULT_VALUE = {
    open:false,
    setOpen:()=>{}
}

const DrawerContext = createContext<Props>(DEFAULT_VALUE)


export function DrawerContextProvider({ children }:{children:React.ReactNode}){
    const [open, setOpen] = useState<boolean>(false)

    return (
        <DrawerContext.Provider value={{open,setOpen}}>
            {children}
        </DrawerContext.Provider>
    )
}

export function useDrawer(){
    return useContext(DrawerContext)
}