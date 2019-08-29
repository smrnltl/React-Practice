import React from 'react';
import Confirm from 'react-confirm-bootstrap';

const RoleList = ({ roles, handleDelete,handleEdit }) => {




    return (
        <div className="divData">
            <h4>Role List</h4>
            <table className="table">
                <thead>
                    <tr>
                        <th>Role Name</th>
                        <th></th>
                    </tr>   
                </thead>
                <tbody>
                    {roles.map((role) => {

                        return (
                            <tr key={role.id}>
                                <td>{role.name}</td>
                                <td>
                                    <a className="fa fa-edit" href="javascript:void(0);" onClick={() => handleEdit(role.id, role.name)} title="Edit"></a>&nbsp;&nbsp;

                            <Confirm
                                        onConfirm={() => handleDelete(role.id)}
                                        body="Are you sure you want to delete this role?"
                                        confirmText="Yes"
                                        cancelText="No"
                                        title="Deleting Role"
                                        confirmBSStyle="success"
                                    >
                                        <a className="fa fa-trash" href="javascript:void(0);"></a>
                                    </Confirm>
                                </td>
                            </tr>
                        )
                    }
                    )}
                </tbody>
            </table>

        </div>
    );
}

export default RoleList;