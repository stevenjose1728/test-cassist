import React from 'react';
import { Card, CardHeader, Datatable,Select, Input, Button } from 'components';
import { Row, Col } from 'react-bootstrap';
import {Product, DataTableColumn, Category} from 'models';
import {Globals} from 'utils';
import {RouteComponentProps} from 'react-router'
import {ProductService, CategoryService} from 'services';
import {RootState} from 'reducers'
import { connect, ConnectedProps } from "react-redux";

type OptionSelect = {
    label: string,
    value: string | number
}

type Form = {
    category_id: number | string,
    stock: number | string,
    price: number | string,
    name: string
}
type State = {
    showModal:boolean,
    editElement: Product | null,
    columns: DataTableColumn[],
    products: Product[],
    originalProducts: Product[],
    categories: Category[],
    categoriesSelect: Array<OptionSelect>,
    stockSelect: OptionSelect[],
    priceSelect: OptionSelect[],
    form: Form
}
const mapState = (state: RootState) => ({
    cart: state.cart
});

const connector = connect(mapState);  
type Props = ConnectedProps<typeof connector> &
RouteComponentProps;
class Products extends React.Component<Props, State> {
    constructor(props:Props){
        super(props);
        this.state = {
            showModal: false,
            editElement: null,
            categoriesSelect: [],
            stockSelect: [
                {
                    label: 'Disponibles',
                    value: 1
                },
                {
                    label: 'Agotados',
                    value: 2
                },
                {
                    label: 'Mas vendidos',
                    value: 3
                },
            ],
            priceSelect: [
                {
                    label: 'Mayor a 30.000',
                    value: 0
                },
                {
                    label: 'Menor a 10.000',
                    value: 1
                }
            ],
            form:{
                category_id: '',
                stock: '',
                price: '',
                name: ''
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
                    cell: (element: Product) => <p className="text-dark w-100 text-center"> {
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
                },
                {
                    name: 'Acciones',
                    selector: '',
                    sortable: true,
                    center: true,
                    cell: (element: Product) => <React.Fragment>
                        <Button
                            onClick={() => this.addCart(element)}
                            variant="primary"
                            icon="shopping-cart"
                            tooltip={true}
                            labelTooltip="Añadir al carrito"
                        />
                    </React.Fragment>
                },
            ],
            categories: [],
            products: [],
            originalProducts: [],
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
                originalProducts: products,
                products,
                categories,
                categoriesSelect
            })
        }catch(e){
            Globals.showError()
        }
        Globals.quitLoading()
    }

    addCart = async (element: Product) => {
        let products = this.props.cart || []
        const index = products.findIndex((_element: Product) => _element.id === element.id)
        if(products.length > 0 && index !== -1){
            const item = products[index]
            let amount = 0
            if(item.amount){
                amount = item.amount + 1
            }
            products[index] = {
                ... products[index],
                amount
            }
            Globals.showSuccess('Cantidad del producto aumentada exitosamente')
        }else{
            products.push({
                ... element,
                amount: 1
            })
            Globals.showSuccess('Producto añadido al carrito exitosamente')
        }
        await this.props.dispatch({
            type: 'SET_CART',
            payload: products
        })
    }

    filterByCategory = (_products: Product[]): Product[] => {
        let products = [... _products]
        products = products.filter((element: Product) => {
            const canReturn = element.categories.some((category: number | Category) => typeof category !== 'number' && category.categori_id == this.state.form.category_id)
            return canReturn
        })
        return products
    }

    filterByStock = (_products: Product[]): Product[] =>{
        let condition: {
            key: keyof Product,
            value: boolean
        }
        switch(this.state.form.stock){
            case '1':
                condition = {
                    key: 'available',
                    value: true
                }
                break
            case '2':
                condition = {
                    key: 'available',
                    value: false
                }
                break
            case '3':
                condition = {
                    key: 'best_seller',
                    value: true
                }
                break
        }
        let products = [... _products]
        products = products.filter((element: Product) => element[condition.key] === condition.value)
        return products
    }

    filterByPriceAmount = (_products: Product[]): Product[] => {
        let products = [... _products]
        const orderByMostPrice: number = typeof this.state.form.price === 'string' ? parseInt(this.state.form.price) : this.state.form.price
        products = products.filter((element: Product) => {
            const price = parseFloat(element.price.replace('.', ''))
            if(!orderByMostPrice){
                return price >= 30000
            }
            else{
                return price <= 10000
            }
        })
        return products
    }

    filterByName = (_products: Product[]) => {
        let products = [... _products]
        const {name} = this.state.form
        products = products.filter((element: Product) => {
            const include = element.name.includes(name)
            if (include) {
                return true
            }else{
                return false
            }
        })
        return products
    }

    setFilters = () => {
        let products: Product[] = [... this.state.originalProducts]
        for(let key of Object.keys(this.state.form)){
            //@ts-ignore
            if(this.state.form[key]){
                switch(key){
                    case 'category_id':
                        products = this.filterByCategory(products)
                        break
                    case 'price':
                        products = this.filterByPriceAmount(products)
                        break
                    case 'stock':
                        products = this.filterByStock(products)
                        break
                    case 'name':
                        products = this.filterByName(products)
                        break

                }
            }
        }
        this.setState({
            products
        })
        console.log('>>: setFilters > ', this.state.form)
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
        }, () => {
            this.setFilters()
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
                                <div className="col-md-3 col-sm-6">
                                    <Select
                                        label="Categoria"
                                        enableAll={true}
                                        name="category_id"
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => this.change(e)}
                                        value={this.state.form.category_id}
                                        options={this.state.categoriesSelect}
                                    />
                                </div>
                                <div className="col-md-3 col-sm-6">
                                    <Select
                                        label="Stock"
                                        enableAll={true}
                                        name="stock"
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => this.change(e)}
                                        value={this.state.form.stock}
                                        options={this.state.stockSelect}
                                    />
                                </div>
                                <div className="col-md-3 col-sm-6">
                                    <Select
                                        label="Precio"
                                        enableAll={true}
                                        name="price"
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => this.change(e)}
                                        value={this.state.form.price}
                                        options={this.state.priceSelect}
                                    />
                                </div>
                                <div className="col-md-3 col-sm-6">
                                    <Input
                                        type="text"
                                        name="name"
                                        label="Nombre del producto"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.change(e)}
                                        value={this.state.form.name}
                                    />
                                </div>
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

export default connector(Products);