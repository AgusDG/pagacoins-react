import React from 'react';
import _ from 'lodash';

const TableBody = ({data, columns}) => {
  function renderCell(item, column){
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };
  function createKey(item){
    return item.id
  };

  return (
    <tbody>
      {data.map((item, index) => (
        <tr
          key={item._id || index}
          id={item.id}
        >
          {columns.map((column, index) => (
            <td key={index}>
              {renderCell(item, column)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
  
}

export default TableBody;
