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
            <div className="logo"><strong>PONTUA</strong></div> 
            <ul className="nav">
                  <ClienteRepresentante/>
            </ul>
        </div>
    </div>
    <div className="main-panel">
     
		<nav className="navbar navbar-default navbar-fixed">
            
            <div className="container-fluid">
                <div className="navbar-header">
                   
                </div>
                <div className="collapse navbar-collapse">
                    <ul className="nav navbar-nav navbar-left">
                        
                    </ul>

                    <ul className="nav navbar-nav navbar-right">
                       
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