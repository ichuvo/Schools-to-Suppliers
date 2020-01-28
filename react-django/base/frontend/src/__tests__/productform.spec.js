import React from "react";
import { shallow } from "enzyme";
import { Form } from "../components/products/Form";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { create } from "../actions/products";
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
        addProduct: () => {},
        types: [],
        categories: []
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
      expect(list.length).toBe(10);
    });

    it("Should add new product name correctly", () => {
      const input = wrapper.find("input[name='name']");
      input.simulate("change", { target: { name: "name", value: "Example Product" } });
      expect(wrapper.state("name")).toEqual("Example Product");
    });

    it("Should add new product description correctly", () => {
      const input = wrapper.find("input[name='description']");
      input.simulate("change", { target: { name: "description", value: "example description of product..." } });
      expect(wrapper.state("description")).toEqual("example description of product...");
    });

    it("Should add new product description correctly", () => {
      const input = wrapper.find("input[name='description']");
      input.simulate("change", { target: { name: "description", value: "example description of product..." } });
      expect(wrapper.state("description")).toEqual("example description of product...");
    });

    it("Should add price of new product correctly if number", () => {
      const input = wrapper.find("input[name='price']");
      input.simulate("change", { target: { name: "price", value: 36.50 } });
      expect(wrapper.state("price")).toEqual(36.50);
    });

    it("Should not accept a text price", () => {
      const input = wrapper.find("input[name='price']")
      input.simulate("change", { target: { name: "price", value: "abc" } });
      expect(typeof wrapper.state("contact_number")).not.toBe("number")
    });

    it("Should add brand of new product correctly", () => {
      const input = wrapper.find("input[name='brand']");
      input.simulate("change", { target: { name: "brand", value: "Example brand" } });
      expect(wrapper.state("brand")).toEqual('Example brand');
    });

    it("Should add quantity of new product correctly if number", () => {
      const input = wrapper.find("input[name='quantity']");
      input.simulate("change", { target: { name: "quantity", value: 50 } });
      expect(wrapper.state("quantity")).toEqual(50);
    });

    it("Should not add quantity of new product correctly if not number", () => {
      const input = wrapper.find("input[name='quantity']");
      input.simulate("change", { target: { name: "quantity", value: "50" } });
      expect(typeof wrapper.state("quantity")).not.toBe("number")
    });


  });
});
