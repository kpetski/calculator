import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayValue: '0'
    }
    this.inputDigit = this.inputDigit.bind(this)
  }

  //Handle input button click
  inputDigit(digit) {
    const displayValue = this.state.displayValue
    console.log(digit + ' button clicked')
    this.setState({
      displayValue: displayValue === '0' ? String(digit) : displayValue + String(digit)
    })
  }

  //Handle decimal point click
  inputDot() {
    const displayValue = this.state.displayValue
    //only add if number doesn't already have a decimal point
    if (displayValue.indexOf('.') === -1) {
      this.setState({
        displayValue: displayValue + '.'
      })
    }
  }

  render() {
    return (
      <div id="wrapper">
        <div className="calculator">
          <div className="calculator-display">{this.state.displayValue}</div>
          <div className="calculator-keypad">
            <div className="input-keys">
              <div className="function-keys">
                <button className="calculator-key key-clear">AC</button>
                <button className="calculator-key key-sign">±</button>
                <button className="calculator-key key-percent">%</button>
              </div>
              <div className="digit-keys">
                <button className="calculator-key key-0" onClick={() => this.inputDigit(0)}>0</button>
                <button className="calculator-key key-dot" onClick={() => this.inputDot()}>●</button>
                <button className="calculator-key key-1" onClick={() => this.inputDigit(1)}>1</button>
                <button className="calculator-key key-2" onClick={() => this.inputDigit(2)}>2</button>
                <button className="calculator-key key-3" onClick={() => this.inputDigit(3)}>3</button>
                <button className="calculator-key key-4" onClick={() => this.inputDigit(4)}>4</button>
                <button className="calculator-key key-5" onClick={() => this.inputDigit(5)}>5</button>
                <button className="calculator-key key-6" onClick={() => this.inputDigit(6)}>6</button>
                <button className="calculator-key key-7" onClick={() => this.inputDigit(7)}>7</button>
                <button className="calculator-key key-8" onClick={() => this.inputDigit(8)}>8</button>
                <button className="calculator-key key-9" onClick={() => this.inputDigit(9)}>9</button>
              </div>
            </div>
            <div className="operator-keys">
              <button className="calculator-key key-divide">÷</button>
              <button className="calculator-key key-multiply">×</button>
              <button className="calculator-key key-subtract">−</button>
              <button className="calculator-key key-add">+</button>
              <button className="calculator-key key-equals">=</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
