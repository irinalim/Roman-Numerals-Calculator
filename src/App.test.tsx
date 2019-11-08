import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import renderer from 'react-test-renderer';

describe("app", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it("handleInput", () => {
    const component = renderer.create(<App/>);
    const instance = component.getInstance() as any;
    instance.handleChangeOne({target: {value: "VI"}});
    expect(instance.state.roman1).toEqual("VI");
    expect(instance.state.roman1Error).toEqual("");
    instance.handleChangeTwo({target: {value: "X"}});
    expect(instance.state.roman2).toEqual("X");
    expect(instance.state.roman2Error).toEqual("");
  });

  it("handleOperation", () => {
    const component = renderer.create(<App/>);
    const instance = component.getInstance() as any;
    instance.handlePlus();
    expect(instance.state.operation).toEqual("+");
    instance.handleMinus();
    expect(instance.state.operation).toEqual("-");
    instance.handleMultiply();
    expect(instance.state.operation).toEqual("*");
  });
  it("handleSubmit", () => {
    const component = renderer.create(<App/>);
    const instance = component.getInstance() as any;
    instance.handleChangeOne({target: {value: "XI"}});
    instance.handleChangeTwo({target: {value: "V"}});
    instance.handleSubmit({preventDefault: () => {}});
    expect(instance.state.result).toEqual("XVI");
  });
  it("clear", () => {
    const component = renderer.create(<App/>);
    const instance = component.getInstance() as any;
    instance.handleChangeOne({target: {value: "XI"}});
    expect(instance.state.roman1).toEqual("XI");
    instance.clear({preventDefault: () => {}});
    expect(instance.state.roman1).toEqual("");
  });
});

