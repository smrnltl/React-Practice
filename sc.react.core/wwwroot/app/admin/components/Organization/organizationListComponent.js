import React from 'react';
import Confirm from 'react-confirm-bootstrap';

const OrganizationList = (props) => {

    let organizationList = []
    let org = [];

    if (props.organizationList) {
        org = props.organizationList;
        for (let i = 0; i < org.length; i++) {
            organizationList.push
                (<tr key={i}>
                    <td>{org[i].companyCode}</td>
                    <td>{org[i].companyName}</td>
                    <td>{org[i].pan}</td>
                    <td>{org[i].addedOnString}</td>
                    <td><a className="fa fa-edit" href="javascript:void(0);" onClick={() => props.handleEdit(org[i].id)} title="Edit"></a>&nbsp;&nbsp;
                        
                        <Confirm
                            onConfirm={()=>props.handleDelete(org[i].id)}
                            body="Are you sure you want to delete this organization?"
                            confirmText="Yes"
                            cancelText="No"
                            title="Deleting Organization"
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
            <h4>Organization List</h4>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company Code</th>
                        <th>Company Name</th>
                        <th>PAN</th>
                        <th>Added On</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {organizationList}
                </tbody>
            </table>
            
        </div>
    );
}

export default OrganizationList;