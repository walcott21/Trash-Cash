import { Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Dropzone from "@/components/dropZone";
import { useRouter } from "next/router";
import { useSnackbar } from "@/hooks/useSnackbar";
import { deleteData, postData, updateData } from "@/api";

export default function RewItemPage({ title, endpoint, deleteEndPoint, buttonText, edit, id, reward }:
    { title: string, endpoint: string, deleteEndPoint: string, edit: boolean, buttonText: string, id?: string, reward?: Reward }) {

    const router = useRouter();

    const [rewardState, setRewardState] = useState<Reward | undefined>(reward);
    const [name, setName] = useState<string>('');
    const [value, setValue] = useState<string>('');
    const [quantity, setQuantity] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [uploadedFile, setUploadedFile] = useState<File | undefined>(undefined);

    useEffect(() => {
        setRewardState(reward);
        setName(reward?.name ?? '');
        setValue(reward?.value.toString() ?? '');
        setImage(reward?.image ?? '');
        setQuantity(reward?.quantity.toString() ?? '');
    }, [reward])

    const { showSnackbarMessage } = useSnackbar();


    const handleFileChange = (file: File) => {
        setUploadedFile(file);
        setImage(file.name ?? '');
    };

    const handleEditClick = async (reward: Reward, e: any) => {
        e.preventDefault();
        if (name === '' || value === '' || image === '' || quantity === '') {
            console.log('Empty');
            showSnackbarMessage('error', 'The fields cannot be empty');
            return;
        }

        console.log(reward);

        reward.name = name;
        reward.value = parseInt(value);
        reward.image = image;
        reward.quantity = parseInt(quantity);

        const res = await updateData(endpoint, reward);
        if (res === 201) {
            console.log('Success');
            showSnackbarMessage('success', 'Reward updated successfully');
            router.back();
        } else if (res === 400) {
            console.log('Bad request');
        }
    };

    const handleAddClick = async (e: any) => {
        e.preventDefault();
        if (name === '' || value === '' || image === '' || quantity === '') {
            console.log('Empty');
            showSnackbarMessage('error', 'The fields cannot be empty');
            return;
        }
        const res = await postData(endpoint, { name: name, value: parseInt(value), image: image, quantity: parseInt(quantity), claims: [] });
        if (res === 201) {
            console.log('Success');
            showSnackbarMessage('success', 'Reward created successfully');
            router.back();
        } else if (res === 400) {
            console.log('Bad request');
            showSnackbarMessage('error', 'Error to create reward');
        }
    };

    const handleDeleteClick = async (e: any) => {
        e.preventDefault();
        if (!reward) return;
        const res = await deleteData(deleteEndPoint + `/${reward.id}`);
        if (res === 202) {
            console.log('Success');
            showSnackbarMessage('success', 'Reward deleted successfully');
            router.back();
        } else if (res === 400) {
            console.log('Bad request');
            showSnackbarMessage('error', 'Error to delete reward');
        }
    };

    return (
        <Grid
            width='600px'
            container
            direction="column"
            justifyContent="space-between"
            alignItems="left"
            spacing={5}
            //margin={1}
            padding={5}
        >
            <Grid item><h1>{title}</h1></Grid>
            <Grid
                item container
                direction="column"
                spacing={2}
            >
                <Grid container item direction="row" spacing={2}>
                    <Grid item>
                        <TextField
                            id="outlined-helperText"
                            label="Name"
                            style={{ height: '50px', width: '300px' }}
                            value={name}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setName(event.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="outlined-helperText"
                            label="Points"
                            style={{ height: '50px', width: '70px' }}
                            value={value}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setValue(event.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="outlined-helperText"
                            label="Quantity"
                            style={{ height: '50px', width: '100px' }}
                            value={quantity}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setQuantity(event.target.value);
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid item>
                    <Dropzone onFileChange={handleFileChange} />
                    {uploadedFile && <p>Uploaded file: {uploadedFile.name}</p>}
                </Grid>
                <Grid container item direction="row" spacing={2}>
                    <Grid item>
                        <Button
                            variant="contained"
                            style={{ height: '50px' }}
                            onClick={edit ? (e) => handleEditClick(reward!, e) : (e) => handleAddClick(e)}
                        >
                            {buttonText}
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="outlined"
                            style={{ height: '50px' }}
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
        </Grid>
    );
}

