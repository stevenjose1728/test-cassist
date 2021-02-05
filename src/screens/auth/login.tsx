import React, { Component, Fragment } from 'react'
import { RouteComponentProps } from "react-router-dom";
import bgLogin from '../../assets/images/login/bg.jpg';
import logo from '../../assets/images/logo-market.png';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import { RouteProps } from 'react-router';
import {Globals, validateInput} from 'utils';
import { Validation } from 'models';
import {Input} from 'components'
import { UserAuth, User } from 'models';
import { connect, ConnectedProps } from "react-redux";
import {LoginService} from 'services';
import {RootState} from 'reducers'

const mapState = (state: RootState) => ({
    user: state.user,
});

const mapDispatch = {
    dispatchUser: (user: User) => ({ payload: user, type: "SET_USER" }),
};
const connector = connect(mapState, mapDispatch);
type Model = {
    email: string,
    password: string,
}

interface Validations {
    form: {
        email: Validation,
        password: Validation,
    }
}

interface State {
    form: Model,
    validation: Validations
}

type Props = ConnectedProps<typeof connector> &
  RouteComponentProps &
  RouteProps;
class Login extends Component<Props, State>{
    readonly state: State;
    constructor(props: Props) {
        super(props);
        this.state= {
            form: {
                email: '',
                password: '',
            },
            validation: {
                form: {
                    email: {
                        rules: {
                            required: true,
                            email: true
                        },
                        name: 'Correo Electrónico',
                        hasError: false,
                        msgError: '',
                        isDirty: false,
                    },
                    password: {
                        rules: {
                            required: true,
                            minLength: 6,
                            maxLength: 15
                        },
                        name: 'Contraseña',
                        hasError: false,
                        msgError: '',
                        isDirty: false
                    },
                }
            },
        }
        this.login = this.login.bind(this);
        this.setValueForm = this.setValueForm.bind(this);
        this.setValidations = this.setValidations.bind(this);
    }
    componentDidMount(){
        if(this.props.user){
            this.props.history.replace("/");
        }
    }
    setValidations(validations:Validations){
        this.setState({
            validation: {
                ...validations,
            }
        })
    }

    async setValueForm(key:keyof Model, value:string){
        await this.setState({
            form: {
                ...this.state.form,
                [key]: value
            }
        });
        let vInputCurrent = this.state.validation.form[key];
        if(vInputCurrent.isDirty){
            const {hasError, msgError} = validateInput(
                this.state.validation.form[key].name,
                this.state.form[key],
                this.state.validation.form[key].rules
            );

            this.setState({
                validation: {
                    ...this.state.validation,
                    form: {
                        ...this.state.validation.form,
                        [key]: {
                            ...this.state.validation.form[key],
                            hasError,
                            msgError,
                            isDirty: true,
                        }
                    }
                }
            });
        }
    }

    login = async () => {
        const form = { ...this.state.form };
        Globals.setLoading()
        try {
            const user: UserAuth = await LoginService.login(form);
            Globals.showSuccess(`Bienvenido ${user.user.name}`);
        } catch (e) {
            console.log('>>: login.error: ', e);
            return Globals.showError(e?.payload?.error || "Disculpe ha ocurrido un error");
        } finally {
            Globals.quitLoading();
        }
    }

    render() {
        return (
            <Fragment>
                <div className="page-wrapper">
                    <div className="authentication-box">
                        <img className="bg-image" src={bgLogin} />
                        <div className="container">
                            <div className="row w-100">
                                <div className="col-md-6"></div>
                                <div className="col-md-6 p-0 card-right">
                                    <div className="card tab2-card">
                                        <div className="card-body">
                                            <Fragment>
                                                <img src={logo} className="logo-login" />
                                                <Tabs>
                                                    <TabList className="nav nav-tabs tab-coupon" >
                                                        <Tab className="nav-link">Login</Tab>
                                                    </TabList>

                                                    <TabPanel>
                                                        <form
                                                            onSubmit={this.login}
                                                            className="form-horizontal auth-form"
                                                        >
                                                            <Input
                                                                name="email"
                                                                type="email"
                                                                placeholder="Correo Electrónico"
                                                                value={this.state.form.email}
                                                                hasError={this.state.validation.form.email.hasError}
                                                                msgError={this.state.validation.form.email.msgError}
                                                                isDirty={this.state.validation.form.email.isDirty}
                                                                onChange={(value:string | number ) => this.setValueForm('email', value.toString())}
                                                            />

                                                            <Input
                                                                name="password"
                                                                type="password"
                                                                placeholder="Contraseña"
                                                                value={this.state.form.password}
                                                                hasError={this.state.validation.form.password.hasError}
                                                                msgError={this.state.validation.form.password.msgError}
                                                                isDirty={this.state.validation.form.password.isDirty}
                                                                onChange={(value:string | number) => this.setValueForm('password', value.toString())}
                                                            />
                                                            <div className="form-terms">
                                                                <div className="custom-control custom-checkbox mr-sm-2">
                                                                    <input type="checkbox" className="custom-control-input" id="customControlAutosizing" />
                                                                    <label className="d-block">
                                                                        <input className="checkbox_animated" id="chk-ani2" type="checkbox" />
                                                                            Recuerdame
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="form-button">
                                                                <button
                                                                    className="btn btn-primary float-right"
                                                                    type="submit"
                                                                >
                                                                    Login
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </TabPanel>
                                                </Tabs>
                                            </Fragment>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default connector(Login);
