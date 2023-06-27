import { Alert, AlertColor, Snackbar } from "@mui/material"
import { createContext, useContext, useState } from "react"

interface Props {
    showSnackbarMessage:(severity: AlertColor, message: string)=>void
}

const DEFAULT_VALUE = {
    showSnackbarMessage:()=>{}
}

const SnackbarContext = createContext<Props>(DEFAULT_VALUE)


export function SnackbarContextProvider({ children }:{children:React.ReactNode}){
    const [open, setOpen] = useState<boolean>(false)
    const [severity, setSeverity] = useState<AlertColor>("success")
    const [message, setMessage] = useState<string>("")

    const showSnackbarMessage = (severity:AlertColor,message:string)=>{
        setSeverity(severity)
        setMessage(message)
        setOpen(true)
    }


    return (
        <SnackbarContext.Provider value={{showSnackbarMessage}}>
            {children}
            <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                <Alert onClose={() => setOpen(false)} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    )
}

export function useSnackbar(){
    return useContext(SnackbarContext)
}