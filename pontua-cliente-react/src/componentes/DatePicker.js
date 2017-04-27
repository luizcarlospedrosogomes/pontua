import React, { Component } from 'react';
import moment from 'moment';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const overlayStyle = {
  position: 'absolute',
  background: 'white',
  boxShadow: '0 2px 5px rgba(0, 0, 0, .15)',
};
// Translate month names
const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio',
  'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro',
  'Dezembro'];

// Translate weekdays header
const WEEKDAYS_SHORT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

// Translate weekdays header titles
const WEEKDAYS_LONG = ['Domingo', 'Segunda', 'Terça',  'Quarta', 'Quinta', 'Sexta', 'Sabado'];

// Translate for aria-label attribute
const LABELS = {
  nextMonth: 'Proximo mes',
  previousMonth: 'Mes atual',
};

export default class DatePicker extends Component {

  state = {
    showOverlay: false,
    value: '',
    selectedDay: null,
  };

  componentWillUnmount() {
    clearTimeout(this.clickTimeout);
  }

  input = null;
  daypicker = null;
  clickedInside = false;
  clickTimeout = null;

  handleContainerMouseDown = () => {
    this.clickedInside = true;
    // The input's onBlur method is called from a queue right after onMouseDown event.
    // setTimeout adds another callback in the queue, but is called later than onBlur event
    this.clickTimeout = setTimeout(() => {
      this.clickedInside = false;
    }, 0);
  }

  handleInputFocus = () => {
    this.setState({
      showOverlay: true,
    });
  }

  handleInputBlur = () => {
    const showOverlay = this.clickedInside;

    this.setState({
      showOverlay,
    });

    // Force input's focus if blur event was caused by clicking on the calendar
    if (showOverlay) {
      this.input.focus();
    }
  }

  handleInputChange = (e) => {
    const { value } = e.target;
    const momentDay = moment(value, 'L', true);
    if (momentDay.isValid()) {
      console.log(value);
      this.setState({
        selectedDay: momentDay.toDate(),
        value,
        
      }, () => {
         console.log("erro datapicker ");
        this.daypicker.showMonth(this.state.selectedDay);
      });
    } else {
      this.setState({ value, selectedDay: null });
    }
  }


  handleDayClick = (day) => {
    this.setState({
      value: moment(day).format('L'),
      selectedDay: day,
      showOverlay: false,
    });
    this.input.blur();
  }

  render() {
    console.log("datep")
    return (
      <div onMouseDown={ this.handleContainerMouseDown }>
        <div className="pure-control-group">
             <label htmlFor={this.props.id}>{this.props.label}</label> 
            <input
              type="text"
              id={this.props.id}
              ref={ (el) => { this.input = el; } }
              placeholder="30/07/1990"
              name={this.props.name}
              value={this.state.value }
              onChange={ this.handleInputChange }
              onFocus={ this.handleInputFocus }
              onBlur={ this.handleInputBlur }
             // onChange={this.props.onChange}
            />
        </div>
         { this.state.showOverlay &&
          <div style={ { position: 'relative' } }>
            <div style={ overlayStyle }>
              <DayPicker
                locale="pt-br"
                months={ MONTHS }
                weekdaysLong={ WEEKDAYS_LONG }
                weekdaysShort={ WEEKDAYS_SHORT }
                firstDayOfWeek={ 0 }
                labels={ LABELS }
                modifiers={ { sunday: day => day.getDay() === 0 } }
                ref={ (el) => { this.daypicker = el; } }
                initialMonth={ this.state.selectedDay || undefined }
                onDayClick={ this.handleDayClick }
                selectedDays={ this.state.selectedDay }
              />
            </div>
          </div>
        }
      </div>
    );
  }
}