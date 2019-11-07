import React, {Component} from 'react';
import Button from 'antd/lib/button';
import {Input} from 'antd';
import {Row, Col} from 'antd';
import {Card, Icon} from 'antd';
import {message} from 'antd';
import './App.css';
import Form, {FormComponentProps} from "antd/lib/form";

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

interface Props extends FormComponentProps {

}

class App extends Component<Props, any> {
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

    getIconType = (operation: string) => {
        switch (operation) {
            case '+':
                return 'plus';
            case '-':
                return 'minus'
            case '*':
                return 'close'
        }
        return ''
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
                            style={{width: 500}}
                            headStyle={{background: "#40a9ff"}}
                        >
                            <form onSubmit={this.handleSubmit}>
                                <div className="input">
                                    <Row type="flex" justify="center" align="middle">
                                        <Col span={8} style={{justifyContent: 'center'}}>
                                            <Form.Item>
                                                <Input size="large" placeholder="Enter a number" type="text"
                                                       value={roman1}
                                                       onChange={this.handleChangeOne}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={2}>
                                          <Form.Item>
                                            <Icon type={this.getIconType(operation)}/>
                                          </Form.Item>
                                        </Col>
                                        <Col span={8}>
                                            <Form.Item>
                                                <Input size="large" placeholder="Enter a number" type="text"
                                                       value={roman2}
                                                       onChange={this.handleChangeTwo}/>
                                            </Form.Item>
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
                                        <Icon type="plus"/>
                                    </div>
                                    <div className='operator' onClick={this.handleMinus}>
                                        <Icon type="minus"/>
                                    </div>
                                    <div className='operator' onClick={this.handleMultiply}>
                                        <Icon type="close"/>
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

export default Form.create()(App);