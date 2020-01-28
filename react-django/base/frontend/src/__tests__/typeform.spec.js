import React from 'react';
import { mount } from 'enzyme';
import { Form } from '../components/types/Form';
import enzymeConfig from '../enzymeConfig';
import { shallow } from "enzyme";
import checkPropTypes from "check-prop-types";

export const checkProps = (component, expectedProps) => {
  const propsErr = checkPropTypes(
    component.propTypes,
    expectedProps,
    "props",
    component.name
  );
  return propsErr;
};


describe('<Form>', function() {
    it("Should have passed correct PropTypes", () => {
      const expectedProps = {
        addType: () => {}
      };
      const PropsError = checkProps(Form, expectedProps);
      expect(PropsError).toBeUndefined();
    });
    it("Should render form", () => {
      const wrapper = mount(<Form />);
      const list = wrapper.find('.form-group');
      console.log(wrapper.debug());
      expect(list.length).toBe(1);
    });

    it('Should add category with correct name', function(){
      const component = mount(<Form />);
      const input = component.find('input').at(0);
      input.instance().value = 'Example Type';
      input.simulate('change');
      expect(component.state().name).toEqual('Example Type');
    })

})
