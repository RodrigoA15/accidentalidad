import { LayerGroup, LayersControl, MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet"
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { accidentes21_25 } from "../data/accidentes2021_2025";
import pinIcons from "../assets/tl.webp"
import { useState } from "react";

export const Map21_25 = () => {

    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");

    const accidentesFiltrados = accidentes21_25.filter((item) => {
        const fecha = new Date(item.FECHA_ACCIDENTE);
        const inicio = fechaInicio ? new Date(fechaInicio) : null;
        const fin = fechaFin ? new Date(fechaFin) : null;

        return (!inicio || fecha >= inicio) && (!fin || fecha <= fin);
    });

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
      border: 1px solid #00000099;
    `;

    const getCustomIcon = (color) => L.divIcon({
        className: "my-custom-pin",
        iconAnchor: [0, 24],
        labelAnchor: [-6, 0],
        popupAnchor: [0, -26],
        html: `<span style="${markerHtmlStyles(color)}" />`
    });

    delete L.Icon.Default.prototype._getIconUrl;

    const customIcon = new L.Icon({
        iconUrl: markerIcon,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: markerShadow,
        shadowSize: [41, 41],
    });

    var pinIcon = L.icon({
        iconUrl: pinIcons,
        iconSize: [30, 41], // size of the icon
        iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
        popupAnchor: [1, -34],
        shadowUrl: markerShadow,
        shadowSize: [41, 41], // size of the shadow
    });


    return (
        <div className="relative h-screen w-full">
            <MapContainer
                center={[2.451924113585419, -76.60984283868237]}
                zoom={14}
                scrollWheelZoom={true}
                className="h-full w-full z-0"
            >
                <TileLayer
                    id="mapbox/streets-v11"
                    attribution='Created by: Rodrigo Papamija Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
                    url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
                    accessToken="pk.eyJ1IjoiZGF2aWQwMSIsImEiOiJjazlpa2ZxaWgxOHhpM2huYTFsNnFlcDQ1In0.JZ2u_pssa-EoUySjKOCFMA"
                />

                <LayersControl position="topright">
                    <LayersControl.Overlay name="Muertos">
                        <LayerGroup>
                            {
                                accidentesFiltrados.filter((item) => item.GRAVEDAD === "m").map((item) => {
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
                                                Fecha: {item.FECHA_ACCIDENTE}<br />
                                            </Popup>
                                        </Marker>
                                    );
                                })
                            }
                        </LayerGroup>
                    </LayersControl.Overlay>

                    <LayersControl.Overlay name="Heridos">
                        <LayerGroup>
                            {
                                accidentesFiltrados.filter((item) => item.GRAVEDAD === "h").map((item) => {
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
                                                Fecha: {item.FECHA_ACCIDENTE}<br />
                                            </Popup>
                                        </Marker>
                                    );
                                })
                            }
                        </LayerGroup>
                    </LayersControl.Overlay>

                    <LayersControl.Overlay name="Muertos">
                        <LayerGroup>
                            {
                                accidentesFiltrados.filter((item) => item.GRAVEDAD === "d").map((item) => {
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
                                                Fecha: {item.FECHA_ACCIDENTE}<br />
                                            </Popup>
                                        </Marker>
                                    );
                                })
                            }
                        </LayerGroup>
                    </LayersControl.Overlay>
                </LayersControl>


                <Marker position={[2.48089865925741, -76.57424860264103]} icon={pinIcon}>
                    <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent>
                        <p className="text-blue-500 font-semibold">Bella vista</p> <br />
                        Muertos: 6<br />
                        Heridos: 19 <br />
                        Daños: 16 <br />
                    </Tooltip>
                </Marker>
                <Marker position={[2.451113496109636, -76.59808807472801]} icon={pinIcon}>
                    <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent>
                        <p className="text-blue-500 font-semibold">Facultad de medicina</p> <br />
                        Muertos: 1 <br />
                        Heridos: 6 <br />
                        Daños: 7 <br />
                    </Tooltip>
                </Marker>
            </MapContainer>


            {/* Tabla sobrepuesta */}
            <div className="absolute top-4 left-12 z-10 bg-white/90 rounded-lg p-3 shadow-md flex flex-col gap-2 text-sm">
                <div>
                    <label className="font-medium block mb-1">Fecha Inicio</label>
                    <input
                        type="date"
                        value={fechaInicio}
                        onChange={(e) => setFechaInicio(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 w-56"
                    />
                </div>
                <div>
                    <label className="font-medium block mb-1">Fecha Fin</label>
                    <input
                        type="date"
                        value={fechaFin}
                        onChange={(e) => setFechaFin(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 w-56"
                    />
                </div>
            </div>
            <div className="absolute top-20 right-4 bg-white/90 shadow-lg rounded-lg p-4 max-w-md z-10 overflow-auto max-h-90">
                <h2 className="text-lg font-semibold mb-2">Resumen siniestralidad</h2>
                <table className="table-auto text-sm w-full">
                    <thead>
                        <tr className="">
                            <th className="px-2 py-1 text-left">A&ntilde;o</th>
                            <th className="px-2 py-1 text-left">Da&ntilde;os</th>
                            <th className="px-2 py-1 text-left">Heridos</th>
                            <th className="px-2 py-1 text-left">Muertos</th>
                            <th className="px-2 py-1 text-left">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b hover:bg-gray-100 text-center">
                            <td className="px-2 py-1">2021</td>
                            <td className="px-2 py-1">6</td>
                            <td className="px-2 py-1">2</td>
                            <td className="px-2 py-1">0</td>
                            <td className="px-2 py-1">8</td>

                        </tr>
                        <tr className="border-b hover:bg-gray- text-center">
                            <td className="px-2 py-1">2022</td>
                            <td className="px-2 py-1">14</td>
                            <td className="px-2 py-1">4</td>
                            <td className="px-2 py-1">1</td>
                            <td className="px-2 py-1">19</td>

                        </tr>
                        <tr className="border-b hover:bg-gray-100 text-center">
                            <td className="px-2 py-1">2023</td>
                            <td className="px-2 py-1">0</td>
                            <td className="px-2 py-1">13</td>
                            <td className="px-2 py-1">1</td>
                            <td className="px-2 py-1">14</td>

                        </tr>
                        <tr className="border-b hover:bg-gray-100 text-center">
                            <td className="px-2 py-1">2024</td>
                            <td className="px-2 py-1">0</td>
                            <td className="px-2 py-1">4</td>
                            <td className="px-2 py-1">5</td>
                            <td className="px-2 py-1">9</td>

                        </tr>
                        <tr className="border-b hover:bg-gray-100 text-center">
                            <td className="px-2 py-1">2025</td>
                            <td className="px-2 py-1">0</td>
                            <td className="px-2 py-1">2</td>
                            <td className="px-2 py-1">0</td>
                            <td className="px-2 py-1">2</td>

                        </tr>

                        <tr className="border-b hover:bg-gray-100 text-center">
                            <td className="px-2 py-1 font-bold">Total</td>
                            <td className="px-2 py-1"></td>
                            <td className="px-2 py-1"></td>
                            <td className="px-2 py-1"></td>
                            <td className="px-2 py-1">52</td>

                        </tr>
                    </tbody>
                </table>
                <div>
                    <div className="flex items-center justify-between mt-1">
                        <p className="text-sm font-semibold">Daños</p>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-yellow-500">
                            <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                        </svg>
                    </div>

                    <div className="flex items-center justify-between mt-1">
                        <p className="text-sm font-semibold">Heridos</p>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-blue-500">
                            <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                        </svg>
                    </div>

                    <div className="flex items-center justify-between mt-1">
                        <p className="text-sm font-semibold">Muertos</p>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-red-500">
                            <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>


            </div>
        </div>
    );
};
