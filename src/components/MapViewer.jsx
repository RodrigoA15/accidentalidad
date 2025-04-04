import { MapContainer, Polygon, TileLayer, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import Form from "./Form";

function MapViewer() {
  // //Estado consumo api
  // const [data, setData] = useState([]);
  // //Valores inputs
  // const [fecha_inicio, setFecha_inicio] = useState("");
  // const [fecha_Fin, setFecha_fin] = useState("");
  // const [tipo, setTipo] = useState("");
  // const [error, setError] = useState("");

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:4000/api/v1/damages/${fecha_inicio}/${fecha_Fin}/${tipo}`
  //     );
  //     setData(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const positions = data.map((item) => ({
  //   key: item.NRO_CROQUIS,
  //   position: [
  //     parseFloat(
  //       item.COORDENADA_X.slice(0, 2) + "." + item.COORDENADA_X.slice(2)
  //     ),
  //     parseFloat(
  //       -item.COORDENADA_Y.slice(0, 2) + "." + item.COORDENADA_Y.slice(2)
  //     ),
  //   ],
  // }));

  // console.log(positions);

  // const validacion = () => {
  //   if (!tipo) {
  //     setError("Debe seleccionar un tipo de accidente");
  //   } else {
  //     setError("");
  //     fetchData();
  //   }
  // };

  // const handleSubmit = (e) => {
  //   validacion();
  //   e.preventDefault();
  // };

  //ZONA 1 BELLA VISTA
  //HERIDOS 10
  //MUERTOS 5
  const zone1 = [
    [2.483321468942191, -76.57812149572047],
    [2.4806968832962695, -76.57463871729475],
    [2.4812639317204592, -76.56803089022124],
  ]

  //ZONA 2 TORRE MOLINOS
  //3 MUERTOS
  const zone2 = [
    [2.465747455752381, -76.5877245794812],
    [2.466824704990553, -76.58669461125987],
    [2.466224446816196, -76.58695746773303],
  ]

  //ZONA 3 FACULTAD DE MEDICINA
  //2 MUERTOS
  //2 HERIDOS
  const zone3 = [
    [2.4512004638777807, -76.59988050640743],
    [2.4518009938370233, -76.59881029068262],
    [2.4514224233868767, -76.59886893263877],
  ]

  //ZONA EXITO PANAMERICANA 
  //3 HERIDOS 
  //3 MUERTOS
  const zone4 = [
    [2.4511744616789604, -76.60667271752317],
    [2.4520239917854423, -76.60491345883462],
    [2.451439693589275, -76.60538308134329],
  ]

  const blackOptions = { color: 'black' }


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
        {/* 
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
        /> */}

        <Polygon positions={zone1} pathOptions={blackOptions}>
          <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent>
            ZONA 1 BELLA VISTA
            HERIDOS 10
            MUERTOS 5
          </Tooltip>
        </Polygon>
        <Polygon positions={zone2} pathOptions={blackOptions}>
          <Tooltip direction="left" offset={[0, 20]} opacity={1} permanent>
            ZONA 2 TORRE MOLINOS
            3 MUERTOS
          </Tooltip>
        </Polygon>
        <Polygon positions={zone3} pathOptions={blackOptions}>
          <Tooltip direction="right" offset={[0, 20]} opacity={1} permanent>
            ZONA 3 FACULTAD DE MEDICINA
            2 MUERTOS
            2 HERIDOS
          </Tooltip>
        </Polygon>
        <Polygon positions={zone4} pathOptions={blackOptions}>
          <Tooltip direction="left" offset={[0, 20]} opacity={1} permanent>
            ZONA EXITO PANAMERICANA
            3 HERIDOS
            3 MUERTOS
          </Tooltip>
        </Polygon>
      </MapContainer>
    </>
  );
}

export default MapViewer;
