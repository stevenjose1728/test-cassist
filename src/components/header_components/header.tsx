import React, { Component,Fragment } from 'react'
import Notification from './notification';
import User_menu from './user-menu';
import { AlignLeft, Bell, MoreHorizontal } from 'react-feather';

//images
import logo from '../../assets/images/logo-market.png';

interface StateHeader {
    sidebar:boolean,
    rightSidebar:boolean,
    navMenus:boolean
}

export class Header extends Component<any, StateHeader> {
    constructor(props:any) {
        super(props);
        this.state = {
            sidebar: true,
            rightSidebar: true,
            navMenus: false
        }
    }
    toggle() {
        this.setState(prevState => ({
            navMenus: !prevState.navMenus
        }));
    }
    showRightSidebar = () => {
        if (this.state.rightSidebar) {
            this.setState({ rightSidebar: false })
            //@ts-ignore
            document.querySelector(".right-sidebar").classList.add('show');
        } else {
            this.setState({ rightSidebar: true })
            //@ts-ignore
            document.querySelector(".right-sidebar").classList.remove('show');
        }
    }
    goFull = () => {
        //@ts-ignore
        if ((document.fullScreenElement && document.fullScreenElement !== null) ||
            //@ts-ignore
            (!document.mozFullScreen && !document.webkitIsFullScreen)) {
                //@ts-ignore
            if (document.documentElement.requestFullScreen) {
                //@ts-ignore
                document.documentElement.requestFullScreen();
                //@ts-ignore
            } else if (document.documentElement.mozRequestFullScreen) {
                //@ts-ignore
                document.documentElement.mozRequestFullScreen();
                //@ts-ignore
            } else if (document.documentElement.webkitRequestFullScreen) {
                //@ts-ignore
                document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            //@ts-ignore
            if (document.cancelFullScreen) {
                //@ts-ignore
                document.cancelFullScreen();
                //@ts-ignore
            } else if (document.mozCancelFullScreen) {
                //@ts-ignore
                document.mozCancelFullScreen();
                //@ts-ignore
            } else if (document.webkitCancelFullScreen) {
                //@ts-ignore
                document.webkitCancelFullScreen();
            }
        }
    }
    openCloseSidebar = () => {
        if (this.state.sidebar) {
            this.setState({ sidebar: false })
            //@ts-ignore
            document.querySelector(".page-main-header").classList.add('open');
            //@ts-ignore
            document.querySelector(".page-sidebar").classList.add('open');
        } else {
            this.setState({ sidebar: true })
            //@ts-ignore
            document.querySelector(".page-main-header").classList.remove('open');
            //@ts-ignore
            document.querySelector(".page-sidebar").classList.remove('open');
        }
    }
    render() {
        return (
            <Fragment>
                {/* open */}
                <div className="page-main-header ">
                    <div className="main-header-right row">
                        <div className="main-header-left d-lg-none" >
                            <div className="logo-wrapper">
                                <a href="#">
                                    <img className="blur-up lazyloaded" src={logo} alt="" />
                                </a>
                            </div>
                        </div>
                        <div className="mobile-sidebar">
                            <div className="media-body text-right switch-sm">
                                <label className="switch">
                                    <a href="#" onClick={this.openCloseSidebar}><AlignLeft /></a>
                                </label>
                            </div>
                        </div>
                        <div className="nav-right col">
                            <ul className={"nav-menus " + (this.state.navMenus ? 'open' : '')}>
                                
                                <li className="onhover-dropdown"><Bell /><span className="badge badge-pill badge-primary pull-right notification-badge">3</span><span className="dot"></span>
                                    <Notification />
                                </li>
                                <User_menu />
                            </ul>
                            <div className="d-lg-none mobile-toggle pull-right" onClick={() => this.toggle()}><MoreHorizontal /></div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Header