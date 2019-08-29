import React from 'react';
import Confirm from 'react-confirm-bootstrap';

const UserList = (props) => {

    let userList = []
    let usr = [];

    if (props.userList) {
        usr = props.userList;
        for (let i = 0; i < usr.length; i++) {
            userList.push
                (<tr key={i}>
                    <td>{usr[i].firstName} {usr[i].lastName}</td>
                    <td>{usr[i].userName}</td>
                    <td>{usr[i].email}</td>
                    <td>{usr[i].phoneNumber}</td>
                    <td><a className="fa fa-edit" href="javascript:void(0);" onClick={() => props.handleEdit(usr[i].userId)} title="Edit"></a>&nbsp;&nbsp;
                        
                        <Confirm
                            onConfirm={()=>props.handleDelete(usr[i].userId)}
                            body="Are you sure you want to delete this user?"
                            confirmText="Yes"
                            cancelText="No"
                            title="Deleting User"
                            confirmBSStyle="success"
                            >
                            <a className="fa fa-trash" href="javascript:void(0);"></a>
                        </Confirm>
                    </td>
                </tr>
                );
        }
    }

    return (
        <div className="divData">
            <h4>User List</h4>
            <table className="table">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {userList}
                </tbody>
            </table>
            
        </div>
    );
}

export default UserList;