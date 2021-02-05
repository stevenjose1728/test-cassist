import { Component } from 'react';
import { Card, CardTitle,CardHeader } from 'components';
import React from 'react';

class Dashboard extends Component<any, any> {

    render() {
        return (
            <div>
                <Card>
                    <CardHeader>
                        Dashboard
                    </CardHeader>
                    <CardTitle text="Bienvenido.!" />
                </Card>
            </div>
        )
    }
}

export default Dashboard
