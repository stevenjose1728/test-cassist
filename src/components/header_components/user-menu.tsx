import React, { Component,Fragment } from 'react';
import man from '../../assets/images/dashboard/man.png';
import {store} from "../../store";
import {connect} from 'react-redux'
import {RootState} from 'reducers'
import {User} from 'models'
import {Link} from 'react-router-dom'
type Props = {
    user: User | null
}
class User_menu extends Component<Props> {

    logout = () => {
        store.dispatch({type: 'REMOVE_USER', payload: null });
    }

    render() {
        return (
            <Fragment>
                <li className="onhover-dropdown">
                    <div className="media align-items-center">
                        <img className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded" src={this.props.user?.uri || man} alt="header-user" />
                        <div className="dotted-animation"><span className="animate-circle"></span><span className="main-circle"></span></div>
                    </div>
                    <ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
                        <li>
                            <Link
                                to="/cart"
                            >
                                <i
                                    className="fa fa-shopping-cart"
                                />
                                &nbsp;Carrito
                            </Link>
                        </li>
                        <li onClick={this.logout}>
                            <a href="#" >
                                <i data-feather="log-out"></i>
                                Cerrar sesión
                            </a>
                        </li>
                    </ul>
                </li>
            </Fragment>
        )
    }
}

export default connect((state: RootState) => {
    return {
        user: state.user
    }
})(User_menu);
