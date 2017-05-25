import React, { Component } from 'react';
import { Route,  BrowserRouter as Router, Switch} from 'react-router-dom';
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

//CSS
import './css/pure-min.css';
import './css/side-menu.css';

function ClienteRepresentante(){
  if(localStorage.getItem('token-cliente') != null){
    return <MenuCliente/>;
  }
  if(localStorage.getItem('token-representante') != null){
    return <MenuRepresentante/>;
  }
  return <MenuInicial/>;
}


class App extends Component {
 
  render() {    
    return (
      <Router>
        <div id="layout">
            <div id="main">
            <nav id="menu">
              <div className="pure-menu">
                  <a className="pure-menu-heading" href="#">Pontua</a>
                  <ul className="pure-menu-list">
                      <ClienteRepresentante/>
                  </ul>  
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
                      <Route  path="/cliente"               component={ Cliente }/>   

                </Switch> 
              </div>
            </div>
          </div>
        </div>      
     </Router> 

    );
  }
}

export default App;
