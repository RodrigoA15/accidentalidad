// src/MapView.jsx
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";

const useDataApi = () => {
    const fetchData = async (fecha_inicio, fecha_fin, gravedad) => {
        console.log("Fetching data with:", { fecha_inicio, fecha_fin, gravedad });
        try {
            // FIX 4: Corregido el typo en el parámetro de la URL (?= por =)
            const response = await axios.get(`http://localhost:4000/api/v1/accidents?start_date=${fecha_inicio}&end_date=${fecha_fin}&gravedad?=${gravedad}`);
            if (!response || !response.data) {
                throw new Error("Error fetching data: No data received");
            }
            return response.data;
        } catch (error) {
            console.error("Error fetching data:", error);
            return [];
        }
    }

    const fetchDataSeverity = async (data, quantity) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/v1/allSeverity`, {
                data,
                quantity
            });
            if (!response || !response.data) {
                throw new Error("Error fetching severity data: No data received");
            }
            return response.data;
        } catch (error) {
            console.error("Error fetching severity data:", error);
            return [];
        }
    }

    const fetchDataCriticalAreas = async (data, quantity) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/v1/critical-areas`, {
                data,
                quantity
            });
            if (!response || !response.data) {
                throw new Error("Error fetching severity data: No data received");
            }
            return response.data;
        } catch (error) {
            console.error("Error fetching severity data:", error);
            return [];
        }
    }
    return { fetchData, fetchDataSeverity, fetchDataCriticalAreas };
}

export function MapBoxExample() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    // FIX 2: Añadimos una referencia para guardar los marcadores y poder borrarlos después
    const markers = useRef([]);
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [gravedad, setGravedad] = useState("");
    const [data, setData] = useState([]);
    const [coordinates, setCoordinates] = useState([]);
    const [criticalAreas, setCriticalAreas] = useState([]);
    const { fetchData, fetchDataSeverity, fetchDataCriticalAreas } = useDataApi();

    // useEffect para inicializar el mapa (esto ya estaba bien)
    useEffect(() => {
        mapboxgl.accessToken = import.meta.env.VITE_TOKEN;
        if (map.current) return;

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v12",
            center: [-76.614, 2.441],
            zoom: 12,
            pitch: 45,
            bearing: -10.4,
            antialias: true,
        });

        // ... (el resto de tu inicialización del mapa y capas está bien)
        map.current.addControl(new mapboxgl.FullscreenControl());
        map.current.addControl(new mapboxgl.GeolocateControl({
            positionOptions: { enableHighAccuracy: true },
            trackUserLocation: true,
            showUserHeading: true
        }));
        map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    }, []);

    // FIX 2: useEffect para manejar la creación y limpieza de marcadores
    useEffect(() => {
        if (!map.current) return; // No hacer nada si el mapa no está inicializado

        // Primero, borramos los marcadores de la búsqueda anterior
        markers.current.forEach(marker => marker.remove());
        markers.current = []; // Vaciamos el array de referencias

        // Creamos y añadimos los nuevos marcadores
        data.map((item) => {
            const popup = new mapboxgl.Popup({ offset: 25 }).setText(
                item.direccion_lugar
            );
            // FIX 1 & 3: Usar map.current y el orden [longitud, latitud]
            const marker = new mapboxgl.Marker()
                .setLngLat([item.coordenadaY, item.coordenadaX])
                .setPopup(popup) // Añadimos el popup al marcador
                .addTo(map.current);

            // Guardamos la referencia del nuevo marcador
            markers.current.push(marker);
        })

        criticalAreas.forEach((coordinates) => {
            const popup = new mapboxgl.Popup({ offset: 25 }).setText(`Numero de accidentes: ${coordinates.n_accidentes}`)
            const markerCritical = new mapboxgl.Marker({ color: "#FF3F33" })
                .setLngLat([coordinates?.latitud || 0, coordinates?.longitud || 0])
                .setPopup(popup) // Añadimos el popup al marcador
                .addTo(map.current);

            markers.current.push(markerCritical);
        })

        const markerSeverity = new mapboxgl.Marker({ color: "#FF3F33" })
            .setLngLat([coordinates?.latitud || 0, coordinates?.longitud || 0]) // Usamos las coordenadas de gravedad
            .addTo(map.current);

        markers.current.push(markerSeverity);

    }, [data, coordinates, criticalAreas]); // Este efecto se ejecutará cada vez que 'data' cambie

    const handleSearch = async () => {
        const responseData = await fetchData(fechaInicio, fechaFin, gravedad);
        setData(responseData);
    }

    const handleSearchSeverity = async () => {
        const dataSeverityData = data.map((item) => {
            return {
                longitud: item.coordenadaX,
                latitud: item.coordenadaY,
            }
        })
        const responseData = await fetchDataSeverity(dataSeverityData, 2);
        setCoordinates(responseData);
    }

    const handleSearchCriticalAreas = async () => {
        const dataSeverityData = data.map((item) => {
            return {
                longitud: item.coordenadaX,
                latitud: item.coordenadaY,
            }
        })
        const responseData = await fetchDataCriticalAreas(dataSeverityData, 2);
        setCriticalAreas(responseData);
    }

    return (
        <div>
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
                <div>
                    <label className="font-medium block mb-1">Gravedad</label>
                    <select
                        value={gravedad}
                        onChange={(e) => setGravedad(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 w-56"
                    >
                        <option value="">Todas</option>
                        <option value="d">Daños</option>
                        <option value="h">Heridos</option>
                        <option value="m">Fallecidos</option>
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <button onClick={handleSearch} className="bg-blue-500 text-white text-center rounded px-4 py-2 hover:bg-blue-600 w-full">Buscar</button>
                    <button onClick={handleSearchSeverity} className="bg-green-500 text-white text-center rounded px-4 py-2 hover:bg-green-600 w-full">Analizar punto critico</button>
                    <button onClick={handleSearchCriticalAreas} className="bg-yellow-500 text-white text-center rounded px-4 py-2 hover:bg-yellow-600 w-full">Analizar puntos criticos</button>

                </div>
            </div>
            <div
                ref={mapContainer}
                style={{ width: "100%", height: "100vh" }}
            />
        </div>
    );
}