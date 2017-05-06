import React, { Component } from 'react';
import {Link,   Route,  BrowserRouter as Router, Switch} from 'react-router-dom';
//COMPONENTES
import Login from './componentes/Login';
import Servidores from './componentes/Servidor/Servidores';
//import Promocao from './Promocao';
//CSS
import './css/pure-min.css';
import './css/side-menu.css';


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
                      <li className="pure-menu-item"><Link to="/" className="pure-menu-link">Login</Link></li>
                      <li className="pure-menu-item"><Link to="/servidores" className="pure-menu-link">Servidor</Link></li>
                      <li className="pure-menu-item menu-item-divided pure-menu-selected">
                          <a href="#" className="pure-menu-link">Services</a>
                      </li>
                  </ul>  
              </div>
            </nav>
            <div className="content">
              <div>  
                <Switch> 
                      <Route  path="/" exact component={ Login }/>
                      <Route  path="/servidores" component={ Servidores }/>  
                      
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
