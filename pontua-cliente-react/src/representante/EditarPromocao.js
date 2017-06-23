import React, { Component } from 'react';
import '../assets/react-toolbox/theme.css';
import theme from '../assets/react-toolbox/theme.js';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import PubSub from 'pubsub-js';

//CSS

//COMPONENTES
import InputCustomizado from '../componentes/InputCustomizado';

import ComboboxCustomizado from '../componentes/ComboboxCustomizado';
export default  class EditarPromocao extends Component{
  
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
        this.state = {msg: ''
                     , validade:''
                     , nome:'carregando..'
                     , status:''
                     , pontos:'carregando..'}    
        this.setNome = this.setNome.bind(this);     
        this.setStatus = this.setStatus.bind(this); 
        this.setPontos = this.setPontos.bind(this); 
        this.setValidade = this.setValidade.bind(this); 
    }
    componentWillMount(){
        this.pegarPromocao();
        PubSub.subscribe('valor-combo',function(topico,valor){
            this.setState({status:valor})
        }.bind(this));
    }
    pegarPromocao(){
      console.log("ENVIANDO: " + this.token);      
      console.log("SERVIDOR: " + this.host);
      console.log("URL: "+this.baseUrl+"/representante/promo/"+this.props.id);
      console.log("VERBO: GET")
      
      const requestInfo = {
            method:'GET',
            dataType: 'json',
            headers: {'authorization': this.token},
            
        };

        fetch(this.host+this.baseUrl+"/representante/promo/"+parseInt(this.props.match.params.id, 10), requestInfo)
        .then(response =>{
            if(response.status === 200 || response.status === 201){
              console.log("RESPOSTA DO SERVIDOR, 201, AUTOTIZADO");
              return response.json();
            }if(response.status === 401){
              console.log("NAO AUTORIZADO! DIRECIONANDO PARA PAGINA DE LOGIN");
              this.props.history.push('/logout/representante');
            }else{
              console.log("NAO FOI POSSIVEL OBTER A PROMOÇÃO");
                throw new Error('Não foi possivel obter a promocao.');
            }
        })
        .then(promocao =>{
          console.log("DADOS: cabecalho " +Object.keys(promocao)+" valores "+Object.values(promocao));
          this.setState({status:promocao.status
                        , nome:promocao.nome
                        , pontos:promocao.quantidade_pontos
                        , validade:promocao.validade
                    })
        })
        .catch(error => {
            this.setState({msg:error.message});
        });

    }
    updateState = (data)  =>{
     
        let month  = String(data.date.getMonth() + 1);
        let day    = String(data.date.getDate());
        const year = String(data.date.getFullYear());
        let hh    = String(data.date.getHours());
        let mm    = String(data.date.getMinutes());
        let ss    = String(data.date.getSeconds());

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        if (hh.length < 2) hh = '0' + hh;
        if (mm.length < 2) mm = '0' + mm;
        if (ss.length < 2) ss = '0' + ss;

        let data_datetime  =`${year}-${month}-${day}T${hh}:${mm}:${ss}`;
        let data_formatada = `${day}/${month}/${year}`;

        console.log("data formatada"+ data_formatada)
        console.log("data datetime"+ data_datetime)
 
        if(data.item === 'inicio_vigencia'){
            this.setState({validade: data_datetime})
        }
    }
    enviaForm(evento){
        evento.preventDefault(); 
        console.log(this.token);
      
        const requestInfo = {
            method:'PUT',
            body:JSON.stringify({ id: +parseInt(this.props.match.params.id,10)
                                ,  token:this.token
                                , nome:this.state.nome
                                , representante: this.emailRepresentante
                                , quantidade_pontos: parseInt(this.state.pontos,10)
                                , validade: this.state.validade
                                , status:  parseInt(this.state.status,10)
                            }),
            headers:{'content-type'  : 'application/json'
                   , 'Authorization': this.token
                     }
        };
        console.log("SERVDOR: "+this.host);
        console.log("URL: /"+this.baseUrl+"/representante/promo/"+parseInt(this.props.match.params.id, 10));
        console.log("ENVIANDO DADOS: "+requestInfo.body);
        console.log("VERBO: PUT")

        fetch(this.host+this.baseUrl+"/representante/promo/"+parseInt(this.props.match.params.id,10),requestInfo)            
            .then(response =>{
            if(response.status === 200 || response.status === 201){
                console.log("promoção editada com sucesso");
                this.props.history.push('/promocao/cadastrar');
                return response.text();
            }
            if(response.status === 401){
              this.props.history.push('/logout/representante');
            }
            if(response.status === 400){
              throw new Error('Verifique os campos');
            }
            else{
                throw new Error('erro: '+ response.status+' nao foi possivel editar promoção');
            }
        }).catch(error => {
            this.setState({msg:error.message});
        });
    }

    setNome(evento){
      this.setState({nome:evento.target.value});
    }
    
    setStatus(evento){
      this.setState({status:evento.target.value});
    }
    setPontos(evento){
      this.setState({pontos:evento.target.value});
    }
    setValidade(evento){
      this.setState({validade:evento.target.value});
    }
    
    
    
    render() {
		return (
        <ThemeProvider  theme={theme}>
          <div>
            <h3>Editando promocao</h3>           
           <span>{this.state.msg}</span>
            <div>
           
              <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm.bind(this)}>
                <InputCustomizado
                  id="nome" 
                  type="text" 
                  name="nome" 
                  //inputRef={el => this.nome = el}
                  label="Nome"
                  required={true}
                  value = {this.state.nome}
                  onChange={this.setNome} 
                />                                     
                <InputCustomizado 
                  id="pontos" 
                  type="text" 
                  name="pontos"
                  ref="pontos" 
                  //inputRef={el => this.pontos = el}
                  label="Pontos"
                  required={false}
                  value = {this.state.pontos}
                  onChange={this.setPontos}
                />
                
                <InputCustomizado 
                id="inicio_vigencia" 
                label="Valido até"
                name="inicio_vigencia" 
                updateState = {this.updateState}
                value = {this.state.validade}
                required={false}
                onChange={this.setValidade}
               // value = {this.state.inicio_vigencia}
                />                  

                <ComboboxCustomizado
                 source = {this.status}
                 label  = "Status"
                 default= {this.state.status}
                 onChange={this.setStatus}
                 value = {this.state.status}
                />
                <div className="pure-control-group">                                  
                  <label></label> 
                  <button type="submit" className="pure-button pure-button-primary">Atualizar</button>                                    
                </div>
              </form>             
             </div>  
             </div>
              </ThemeProvider>
		);
    }
}