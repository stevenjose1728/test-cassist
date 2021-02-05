import React from 'react'
import {Sidebar, Header, Footer} from '../components';

interface StateApp {
    ltr:boolean,
    divName:string
}

class App extends React.Component<any, StateApp> {

    constructor(props:any){
        super(props);
        this.state ={
            ltr:true,
            divName:'RTL',
        }
    }

    render() {
        return (
            <div>
                <div className="page-wrapper" key="page-wraper">
                    <Header />
                    <div className="page-body-wrapper">
                        <Sidebar />
                        <div className="page-body">
                            <div className="container">
                                {this.props.children}
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
                <div id="root-app-react-hold" key="react-hold"></div>
            </div>
        )
    }
};

export default App
