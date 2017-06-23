import React, { Component } from 'react';
import { Route,  BrowserRouter as Router, Switch} from 'react-router-dom';
import 'reactstrap';

//COMPONENTES
import Login             from './componentes/Login/Login';
import Logout            from './componentes/Login/Logout';
import MenuInicial       from './componentes/Login/MenuInicial';
import Servidores        from './componentes/Servidor/Servidores';
import Representante     from './representante/Representante';
import MenuRepresentante from './representante/MenuRepresentante';
import Cliente           from './cliente/Cliente';
import MenuCliente       from './cliente/MenuCliente';
import ListarPromocao    from './representante/ListarPromocao';
import CadastrarPromocao from './representante/CadastrarPromocao';
import EditarPromocao from './representante/EditarPromocao';

   function ClienteRepresentante(){
        if(localStorage.getItem('token-cliente') != null){
            return <MenuCliente/>;
        }
        if(localStorage.getItem('token-representante') != null){
            return <MenuRepresentante/>;
        }
        return <MenuInicial/>;
    }


export default  class Bootstrapp extends Component{
    
 
    
    
    render(){
        return(
           <Router>
<div className="wrapper">
    <div className="sidebar" data-color="purple" data-image="assets/img/sidebar-5.jpg">
        <div className="sidebar-wrapper">
            <div className="logo">
                        <a href="http://www.creative-tim.com" class="simple-text">
                            Creative Tim
                        </a>
            </div> 
            <ul className="nav">
                  <ClienteRepresentante/>
            </ul>
        </div>
    </div>
    <div className="main-panel">
     
		<nav className="navbar navbar-default navbar-fixed">
            
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navigation-example-2">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="#">User</a>
                </div>
                <div className="collapse navbar-collapse">
                    <ul className="nav navbar-nav navbar-left">
                        <li>
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <i className="fa fa-dashboard"></i>
								<p className="hidden-lg hidden-md">Dashboard</p>
                            </a>
                        </li>
                        <li className="dropdown">
                              <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="fa fa-globe"></i>
                                    <b className="caret hidden-sm hidden-xs"></b>
                                    <span className="notification hidden-sm hidden-xs">5</span>
									<p className="hidden-lg hidden-md">
										5 Notifications
										<b className="caret"></b>
									</p>
                              </a>
                              <ul className="dropdown-menu">
                                <li><a href="#">Notification 1</a></li>
                                <li><a href="#">Notification 2</a></li>
                                <li><a href="#">Notification 3</a></li>
                                <li><a href="#">Notification 4</a></li>
                                <li><a href="#">Another notification</a></li>
                              </ul>
                        </li>
                        <li>
                           <a href="">
                                <i className="fa fa-search"></i>
								<p className="hidden-lg hidden-md">Search</p>
                            </a>
                        </li>
                    </ul>

                    <ul className="nav navbar-nav navbar-right">
                        <li>
                           <a href="">
                               <p>Account</p>
                            </a>
                        </li>
                        <li className="dropdown">
                              <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <p>
										Dropdown
										<b className="caret"></b>
									</p>

                              </a>
                              <ul className="dropdown-menu">
                                <li><a href="#">Action</a></li>
                                <li><a href="#">Another action</a></li>
                                <li><a href="#">Something</a></li>
                                <li><a href="#">Another action</a></li>
                                <li><a href="#">Something</a></li>
                                <li className="divider"></li>
                                <li><a href="#">Separated link</a></li>
                              </ul>
                        </li>
                        <li>
                            <a href="#">
                                <p>Log out</p>
                            </a>
                        </li>
						<li className="separator hidden-lg hidden-md"></li>
                    </ul>
                </div>
            </div>
        </nav>


        <div className="content">
            <div>
               
               <Switch> 
                    <Route  path="/login/:login" exact    component={ Login }/>
                    <Route  path="/logout/:login"         component={ Logout }/>
                    <Route  path="/servidores"            component={ Servidores }/>  
                    <Route  path="/representante"         component={ Representante }/>  
                    <Route  path="/promocao/listar"       component={ ListarPromocao }/>  
                    <Route  path="/promocao/cadastrar"    component={ CadastrarPromocao }/>   
                    <Route  path="/promocao/editar/:id"    component={ EditarPromocao }/>
                    <Route  path="/cliente"               component={ Cliente }/>   
                </Switch> 
            </div>
        </div>


        <footer className="footer">
            <div className="container-fluid">
                <nav className="pull-left">
                    <ul>
                        <li>
                            <a href="#">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                Company
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                Portfolio
                            </a>
                        </li>
                        <li>
                            <a href="#">
                               Blog
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </footer>

    </div>
</div>
</Router>
        );
    }
}