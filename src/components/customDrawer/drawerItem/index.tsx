import { Box, BoxProps, Grid, Icon, SvgIconTypeMap, Typography, styled, useTheme } from "@mui/material";
import Link, { LinkProps } from "next/link";

const LinkStyled = styled(Link)<LinkProps>(()=>({
    color: "white",
    alignItems:"center",
    textDecoration:"none",
    ":hover": {
        color: "#656565",
    }
}))

const BoxStyled = styled(Box)<BoxProps>(({theme})=>({
    ":hover": {
      backgroundColor: "white",
    },
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
}))

interface Props{
    link:string
    name:string
    showText:boolean
    icon:any
}

export default function DrawerItem({link,name,showText,icon}:Props){
    const theme = useTheme()

    return (
        <Grid item>
            <LinkStyled href={link}>
                <BoxStyled paddingLeft={showText?theme.spacing(3):0}>
                    <Grid container direction="row" justifyContent={showText?"":"center"} gap={2}>
                        {icon}
                        {showText?<Typography>
                            {name}
                        </Typography>:<></>}
                    </Grid>
                </BoxStyled>
            </LinkStyled>
        </Grid>
    )
}