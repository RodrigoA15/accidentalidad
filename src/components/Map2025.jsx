import { Circle, MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet"
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { accidentes24_25 } from "../data/accidentes2024_2025";
export const Map2025 = () => {

    const myCustomColour = '#E83F25'

    const markerHtmlStyles = `
      background-color: ${myCustomColour};
      width: 1.7rem;
      height: 1.7rem;
      display: block;
      left: -1.5rem;
      top: -1.5rem;
      position: relative;
      border-radius: 3rem 3rem 0;
      transform: rotate(45deg);
      border: 1px`

    const icon = L.divIcon({
        className: "my-custom-pin",
        iconAnchor: [0, 24],
        labelAnchor: [-6, 0],
        popupAnchor: [0, -26],
        html: `<span style="${markerHtmlStyles}" />`
    })

    delete L.Icon.Default.prototype._getIconUrl;

    const customIcon = new L.Icon({
        iconUrl: markerIcon,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: markerShadow,
        shadowSize: [41, 41],
    });

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

                {
                    accidentes24_25.map((item) => {
                        const coordinates = Array.isArray(item.COORDENADAS)
                            ? item.COORDENADAS
                            : item.COORDENADAS.split(',').map(coord => parseFloat(coord.trim()));
                        return (
                            <>
                                <Marker position={coordinates} icon={item.GRAVEDAD === 'm' ? icon : customIcon}>
                                    <Popup>
                                        {item.NRO_CROQUIS} - CARGADO: {item.RUNT}
                                    </Popup>
                                </Marker>
                                <Circle
                                    center={[2.481354279212953, -76.57449602792349]}
                                    radius={200}
                                    pathOptions={{
                                        color: 'red',
                                        fillOpacity: 0,
                                    }}
                                >
                                    <Tooltip direction="top" offset={[0, 20]} opacity={1} permanent>
                                        Bella vista
                                    </Tooltip>
                                </Circle>

                                <Circle
                                    center={[2.4671311615885037, -76.58644548164973]}
                                    radius={150}
                                    pathOptions={{
                                        color: 'red',
                                        fillOpacity: 0,
                                    }}
                                >
                                    <Tooltip direction="right" offset={[0, 20]} opacity={1} permanent>
                                        Torre molinos
                                    </Tooltip>
                                </Circle>

                                <Circle
                                    center={[2.4517078231692366, -76.60492614837501]}
                                    radius={150}
                                    pathOptions={{
                                        color: 'red',
                                        fillOpacity: 0,
                                    }}
                                >
                                    <Tooltip direction="top" offset={[0, 20]} opacity={1} permanent>
                                        Toscana
                                    </Tooltip>
                                </Circle>

                                <Circle
                                    center={[2.4448049143238646, -76.61486831477171]}
                                    radius={150}
                                    pathOptions={{
                                        color: 'red',
                                        fillOpacity: 0,
                                    }}
                                >
                                    <Tooltip direction="top" offset={[0, 20]} opacity={1} permanent>
                                        Carrera 17 la esmeralda
                                    </Tooltip>
                                </Circle>
                                <Circle
                                    center={[2.44796556629502, -76.62162695164538]}
                                    radius={150}
                                    pathOptions={{
                                        color: 'red',
                                        fillOpacity: 0,
                                    }}
                                >
                                    <Tooltip direction="top" offset={[0, 20]} opacity={1} permanent>
                                        Calle 5 cementerio central
                                    </Tooltip>
                                </Circle>
                            </>
                        );
                    })
                }

            </MapContainer>
        </>
    );
}


