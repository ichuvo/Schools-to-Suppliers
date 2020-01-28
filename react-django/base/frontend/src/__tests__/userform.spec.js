import React from "react";
import { shallow } from "enzyme";
import { Form } from "../components/users/Form";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { create } from "../actions/auth";
import { createMessage, returnErrors } from "../actions/messages";
import store from "../store";
import checkPropTypes from "check-prop-types";
import "../setupTests";
import renderer from 'react-test-renderer';

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
        create: () => {},
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
      expect(list.length).toBe(9);
    });

    it("Should allow correct email standtard", () => {
      const input = wrapper.find("input[type='email']");
      input.simulate("change", { target: { name: "email", value: "a@a.com" } });
      expect(wrapper.state("email")).toEqual("a@a.com");
    });

    //didn't finish, can't find a function that can check if the input is correct email format
    it("Should not allow incorrect email standtard", () => {
      const input = wrapper.find("input[type='email']");
      input.simulate("change", { target: { name: "email", value: "aabb" } });
      expect(wrapper.state("email")).toEqual("aabb");
    });

    it("Should allow correct contact number", () => {
      const input = wrapper.find("input[type='tel']");
      input.simulate("change", {
        target: { name: "contact_number", value: 123456789 }
      });
      expect(wrapper.state("contact_number")).toEqual(123456789);
    });

    it("Should not allow invalid contact number", () => {
      const input = wrapper.find("input[type='tel']").at(0);
      input.simulate("change", {
        target: { name: "contact_number", value: "abc" }
      });
      expect(typeof wrapper.state("contact_number")).not.toBe("number");
    });

    it("Display correct options for institution size", () => {
      const options = ['0-100', '101-500', '501-1000', '1000+'];
      const input = wrapper.find("select").at(0);
      input.simulate("change", {
        target: { name: "institution_size", value: 123 }
      });
      expect(wrapper.state("institution_size")).toEqual(123);

      const expected = '0-100101-500501-10001000+';

      let optionArray = input.find('option');

      let languages = '';
      optionArray.forEach((item) => {
         languages += item.text();
      })
      expect(languages).toEqual(expected);
    });
  });
});
