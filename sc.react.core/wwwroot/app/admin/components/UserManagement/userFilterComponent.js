import React, { Component } from 'react';

class UserFilter extends Component {
    state = {
        userName: '',
        email: '',
        phoneNumber: ''
    };

    handleSearch = () => {
        this.props.searchUser(this.state)
    }

    handleReset = () => {
        this.setState({
            userName: '',
            email: '',
            phoneNumber: ''
        })
        this.props.resetFilter();
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className="search-filter">
                <h4>Search Filter</h4>
                <hr />
                <div className="row">
                    <div className="col-md-3">
                        <label>Username</label>
                        <input name="userName" onChange={this.handleChange} type="text" placeholder="Username" className="form-control" value={this.state.userName} />
                    </div>
                    <div className="col-md-3">
                        <label>Email</label>
                        <input name="email" onChange={this.handleChange} type="text" placeholder="Email" className="form-control" value={this.state.email} />
                    </div>
                    <div className="col-md-3">
                        <label>Phone Number</label>
                        <input name="phoneNumber" onChange={this.handleChange} type="text" placeholder="Phone Number" className="form-control" value={this.state.phoneNumber} />
                    </div>
                    <div className="col-md-3">
                        <div className="btn-search-group">
                            <button type="button" className="btn btn-primary" id="btnSearch" onClick={this.handleSearch}>Search</button>
                            <button type="button" className="btn btn-warning" id="btnResetFilter" onClick={this.handleReset}>Reset</button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default UserFilter;