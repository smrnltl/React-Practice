import React from 'react';
import { connect } from 'react-redux'

const UserProfile = ({ userProfile: { firstName} }) => {
    return (
        <>
            <h1>{`First Name : ${firstName}`}</h1>
        </>
    );
}

const mapStateToProps = state => ({
    userProfile : state.user.filterUser
})

export default connect(mapStateToProps, null)(UserProfile);