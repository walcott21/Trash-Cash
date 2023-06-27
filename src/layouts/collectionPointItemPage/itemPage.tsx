import { deleteData, postData, updateData } from "@/api";
import Dropdown from "@/components/dropDown";
import { useSnackbar } from "@/hooks/useSnackbar";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ColItemPage({ title, endpoint, deleteEndPoint, buttonText, id, edit, collectionPoint }:
    { title: string, endpoint: string, deleteEndPoint: string, edit: boolean, buttonText: string, id?: string, collectionPoint?: CollectionPoint }) {

    const router = useRouter();

    const [collectionPointState, setCollectionPointState] = useState<CollectionPoint | undefined>(collectionPoint);
    const [address, setAddress] = useState<string>('');
    const [types, setTypes] = useState<string[]>([]);

    useEffect(() => {
        setCollectionPointState(collectionPoint);
        setAddress(collectionPoint?.address ?? '');
        setTypes(collectionPoint?.type_of_trash ?? []);
    }, [collectionPoint])

    const handleDropdownChange = (selectedOptions: string[]) => {
        console.log('Selected options:', selectedOptions);
        //setCollectionPointState({ ...collectionPointState, type_of_trash: selectedOptions } as CollectionPoint)
        setTypes(selectedOptions);
    };

    const { showSnackbarMessage } = useSnackbar();

    const handleEditClick = async (collectionPoint: CollectionPoint, e: any) => {
        e.preventDefault();
        if (address === '' || types.length === 0) {
            console.log('Empty');
            showSnackbarMessage('error', 'The fields cannot be empty');
            return;
        }
        collectionPoint.address = address;
        collectionPoint.type_of_trash = types;
        const res = await updateData(endpoint, collectionPoint);
        if (res === 201) {
            console.log('Success');
            showSnackbarMessage('success', 'Collection point updated successfully');
            router.back();
        } else if (res === 400) {
            console.log('Bad request');
        }
    };

    const handleAddClick = async (e: any) => {
        e.preventDefault();
        if (address === '' || types.length === 0) {
            console.log('Empty');
            showSnackbarMessage('error', 'The fields cannot be empty');
            return;
        }
        const res = await postData(endpoint, { address: address, type_of_trash: types });
        if (res === 201) {
            console.log('Success');
            showSnackbarMessage('success', 'Collection point created successfully');
            router.back();
        } else if (res === 400) {
            console.log('Bad request');
            showSnackbarMessage('error', 'Error to create collection point');
        }
    };

    const handleDeleteClick = async (e: any) => {
        e.preventDefault();
        if (!collectionPoint) return;
        const res = await deleteData(deleteEndPoint + `/${collectionPoint.id}`);
        if (res === 202) {
            console.log('Success');
            showSnackbarMessage('success', 'Collection point deleted successfully');
            router.back();
        } else if (res === 400) {
            console.log('Bad request');
            showSnackbarMessage('error', 'Error to delete collection point');
        }
    };

    return (
        <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="left"
            spacing={5}
            padding={5}
        >
            <Grid item><Typography variant="h1">{title}</Typography></Grid>
            <Grid
                item container
                direction="column"
                spacing={2}
            >
                <Grid container item direction="row" spacing={2}>
                    <Grid item>
                        <TextField
                            id="outlined-helperText"
                            label="Address"
                            style={{ height: '50px', width: '400px' }}
                            value={address}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                // setName(event.target.value);
                                console.log('Event:', event.target.value);
                                //setCollectionPointState({ ...collectionPointState, address: event.target.value } as CollectionPoint)
                                setAddress(event.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <Dropdown
                            preSelected={types}
                            onChange={
                                handleDropdownChange} placeholder="Types" />
                    </Grid>
                </Grid>

                <Grid container item direction="row" spacing={2}>
                    <Grid item>
                        <Button
                            variant="contained"
                            style={{ height: '50px' }}
                            onClick={edit ? (e) => handleEditClick(collectionPoint!, e) : (e) => handleAddClick(e)}
                        >
                            {buttonText}
                        </Button>
                    </Grid>

                    <Grid item>
                        <Button
                            style={{ height: '50px' }}
                            variant="outlined"
                            onClick={router.back}
                        >
                            CANCEL
                        </Button>
                    </Grid>
                    {edit ?
                        <Grid item>
                            <Button
                                variant="contained"
                                color="error"
                                style={{ height: '50px' }}
                                onClick={(e) => handleDeleteClick(e)}
                            >
                                DELETE
                            </Button>
                        </Grid>
                        :
                        <></>
                    }
                </Grid>
            </Grid>
        </Grid >
    );
}

