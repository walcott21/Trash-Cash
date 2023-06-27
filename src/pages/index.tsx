import { useState } from "react";
import { Alert, Box, Button, Snackbar, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { Icons } from "@/assets";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { postFormData } from "@/api";
import React from "react";
import { useSnackbar } from "@/hooks/useSnackbar";

interface LoginFormData {
  username: string;
  password: string;
}

export default function Login() {
  const [loginData, setLoginData] = useState<LoginFormData>({
    username: "",
    password: "",
  });

  const { loginHandle } = useAuth()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginHandle(loginData.username, loginData.password)
  
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "20%",
        "& > :not(style)": {
          m: 3,
          width: "50%",
          height: "5ch"
        }
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        required
        id="username"
        name="username"
        label="Email"
        type="email"
        value={loginData.username}
        onChange={handleChange}
      />
      <TextField
        required
        id="password"
        name="password"
        label="Password"
        type="password"
        value={loginData.password}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained">
        Login
      </Button>

      <Image src={Icons.logo} alt="logo" priority/>
    </Box>
  );
};