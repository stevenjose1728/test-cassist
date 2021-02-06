import React from 'react';
import {ToastContainer} from "react-toastify";
import { Provider } from "react-redux";
import {PersistGate} from 'redux-persist/integration/react'
import {store, persistor} from "./store";
/**
 * Styles
 */
import 'dropify/dist/css/dropify.css';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.scss';
/**
 * Scripts
 */
import "jquery/dist/jquery.min.js";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import "bootstrap/dist/js/bootstrap.min.js";
import Categories from 'screens/categories/categories'
import Dashboard from 'screens/dashboard';
import Products from 'screens/products/products'
import Cart from 'screens/cart/cart'
import App from 'screens/app'
class _App extends React.Component {
	routes = [
		{
			path: "/",
			component: Dashboard
		},
		{
			path: "/categories",
			component: Categories
		},
		{
			path: "/products",
			component: Products
		},
	]
	render() {
		return (
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<BrowserRouter basename="/">
						<App>
							<Switch>
								<Route
									exact
									path={'/'}
									component={Dashboard}
								/>
								<Route
									exact
									path={'/categories'}
									component={Categories}
								/>
								<Route
									exact
									path={'/cart'}
									component={Cart}
								/>
								<Route
									exact
									path={'/products'}
									component={Products}
								/>
							</Switch>
						</App>
					</BrowserRouter>
				</PersistGate>
			</Provider>
		);
	}
}

export default _App;
