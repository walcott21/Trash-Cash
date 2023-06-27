import { Icons } from "@/assets";
import { Box, Button, CSSObject, Drawer, DrawerProps, Grid, IconButton, IconButtonProps, Paper, PaperProps, Theme, Typography, colors, styled, useTheme } from "@mui/material";
import Image from "next/image";
import DrawerItem from "./drawerItem";
import { useState } from "react";
import LineAxisIcon from '@mui/icons-material/LineAxis';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import GroupsIcon from '@mui/icons-material/Groups';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useDrawer } from "@/hooks/useDrawer";

const drawerWidth = 28;

const DrawerContent = styled(Paper)<PaperProps>(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    height: "100vh",
    overflow:"none"
}))

const openedMixin = (theme: Theme): CSSObject => ({
    width: theme.spacing(drawerWidth),
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    width: `calc(${theme.spacing(8)} + 1px)`,
});

const StyledDrawer = styled(Drawer)<DrawerProps>(({ theme, open }) => ({
    width: theme.spacing(drawerWidth),
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
    }),
);

const Divider = styled("div")(({theme})=>({
    width:theme.spacing(drawerWidth),
    background:"white",
    height:"1px",
    marginTop:theme.spacing(4),
    marginBottom:theme.spacing(1)
}))

const StyledIconsButton = styled(IconButton)<IconButtonProps>(({theme})=>({
    backgroundColor:"#90CAF9",
    width:theme.spacing(7),
    height:theme.spacing(7),
    marginBottom:theme.spacing(2)
}))

interface Props {
    children: React.ReactNode
    title: string
}

export default function CustomDrawer({ children, title }: Props) {
    const {open, setOpen:setIsOpen} = useDrawer()
    const [logoWidth, setLogoWidth] = useState<number>(open?40:30)
    const [logoHeight, setLogoHeight] = useState<number>(open?55:41)

    const theme = useTheme()

    const handleChange = () => setIsOpen(value=>{
        let newValue = !value
        setLogoWidth(newValue?40:30)
        setLogoHeight(newValue?55:41)
        return newValue
    })
    
    return (
        <Box sx={{ display: 'flex' }}>
            <StyledDrawer variant="permanent" open={open} >
                <Box>
                    <DrawerContent >
                        <Grid 
                            container
                            direction="column"
                            justifyContent="space-between"
                            alignItems="center"
                            height={"100vh"}
                        >
                            <Grid item container alignItems="center" justifyContent="center">
                                <Grid item container direction="column" alignItems="center" justifyContent="center" margin={0} padding={0}>
                                    <Grid item container alignItems="center" justifyContent="center">
                                        <Box paddingTop={theme.spacing(4)} paddingBottom={theme.spacing(4)}>
                                            <Image src={Icons.logo} alt="logo" width={logoWidth} height={logoHeight}/>
                                        </Box>
                                    </Grid>
                                    {open?<Typography variant="h4" color="white">
                                        {title}
                                    </Typography>:<></>}
                                </Grid>

                                <Divider/>

                                <Grid item container direction="column">
                                    <DrawerItem name="Dashboard" link="/app/dashboard" showText={open} icon={<LineAxisIcon/>}/>
                                    <DrawerItem name="Rewards" link="/app/rewards" showText={open} icon={<WorkspacePremiumIcon/>}/>
                                    <DrawerItem name="Collection Points" link="/app/collection-points" showText={open} icon={<FmdGoodIcon/>}/>
                                    <DrawerItem name="Manage Profiles" link="/app/profile" showText={open} icon={<GroupsIcon/>}/>
                                </Grid>
                            </Grid>

                            <Grid item>
                                <StyledIconsButton onClick={handleChange}>
                                    {open?
                                        <ArrowBackIosIcon sx={{paddingLeft:1}} />:
                                        <ArrowForwardIosIcon/>
                                    }
                                </StyledIconsButton>
                            </Grid>
                        </Grid>
                    </DrawerContent>
                </Box>
            </StyledDrawer>

            <Box sx={{flexGrow: 1}} >
                {children}
            </Box>
        </Box>
    )
}