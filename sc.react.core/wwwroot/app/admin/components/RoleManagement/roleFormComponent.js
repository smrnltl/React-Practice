import React, { Component } from 'react';
import Loading from '../Loading/loadingComponent';
import { saveRole, getRoles } from '../../actions/roleAction';
import { clearMessage } from '../../actions/uiAction';
import { getRolePermissionById, getModuleRoles, toogleFrom } from '../../actions/moduleAction';
import Module from '../ModuleManagement/moduleComponent';
import { connect } from 'react-redux';

const initialState = {
    role: {
        name: '',
        id: ''
    },
    errors: {
        name: ''
    },
    roleName: '',
    modules: []
};


class RoleForm extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    mod = [];

    componentDidMount() {
        if (this.props.module) {
            this.setState({
                role: this.props.module
            });
        }
        else {
            this.setState({
                role: {}
            });
        }
        const roleId = this.props.modules.id;
        if (roleId)
            this.props.getRolePermissionById(roleId);
        else
            this.props.getModuleRoles();
    }

    validate = () => {
        let nameErr = '';

        if (!this.props.roleName)
            nameErr = 'Required';
        else
            nameErr = '';


        this.setState({
            errors: {
                name: nameErr
            }
        })

        if (nameErr)
            return false;
        else
            return true;
    }


    handleChange = (e) => {

        this.props.handleChange(e.target.value);

        this.validate();
    }

    handleForm = () => {
        this.props.handleForm();
    }

    saveRole = () => {
        const isValid = this.validate();
        if (isValid) {
            this.props.saveRoleModules(this.mod.modules, this.props.role);
        }
    }

    saveRoleOnly = () => {
        let isValid = this.validate();
        if (isValid) {
            this.props.saveRoleOnly();
        }
    }

    formToogle = () => {
        this.props.toogleFrom();
    }
    m = (modelePermission) => {
        this.mod = modelePermission;
    }


    render() {
        let modules = [];
        if (this.state.role) {
            return (
                <>
                    <div className="divForm p-5 pt-0">
                        <button type="button" className="btn btn-link pull-right text-white" onClick={this.formToogle}><i className="fa fa-arrow-left"></i> Back</button>
                        <h4>Role Form</h4>
                        <table className="table table-hovered">
                            <tbody>
                                <tr>
                                    <th><label>Role Name : </label></th>
                                    <td>
                                        <input type="text" name="name" className="form-control" onChange={this.handleChange} placeholder="Role Name" value={this.props.roleName} />
                                        <div className="error-message">
                                            {this.state.errors.name}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        {this.props.showPermissionFrom ? (<table className="table table-bordered table-permission">
                        <strong>Set Authorization : </strong>
                            <thead>
                                <tr>
                                    <th>Module</th>
                                    <th>Permission</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.modules ?
                                        <Module modules={this.props.modules} m={this.m} /> : <></>
                                }
                            </tbody>
                        </table>) : null}
                        <div className="row justify-content-center ">
                            {this.props.showPermissionFrom ? (<button className="btn btn-success" onClick={this.saveRole} type="button">Save</button>) :

                                (<button className="btn btn-success" onClick={this.saveRoleOnly} type="button">Save</button>)}
                            
                            <button className="btn btn-warning" onClick={this.formToogle} type="button">Cancel</button>
                        </div>
                    </div>
                </>
            )
        }
        else {
            return (<Loading />)
        }
    }
}

const mapStateToProps = state => ({
    result: state.role.result,
    modules: state.module.modules
})

const mapActionToProps = {
    saveRole,
    getRoles,
    clearMessage,
    getRolePermissionById,
    getModuleRoles,
    toogleFrom
}

export default connect(mapStateToProps, mapActionToProps)(RoleForm);