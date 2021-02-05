import { Component } from 'react'
import man from '../../assets/images/dashboard/man.png'
import { connect } from "react-redux";
import {User} from 'models';
import React from 'react';

interface StateProps {
    user?: User
}

class User_panel extends Component<StateProps> {

    render() {
        return (
            <div>
                <div className="sidebar-user text-center">
                    <div>
                        {
                            this.props.user?.avatar ?
                            <img
                                className="img-60 rounded-circle lazyloaded blur-up"
                                src={this.props.user?.avatar} alt="#"
                            />
                            :
                            <img
                                className="img-60 rounded-circle lazyloaded blur-up"
                                src={man} alt="#"
                            />
                        }

                    </div>
                    <h6 className="mt-3 f-14">{this.props.user?.name} {this.props.user?.last_name}</h6>
                    <p>{this.props.user?.email}</p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state:any):StateProps => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(User_panel);
