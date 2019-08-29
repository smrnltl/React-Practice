import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { getUser } from '../../actions/userAction';
import { setPageName } from '../../actions/navAction';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.getUser();

        let url = window.location.href.split('/');

        let pageName = url[url.length - 1];

        this.props.setPageName(pageName === '' ? 'Dashboard' : pageName);

    }

    handleBreadcrumb = (newPageName) => {
        this.props.setPageName(newPageName);
    }

    render() {
        return (this.props.userProfile)
            ?
            (
                <React.Fragment>
                    <aside className="main-sidebar sidebar-dark-primary elevation-4">
                        <a href="index3.html" className="brand-link">
                            <img src="/app/admin/images/logo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" />
                            <span className="brand-text font-weight-light">Navigator</span>
                        </a>

                        <div className="sidebar">
                            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                                <div className="image">
                                    <img src="/app/admin/adminlte/dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                                </div>
                                <div className="info">
                                    <a href="#" className="d-block">{this.props.userProfile.firstName} {this.props.userProfile.lastName}</a>
                                </div>
                            </div>

                            <nav className="mt-2">
                                <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                    <li className="nav-item">
                                        <NavLink exact to="/" className="nav-link" onClick={() => this.handleBreadcrumb("Dashboard")}>
                                            <i className="nav-icon fas fa-tachometer-alt"></i>
                                            <p>
                                                Dashboard
                                    <span className="right badge badge-danger">New</span>
                                            </p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/UserManagement" className="nav-link" onClick={() => this.handleBreadcrumb("User Management")}>
                                            <i className="nav-icon fas fa-th"></i>
                                            <p>
                                                User Management
                                    <span className="right badge badge-warning">Renew</span>
                                            </p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/RoleManagement" className="nav-link" onClick={() => this.handleBreadcrumb("Role Management")}>
                                            <i className="nav-icon fas fa-th"></i>
                                            <p>
                                                Role Management
                                    <span className="right badge badge-danger">New</span>
                                            </p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/Organization" className="nav-link" onClick={() => this.handleBreadcrumb("Organization Management")}>
                                            <i className="nav-icon fas fa-th"></i>
                                            <p>
                                                Organization
                                    <span className="right badge badge-danger">New</span>
                                            </p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item has-treeview">
                                        <a href="#" className="nav-link">
                                            <i className="nav-icon fas fa-chart-pie"></i>
                                            <p>
                                                Charts
                                    <i className="right fas fa-angle-left"></i>
                                            </p>
                                        </a>
                                        <ul className="nav nav-treeview">
                                            <li className="nav-item">
                                                <a href="pages/charts/chartjs.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>ChartJS</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="pages/charts/flot.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>Flot</p>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="pages/charts/inline.html" className="nav-link">
                                                    <i className="far fa-circle nav-icon"></i>
                                                    <p>Inline</p>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>

                                </ul>
                            </nav>
                        </div>
                    </aside>
                </React.Fragment>
            ) :
            (<p>Loading...</p>)
    }
}


const mapStateToProps = state => ({
    userProfile: state.user.currentUser
});

const mapActionToProps = {
    getUser,
    setPageName
}


export default connect(mapStateToProps, mapActionToProps)(Navbar);