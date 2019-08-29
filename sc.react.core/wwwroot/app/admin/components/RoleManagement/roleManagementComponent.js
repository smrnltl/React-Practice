import React, { Component } from 'react';
import AddButton from '../Shared/AddButton/addButtonCompnent';
import RoleList from './roleListComponent';
import RoleForm from './roleFormComponent';
import { getRoles, deleteRole, getRoleById, saveRole } from '../../actions/roleAction';
import { getAllModules, getRolePermissionById, saveRolePermission, toogleFrom } from '../../actions/moduleAction';
import { connect } from 'react-redux';
import _ from 'lodash'


class RoleManagement extends Component {
    state = {
        roleName: '',
        id: '',
        showPermissionFrom: false
    }
    componentDidMount() {
        this.props.getRoles();
    }

    handleDelete = (id) => {
        this.props.deleteRole(id);
    }

    handleEdit = (id, roleName) => {
        if (id) {
            this.setState({ showPermissionFrom: true, roleName: roleName, id: id  });
            this.props.getRolePermissionById(id);
        }
        else {
            this.setState({ showPermissionFrom: false, roleName: roleName, id: id });
            this.props.toogleFrom();
        }

    }
    toogleForm = () => {
        this.props.toogleForm();
    }

    handleChange = (roleName) => {
        this.setState({ roleName });
    }

    saveRole = () => {
        const role = { name: this.state.roleName, id: null };
        this.props.saveRole(role);
    }
    saveRoleModules = (modules, roleId) => {
        //var t1 = _.map(t, _.partialRight(_.pick, ['name', 'value']));
        //console.log(_.mapValues(_.keyBy(t1, 'name'), 'value'));
        var roleModules = [];
        modules.map(m => roleModules.push({ id: m.id, roleId: this.state.id, roleName: this.state.roleName, moduleName: m.moduleName, moduleCode: m.moduleCode, permission: _.mapValues(_.keyBy(_.map(m.permission, _.partialRight(_.pick, ['name', 'value'])), 'name'), 'value') }));
        this.props.saveRolePermission(JSON.stringify(roleModules));
    }

    render() {
        const { roles, modules, showForm } = this.props;
        let _roleList =
            !showForm ?
                (roles !== undefined ? (
                    <>
                        <button type="button" className="btn btn-success pull-right" onClick={() => this.handleEdit(null, "")}>+ Add New</button>
                        <RoleList roles={roles} handleEdit={this.handleEdit} handleDelete={this.handleDelete} />
                    </>
                ) : (<p>Loading  data...</p>))
                : (<RoleForm modules={modules} roleName={this.state.roleName} saveRoleOnly={this.saveRole} showPermissionFrom={this.state.showPermissionFrom} saveRoleModules={this.saveRoleModules} handleChange={this.handleChange} formToogle={this.toogleForm} />);
        return _roleList;
    }

}


const mapStateToProps = state => ({
    showForm: state.module.showForm,
    roles: state.role.roles,
    editRole: state.role.editRole,
    result: state.role.result,
    modules: state.module.modules

});

const mapActionToProps = {
    getRoles,
    getRoleById,
    deleteRole,
    toogleFrom,
    saveRole,

    getAllModules,
    getRolePermissionById,
    saveRolePermission
};

export default connect(mapStateToProps, mapActionToProps)(RoleManagement);