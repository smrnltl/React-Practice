import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchUser, getUsers, getUserById, deleteUser, toggleUserForm } from '../../actions/userAction';
import UserFilter from './userFilterComponent';
import AddButton from '../Shared/AddButton/addButtonCompnent';
import UserList from './userListComponent';
import UserFormComponent from './userFormComponent';
import Pagination from '../Shared/Pagination/paginationComponent';

//import PropTypes from 'prop-types';
import { Animated } from "react-animated-css";
import Loading from '../Loading/loadingComponent';



class UserManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSearch: false,
            showForm: false,
            num: 5,
            userId: '',
            user: {},
            pageNo: 1,
            itemsPerPage: 5,
            pagePerDisplay: 5,
            userName: '',
            email: '',
            phoneNumber: '',
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
        this.props.getUsers('','','',this.state.pageNo, this.state.pagePerDisplay, this.state.itemsPerPage);
    }

    handlePager = (pageNo) => {
        this.props.getUsers(this.state.userName, this.state.email, this.state.phoneNumber, pageNo, this.state.pagePerDisplay, this.state.itemsPerPage);
    }

    searchUser = (filterOptions) => {
        this.setState({
            userName: filterOptions.userName,
            email: filterOptions.email,
            phoneNumber: filterOptions.phoneNumber
        }) 
        
        this.props.getUsers(filterOptions.userName, filterOptions.email, filterOptions.phoneNumber, this.state.pageNo, this.state.pagePerDisplay, this.state.itemsPerPage);
    }

    resetFilter = () => {

        this.setState({
            userName: '',
            email: '',
            phoneNumber: ''
        }) 

        this.props.getUsers('', '', '', this.state.pageNo, this.state.pagePerDisplay, this.state.itemsPerPage);
    }

    handleForm = () => {
        this.props.toggleUserForm();
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleEdit = (userId) => {
        this.props.getUserById(userId);
    }

    handleDelete = (userId) => {
        this.props.deleteUser(userId);
    }

    render() {
        const user = this.props.editUser;

        if (this.props.showForm) {
            return (<UserFormComponent user={user} handleForm={this.handleForm} />)
        }
        else {
            return (
                <>
                    {
                        this.state.showSearch ?
                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={this.state.showSearch}>
                                <UserFilter searchUser={this.searchUser} handleChange={this.handleChange} resetFilter={this.resetFilter} />
                            </Animated>
                            : <></>
                    }

                    <button type="button" className={`btnToggle btn btn-${this.state.showSearch ? 'warning' : 'primary'}`} onClick={this.handleToggle}><i className="fas fa-filter"></i> Filter <i className={this.state.showSearch ? `fas fa-caret-up` : `fas fa-caret-down`}></i></button>
                    <br />
                    <AddButton handleEdit={this.handleEdit} />
                    {
                        this.props.users ?
                            <>
                                <UserList userList={this.props.users.data} handleEdit={this.handleEdit} handleDelete={this.handleDelete} />
                                <Pagination pager={this.props.users.pager} handlePager={this.handlePager} />
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
    filterUser: state.user.filterUser,
    users: state.user.users,
    editUser: state.user.editUser,
    message: state.ui.message,
    result: state.user.result,
    showForm: state.user.showForm,
    showConfirm: state.ui.showConfirm
});

const mapActionToProps = {
    searchUser,
    getUsers,
    getUserById,
    deleteUser,
    toggleUserForm
}

export default connect(mapStateToProps, mapActionToProps)(UserManagement);