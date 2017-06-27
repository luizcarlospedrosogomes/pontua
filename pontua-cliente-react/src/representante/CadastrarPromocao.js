import React, { Component } from 'react';
import PubSub from 'pubsub-js';
//COMPONENTES
import InputCustomizado from '../componentes/InputCustomizado';
import InputDateCustomizado from '../componentes/InputDateCustomizado';
import ComboboxCustomizado from '../componentes/ComboboxCustomizado';
import Progress from '../componentes/Progress/ProgressLinear';
//import ListarPromocao from './ListarPromocao';

export default  class CadastrarPromocao extends Component{
   token = localStorage.getItem('token-representante');
   host  =  JSON.parse(localStorage.getItem("servidores")).map(function(servidor){return servidor.url});
   baseUrl = JSON.parse(localStorage.getItem("servidores")).map(function(servidor){return servidor.baseUrl});
   emailRepresentante = localStorage.getItem('email-representante');

   status = [{value: '-1' ,label: 'Selecione'},
             {value: '1'  ,label: 'Ativa' } ,
             {value: '0'  ,label: 'Inativa'}
            ]
    constructor(props) {
        super(props);
        this.state = {msg: '', inicio_vigencia:'', statusValor:'', lista:[], status:'',cod:''}         
    }
    componentWillMount(){
        PubSub.subscribe('valor-combo',function(topico,valor){
            this.setState({statusValor:valor})
        }.bind(this));
        
        PubSub.publish('titulo-menu-superior',window.location.pathname);
    }

    updateState = (data)  =>{     
        if(data.item === 'inicio_vigencia'){
            this.setState({inicio_vigencia: data.dataDateTime})
        }
    } 
    
    enviaForm(evento){
        evento.preventDefault();
        this.setState({status:'carregando'});
        console.log(this.token);
      
        const requestInfo = {
            method:'POST',
            body:JSON.stringify({ token:this.token
                                , nome:this.nome.value
                              //  , representante: this.emailRepresentante
                                , quantidade_pontos: parseInt(this.pontos.value, 10)
                                , validade: this.state.inicio_vigencia
                                , status:  this.state.statusValor
                            }),
            headers:{'content-type'  : 'application/json'
                   , 'Authorization': this.token
                     }
        };
        console.log("SERVDOR: "+this.host);
        console.log("URL: "+this.baseUrl+"/representante/promo");
        console.log("ENVIANDO DADOS: "+requestInfo.body);
        console.log("VERBO: POST")
        fetch(this.host+this.baseUrl+"/representante/promo",requestInfo)            
            .then(response =>{
            if(response.status === 200 || response.status === 201 ){
                PubSub.publish("atualizaLista")
                this.setState({msg:"PROMOCÃO INCLUIDA COM SUCESSO", status:'', cod:response.status});
                return response.text();
            }
            if(response.status === 401){
              this.props.history.push('/logout/representante');
            }
            if(response.status === 400){
              this.setState({msg:"Verefique os campos",status:'', cod:response.status});
            }
            else{
                this.setState({msg:"Não foi possivel incluir a promoção", status:'', cod:response.status});
            }
        })
              
    }
    
    render() {
		return (
        
          <div>
          <div className="row">
                 {this.state.status ==='carregando' ? <Progress/>: ""}
           </div>
             <div className={this.state.cod >= 200 && this.state.cod < 300 ? "alert alert-success alert-dismissible":"" 
                                                    || this.state.cod >= 300 && this.state.cod < 500 ? "alert alert-warning alert-dismissible":""
                                                    ||this.state.cod >= 500 ? "alert alert-danger alert-dismissible":"" 
                                                        }>
                                                    {this.state.msg}
                                    </div>
            <div>
           
              <form className="form-group" onSubmit={this.enviaForm.bind(this)}>
               
                <InputCustomizado
                  id="nome" 
                  type="text" 
                  name="nome" 
                  inputRef={el => this.nome = el}
                  label="Nome"
                  required={true}
                />    
                                                          
                <InputCustomizado 
                  id="pontos" 
                  type="number" 
                  name="pontos"
                  ref="pontos" 
                  inputRef={el => this.pontos = el}
                  label="Pontos"
                  required={false}
                />
                
                <InputDateCustomizado theme="datePickerTheme"
                id="inicio_vigencia" 
                label="Valido até"
                name="inicio_vigencia" 
                updateState = {this.updateState}
                value = {this.state.inicio_vigencia}
                required={false}
                />                  

                <ComboboxCustomizado
                 id="status"
                 source = {this.status}
                 label  = "Status"
                 default= "-1"
                />

                <div className="pure-control-group">                                  
                  <label></label> 
                  <button 
                    type="submit" 
                    className={`btn btn-info btn-fill btn-block btn-lg ${this.state.status ==='carregando' ?'disabled': ''}`}>
                    Cadastrar
                  </button>                                    
                </div>
              </form>             
             </div>  
                
             </div>
              
		);
    }
}