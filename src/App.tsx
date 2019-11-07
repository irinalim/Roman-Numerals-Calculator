import React, {Component} from 'react';
import Button from 'antd/es/button';
import {Input} from 'antd';
import {Row, Col} from 'antd';
import {Card} from 'antd';
import {message} from 'antd';
import './App.css';

const romans: { [key: string]: number } = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
}

const arabicToRoman = new Map([
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
])

class App extends Component {
    state = {
        roman1: '',
        roman2: '',
        operation: '+',
        result: '',
    }


    protected handlePlus = () => {
        this.setState(() => (
                {
                    operation: '+',
                }
            )
        )
    }

    protected handleMinus = () => {
        this.setState(() => (
                {
                    operation: '-',
                }
            )
        )
    }

    protected handleMultiply = () => {
        this.setState(() => (
                {
                    operation: '*',
                }
            )
        )
    }

    protected handleChangeOne = (e: React.ChangeEvent<HTMLInputElement>) => {
        const roman1 = e.target.value.trim().toUpperCase()
        this.setState(() => ({
            roman1
        }))
    }

    protected handleChangeTwo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const roman2 = e.target.value.trim().toUpperCase()

        this.setState(() => ({
            roman2
        }))
    }

    protected handleSubmit = (e: any) => {
        let result: any
        e.preventDefault()
        const {roman1, roman2, operation} = this.state
        let number1 = this.romanToInt(roman1)
        let number2 = this.romanToInt(roman2)
        switch (operation) {
            case '+':
                result = number1 + number2;
                break;
            case '-':
                result = number1 - number2;
                break;
            case '*':
                result = number1 * number2;
                break;
        }
        if (result <= 0) {
            result = 'Invalid'
            message.warning('Result can not be negative or zero')
        }
        this.setState(() => ({
            result: this.convertNumberToRoman(result)
        }))
    }

    protected clear = (e: React.SyntheticEvent) => {
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


    protected isValidRoman(str: string) {
        let validRomanNumerals = ["M", "D", "C", "L", "X", "V", "I"]
    }

    protected romanToInt(roman: string) {
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

    protected letterToInt(letter: string) {
        return romans[letter]
    }


    protected convertNumberToRoman(num: number) {

        let ans = "";
        const keys = Array.from(arabicToRoman.keys())

        for (let i = 0; i < keys.length; i++) {
            const arabicNum = keys[i]
            const romanNum = arabicToRoman.get(arabicNum)
            if (num >= arabicNum) {
                ans += romanNum;
                num -= arabicNum;
                i--;
            }
        }
        return ans;
    }

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