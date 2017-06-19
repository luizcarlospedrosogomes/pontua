
import DatePicker from 'react-toolbox/lib/date_picker/DatePicker';

import React, { Component } from 'react';

const datetime = new Date(2015, 10, 16);
const min_datetime = new Date(new Date(datetime).setDate(8));
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
        this.props.updateState(data= {date: value,item: this.props.id});
    };
  
   
  render() {
    return (
        <div className="pure-control-group">
            <label className ="_2WvFs"
			  		htmlFor={this.props.id}>{this.props.label}
			      </label>
             <DatePicker 
                label    = {this.props.label}
                locale   = {localeExample}                
                name     = {this.props.name}
			    required = {this.props.required}
                onChange = {this.handleChange.bind(this, 'date1')}
                value    = {this.state.date1}
              />
         </div>
        );
    }
}