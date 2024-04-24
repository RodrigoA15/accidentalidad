import PropTypes from "prop-types";

function Form({ setTipo, fetchData, error, setFecha_inicio, setFecha_fin }) {
  return (
    <>
      <div className="flex flex-col items-end justify-start h-screen light formAccidentes p-5">
        <div className="w-full max-w-xs bg-white rounded-lg p-6 shadow-2xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Accidentalidad
          </h2>

          <form className="flex flex-col">
            <input
              placeholder="Fecha Inicio"
              className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 shadow-md"
              type="date"
              onChange={(e) => setFecha_inicio(e.target.value)}
            />
            <input
              placeholder="Email"
              className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 shadow-md"
              type="date"
              onChange={(e) => setFecha_fin(e.target.value)}
            />
            <select
              className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 shadow-md"
              id="product"
              onChange={(e) => setTipo(e.target.value)}
            >
              <option value="">Seleccione tipo accidente</option>
              <option value="m">Muertos</option>
              <option value="h">Heridos</option>
              <option value="d">Daños</option>
            </select>
            {<p className="text-red-600 p-1">{error}</p>}
            <button
              className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150 min-w-0"
              onClick={fetchData}
            >
              Buscar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Form;

Form.propTypes = {
  setTipo: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  setFecha_inicio: PropTypes.func.isRequired,
  setFecha_fin: PropTypes.func.isRequired,
};
