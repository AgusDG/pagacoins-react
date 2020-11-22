import React from 'react';


const TableHeader  = (props) => {

  function raiseSort(path){
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === -1 ? 1 : -1;
    else {
      sortColumn.path = path;
      sortColumn.order = -1;
    }
    props.onSort(sortColumn);
  };
  function renderSortIcon(column){
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === -1) return <i className='fa fa-sort-asc'></i>;
    return <i className='fa fa-sort-desc'></i>;
  };

  return (
    <thead className="thead-dark">
      <tr>
        {props.columns.map((column, index) => (
          <th
            className={column.className}
            key={column.path || column.key || index}
            onClick={() =>
              column.path !== '' &&
              props.onSort &&
              raiseSort(column.path)
            }
          >
            {column.label}
            {props.sortColumn && renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
  
}

export default TableHeader;
