import React from 'react';


const AddButton = (props) => {
    return (
        <button type="button" className="btn btn-success pull-right" onClick={() => props.handleEdit(null)}>+ Add New</button>
    );
}

export default AddButton;