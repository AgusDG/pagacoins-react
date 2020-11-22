import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const UsersTable = ({data, handleDelete}) => {

    var columns = [
        {label: 'Name', path: 'name'},
        {label: 'Email', path: 'email'},
        {label: '', path: '', content: (item) => 
            <Link className="btn btn-sm btn-dark" to={{pathname: `/user/${item.id}`, state: {user: item}}}>View user</Link>},
        {label: '', path: '', content: (user) => 
        <div className="btn btn-sm btn-danger" onClick={() => handleDelete(user.id)}>Delete user</div>, className: 'deleteColumn' },

    ]

    function renderCell(item, column){
        if(column.content)
            return column.content(item)
        
        return _.get(item, column.path)
    }

    function renderHead(columns){
        return <thead className="thead-dark">
                <tr>{columns.map((column, index) => (
                    <th key={index}>
                        {column.label}
                    </th>
                ))}</tr>
            </thead>
    }

    return (
        <table className="table">
           { 
           renderHead(columns) 
           }  
            <tbody>
            {
             data &&  data.map(item => (
                    <tr key={item.id}>
                    {
                        columns.map((column, index) => <td key={index}>{renderCell(item, column)}</td>)
                    }
                    </tr>
                ))
            }
           
            </tbody>
        </table>
    );
};

export default UsersTable;