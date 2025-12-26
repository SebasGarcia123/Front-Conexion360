import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import axios from "axios";
import { useEffect, useState } from "react";
import type { Building } from "../../types";

const center = { lat: -34.6037, lng: -58.3816 };

export const MapaEdificios = () => {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [selected, setSelected] = useState<Building | null>(null);

  useEffect(() => {
    axios
      .get<Building[]>("http://localhost:4000/buildingHome")
      .then(res => setBuildings(res.data.filter(b => b.isActive)))
      .catch(err => console.error(err));
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      center={center}
      zoom={13}
    >
      {buildings.map(building => (
        <Marker
          key={building._id}
          position={{ lat: building.latitude, lng: building.longitude }}
          onClick={() => setSelected(building)}
        />
      ))}

      {selected && (
        <InfoWindow
          position={{ lat: selected.latitude, lng: selected.longitude }}
          onCloseClick={() => setSelected(null)}
        >
          <div>
            <h3>{selected.name}</h3>
            <p>{selected.address}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};