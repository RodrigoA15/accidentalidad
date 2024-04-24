import { useState } from "react";
import axios from "axios";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Form from "./Form";

function MapViewer() {
  //Estado consumo api
  const [data, setData] = useState([]);
  //Valores inputs
  const [fecha_inicio, setFecha_inicio] = useState("");
  const [fecha_Fin, setFecha_fin] = useState("");
  const [tipo, setTipo] = useState("");
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/damages/${fecha_inicio}/${fecha_Fin}/${tipo}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const positions = data.map((item) => ({
    key: item.NRO_CROQUIS,
    position: [
      parseFloat(
        item.COORDENADA_X.slice(0, 2) + "." + item.COORDENADA_X.slice(2)
      ),
      parseFloat(
        -item.COORDENADA_Y.slice(0, 2) + "." + item.COORDENADA_Y.slice(2)
      ),
    ],
  }));

  const validacion = () => {
    if (!tipo) {
      setError("Debe seleccionar un tipo de accidente");
    } else {
      setError("");
      fetchData();
    }
  };

  const handleSubmit = (e) => {
    validacion();
    e.preventDefault();
  };

  console.log(fecha_Fin);
  return (
    <>
      <MapContainer
        center={[2.4452803430233065, -76.61558298326308]}
        zoom={14}
        scrollWheelZoom={true}
      >
        <TileLayer
          id="mapbox/streets-v11"
          attribution='Created by: Rodrigo Papamija Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
          url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
          accessToken="pk.eyJ1IjoiZGF2aWQwMSIsImEiOiJjazlpa2ZxaWgxOHhpM2huYTFsNnFlcDQ1In0.JZ2u_pssa-EoUySjKOCFMA"
        />

        {positions.map((pos) => (
          <Marker key={pos.key} position={pos.position}>
            <Popup>
              <div>{pos.key}</div>
            </Popup>
          </Marker>
        ))}
        <Form
          setTipo={setTipo}
          fetchData={handleSubmit}
          error={error}
          setFecha_inicio={setFecha_inicio}
          setFecha_fin={setFecha_fin}
        />
      </MapContainer>
    </>
  );
}

export default MapViewer;
