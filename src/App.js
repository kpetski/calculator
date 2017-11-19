import React, { Component } from 'react';
import './App.css';

class AutoShrinkingText extends React.Component {
  state = {
    scale: 1
  }

  componentDidUpdate() {
    const { scale } = this.state

    const node = this.node
    const parentNode = node.parentNode

    const availableWidth = parentNode.offsetWidth
    const actualWidth = node.offsetWidth
    const actualScale = availableWidth / actualWidth

    if (scale === actualScale)
      return

    if (actualScale < 1) {
      this.setState({ scale: actualScale })
    } else if (scale < 1) {
      this.setState({ scale: 1 })
    }
  }

  render() {
    const { scale } = this.state

    return (
      <div
        className="auto-scaling-text"
        style={{ transform: `scale(${scale},${scale})` }}
        ref={node => this.node = node}
      >{this.props.children}</div>
    )
  }
}

class CalculatorDisplay extends React.Component {
  render() {
    const { value, ...props } = this.props

    const language = navigator.language || 'en-US'
    let formattedValue = parseFloat(value).toLocaleString(language, {
      useGrouping: true,
      maximumFractionDigits: 6
    })

    // Add back missing .0 in e.g. 12.0
    const match = value.match(/\.\d*?(0*)$/)

    if (match)
      formattedValue += (/[1-9]/).test(match[0]) ? match[1] : match[0]

    return (
      <div {...props} className="calculator-display">
        <AutoShrinkingText>{formattedValue}</AutoShrinkingText>
      </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayValue: '0',
      value: null,
      waitingForOperand: false,
      operator: null
    }
  }

  //Handle input button click
  inputDigit(digit) {
    const { displayValue, waitingForOperand } = this.state

    if (waitingForOperand) {
      this.setState({
        displayValue: String(digit),
        waitingForOperand: false
      })
    } else {
      this.setState({
        displayValue: displayValue === '0' ? String(digit) : displayValue + String(digit)
      })
    }
  }

  //Handle decimal point click
  inputDot() {
    const { displayValue, waitingForOperand } = this.state

    if (waitingForOperand) {
      console.log('waiting for operand')
      this.setState({
        displayValue: '.',
        waitingForOperand: false
      })
    } else {
      //only add if number doesn't already have a decimal point
      if (displayValue.indexOf('.') === -1) {
        console.log('not waiting for operand')
        this.setState({
          displayValue: displayValue + '.',
          waitingForOperand: false
        })
      }
    }
  }

  clearDisplay() {
    this.setState({
      displayValue: '0',
      waitingForOperand: false, 
      operator: null, 
      value: null
    })
  }

  toggleSign() {
    const displayValue = this.state.displayValue
    this.setState({
      displayValue: displayValue.charAt(0) === '-' ? displayValue.substr(1) : '-' + displayValue
    })
  }

  clickPercent() {
    const displayValue = this.state.displayValue
    const value = parseFloat(displayValue)

    this.setState({
      displayValue: String(value / 100)
    })
  }

  performOperation(nextOperator) {
    const { displayValue, value, operator } = this.state

    const nextValue = parseFloat(displayValue)

    const operations = {
      '/': (prevValue, nextValue) => prevValue / nextValue ,
      '*': (prevValue, nextValue) => prevValue * nextValue ,
      '-': (prevValue, nextValue) => prevValue - nextValue ,
      '+': (prevValue, nextValue) => prevValue + nextValue ,
      '=': (prevValue, nextValue) => nextValue
    }

    if (value == null) {
      this.setState({
        value: nextValue
      })
    } else if (operator) {
      const currentValue = value || 0
      const newValue = operations[operator](currentValue, nextValue)

      this.setState({
        value: newValue,
        displayValue: String(newValue)
      })
    }

    this.setState({
      waitingForOperand: true,
      operator: nextOperator
    })
  }

  



  render() {
    console.log(this.state)
    return (
      <div id="wrapper">
        <div className="calculator">
        <CalculatorDisplay value={this.state.displayValue}/>
         <div className="calculator-keypad">
            <div className="input-keys">
              <div className="function-keys">
                <button className="calculator-key key-clear" onClick={() => this.clearDisplay()}>{this.state.displayValue === '0' ? 'AC' : 'C'}</button>
                <button className="calculator-key key-sign" onClick={() => this.toggleSign()}>±</button>
                <button className="calculator-key key-percent" onClick={() => this.clickPercent()}>%</button>
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
              <button className="calculator-key key-divide" onClick={() => this.performOperation('/')}>÷</button>
              <button className="calculator-key key-multiply" onClick={() => this.performOperation('*')}>×</button>
              <button className="calculator-key key-subtract" onClick={() => this.performOperation('-')}>−</button>
              <button className="calculator-key key-add" onClick={() => this.performOperation('+')}>+</button>
              <button className="calculator-key key-equals" onClick={() => this.performOperation('=')}>=</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
