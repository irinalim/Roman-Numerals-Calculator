import React, {Component} from 'react';
import {Row, Col, Input, Card, Icon, message, Button, Form} from 'antd';
import './App.css';
import {RomanNumsProcessor} from "./logic/RomanNumsProcessor";

class App extends Component {
    protected readonly logic = new RomanNumsProcessor();
    state = {
        roman1: '',
        roman2: '',
        operation: '+',
        result: '',
        roman1Error: '',
        roman2Error: '',
    };

    protected handleOperation(operation: string) {
        this.setState(() => ({operation}));
    }

    protected handlePlus = () => {
        this.handleOperation('+');
    };

    protected handleMinus = () => {
        this.handleOperation('-');
    };

    protected handleMultiply = () => {
        this.handleOperation('*');
    };

    protected getIconType = (operation: string) => {
        switch (operation) {
            case '+':
                return 'plus';
            case '-':
                return 'minus';
            case '*':
                return 'close';
        }
        return '';
    };

    protected handleChangeOne = (e: React.ChangeEvent<HTMLInputElement>) => {
        const roman1 = e.target.value.trim().toUpperCase().replace(/\[A-Z]/g, '');
        let roman1Error = '';
        if (!this.logic.isValidRoman(roman1)) {
            roman1Error = 'Invalid input';
        }
        this.setState(() => ({
            roman1,
            roman1Error,
        }));
    };

    protected handleChangeTwo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const roman2 = e.target.value.trim().toUpperCase().replace(/\[A-Z]/g, '');
        let roman2Error = '';
        if (!this.logic.isValidRoman(roman2)) {
            roman2Error = 'Invalid input';
        }

        this.setState(() => ({
            roman2,
            roman2Error,
        }));
    };

    protected handleSubmit = (e: React.SyntheticEvent) => {
        let result: any;
        e.preventDefault();
        const {roman1, roman2, operation} = this.state;
        let number1 = this.logic.convertRomanToArabic(roman1);
        let number2 = this.logic.convertRomanToArabic(roman2);
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
            result = 'Invalid';
            message.warning('Result can not be negative or zero');
        }
        this.setState(() => ({
            result: this.logic.convertArabicToRoman(result)
        }));
    };

    protected clear = (e: React.SyntheticEvent) => {
        e.preventDefault();
        this.setState(() => ({
            roman1: '',
            roman2: '',
            operation: '+',
            result: '',
            roman1Error: '',
            roman2Error: '',
        }));
    };


    render() {
        const {roman1, roman2, operation, roman1Error, roman2Error} = this.state;
        const isCalculateDisabled = !roman1 || !roman2 || !!roman1Error || !!roman2Error;
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
                                            <Form.Item
                                                validateStatus={roman1Error ? 'error' : undefined}
                                                help={roman1Error}>
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
                                            <Form.Item
                                                validateStatus={roman2Error ? 'error' : undefined}
                                                help={roman2Error}>
                                                <Input size="large" placeholder="Enter a number" type="text"
                                                       value={roman2}
                                                       onChange={this.handleChangeTwo}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <div className='answer'>
                                        {this.state.result !== ''
                                            ? <React.Fragment>
                                                <h2>=</h2>
                                                <h2>{this.state.result}</h2>
                                            </React.Fragment>
                                            : null
                                        }
                                    </div>
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
                                        disabled={!roman1 && !roman2}
                                    >
                                        Clear
                                    </Button>
                                    <Button
                                        type='primary'
                                        size='large'
                                        htmlType='submit'
                                        disabled={isCalculateDisabled}
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