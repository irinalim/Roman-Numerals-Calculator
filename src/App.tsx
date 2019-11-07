import React, {Component} from 'react';
import Button from 'antd/es/button';
import {Input} from 'antd';
import { Row, Col } from 'antd';
import {Card} from 'antd';
import './App.css';

class App extends Component {
    state = {
        roman1: '',
        roman2: '',
        operation: '+',
        result: '',
    }


    handlePlus = () => {
        this.setState(() => (
                {
                    operation: '+',
                }
            )
        )
    }

    handleMinus = () => {
        this.setState(() => (
                {
                    operation: '-',
                }
            )
        )
    }

    handleMultiply = () => {
        this.setState(() => (
                {
                    operation: '*',
                }
            )
        )
    }

    handleChangeOne = (e: React.ChangeEvent<HTMLInputElement>) => {
        const roman1 = e.target.value.trim().toUpperCase()
        this.setState(() => ({
            roman1
        }))
    }

    handleChangeTwo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const roman2 = e.target.value.trim().toUpperCase()

        this.setState(() => ({
            roman2
        }))
    }

    handleSubmit = (e: any) => {
        let result: any
        e.preventDefault()
        const {roman1, roman2, operation} = this.state
      let number1 = this.romanToInt(roman1)
      let number2 = this.romanToInt(roman2)
      console.log(number2, number1)

        // swith(operation) {
        //     case 'add':
        //         result = this.romanToInt(roman1) + this.romanToInt(roman2);
        //     case 'subtract':
        //         result = this.romanToInt(roman1) - this.romanToInt(roman2);
        //
        // }
        if (operation === '+') {
            result = number1 + number2;
        } else if (operation === '-') {
          if (number1 < number2) {
            result = 'Negative'
          } else {
            result = number1 - number2;
          }
        } else if (operation === '*') {
            result = number1 * number2;
        }
        this.setState(() => ({
            result: result
        }))
    }

    clear = (e:React.SyntheticEvent) => {
        e.preventDefault()
        this.setState(() => (
                {
                    roman1: '',
                    roman2: '',
                    operation: '+',
                    result: '',
                }
            )
        )
    }



    isValidRoman(str: string){
      let validRomanNumerals = ["M", "D", "C", "L", "X", "V", "I"]
    }

    romanToInt(roman: string) {
        let num = this.letterToInt(roman.charAt(0));
        let previous, current;

        for (let i = 1; i < roman.length; i++) {
            current = this.letterToInt(roman.charAt(i));
            previous = this.letterToInt(roman.charAt(i - 1));
            if (current <= previous) {
                num += current;
            } else {
                num = num - previous * 2 + current;
            }
        }

        return num;
    }

    letterToInt(letter: string) {
      // var romans: object = {
      //   I: 1,
      //   V: 5,
      //   X: 10,
      //   L: 50,
      //   C: 100,
      //   D: 500,
      //   M: 1000,
      // }
      // return romans[letter]
        switch (letter) {
            case 'I':
                return 1;
            case 'V':
                return 5;
            case 'X':
                return 10;
            case 'L':
                return 50;
            case 'C':
                return 100;
            case 'D':
                return 500;
            case 'M':
                return 1000;
            default:
                return 0;
        }
    }

    // numberToRoman(num: number) {
    //   let digits = String(+num).split(""),
    //       key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
    //         "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
    //         "","I","II","III","IV","V","VI","VII","VIII","IX"],
    //       roman_num = "",
    //       i = 3;
    //   while (i--)
    //     roman_num = (key[+digits.pop() + (i * 10)] || "") + roman_num;
    //   return Array(+digits.join("") + 1).join("M") + roman_num;
    // }

    render() {
        const {roman1, roman2, operation} = this.state
        return (
            <div className="App">
                <section>
                    <div>
                        <Card
                            title="Roman numerals calculator"
                            style={{width: 500, margin: '0 auto'}}
                            headStyle={{background: "#40a9ff"}}
                        >
                            <form onSubmit={this.handleSubmit}>
                                <div className="input">
                                  <Row type="flex" justify="center">
                                    <Col span={6} style={{justifyContent: 'center'}}>
                                      <Input size="large" placeholder="Enter a number" type="text"
                                             value={roman1}
                                             onChange={this.handleChangeOne}/>
                                    </Col>
                                    <Col span={2}>
                                      <h2>{operation}</h2>
                                    </Col>
                                    <Col span={6}>
                                      <Input size="large" placeholder="Enter a number" type="text"
                                             value={roman2}
                                             onChange={this.handleChangeTwo}/>
                                    </Col>
                                  </Row>



                                    {this.state.result !== ''
                                        ? <div className='answer'>
                                            <h2>=</h2>
                                            <h2>{this.state.result}</h2>
                                        </div>
                                        : <div className='answer'/>}

                                </div>
                                <div className='operators'>
                                    <div className='operator' onClick={this.handlePlus}>
                                        <h3>+</h3>
                                    </div>
                                    <div className='operator' onClick={this.handleMinus}>
                                        <h3>-</h3>
                                    </div>
                                    <div className='operator' onClick={this.handleMultiply}>
                                        <h3>*</h3>
                                    </div>
                                </div>
                                <div className="buttons">
                                  <Button
                                      size='large'
                                      onClick={this.clear}
                                  >
                                    Clear
                                  </Button>
                                  <Button
                                      type='primary'
                                      size='large'
                                      htmlType='submit'
                                      disabled={!roman1 || !roman2}
                                  >
                                    Calculate
                                  </Button>
                                </div>
                            </form>
                        </Card>
                    </div>
                </section>

            </div>
        );
    }
}

export default App;