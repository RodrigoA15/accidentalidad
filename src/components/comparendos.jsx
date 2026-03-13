// import { dataComparendos } from "../data/dataComp";
import { cleanDataComp } from "../data/dataCleanComp";
// import cleanDataComp from "../data/comp_2022_data.json"
// import cleanDataComp from "../data/comp_2023_data.json"
// import cleanDataComp from "../data/comp_2024_data.json"
// import cleanDataComp from "../data/comp_2025_data.json"

export const Comparendos = () => {
    const search = ["CARRERA 26", "CR 26", "CARRERA 25", "CR 25", "CARRERA 24", "CR 24", "CARRERA 23", "CR 23", "CARRERA 22", "CR 22", "CARRERA 22A", "CR 22A"];
    //const search = ["CALLE 15", "CL 15", "CALLE 13", "CL 13", "CALLE 18", "CL 18", "CALLE 17", "CL 17", "CALLE 16", "CL 16", "CALLE 14", "CL 14", "calle 15", "calle 13", "calle 18", "calle 17", "calle 16", "calle 14", "CALLE 6", "calle 6"];
    // const search = ["CARRERA 6", "CR 6", "carrera 6", "CARRERA 6A", "CR 6A", "carrera 6a"]
    //const search = ["CALLE 5", "CL 5", "calle 5", "cl 5"]

    const newData = cleanDataComp.filter((item) => {
        const direccion = item.DIRECCION_INFRACCION?.toUpperCase() || "";
        return search.some(palabra =>
            direccion.includes(palabra.toUpperCase())
        );
    });

    return (
        <div>
            {JSON.stringify(newData)}
        </div>
    );
};
