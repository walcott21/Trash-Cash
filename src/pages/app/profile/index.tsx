import { useEffect, useState } from "react";
import { Box, Button, Grid, Icon, IconButton, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import BaseAppLayout from "@/layouts/baseAppLayout";
import PersonIcon from '@mui/icons-material/Person';
import { updateData } from "@/api";
import { useAuth } from "@/hooks/useAuth";
import { Form } from "react-router-dom";
import { useRouter } from "next/router";
import { useSnackbar } from "@/hooks/useSnackbar";


interface ProfileFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function Profile() {
    const {getUser, setUser} = useAuth()
    const [formData, setFormData] = useState<ProfileFormData>({
        name:"",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter()
    const {showSnackbarMessage} = useSnackbar()
    

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        let newData = { ...formData, [e.target.name]: e.target.value }
        setFormData(newData);
    };

    const handleSaveClick = async() => {
        let user = getUser()
        let updatedData = {
            "id": user?._id,
            "email": formData.email,
            "name": formData.name,
            "password":formData.password
        }
        try{
            let response = await updateData("/auth/update_user", updatedData)
            setUser({
                "_id":updatedData.id,
                "email":updatedData.email,
                "name":updatedData.name,
                "token_type":user.token_type
            })
            showSnackbarMessage("success","Updated with success!")
            resetFields()
        }catch(ex){
            showSnackbarMessage("error","Error to update your information")
        }
    };

    const handleCancelClick = () => {
        router.back()
    };

    const handleShowPasswordClick = () => {
        setShowPassword(!showPassword);
    };

    const resetFields = () => {
        const currentUser = getUser()
        setFormData({
            name:currentUser.name,
            email: currentUser.email,
            password: "",
            confirmPassword: "",
        });
    }

    useEffect(()=>{
        resetFields()
    },[])

    return (
        <BaseAppLayout>
            <Grid
                container
                direction="column"
                justifyContent="space-between"
                alignItems="left"
                spacing={5}
                margin={1}
            >
                <Grid item container direction="row" alignItems="center" spacing={1}>
                    <Grid item>
                        <PersonIcon fontSize="large" />
                    </Grid>
                    <Grid item>
                        <Typography variant="h2">Hello, User</Typography>
                    </Grid>
                </Grid>
                <Grid item>
                    <TextField
                        required
                        id="name"
                        name="name"
                        label="Name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        style={{ height: '50px', width: '300px' }}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        required
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        style={{ height: '50px', width: '300px' }}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        required
                        id="password"
                        name="password"
                        label="New Password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleInputChange}
                        style={{ height: '50px', width: '300px' }}
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={handleShowPasswordClick}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            ),
                        }}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        required
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm New Password"
                        type={showPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        style={{ height: '50px', width: '300px' }}
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={handleShowPasswordClick}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            ),
                        }}
                    />
                </Grid>
                <Grid item>
                    <Box sx={{ display: "flex", justifyContent: "left" }}>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mr: 2 }}
                            onClick={handleSaveClick}
                        >
                            Save
                        </Button>
                        <Button variant="contained" onClick={handleCancelClick} sx={{ bgcolor: "#D32F2F" }}>
                            Cancel
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </BaseAppLayout>
    );
};

