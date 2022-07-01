import React from "react";
import App from "./Counter";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new EnzymeAdapter() });

//setup func will return wrapper
const setup = () => shallow(<App />);

//wrapper find
const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`);

test("render app without errors", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app"); // checking if the commpo exist
  console.log("appComponent: ", appComponent);
  expect(appComponent.length).toBe(1);
});

test("render counter display", () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, "counter-display"); // checking if counter dispplay exist
  expect(counterDisplay.length).toBe(1);
});

test("render increment button", () => {
  const wrapper = setup();
  const incrementButton = findByTestAttr(wrapper, "increment-button"); //
  expect(incrementButton.length).toBe(1);
});

test("check to see if counter starts from 0", () => {
  const wrapper = setup();
  const count = findByTestAttr(wrapper, "count").text(); //
  expect(count).toBe("0");
});

test("check if counter is incrementing bt 1", () => {
  const wrapper = setup();
  const incrementButton = findByTestAttr(wrapper, "increment-button");
  incrementButton.simulate("click");
  const count = findByTestAttr(wrapper, "count").text();
  expect(count).toBe("1");
});

test("render decrement button", () => {
  const wrapper = setup();
  const decrementButton = findByTestAttr(wrapper, "decrement-button"); //
  expect(decrementButton.length).toBe(1);
});

test("check if counter is decrementing by 1 but not below 0", () => {
  const wrapper = setup();

  const incrementButton = findByTestAttr(wrapper, "increment-button");
  incrementButton.simulate("click");

  const decrementButton = findByTestAttr(wrapper, "decrement-button");
  decrementButton.simulate("click");

  const count = findByTestAttr(wrapper, "count").text();
  expect(count).toBe("0");
});

test("error does not show when not needed", () => {
  const wrapper = setup();
  const errorDiv = findByTestAttr(wrapper, "error-message");

  const errorHasHiddenClass = errorDiv.hasClass("hidden");
  expect(errorHasHiddenClass).toBe(true);
});

test("error shows", () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, "decrement-button");
  button.simulate("click");
  // check the class of the error message
  const errorDiv = findByTestAttr(wrapper, "error-message");
  const errorHasHiddenClass = errorDiv.hasClass("hidden");
  expect(errorHasHiddenClass).toBe(false);
});

test("clicking increment clears the error", () => {
  const wrapper = setup();

  // find and click the increment button
  const incButton = findByTestAttr(wrapper, "increment-button");
  incButton.simulate("click");

  // check the class of the error message
  const errorDiv = findByTestAttr(wrapper, "error-message");
  const errorHasHiddenClass = errorDiv.hasClass("hidden");
  expect(errorHasHiddenClass).toBe(true);
});

//testing input box
describe("render input box with button", () => {
  const wrapper = setup();
  test("input box show", () => {
    const inputBox = findByTestAttr(wrapper, "input-box");
    expect(inputBox.exists()).toBe(true);
  });
  test("submit button show", () => {
    const submitButton = findByTestAttr(wrapper, "submit-button");
    expect(submitButton.exists()).toBe(true);
  });
});

describe("state controlled input field", () => {
  let mockSetCurrentGuess = jest.fn();
  let wrapper;
  let origUseState;

  beforeEach(() => {
    mockSetCurrentGuess.mockClear(); //so that it wont take last test rsult
    //replacing usestate with a mock func which inturn will return gives one input and another mock func
    //we will call this mock func instead of real useState
    origUseState = React.useState;
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
    //now we will simulate input box by creating a mock event
    wrapper = setup();
  });

  afterEach(() => {
    React.useState = origUseState;
  });

  test("state updates with value of input upon change", () => {
    const inputBox = findByTestAttr(wrapper, "input-box");
    const mockEvent = { target: { value: "train" } }; //like e.target.value
    inputBox.simulate("change", mockEvent); //this line is similar to onChange event

    //now in real usestate will be called so here we will call mockFunc
    expect(mockSetCurrentGuess).toHaveBeenCalledWith("train");
  });

  test("state update with empty value on button click", () => {
    const submitButton = findByTestAttr(wrapper, "submit-button");

    submitButton.simulate("click");
    expect(mockSetCurrentGuess).toHaveBeenCalledWith("");
  });
});
