import CustomDrawer from "@/components/customDrawer";

interface Props{
    children:React.ReactNode
}

export default function BaseAppLayout({children}:Props){
    return (
        <CustomDrawer title="TrashCash">
            {children}
        </CustomDrawer>    
    )
}