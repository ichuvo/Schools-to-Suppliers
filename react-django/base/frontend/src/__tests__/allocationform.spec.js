import React from "react";
import { shallow } from "enzyme";
import { Form } from "../components/allocations/Form";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import store from "../store";
import checkPropTypes from "check-prop-types";
import "../setupTests";
import renderer from 'react-test-renderer';
import { createMessage, returnErrors } from "../actions/messages";


export const checkProps = (component, expectedProps) => {
  const propsErr = checkPropTypes(
    component.propTypes,
    expectedProps,
    "props",
    component.name
  );
  return propsErr;
};

describe("Form component", () => {
  describe("Checking PropTypes", () => {
    it("Should not throw a warning", () => {
      const expectedProps = {
        users: [],
        products: [],
        groups: []
      };
      const PropsError = checkProps(Form, expectedProps);
      expect(PropsError).toBeUndefined();
    });
  });

  describe("Form render", () => {

    let wrapper;
    let mockFunc;
    beforeEach(() => {
      mockFunc = jest.fn();
      const props = {
        create: mockFunc
      };
      wrapper = shallow(<Form {...props} />);
    });

    it("Should render form", () => {
      const list = wrapper.find(".form-group");
      console.log(wrapper.debug());
      expect(list.length).toBe(8);
    });

    it("Should add quantity correctly on single allocation", () => {
      const input = wrapper.find("input[name='quantity']").at(0);
      input.simulate("change", { target: { name: "quantity", value: 50 } });
      expect(wrapper.state("quantity")).toEqual(50);
    });

    it("Should not add quantity of single allocation if not number", () => {
      const input = wrapper.find("input[name='quantity']").at(0);
      input.simulate("change", { target: { name: "quantity", value: "50" } });
      expect(typeof wrapper.state("quantity")).not.toBe("number")
    });

    it("Should add quantity correctly on group allocation", () => {
      const input = wrapper.find("input[name='quantity']").at(0);
      input.simulate("change", { target: { name: "quantity", value: 50 } });
      expect(wrapper.state("quantity")).toEqual(50);
    });

    it("Should not add quantity of group allocation if not number", () => {
      const input = wrapper.find("input[name='quantity']").at(1);
      input.simulate("change", { target: { name: "quantity", value: "50" } });
      expect(typeof wrapper.state("quantity")).not.toBe("number")
    });

    it("Should add message on single allocation correctly", () => {
      const input = wrapper.find("input[name='message']").at(0);
      input.simulate("change", { target: { name: "message", value: "example message of allocation..." } });
      expect(wrapper.state("message")).toEqual("example message of allocation...");
    });

    it("Should add message on group allocation correctly", () => {
      const input = wrapper.find("input[name='message']").at(1);
      input.simulate("change", { target: { name: "message", value: "example message of allocation..." } });
      expect(wrapper.state("message")).toEqual("example message of allocation...");
    });


  });
});
