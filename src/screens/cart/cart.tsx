import React from 'react';
import { Card, CardHeader, Datatable, Button } from 'components';
import { Row, Col } from 'react-bootstrap';
import {Product, Category, DataTableColumn} from 'models';
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
                    name: 'Cantidad',
                    selector: 'amount',
                    sortable: false,
                    center: true,
                },
                {
                    name: 'Nombre',
                    selector: 'name',
                    sortable: true,
                    center: true,
                },
                {
                    name: 'Imagen',
                    selector: 'img',
                    sortable: false,
                    center: true,
                    cell: (element: Product) => <img
                        className="text-center"
                        style={{
                            width: '60%'
                        }}
                        src={element.img}
                        alt={element.name}
                    />
                },
                {
                    name: 'Precio',
                    selector: 'price',
                    sortable: false,
                    center: true,
                    cell: (element: Product) => <p className="text-center text-dark"> {element.price} </p>
                },
                {
                    name: 'Precio',
                    selector: 'price',
                    sortable: false,
                    center: true,
                    cell: (element: Product) => <p className="text-dark w-100 text-center"> {
                        element.categories.map((element: number | Category) => typeof element === 'number' ? '' : element.name)
                            .join(' | ')
                    } </p>
                },
                {
                    name: 'Total',
                    selector: 'price',
                    sortable: false,
                    center: true,
                    cell: (element: Product) => <p className="text-dark w-100 text-center">
                        {
                            parseFloat(element.price.replace('.', '')) * (element.amount || 1)
                        }
                    </p>
                },
                {
                    name: 'Precio',
                    selector: 'price',
                    sortable: false,
                    center: true,
                    cell: (element: Product) => <React.Fragment>
                        <Button
                            onClick={() => this.removeCart(element)}
                            variant="primary"
                            icon="close"
                            tooltip={true}
                            labelTooltip="Remover del carrito"
                        />
                    </React.Fragment>
                }
            ],
        }
    }
    componentDidMount(){
        this.load()
    }

    removeCart = (element: Product) => {
        let products = this.props.cart && [... this.props.cart] || []
        const index = this.props.cart?.findIndex((_element: Product) => _element.id === element.id)
        if(typeof index === 'number' && index !== -1){
            products.splice(index, 1)
        }
        this.props.dispatch({
            type: 'SET_CART',
            payload: products
        })
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
                                Listado de Carrito
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