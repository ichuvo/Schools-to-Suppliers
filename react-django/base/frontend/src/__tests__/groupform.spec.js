import React from 'react';
import { mount } from 'enzyme';
import { Form } from '../components/groups/Form';
import enzymeConfig from '../enzymeConfig';

describe('<Form>', function() {

    it("Should render form", () => {
      const wrapper = mount(<Form />);
      const list = wrapper.find('.form-group');
      console.log(wrapper.debug());
      expect(list.length).toBe(1);
    });

    it('Should add group with correct name', function(){
      const component = mount(<Form />);
      const input = component.find('input').at(0);
      input.instance().value = 'hello';
      input.simulate('change');
      expect(component.state().name).toEqual('hello');
    })

})
