import React, { Component } from 'react';
import Loading from '../Loading/loadingComponent';
import { saveUser, getRoles, getUsers } from '../../actions/userAction';
import { clearMessage } from '../../actions/uiAction';
import { connect } from 'react-redux';

const initialState = {
    user: {
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        userId: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        roleName: ''
    },
    errors: {
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        phoneNumber: '',
        roleName: ''
    }
};


class UserFormComponent extends Component {
    constructor() {
        super();
        this.state = initialState;
    }

    componentDidMount() {
        this.props.getRoles();
    }

    componentWillReceiveProps(props) {
        if (props.user) {
            this.setState({
                user: props.user
            })
        }
    }

    validate = () => {
        let userNameErr = '';
        let firstNameErr = '';
        let lastNameErr = '';
        let emailErr = '';
        let phoneNumberErr = '';
        let passwordErr = '';
        let roleNameErr = '';

        if (!this.state.user.userName)
            userNameErr = 'Required';
        else
            userNameErr = '';

        if (!this.state.user.firstName)
            firstNameErr = 'Required';
        else
            firstNameErr = '';

        if (!this.state.user.lastName)
            lastNameErr = 'Required';
        else
            lastNameErr = '';

        if (!this.state.user.email)
            emailErr = 'Required';
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.user.email))
            emailErr = 'Invalid Email';
        else
            emailErr = '';

        if (!this.state.user.phoneNumber)
            phoneNumberErr = 'Required';
        else if (isNaN(Number(this.state.user.phoneNumber)))
            phoneNumberErr = 'Must be numbers only';
        else if (this.state.user.phoneNumber.length != 10)
            phoneNumberErr = 'Phone Number must be 10 characters longs';
        else
            phoneNumberErr = '';

        if (this.state.user.userName.length === 0) {
            if (!this.state.user.password)
                passwordErr = 'Required';
        }
        else {
            passwordErr = ''
        }

        if (!this.state.user.roleName)
            roleNameErr = 'Required';
        else
            roleNameErr = '';

        this.setState({
            errors: {
                userName: userNameErr,
                firstName: firstNameErr,
                lastName: lastNameErr,
                email: emailErr,
                phoneNumber: phoneNumberErr,
                password: passwordErr,
                roleName: roleNameErr
            }
        })

        if (userNameErr || firstNameErr || lastNameErr || emailErr || phoneNumberErr || passwordErr || roleNameErr)
            return false;
        else
            return true;
    }

    handleChange = (e) => {
        this.setState({
            user: {
                ...this.state.user,
                [e.target.name]: e.target.value
            }
        })

        this.validate();
    }

    handleForm = () => {
        this.props.handleForm();
    }

    saveUser = () => {
        const isValid = this.validate();
        if (isValid) {
            this.props.saveUser(this.state.user);
            //this.setState(initialState);
        }
    }

    render() {
        if (this.state.user) {
            return (
                <div className="divForm">
                    <button type="button" className="btn btn-link pull-right text-white" onClick={() => this.handleForm()}><i className="fa fa-arrow-left"></i> Back</button>
                    <h4>User Form</h4>
                    <table className="table table-hovered">
                        <tbody>
                            <tr>
                                <th><label>Username : </label></th>
                                <td>
                                    <input type="text" name="userName" className="form-control" onChange={this.handleChange} placeholder="Username" value={this.state.user.userName || ''} />
                                    <div className="error-message">
                                        {this.state.errors.userName}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th><label>First Name : </label></th>
                                <td>
                                    <input type="text" name="firstName" className="form-control" onChange={this.handleChange} placeholder="First Name" value={this.state.user.firstName || ''} />
                                    <div className="error-message">
                                        {this.state.errors.firstName}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th><label>Last Name : </label></th>
                                <td>
                                    <input type="text" name="lastName" className="form-control" onChange={this.handleChange} placeholder="Last Name" value={this.state.user.lastName || ''} />
                                    <div className="error-message">
                                        {this.state.errors.lastName}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th><label>Email : </label></th>
                                <td>
                                    <input type="email" name="email" className="form-control" onChange={this.handleChange} placeholder="Email" value={this.state.user.email || ''} />
                                    <div className="error-message">
                                        {this.state.errors.email}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th><label>Phone Number : </label></th>
                                <td>
                                    <input type="number" name="phoneNumber" className="form-control" onChange={this.handleChange} placeholder="Phone Number" value={this.state.user.phoneNumber || ''} />
                                    <div className="error-message">
                                        {this.state.errors.phoneNumber}
                                    </div>
                                </td>
                            </tr>

                            {
                                this.state.user.userName ?
                                    <></> :
                                    <tr>
                                        <th>Password :</th>
                                        <td>
                                            <input type="password" name="password" className="form-control" onChange={this.handleChange} placeholder="Password" value={this.state.user.password || ''} autoComplete="new-password" />
                                            <div className="error-message">
                                                {this.state.errors.password}
                                            </div>
                                        </td>
                                    </tr>
                            }


                            <tr>
                                <th>Roles : </th>
                                <td>
                                    <select className="form-control" name="roleName" value={this.state.user.roleName || ''} onChange={this.handleChange} >
                                        <option key="0" value="">-- Select Role --</option>
                                        {
                                            this.props.roles && this.props.roles.map((role) => {
                                                return (<option key={role.id} value={role.name} >{role.name}</option>)
                                            })
                                        }
                                    </select>
                                    <div className="error-message">
                                        {this.state.errors.roleName}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <button className="btn btn-success" onClick={this.saveUser} type="button">Save</button>
                                    <button className="btn btn-warning" onClick={this.handleForm} type="button">Cancel</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        }
        else {
            return (<Loading />)
        }
    }
}

const mapStateToProps = state => ({
    roles: state.user.roles,
    result: state.user.result
})

const mapActionToProps = {
    saveUser,
    getRoles,
    getUsers,
    clearMessage
}

export default connect(mapStateToProps, mapActionToProps)(UserFormComponent);