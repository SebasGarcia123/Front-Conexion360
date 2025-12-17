import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Checkbox,
  FormControlLabel,
  FormControl,
  FormLabel,
  CircularProgress,
} from '@mui/material';
import type { Building } from '../types';

interface AlternativaEdificiosProps {
  value: string[];                    // <- IDs seleccionados (controlado por el padre)
  onChange: (buildingIds: string[]) => void;  // <- padre actualiza el valor
}

export default function AlternativaEdificios({ value, onChange }: AlternativaEdificiosProps) {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 🔹 Cargar edificios desde la API
  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const token = sessionStorage.getItem("authToken");
        const res = await axios.get<Building[]>('http://localhost:4000/buildings', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBuildings(res.data.filter((b) => b.isActive));
      } catch (error) {
        console.error('Error al obtener edificios:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBuildings();
  }, []);

  // 🔹 Manejar selección múltiple
  const handleToggle = (buildingId: string) => {
    let updatedSelected: string[];

    if (value.includes(buildingId)) {
      updatedSelected = value.filter(id => id !== buildingId);
    } else {
      updatedSelected = [...value, buildingId];
    }

    onChange(updatedSelected);   // <- avisamos al padre
  };

  if (loading) return <CircularProgress sx={{ margin: 2 }} />;

  // 🔹 Obtener edificios únicos por nombre
  const uniqueBuildings = Array.from(
    new Map(buildings.map(b => [b.name, b])).values()
  );

  return (
    <FormControl sx={{ margin: 2 }}>
      <FormLabel id="label-edificios" sx={{ margin: 1 }}>
        Edificio
      </FormLabel>

      {uniqueBuildings.map((b) => (
        <FormControlLabel
          key={b._id}
          control={
            <Checkbox
              checked={value.includes(b._id)}
              onChange={() => handleToggle(b._id)}
            />
          }
          label={b.name}
        />
      ))}
    </FormControl>
  );
}

