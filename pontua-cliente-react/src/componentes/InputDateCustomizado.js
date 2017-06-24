import DatePicker from 'react-toolbox/lib/date_picker/DatePicker';
import React, { Component } from 'react';
import '../assets/react-toolbox/theme.css';
import theme from '../assets/react-toolbox/theme.js';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import datePickerTheme from '../assets/react-toolbox/theme.css';
const datetime = new Date(2015, 10, 16);
//const min_datetime = new Date(new Date(datetime).setDate(8));
datetime.setHours(17);
datetime.setMinutes(28);

const localeExample = {
  months: 'janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro'.split('_'),
  monthsShort: 'jan._fev._mar.abr._mai._jun._jul._ago._set._out._nov._dez.'.split('_'),
  weekdays: 'domingo_segunda_terça_quarta_quinta_sexta_sabado'.split('_'),
  weekdaysShort: 'dom._seg._ter._qua._qui._sex._sab.'.split('_'),
  weekdaysLetter: 'dom_seg_ter_qua_qui_sex_sab'.split('_')
}
export default  class InputDateCustomizado extends Component{
    constructor(props) {
        super(props);
        this.state = {msg: '', date1:''}
       
    }
    
    handleChange = (item, value) => {
        var data= {};
        this.setState({date1: value});
        let month  = String(value.getMonth() + 1);
        let day    = String(value.getDate());
        const year = String(value.getFullYear());
        let hh     = String(value.getHours());
        let mm     = String(value.getMinutes());
        let ss     = String(value.getSeconds());

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        if (hh.length < 2) hh = '0' + hh;
        if (mm.length < 2) mm = '0' + mm;
        if (ss.length < 2) ss = '0' + ss;

        let data_datetime  =`${year}-${month}-${day}T${hh}:${mm}:${ss}`;
        let data_formatada = `${day}/${month}/${year}`;

        console.log("data formatada"+ data_formatada)
        console.log("data datetime"+ data_datetime)
      
        this.props.updateState(data= {dataBR: data_formatada,dataDateTime:data_datetime ,item: this.props.id});
    };
  
   
  render() {
    return (
        <ThemeProvider  theme={theme}>
        <div >
        
            <label htmlFor={this.props.id}>{this.props.label}</label>
             <DatePicker 
                theme={datePickerTheme}                
                id       = {this.props.label}
                label    = {this.props.label}
                locale   = {localeExample}                
                name     = {this.props.name}
			    required = {this.props.required}
                onChange = {this.handleChange.bind(this, 'date1')}
                value    = {this.state.date1}
                placeholder="15/05/2017"
              />
       
        </div>
        </ThemeProvider>
        );
    }
}