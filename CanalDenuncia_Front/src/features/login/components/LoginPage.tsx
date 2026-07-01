"use client";
import { useState, FormEvent } from "react";

import { Paper, Typography, Alert, Box, TextField, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { Login } from "@/api/denunciaApi";
import LoginSchema from "@/features/login/schemas/LoginSchema";

export default function LoginPage() {
  const router = useRouter();
  const [login, setLogin] = useState<LoginSchema>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const response = await Login(login.username, login.password);
    if (response) {
      router.push("/admin");
    } else {
      setError("Login falhou. Verifique suas credenciais.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: "100%", maxWidth: 400 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            size="small"
            label="Usuário"
            variant="outlined"
            fullWidth
            margin="normal"
            value={login.username}
            onChange={(e) => setLogin({ ...login, username: e.target.value })}
            required
          />
          <TextField
            size="small"
            label="Senha"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
