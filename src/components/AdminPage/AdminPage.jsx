import React from "react";

export default function AdminPage(props) {
  const users = props.users;
  const columns = Object.keys(users[0] || {});

  return (
    <div className="overflow-x-auto p-5">
      <h2 className="text-lg font-semibold mb-4">Tabla de usuarios que no actualizaron</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
              >
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
                  {user[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
