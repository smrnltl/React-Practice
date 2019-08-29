import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './admin/css/admin.scss';

import Dashboard from './admin/components/Dashboard/dashboard';
import Mainheader from './admin/components/Layout/mainheader';
import Navbar from './admin/components/Layout/navbar';
import Breadcrumb from './admin/components/Layout/breadcrumb';
import Footer from './admin/components/Layout/footer';
import UserManagement from './admin/components/UserManagement/userManagementComponent';
import RoleManagement from './admin/components/RoleManagement/roleManagementComponent';
import Organization from './admin/components/Organization/organizationComponent';
import FlashMessageList from './admin/components/FlashMessage/flashMessageListComponent';

class AdminApp extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Mainheader />
                    <Navbar />
                    <div className="content-wrapper">
                        <div className="main-content">
                            <FlashMessageList />
                            <Breadcrumb />
                            <Switch>
                                <Route exact path="/" render={() => <Dashboard />} />
                                <Route path="/UserManagement" component={UserManagement} />
                                <Route path="/RoleManagement" component={RoleManagement} />
                                <Route path="/Organization" component={Organization} />
                            </Switch>
                        </div>
                        <Footer />
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

export default AdminApp;