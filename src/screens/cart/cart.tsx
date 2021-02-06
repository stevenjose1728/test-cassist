import React from 'react';
import { Card, CardHeader, Datatable } from 'components';
import { Row, Col } from 'react-bootstrap';
import {Product, DataTableColumn} from 'models';
import {RouteComponentProps} from 'react-router'
import { connect, ConnectedProps } from "react-redux";
import {RootState} from 'reducers'

type State = {
    columns: DataTableColumn[],
}
const mapState = (state: RootState) => ({
    cart: state.cart
})

const connector = connect(mapState);  
type Props = ConnectedProps<typeof connector> &
    RouteComponentProps;
class Cart extends React.Component<Props, State> {
    constructor(props:Props){
        super(props);
        this.state = {
            columns: [
                {
                    name: '#',
                    selector: 'id',
                    sortable: false,
                    center: true,
                },
                {
                    name: 'Nombre',
                    selector: 'name',
                    sortable: true,
                    center: true,
                }
            ],
        }
    }
    componentDidMount(){
        this.load()
        console.log('>>: cart > ', this.props.cart)
    }


    load = async () => {
    }

    render() {
        return (
            <React.Fragment>
                <Card>
                    <Row>
                        <Col md={12}>
                            <CardHeader>
                                Listado de Categorias
                            </CardHeader>
                        </Col>
                        <Col md={12}>
                            <Datatable
                                paginationTotalRows={this.props.cart?.length || 0}
                                onChangePerPage={() => this.load() }
                                onChangePage={() => this.load()}
                                data={this.props.cart}
                                columns={this.state.columns}
                                className="-striped -highlight"
                            />
                        </Col>
                    </Row>
                </Card>
            </React.Fragment>
        )
    }
}

export default connector(Cart);