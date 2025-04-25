import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet"
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
export const Map2025 = () => {

    const data = [
        {
            "NRO_RADICADO": "3147",
            "NRO_CROQUIS": "A001533899",
            "GRAVEDAD": "h",
            "DIRECCION_LUGAR": "CARRERA 9 CON 63",
            "COORDENADA_X": "023899",
            "COORDENADA_Y": "763899",
            "FECHA_ACCIDENTE": "1/5/2024 10:51 AM",
            "COORDENADAS": "2.481354279212953, -76.57449602792349"
        },
        {
            "NRO_RADICADO": "3165",
            "NRO_CROQUIS": "A001688989",
            "GRAVEDAD": "h",
            "DIRECCION_LUGAR": "CARRERA 17 CON CALLE 61 NORTE",
            "COORDENADA_X": "022930",
            "COORDENADA_Y": "763445",
            "FECHA_ACCIDENTE": "1/20/2024 10:20 PM",
            "COORDENADAS": "2.483295898217737, -76.57808715019162"
        },
        {
            "NRO_RADICADO": "3120",
            "NRO_CROQUIS": "A001533878",
            "GRAVEDAD": "m",
            "DIRECCION_LUGAR": "Carrera 9 con 35N",
            "COORDENADA_X": "024700",
            "COORDENADA_Y": "765800",
            "FECHA_ACCIDENTE": "1/26/2024 4:17 AM",
            "COORDENADAS": "2.4664136949136433, -76.58709967753812"
        },
        {
            "NRO_RADICADO": "3156",
            "NRO_CROQUIS": "A001689000",
            "GRAVEDAD": "h",
            "DIRECCION_LUGAR": "carrera 17 con calle 11",
            "COORDENADA_X": "024416",
            "COORDENADA_Y": "766213",
            "FECHA_ACCIDENTE": "2/5/2024 10:30 AM",
            "COORDENADAS": "2.4392072367277895, -76.61587008387396"
        },
        {
            "NRO_RADICADO": "3159",
            "NRO_CROQUIS": "A001689002",
            "GRAVEDAD": "h",
            "DIRECCION_LUGAR": "CARRERA 17 CON CALLE 7A ESMERALDA",
            "COORDENADA_X": "022632",
            "COORDENADA_Y": "763655",
            "FECHA_ACCIDENTE": "2/7/2024 8:16 AM",
            "COORDENADAS": "2.441663481344203, -76.61521859768179"
        },
        {
            "NRO_RADICADO": "3166",
            "NRO_CROQUIS": "A001689005",
            "GRAVEDAD": "h",
            "DIRECCION_LUGAR": "CARRERA 17 CON 1 N 75 ENTRADA POLICIA ",
            "COORDENADA_X": "022643",
            "COORDENADA_Y": "763647",
            "FECHA_ACCIDENTE": "2/10/2024 8:25 AM",
            "COORDENADAS": "2.4484736304906347, -76.61253292042795"
        },
        {
            "NRO_RADICADO": "3186",
            "NRO_CROQUIS": "A001689014",
            "GRAVEDAD": "h",
            "DIRECCION_LUGAR": "CARRERA 17 CALLE 15 A",
            "COORDENADA_X": "022592",
            "COORDENADA_Y": "763712",
            "FECHA_ACCIDENTE": "3/10/2024 3:00 PM",
            "COORDENADAS": "2.443804023712172, -76.61478612546233"
        },
        {
            "NRO_RADICADO": "3187",
            "NRO_CROQUIS": "A001689015",
            "GRAVEDAD": "h",
            "DIRECCION_LUGAR": "CARRERA 9 CALLE 38N",
            "COORDENADA_X": "022843",
            "COORDENADA_Y": "763419",
            "FECHA_ACCIDENTE": "3/15/2024 9:03 AM",
            "COORDENADAS": "2.4697145460559353, -76.5834835732017"
        },
        {
            "NRO_RADICADO": "3130",
            "NRO_CROQUIS": "A001533884",
            "GRAVEDAD": "m",
            "DIRECCION_LUGAR": "CARRERA 9 64 N",
            "COORDENADA_X": "022846",
            "COORDENADA_Y": "763709",
            "FECHA_ACCIDENTE": "3/18/2024 7:00 PM",
            "COORDENADAS": "2.481310359485272, -76.57294637380343"
        },
        {
            "NRO_RADICADO": "3188",
            "NRO_CROQUIS": "A001689024",
            "GRAVEDAD": "h",
            "DIRECCION_LUGAR": "CARRERA 9 CON CALLE 63N",
            "COORDENADA_X": "024576",
            "COORDENADA_Y": "765795",
            "FECHA_ACCIDENTE": "4/17/2024 5:09 PM",
            "COORDENADAS": "2.481368678808064, -76.57453617017377"
        },
        {
            "NRO_RADICADO": "3144",
            "NRO_CROQUIS": "A001533897",
            "GRAVEDAD": "m",
            "DIRECCION_LUGAR": "CARRERA 9 CALLE 63 N",
            "COORDENADA_X": "022890",
            "COORDENADA_Y": "763422",
            "FECHA_ACCIDENTE": "5/23/2024 8:30 PM",
            "COORDENADAS": "2.4813591294645576, -76.5745648450915"
        },
        {
            "NRO_RADICADO": "3216",
            "NRO_CROQUIS": "A001689041",
            "GRAVEDAD": "h",
            "DIRECCION_LUGAR": "CALLE 13 CARRERA 17 ROMPIO CHIRIMIA",
            "COORDENADA_X": "022616",
            "COORDENADA_Y": "763659",
            "FECHA_ACCIDENTE": "5/23/2024 8:50 AM",
            "COORDENADAS": "2.4369671255312446, -76.6161063736944"
        },
        {
            "NRO_RADICADO": "3230",
            "NRO_CROQUIS": "A001689043",
            "GRAVEDAD": "h",
            "DIRECCION_LUGAR": "CALLE 5CON CARRERA 18",
            "COORDENADA_X": "024475",
            "COORDENADA_Y": "766208",
            "FECHA_ACCIDENTE": "5/25/2024 11:45 PM",
            "COORDENADAS": "2.4452206024603425, -76.61568646931906"
        },
        {
            "NRO_RADICADO": "3146",
            "NRO_CROQUIS": "A001533898",
            "GRAVEDAD": "m",
            "DIRECCION_LUGAR": "TRANSVERSAL 9 CON CALLE 61 N",
            "COORDENADA_X": "022535",
            "COORDENADA_Y": "763652",
            "FECHA_ACCIDENTE": "6/3/2024 8:47 AM",
            "COORDENADAS": "2.48323596186573, -76.57814776940332"
        },
        {
            "NRO_RADICADO": "3226",
            "NRO_CROQUIS": "A001689056",
            "GRAVEDAD": "h",
            "DIRECCION_LUGAR": "CARRERA 17 CALLE 13",
            "COORDENADA_X": "022612",
            "COORDENADA_Y": "763429",
            "FECHA_ACCIDENTE": "6/28/2024 8:00 PM",
            "COORDENADAS": "2.4370259513265693, -76.61617764833065"
        },
        {
            "NRO_RADICADO": "3278",
            "NRO_CROQUIS": "A001689098",
            "GRAVEDAD": "m",
            "DIRECCION_LUGAR": "CARRERA 9 CALLE 64N",
            "COORDENADA_X": "022851",
            "COORDENADA_Y": "763419",
            "FECHA_ACCIDENTE": "8/29/2024 8:55 AM",
            "COORDENADAS": "2.481308139059479, -76.57290554733646"
        },
        {
            "NRO_RADICADO": "3279",
            "NRO_CROQUIS": "A001689107",
            "GRAVEDAD": "h",
            "DIRECCION_LUGAR": "CARRERA 17 CALLE15 ",
            "COORDENADA_X": "022844",
            "COORDENADA_Y": "763251",
            "FECHA_ACCIDENTE": "9/10/2024 9:10 AM",
            "COORDENADAS": "2.4361002920932613, -76.6163682060719"
        },
        {
            "NRO_RADICADO": "3249",
            "NRO_CROQUIS": "A001689078",
            "GRAVEDAD": "h",
            "DIRECCION_LUGAR": "TRANSVERSAL 9 CON CALLE 35 N SEMAFOROS TABLAZPO",
            "COORDENADA_X": "025615",
            "COORDENADA_Y": "764400",
            "FECHA_ACCIDENTE": "8/5/2024 7:30 AM",
            "COORDENADAS": "2.466615440467663, -76.58692216996658"
        },
        {
            "NRO_RADICADO": "3288",
            "NRO_CROQUIS": "A001689113",
            "GRAVEDAD": "h",
            "DIRECCION_LUGAR": "CARRERA 9 CALLE 64N BELLAVISTA",
            "COORDENADA_X": "022852",
            "COORDENADA_Y": "763416",
            "FECHA_ACCIDENTE": "9/14/2024 11:30 PM",
            "COORDENADAS": "2.4813212742395927, -76.57294498985887"
        },
        {
            "NRO_RADICADO": "3296",
            "NRO_CROQUIS": "A001689121",
            "GRAVEDAD": "h",
            "DIRECCION_LUGAR": "CARRERA 17 CON CALLE 8",
            "COORDENADA_X": "022737",
            "COORDENADA_Y": "763521",
            "FECHA_ACCIDENTE": "9/22/2024 8:33 AM",
            "COORDENADAS": "2.441125540475254, -76.61535557047496"
        },
        {
            "NRO_RADICADO": "3302",
            "NRO_CROQUIS": "A001710733",
            "GRAVEDAD": "h",
            "DIRECCION_LUGAR": "CARRERA 9 CALLE 37 NORTE",
            "COORDENADA_X": "022535",
            "COORDENADA_Y": "763653",
            "FECHA_ACCIDENTE": "10/1/2024 6:16 PM",
            "COORDENADAS": "2.4679925779070127, -76.5854639235316"
        },
        {
            "NRO_RADICADO": "3305",
            "NRO_CROQUIS": "A001710736",
            "GRAVEDAD": "h",
            "DIRECCION_LUGAR": "CALLE 5 CON CARRERA 16",
            "COORDENADA_X": "022640",
            "COORDENADA_Y": "763650",
            "FECHA_ACCIDENTE": "10/7/2024 7:46 PM",
            "COORDENADAS": "2.4445199554324377, -76.61415837417164"
        },
        {
            "NRO_RADICADO": "3327",
            "NRO_CROQUIS": "A001710756",
            "GRAVEDAD": "h",
            "DIRECCION_LUGAR": "CARRERA 17 # 1N-75",
            "COORDENADA_X": "2.2650",
            "COORDENADA_Y": "-76.3648",
            "FECHA_ACCIDENTE": "11/7/2024 6:50 PM",
            "COORDENADAS": "2.445825911188122, -76.61424708357275"
        },
        {
            "NRO_RADICADO": "3406",
            "NRO_CROQUIS": "A001710834",
            "GRAVEDAD": "h",
            "DIRECCION_LUGAR": "CARRERA 17 CALLE 4 LA ESMERALDA",
            "COORDENADA_X": "02,2643",
            "COORDENADA_Y": "-76,3653",
            "FECHA_ACCIDENTE": "2/6/2025 6:40 AM",
            "COORDENADAS": "2.4452064199092085, -76.61453133661077"
        },
        {
            "NRO_RADICADO": "3385",
            "NRO_CROQUIS": "A001710814",
            "GRAVEDAD": "h",
            "DIRECCION_LUGAR": "carrera 9 # 64BN-31",
            "COORDENADA_X": "02,2853",
            "COORDENADA_Y": "-76,3410",
            "FECHA_ACCIDENTE": "2/14/2025 8:06 AM",
            "COORDENADAS": "2.4814108635968286, -76.57078160549976"
        },
        {
            "NRO_RADICADO": "3355",
            "NRO_CROQUIS": "A001710784",
            "GRAVEDAD": "h",
            "DIRECCION_LUGAR": "CARRERA 9 CON CALLE 37N SECTOR EL TABLAZO",
            "COORDENADA_X": "02,2803",
            "COORDENADA_Y": "-76,3508",
            "FECHA_ACCIDENTE": "12/9/2024",
            "COORDENADAS": "2.4671311615885037, -76.58644548164973"
        },
        {
            "NRO_RADICADO": "3397",
            "NRO_CROQUIS": "A001710825",
            "GRAVEDAD": "h",
            "DIRECCION_LUGAR": "TRASVERSAL 9A CON CALLE 62 NORTE",
            "COORDENADA_X": "02,4817",
            "COORDENADA_Y": "-76,5754",
            "FECHA_ACCIDENTE": "1/24/2025 4:20 PM",
            "COORDENADAS": "2.4820045485441558, -76.57556475760177"
        },
        {
            "NRO_RADICADO": "3378",
            "NRO_CROQUIS": "A001710807",
            "GRAVEDAD": "h",
            "DIRECCION_LUGAR": "CARRERA 9 CON CALLE 35N",
            "COORDENADA_X": "02,2815",
            "COORDENADA_Y": "-76,3454",
            "FECHA_ACCIDENTE": "2/19/2025 7:43 AM",
            "COORDENADAS": "2.466422487548816, -76.58709032833467"
        },
        {
            "NRO_RADICADO": "3377",
            "NRO_CROQUIS": "A001710806",
            "GRAVEDAD": "h",
            "DIRECCION_LUGAR": "CARRERA 17 CON CALLE 11",
            "COORDENADA_X": "02,2622",
            "COORDENADA_Y": "-76,3657",
            "FECHA_ACCIDENTE": "2/24/2025 10:59 PM",
            "COORDENADAS": "2.439186888351022, -76.61571516925352"
        }
    ]

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
                    data.map((item) => {
                        const coordinates = Array.isArray(item.COORDENADAS)
                            ? item.COORDENADAS
                            : item.COORDENADAS.split(',').map(coord => parseFloat(coord.trim()));
                        return (
                            <Marker key={item.NRO_CROQUIS} position={coordinates} icon={item.GRAVEDAD === 'm' ? icon : customIcon}>
                                <Popup>
                                    {item.NRO_CROQUIS}
                                </Popup>
                            </Marker>
                        );
                    })
                }

            </MapContainer>
        </>
    );
}


