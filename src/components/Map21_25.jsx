import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet"
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { accidentes21_25 } from "../data/accidentes2021_2025";

export const Map21_25 = () => {

    const myCustomColour = '#E83F25'
    const mmySecondCustomColour = '#FFB22C'

    const markerHtmlStyles = (color) => `
      background-color: ${color};
      width: 1.7rem;
      height: 1.7rem;
      display: block;
      left: -1.5rem;
      top: -1.5rem;
      position: relative;
      border-radius: 3rem 3rem 0;
      transform: rotate(45deg);
      border: 1px`

    const getCustomIcon = (color) => L.divIcon({
        className: "my-custom-pin",
        iconAnchor: [0, 24],
        labelAnchor: [-6, 0],
        popupAnchor: [0, -26],
        html: `<span style="${markerHtmlStyles(color)}" />`
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
                accidentes21_25.map((item) => {
                    const coordinates = Array.isArray(item.COORDENADAS)
                        ? item.COORDENADAS
                        : item.COORDENADAS.split(',').map(coord => parseFloat(coord.trim()));
                    let markerIconToUse;
                    if (item.GRAVEDAD === 'm') {
                        markerIconToUse = getCustomIcon(myCustomColour);
                    } else if (item.GRAVEDAD === 'd') {
                        markerIconToUse = getCustomIcon(mmySecondCustomColour);
                    } else {
                        markerIconToUse = customIcon;
                    }
                    return (
                        <Marker position={coordinates} icon={markerIconToUse} key={item.NRO_CROQUIS}>
                            <Popup>
                                CROQUIS: {item.NRO_CROQUIS} <br />
                                RUNT: {item.ESTADO_RUNT}<br />
                                Heridos: {item.HERIDOS}<br />
                                Muertos: {item.MUERTOS}<br />
                            </Popup>
                        </Marker>
                    );
                })
            }


        </MapContainer>
    )
}
