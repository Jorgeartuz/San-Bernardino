import { useState } from "react";

type Plato = {
  id: number;
  nombre: string;
  precio: number;
};

export default function Admin() {
  const [platos, setPlatos] = useState<Plato[]>([]);
  const [nombre, setNombre] = useState<string>("");
  const [precio, setPrecio] = useState<number>(0);

  const agregarPlato = () => {
    if (!nombre || precio <= 0) return;

    const nuevoPlato: Plato = {
      id: Date.now(),
      nombre,
      precio,
    };

    setPlatos([...platos, nuevoPlato]);
    setNombre("");
    setPrecio(0);
  };

  const eliminarPlato = (id: number) => {
    setPlatos(platos.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">
        Panel de Administración
      </h1>

      {/* Formulario */}
      <div className="bg-white p-6 rounded-xl shadow mb-6 max-w-md">
        <h2 className="text-xl mb-4 font-semibold">
          Agregar Plato
        </h2>

        <input
          type="text"
          placeholder="Nombre del plato"
          className="w-full mb-3 p-2 border rounded"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          type="number"
          placeholder="Precio"
          className="w-full mb-3 p-2 border rounded"
          value={precio}
          onChange={(e) => setPrecio(Number(e.target.value))}
        />

        <button
          onClick={agregarPlato}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Agregar
        </button>
      </div>

      {/* Lista de platos */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl mb-4 font-semibold">
          Menú actual
        </h2>

        {platos.length === 0 ? (
          <p>No hay platos aún</p>
        ) : (
          <ul>
            {platos.map((plato) => (
              <li
                key={plato.id}
                className="flex justify-between items-center border-b py-2"
              >
                <span>
                  {plato.nombre} - ${plato.precio}
                </span>

                <button
                  onClick={() => eliminarPlato(plato.id)}
                  className="text-red-500"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}