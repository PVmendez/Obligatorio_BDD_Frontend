import "./Actualizado.css";

function Actualizado() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-3xl font-semibold mb-4">
          ¡Gracias por actualizar tus datos!
        </h2>
        <p className="flex justify-center text-gray-600">
          Tu información ha sido actualizada con éxito.
        </p>
      </div>
    </div>
  );
}
export default Actualizado;
