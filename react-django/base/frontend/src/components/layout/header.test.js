import React, { Component } from "react";
import { shallow } from "enzyme";
import { Header } from "./Header";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import checkPropTypes from "check-prop-types";
import "../../setupTests";

export const checkProps = (component, expectedProps) => {
  const propsErr = checkPropTypes(
    component.propTypes,
    expectedProps,
    "props",
    component.name
  );
  return propsErr;
};

const setUp = (props = {}) => {
  const component = shallow(<Header {...props} />);
  return component;
};

describe("Header Component", () => {
  describe("Checking PropTypes", () => {
    it("Should not throw a warning", () => {
      const expectedProps = {
        auth: { type: Object },
        logout: () => {}
      };
      const PropsError = checkProps(Header, expectedProps);
      expect(PropsError).toBeUndefined();
    });
  });
  describe("It should render", () => {
    let wrapper;
    let mockFunc;
    beforeEach(() => {
      mockFunc = jest.fn();
      const props = {
        auth: { type: Object },
        logout: mockFunc
      };
      wrapper = shallow(<Header {...props} />);
    });
    it("Should render header", () => {
      const list = wrapper.find(".navbar");
      expect(list.length).toBe(1);
    });
  });
});
