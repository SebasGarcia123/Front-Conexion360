import { Button, Paper, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export const FormularioNuevoEdificio = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    latitude: "",
    longitude: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendData = async () => {
    try {
        const token = sessionStorage.getItem("authToken");
        const res = await axios.post(
        "http://localhost:4000/buildings",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    if (res.status === 201) {
        alert("Edificio creado con éxito ✔");
        setFormData({
        name: "",
        address: "",
        city: "",
        country: "",
        postalCode: "",
        latitude:"",
        longitude:""
        })
    }
    } catch (error: unknown) {
    console.error(error);

    if (axios.isAxiosError(error)) {
      alert(error.response?.data?.message || "Error al crear el edificio ❌");
    } else {
      alert("Error desconocido ❌");
    }
  }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 3, maxWidth: 500 }}>
      <h2 style={{ marginBottom: 20 }}>Nuevo Edificio</h2>

      <Stack spacing={2}>
        <TextField
          label="Nombre"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Dirección"
          name="address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Ciudad"
          name="city"
          value={formData.city}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="País"
          name="country"
          value={formData.country}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Latitud"
          name="latitude"
          value={formData.latitude}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Longitud"
          name="longitude"
          value={formData.longitude}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Código Postal"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          fullWidth
        />

        <Button
          variant="contained"
          size="large"
          sx={{ mt: 2, borderRadius: 2 }}
          onClick={sendData}
        >
          Guardar
        </Button>
      </Stack>
    </Paper>
  );
};
