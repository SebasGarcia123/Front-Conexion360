import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { useState } from "react";

export const MapaEdificios = () => {
    const inmuebles = [
        { id: 1, nombre: "Edificio Central", lat: -34.555, lng: -58.450 },
        { id: 2, nombre: "Oficinas Barracas", lat: -34.640, lng: -58.370 },
        { id: 3, nombre: "Depósito Sur", lat: -34.720, lng: -58.300 }
    ];

    const [selected, setSelected] = useState(null);

    const containerStyle = {
        width: "100%",
        height: "400px"
    };

    const center = {
        lat: -34.6037, // Buenos Aires
        lng: -58.3816
    };
    return (
    <LoadScript googleMapsApiKey="AIzaSyAc0Rryo07Bhvo_e61aC6cVGcpDO1ktu4A">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={11}>
        
        {inmuebles.map((item) => (
          <Marker
            key={item.id}
            position={{ lat: item.lat, lng: item.lng }}
            onClick={() => setSelected(item)}
          />
        ))}

        {selected && (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => setSelected(null)}
          >
            <div>
              <h3>{selected.nombre}</h3>
              <p>Coordenadas: {selected.lat}, {selected.lng}</p>
            </div>
          </InfoWindow>
        )}

      </GoogleMap>
    </LoadScript>
  )
}