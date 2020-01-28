import React from 'react';
import { mount } from 'enzyme';
import { Form } from '../components/categories/Form';
import enzymeConfig from '../enzymeConfig';
import { shallow } from "enzyme";

describe('<Form>', function() {

    it("Should render form", () => {
      const wrapper = mount(<Form />);
      const list = wrapper.find('.form-group');
      console.log(wrapper.debug());
      expect(list.length).toBe(1);
    });

    it('Should add category with correct name', function(){
      const component = mount(<Form />);
      const input = component.find('input').at(0);
      input.instance().value = 'Example Category';
      input.simulate('change');
      expect(component.state().name).toEqual('Example Category');
    })



})
