import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import data from "../data/coordenadas/facultad.json"

export const MapAll = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);

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

        // Creamos y añadimos los nuevos marcadores
        data.forEach((item) => {
            // FIX 1 & 3: Usar map.current y el orden [longitud, latitud]
            new mapboxgl.Marker()
                .setLngLat([item.LONGITUD2, item.LATITUD2])
                // .setPopup(popup) // Añadimos el popup al marcador
                .addTo(map.current);

            // Guardamos la referencia del nuevo marcador
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
    return (
        <div
            ref={mapContainer}
            style={{ width: "100%", height: "100vh" }}
        />
    )
}
