import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import { EditModal } from '../components/groups/EditModal';
import { Form } from '../components/groups/Form';
import enzymeConfig from '../enzymeConfig';
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

    describe("Checking PropTypes", () => {
      it("Should not throw a warning", () => {
        const expectedProps = {
          exists: true,
          group: {},
          updateGroup: () => {}
        };
        const PropsError = checkProps(EditModal, expectedProps);
        expect(PropsError).toBeUndefined();
      });
    });


})
