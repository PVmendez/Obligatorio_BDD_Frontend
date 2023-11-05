import React, { useEffect, useState } from "react";
import { getUsers } from "../../services/userServices";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const columns = Object.keys(users[0]); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getUsers();
        setUsers(userData);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="overflow-x-auto p-5">
      <h2 className="text-lg font-semibold mb-4">Tabla de Usuarios</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user, index) => (
            <tr key={index}>
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-6 py-4 whitespace-no-wrap">
                  {column === 'healthCard'
                    ? user[column].itHas ? 'Sí' : 'No'
                    : user[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
