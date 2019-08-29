import React, { Component } from 'react';
import Loading from '../Loading/loadingComponent';
import { saveOrganization, getOrganizations } from '../../actions/organizationAction';
import { clearMessage } from '../../actions/uiAction';
import { connect } from 'react-redux';

const initialState = {
    organization: {
        id: 0,
        companyCode: '',
        companyName: '',
        countryCode: 0,
        stateCode: 0,
        districtCode: 0,
        localUnitCode: 0,
        address: '',
        phoneNo: '',
        fax: '',
        email: '',
        pan: ''
    },
    errors: {
        companyCode: '',
        companyName: '',
        pan: '',
        email: '',
        phoneNo: ''
    }
};


class OrganizationFormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;

        this.state.organization = props.organization;
        
        console.log(props);
    }

    componentDidMount() {
        //this.props.getUser();
    }

    //componentWillReceiveProps(props) {
    //    console.log(props);
    //    if (props.organization) {
    //        this.setState({
    //            organization: props.organization
    //        })
    //    }
    //}

    validate = () => {
        let companyCodeErr = '';
        let companyNameErr = '';
        let panErr = '';
        let emailErr = '';
        let phoneNoErr = '';

        companyCodeErr = (!this.state.organization.companyCode) ? 'Required' : '';
        companyNameErr = (!this.state.organization.companyName) ? 'Required' : '';            

        if (this.state.organization.email !== '' && this.state.organization.email !== null) {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.organization.email))
                emailErr = 'Invalid Email';
            else
                emailErr = '';
        }
        if (this.state.organization.phoneNo !== '' && this.state.organization.phoneNo !== null) {
            if (isNaN(Number(this.state.organization.phoneNo)))
                phoneNoErr = 'Must be numbers only';
            else if (this.state.organization.phoneNo.length != 10)
                phoneNoErr = 'Phone Number must be 10 characters long';
            else
                phoneNoErr = '';
        }

        if (!this.state.organization.pan)
            panErr = 'Required';
        else if (isNaN(Number(this.state.organization.pan)))
            panErr = 'Must be numbers only';
        else if (this.state.organization.pan.length != 9)
            panErr = 'PAN must be 9 characters long';
        else
            panErr = '';

        this.setState({
            errors: {
                companyCode: companyCodeErr,
                companyName: companyNameErr,
                email: emailErr,
                phoneNo: phoneNoErr,
                pan: panErr
            }
        })

        if (companyCodeErr || companyNameErr || emailErr || phoneNoErr || panErr)
            return false;
        else
            return true;
    }

    handleChange = (e) => {
        this.setState({
            organization: {
                ...this.state.organization,
                [e.target.name]: e.target.value
            }
        })

        this.validate();
    }

    handleForm = () => {
        this.props.handleForm();
    }

    saveOrganization = () => {
        const isValid = this.validate();
        if (isValid) {
            this.props.saveOrganization(this.state.organization);
            //this.setState(initialState);
        }
    }

    render() {
        if (this.state.organization) {
            return (
                <div className="divForm">
                    <button type="button" className="btn btn-link pull-right text-white" onClick={() => this.handleForm()}><i className="fa fa-arrow-left"></i> Back</button>
                    <h4>Organization Form</h4>
                    <table className="table table-hovered">
                        <tbody>
                            <tr>
                                <th><label>Company Code : </label></th>
                                <td>
                                    <input type="text" name="companyCode" className="form-control" onChange={this.handleChange} placeholder="Company Code" value={this.state.organization.companyCode || ''} />
                                    <div className="error-message">
                                        {this.state.errors.companyCode}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th><label>Company Name : </label></th>
                                <td>
                                    <input type="text" name="companyName" className="form-control" onChange={this.handleChange} placeholder="Company Name" value={this.state.organization.companyName || ''} />
                                    <div className="error-message">
                                        {this.state.errors.companyName}
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <th><label>PAN : </label></th>
                                <td>
                                    <input type="text" name="pan" className="form-control" onChange={this.handleChange} placeholder="PAN" value={this.state.organization.pan || ''} />
                                    <div className="error-message">
                                        {this.state.errors.pan}
                                    </div>
                                </td>

                            </tr>

                            <tr>
                                <th>Country : </th>
                                <td>
                                    <select className="form-control" name="countryCode" value={this.state.organization.countryCode || ''} onChange={this.handleChange} >
                                        <option key="1" value="">Nepal</option>
                                        {
                                        //    this.props.roles && this.props.roles.map((role) => {
                                        //        return (<option key={role.id} value={role.name} >{role.name}</option>)
                                        //    })
                                        }
                                    </select>
                                </td>
                            </tr>

                            <tr>
                                <th>State : </th>
                                <td>
                                    <select className="form-control" name="stateCode" value={this.state.organization.stateCode || ''} onChange={this.handleChange} >
                                        <option key="0" value="">Select State</option>
                                        {
                                            //    this.props.roles && this.props.roles.map((role) => {
                                            //        return (<option key={role.id} value={role.name} >{role.name}</option>)
                                            //    })
                                        }
                                    </select>
                                </td>
                            </tr>

                            <tr>
                                <th>District : </th>
                                <td>
                                    <select className="form-control" name="districtCode" value={this.state.organization.districtCode || ''} onChange={this.handleChange} >
                                        <option key="0" value="">Select District</option>
                                        {
                                            //    this.props.roles && this.props.roles.map((role) => {
                                            //        return (<option key={role.id} value={role.name} >{role.name}</option>)
                                            //    })
                                        }
                                    </select>
                                </td>
                            </tr>

                            <tr>
                                <th>Local Unit : </th>
                                <td>
                                    <select className="form-control" name="localUnitCode" value={this.state.organization.localUnitCode || ''} onChange={this.handleChange} >
                                        <option key="0" value="">Select Local Unit</option>
                                        {
                                            //    this.props.roles && this.props.roles.map((role) => {
                                            //        return (<option key={role.id} value={role.name} >{role.name}</option>)
                                            //    })
                                        }
                                    </select>
                                </td>
                            </tr>

                            <tr>
                                <th><label>Address : </label></th>
                                <td>
                                    <input type="text" name="address" className="form-control" onChange={this.handleChange} placeholder="Address" value={this.state.organization.address || ''} />
                                </td>
                            </tr>

                            <tr>
                                <th><label>Phone Number : </label></th>
                                <td>
                                    <input type="number" name="phoneNo" className="form-control" onChange={this.handleChange} placeholder="Phone Number" value={this.state.organization.phoneNo || ''} />
                                    <div className="error-message">
                                        {this.state.errors.phoneNo}
                                    </div>
                                </td>
                            </tr>
                            
                            <tr>
                                <th><label>Email : </label></th>
                                <td>
                                    <input type="email" name="email" className="form-control" onChange={this.handleChange} placeholder="Email" value={this.state.organization.email || ''} />
                                    <div className="error-message">
                                        {this.state.errors.email}
                                    </div>
                                </td>
                            </tr>
                            
                            <tr>
                                <td></td>
                                <td>
                                    <button className="btn btn-success" onClick={this.saveOrganization} type="button">Save</button>
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
    result: state.organization.result
})

const mapActionToProps = {
    saveOrganization,
    getOrganizations,
    clearMessage
}

export default connect(mapStateToProps, mapActionToProps)(OrganizationFormComponent);