import React from 'react';
import { Card, CardHeader, Datatable,Select, Button } from 'components';
import { Row, Col } from 'react-bootstrap';
import {Product, DataTableColumn, Category} from 'models';
import {Globals} from 'utils';
import {RouteComponentProps} from 'react-router'
import {ProductService, CategoryService} from 'services';
type State = {
    showModal:boolean,
    editElement: Product | null,
    columns: DataTableColumn[],
    products: Product[],
    categories: Category[],
    categoriesSelect: Array<{
        label: string,
        value: number | string
    }>,
    form: {
        category_id: number | string,
    }
}
type Props = RouteComponentProps
class Products extends React.Component<Props, State> {
    constructor(props:Props){
        super(props);
        this.state = {
            showModal: false,
            editElement: null,
            categoriesSelect: [],
            form:{
                category_id: ''
            },
            columns: [
                {
                    name: '#',
                    selector: 'id',
                    sortable: false,
                    center: true,
                },
                {
                    name: 'Imagen',
                    selector: 'img',
                    sortable: false,
                    center: true,
                    cell: (element: Product) => <img className="w-100" src={element.img} alt={element.name} />
                },
                {
                    name: 'Nombre',
                    selector: 'name',
                    sortable: true,
                    center: true,
                },
                {
                    name: 'Precio',
                    selector: 'price',
                    sortable: true,
                    center: true,
                },
                {
                    name: 'Categorias',
                    selector: 'categories',
                    sortable: true,
                    center: true,
                    cell: (element: Product) => <p className="text dark w-100 text-center"> {
                        element.categories.map((element: number | Category) => typeof element === 'number' ? '' : element.name)
                            .join(' | ')
                    } </p>
                },
                {
                    name: 'Disponible',
                    selector: 'available',
                    sortable: true,
                    center: true,
                    cell: (element: Product) => <p className="text-dark w-100 text-center" > {element.available ? 'Disponible' : 'No disponible'} </p>
                },
                {
                    name: 'Mas vendido',
                    selector: 'best_seller',
                    sortable: true,
                    center: true,
                    cell: (element: Product) => <p className="text-dark w-100 text-center" > {element.best_seller ? 'Mas vendido' : 'No es el mas vendido'} </p>
                },
                {
                    name: 'Descripcion',
                    selector: 'description',
                    sortable: true,
                    center: true,
                }
            ],
            categories: [],
            products: []
        }
    }
    componentDidMount(){
        this.load()
    }

    edit = (element: Product) => {
        this.setState({
            showModal: true,
            editElement: element
        })
    }

    load = async () => {
        Globals.setLoading()
        try{
            let products = await ProductService.get()
            const categories = await CategoryService.get()
            const categoriesSelect = categories.map((element: Category) => {
                return {
                    label: element.name,
                    value: element.categori_id
                }
            })
            products = products.map((element: Product): Product => {
                element.categories = element.categories.map((category: number | Category): number | Category => {
                    let item = categories.find((_element: Category) => _element.categori_id === category)
                    if(item)
                        category = item
                    return category

                })
                return element
            })
            this.setState({
                products,
                categories,
                categoriesSelect
            })
        }catch(e){
            Globals.showError()
        }
        Globals.quitLoading()
    }
    change = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
        const name = e.target.name
        const value = e.target.value
        this.setState({
            ... this.state,
            form:{
                ... this.state.form,
                [name]: value
            }
        })
    }
    render() {
        return (
            <React.Fragment>
                <Card>
                    <Row>
                        <Col md={12}>
                            <CardHeader>
                                Listado de Productos
                            </CardHeader>
                            <div className="row">
                                <div className="col-4">
                                    <Select
                                        label="Categoria"
                                        enableAll={true}
                                        name="category_id"
                                        onChange={this.change}
                                        value={this.state.form.category_id}
                                        options={this.state.categoriesSelect}
                                    />
                                </div>
                                <div className="col-4"></div>
                                <div className="col-4"></div>
                            </div>
                        </Col>
                        <Col md={12}>
                            <Datatable
                                paginationTotalRows={this.state.products.length}
                                onChangePerPage={() => this.load() }
                                onChangePage={() => this.load()}
                                data={this.state.products}
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

export default Products;