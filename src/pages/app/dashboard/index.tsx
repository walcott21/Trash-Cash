import { Container, Box, Grid, FormControl, InputLabel, Select, MenuItem, Button, Typography, SelectChangeEvent } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import {Rewards, TrashByTime,TrashByCollectedPoint } from "../../../components/chart"
import { TrashByUser } from "@/components/list";
import { ExportToExcel } from "@/components/export";
import BaseAppLayout from '@/layouts/baseAppLayout';
import useSWR from "swr";
import { getData } from '@/api';
import { useEffect, useState } from "react";

export default function Dashboard(){
    const [collectionPointsNames, setCollectionPointsNames] = useState<string[]>([])
    const [selectCollectionPoint, setSelectCollectionPoint] = useState<string>("")

    const trashCollected = useSWR(`/trash_collected/read?collection_point=${selectCollectionPoint}`, getData)
    const collectionPoints= useSWR(`/collection_points/read`, getData)

    useEffect(()=>{
        if(!collectionPoints.isLoading){
            let collectionPointsNameTemp:string[] = collectionPoints.data.reduce((collectionPointsNames:string[], nextCollectionPoint:CollectionPoint)=>{
                return [...collectionPointsNames, nextCollectionPoint.address];
            },[])
            setCollectionPointsNames(collectionPointsNameTemp)
        }
    },[collectionPoints.isLoading])

    const handleChangeCollectionPoint = (event: SelectChangeEvent) => {
        setSelectCollectionPoint(event.target.value as string);
    };


    if (trashCollected.error || trashCollected.error) return <div>failed to load</div>
    if (trashCollected.isLoading || trashCollected.isLoading) return <div>loading...</div>

    return (
        <BaseAppLayout>
            <Container 
                maxWidth="xl"
                style={style.borderBottom}
            >
                <Typography variant="h1">Dashboard</Typography>
                <Box>
                    <Grid 
                        container
                        justifyContent={"space-between"}
                        marginBottom={"2rem"}
                    >
                        <Grid 
                            item 
                            lg={3} 
                            md={4} 
                            sm={6}
                            xs={12}
                        >
                            <Typography variant="body1">Selecione os pontos de coleta</Typography>
                        </Grid>
                        <Grid 
                            item 
                            lg={3} 
                            md={4}
                            sm={5}
                            xs={12}
                        >
                            <FormControl fullWidth>
                                <InputLabel id="collect-point-label">Collection Point</InputLabel>
                                <Select
                                    labelId="collect-point-label"
                                    id="collect-point"
                                    label="Collection Point"
                                    value={selectCollectionPoint}
                                    onChange={handleChangeCollectionPoint}
                                >

                                    <MenuItem value={""}>All</MenuItem>)
                                    {
                                        collectionPointsNames.map(name=> 
                                        <MenuItem key={name} value={name}>{name}</MenuItem>)
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid 
                        container
                        justifyContent={"space-between"}
                        alignItems={"center"}
                    >
                        <Grid 
                            item 
                            lg={3} 
                            md={4}
                            sm={5}
                            xs={12}
                            marginBottom={"1rem"}
                        >
                            <LocalizationProvider 
                                dateAdapter={AdapterDayjs}
                            >
                                <DatePicker className="full" />
                            </LocalizationProvider>
                        </Grid>
                        <Grid
                            item
                            container
                            lg={3}
                            md={4}
                            sm={5}
                            xs={12}
                            justifyContent={"space-between"}
                            marginBottom={"1rem"}
                        >
                            <Grid 
                                item 
                                sm={5}
                            >
                                <Button 
                                    variant="contained"
                                    color="success"
                                    fullWidth
                                >FILTRAR</Button>
                            </Grid>
                            <Grid 
                                item 
                                sm={5}
                            >
                                <ExportToExcel apiData={{trashCollected, collectionPoints}} fileName={"TrashCashExported"} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Container 
                maxWidth="xl"
                sx={{paddingTop:3}}
            >
                <Typography variant="h2">Trash by Collected Point</Typography>
                <Box>
                    <Grid 
                        container
                        justifyContent={"space-around"}    
                    >
                        <Grid item lg={5} style={style.grid}>
                            <TrashByCollectedPoint TrashCollected={trashCollected} CollectionPoints={collectionPoints} />
                        </Grid>
                        <Grid item lg={5} style={style.grid}>
                            <Rewards />
                        </Grid>
                        <Grid item lg={8} style={style.grid}>
                            <TrashByTime TrashCollected={trashCollected} CollectionPoints={collectionPoints} />
                        </Grid>    
                        <Grid item lg={3} style={style.grid}>
                            <TrashByUser />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </BaseAppLayout>
    )
}

const style = {
    borderBottom: {
        borderBottom: "1px solid #000"
    },
    list:{
        borderRadius: "8px",
        backgroundColor: "#2c3c352e",
        boxShadow: "#000 0 0 3px 0px"
    },
    grid:{
        margin: "1rem 0"
    }
}