import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOrganizations, getOrganizationById, deleteOrganization, toggleOrganizationForm } from '../../actions/organizationAction';
import AddButton from '../Shared/AddButton/addButtonCompnent';
import OrganizationList from './organizationListComponent';
import OrganizationFormComponent from './organizationFormComponent';
import Pagination from '../Shared/Pagination/paginationComponent';

//import PropTypes from 'prop-types';
import { Animated } from "react-animated-css";
import Loading from '../Loading/loadingComponent';



class OrganizationManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSearch: false,
            showForm: false,
            num: 5,
            id: 0,
            organization: {},
            pageNo: 1,
            itemsPerPage: 5,
            pagePerDisplay: 5,
            un: '',
            em: '',
            pn:''
        };
    }

    handleToggle = () => {
        this.setState((state) => ({
            showSearch: !state.showSearch
        }))
    }

    componentDidMount() {
        this.props.getOrganizations(this.state.pageNo, this.state.pagePerDisplay, this.state.itemsPerPage);
    }

    handlePager = (pageNo) => {
        this.props.getOrganizations(pageNo, this.state.pagePerDisplay, this.state.itemsPerPage);
    }

    handleForm = () => {
        this.props.toggleOrganizationForm();
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleEdit = (id) => {
        this.props.getOrganizationById(id);
    }

    handleDelete = (id) => {
        this.props.deleteOrganization(id);
    }

    render() {
        const organization = this.props.editOrganization;

        if (this.props.showForm) {
            return (<OrganizationFormComponent organization={organization} handleForm={this.handleForm} />)
        }
        else {
            return (
                <>
                    <AddButton handleEdit={this.handleEdit} />
                    {
                        this.props.organizations ?
                            <>
                                <OrganizationList organizationList={this.props.organizations.data} handleEdit={this.handleEdit} handleDelete={this.handleDelete} />
                                <Pagination pager={this.props.organizations.pager} handlePager={this.handlePager} />
                            </>
                            :
                            <Loading />
                    }


                </>
            )
        }
    }
}

const mapStateToProps = state => ({
    organizations: state.organization.organizations,
    editOrganization: state.organization.editOrganization,
    message: state.ui.message,
    result: state.organization.result,
    showForm: state.organization.showForm,
    showConfirm: state.ui.showConfirm
});

const mapActionToProps = {
    getOrganizations,
    getOrganizationById,
    deleteOrganization,
    toggleOrganizationForm
}

export default connect(mapStateToProps, mapActionToProps)(OrganizationManagement);