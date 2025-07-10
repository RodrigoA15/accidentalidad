import { useState } from "react";
import { CircleMarker, LayerGroup, LayersControl, MapContainer, Marker, Polyline, Popup, TileLayer, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet"
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { accidentes21_25 } from "../data/accidentes2021_2025";
import { comp_facultad } from "../data/comparendos";
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

                <Polyline color="#E83F25" positions={[[2.4802038638864357, -76.57525589468791], [2.48135081704308, -76.5745454248095]]}>
                    <Tooltip direction="bottom" offset={[0, 0]} opacity={1} permanent>
                        150 MTS
                    </Tooltip>
                </Polyline>
                <Polyline color="#E83F25" positions={[[2.4802038638864357, -76.57525589468791], [2.479050149675652, -76.57594606542847]]} >
                    <Tooltip direction="bottom" offset={[0, 0]} opacity={1} permanent>
                        150 MTS
                    </Tooltip>
                </Polyline>

                <CircleMarker
                    center={[2.480215130609118, -76.57524461738977]}
                    pathOptions={{ color: 'red' }}
                    radius={5}>
                    <Tooltip>Tooltip for CircleMarker</Tooltip>
                </CircleMarker>

                <CircleMarker
                    center={[2.4472567103593086, -76.62091970862645]}
                    pathOptions={{ color: 'red' }}
                    radius={10}>
                    <Tooltip direction="bottom" permanent>Cai - Cementerio</Tooltip>
                </CircleMarker>

                <CircleMarker
                    center={[2.451025495657611, -76.59916075100172]}
                    pathOptions={{ color: 'red' }}
                    radius={10}>
                    <Tooltip direction="bottom" permanent>Facultad de medicina</Tooltip>
                </CircleMarker>
                <Polyline color="#E83F25" positions={[[2.4472567103593086, -76.62091970862645], [2.4467864741437477, -76.61963343335171]]}>
                    <Tooltip direction="bottom" offset={[0, 0]} opacity={1} permanent>
                        150 MTS
                    </Tooltip>
                </Polyline>
                <Polyline color="#E83F25" positions={[[2.4472567103593086, -76.62091970862645], [2.44796451714892, -76.62207951862784]]} >
                    <Tooltip direction="bottom" offset={[0, 0]} opacity={1} permanent>
                        150 MTS
                    </Tooltip>
                </Polyline>

                {/* COMPARENDOS */}
                {
                    comp_facultad.map((item) => {
                        // Replace comma with period and convert to a float
                        const latitude = parseFloat(item.LATITUD.replace(',', '.'));
                        const longitude = parseFloat(item.LONGITUD.replace(',', '.'));

                        // Check if the parsed values are valid numbers before rendering the Marker
                        if (isNaN(latitude) || isNaN(longitude)) {
                            console.warn('Invalid latitude or longitude for item:', item);
                            return null; // Skip rendering this marker if coordinates are invalid
                        }

                        return (
                            <Marker key={item.NRO_COMPARENDO} position={[latitude, longitude]} icon={getCustomIcon("#819067")}>
                                <Popup>{item.NRO_COMPARENDO} - {item.COD_INFRACCION}</Popup>
                            </Marker>
                        );
                    })
                }

                <LayersControl position="topright">
                    <LayersControl.Overlay name="Fallecidos">
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
                                                Fallecidos: {item.Fallecidos}<br />
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
                                                Fallecidos: {item.Fallecidos}<br />
                                                Fecha: {item.FECHA_ACCIDENTE}<br />
                                            </Popup>
                                        </Marker>
                                    );
                                })
                            }
                        </LayerGroup>
                    </LayersControl.Overlay>

                    <LayersControl.Overlay name="Daños">
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
                                                Fallecidos: {item.Fallecidos}<br />
                                                Fecha: {item.FECHA_ACCIDENTE}<br />
                                            </Popup>
                                        </Marker>
                                    );
                                })
                            }
                        </LayerGroup>
                    </LayersControl.Overlay>
                </LayersControl>
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
                            <th className="px-2 py-1 text-left">Fallecidos</th>
                            <th className="px-2 py-1 text-left">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b hover:bg-gray-100 text-center">
                            <td className="px-2 py-1">2021</td>
                            <td className="px-2 py-1">8</td>
                            <td className="px-2 py-1">2</td>
                            <td className="px-2 py-1">0</td>
                            <td className="px-2 py-1">10</td>

                        </tr>
                        <tr className="border-b hover:bg-gray- text-center">
                            <td className="px-2 py-1">2022</td>
                            <td className="px-2 py-1">19</td>
                            <td className="px-2 py-1">7</td>
                            <td className="px-2 py-1">2</td>
                            <td className="px-2 py-1">28</td>

                        </tr>
                        <tr className="border-b hover:bg-gray-100 text-center">
                            <td className="px-2 py-1">2023</td>
                            <td className="px-2 py-1">0</td>
                            <td className="px-2 py-1">17</td>
                            <td className="px-2 py-1">2</td>
                            <td className="px-2 py-1">19</td>

                        </tr>
                        <tr className="border-b hover:bg-gray-100 text-center">
                            <td className="px-2 py-1">2024</td>
                            <td className="px-2 py-1">0</td>
                            <td className="px-2 py-1">8</td>
                            <td className="px-2 py-1">5</td>
                            <td className="px-2 py-1">13</td>

                        </tr>
                        <tr className="border-b hover:bg-gray-100 text-center">
                            <td className="px-2 py-1">2025</td>
                            <td className="px-2 py-1">0</td>
                            <td className="px-2 py-1">5</td>
                            <td className="px-2 py-1">0</td>
                            <td className="px-2 py-1">5</td>

                        </tr>

                        <tr className="border-b hover:bg-gray-100 text-center">
                            <td className="px-2 py-1 font-bold">Total</td>
                            <td className="px-2 py-1"></td>
                            <td className="px-2 py-1"></td>
                            <td className="px-2 py-1"></td>
                            <td className="px-2 py-1">75</td>

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
                        <p className="text-sm font-semibold">Fallecidos</p>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-red-500">
                            <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>

                <div className="flex mt-3">
                    <div className="border-2 rounded-lg border-blue-300 w-full text-center">
                        <label className=" font-semibold">Facultad de medicina</label> <br />
                        Fallecidos: 1 <br />
                        Heridos: 6 <br />
                        Daños: 7 <br />
                    </div>

                    <div className="ml-2 border-2 rounded-lg border-blue-300 w-full text-center">
                        <label className="font-semibold">Bella vista</label> <br />
                        Fallecidos: 6<br />
                        Heridos: 19 <br />
                        Daños: 16 <br />
                    </div>
                </div>
                <div className="flex mt-3  justify-items-start">
                    <div className="ml-2 border-2 rounded-lg border-blue-300 w-full text-center">
                        <label className="font-semibold">Cai - Cementerio</label> <br />
                        Fallecidos: 2<br />
                        Heridos: 14 <br />
                        Daños: 7 <br />
                    </div>
                </div>
            </div>
        </div>
    );
};
