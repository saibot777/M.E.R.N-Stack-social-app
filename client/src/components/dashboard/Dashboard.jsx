import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../shared/Spinner';
import {Link} from "react-router-dom";

export class Dashboard extends Component {
    componentDidMount() {
        this.props.getCurrentProfile();
    }

    render() {
        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;

        let dashboardUI;

        if (profile === null || loading) {
            dashboardUI = <Spinner />
        } else {
            if (Object.keys(profile).length > 0) {
                dashboardUI = <h4>DISPLAY PROFILE</h4>
            } else {
                dashboardUI = (
                    <div>
                        <p className="lead text-muted">Welcome { user.name }</p>
                        <p>You Have not yet setup a profile</p>
                        <Link to="/create-profile" className="btn btn-lg btn-info">
                            Create Profile
                        </Link>
                    </div>
                )
            }
        }

        return (
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">Dashboard</h1>
                            { dashboardUI }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};