﻿import React, { Component } from 'react';
import { connect } from 'react-redux';


const Breadcrumb = ({ pageName }) => {
    return (
        <div className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1 className="m-0 text-dark">{pageName}</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item active">{pageName}</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    pageName: state.nav.pageName
})

export default connect(mapStateToProps, null)(Breadcrumb);