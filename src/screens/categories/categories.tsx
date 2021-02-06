import React from 'react';
import { Card, CardHeader, Datatable, Modal, Button } from 'components';
import { Row, Col } from 'react-bootstrap';
import {Category, DataTableColumn} from 'models';
import {Globals} from 'utils';
import {RouteComponentProps} from 'react-router'
import {CategoryService} from 'services';

type State = {
    showModal:boolean,
    editElement: Category | null,
    columns: DataTableColumn[],
    categories: Category[]
}
type Props = RouteComponentProps
class Categories extends React.Component<Props, State> {
    constructor(props:Props){
        super(props);
        this.state = {
            showModal: false,
            editElement: null,
            columns: [
                {
                    name: '#',
                    selector: 'categori_id',
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
            categories: []
        }
    }
    componentDidMount(){
        this.load()
    }

    edit = (element: Category) => {
        this.setState({
            showModal: true,
            editElement: element
        })
    }

    load = async () => {
        Globals.setLoading()
        try{
            const categories = await CategoryService.get()
            this.setState({
                categories
            })
        }catch(e){
            Globals.showError()
        }
        Globals.quitLoading()
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
                                paginationTotalRows={this.state.categories.length}
                                onChangePerPage={() => this.load() }
                                onChangePage={() => this.load()}
                                data={this.state.categories}
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

export default Categories;