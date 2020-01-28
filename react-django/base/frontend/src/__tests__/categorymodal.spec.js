import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import { EditModal } from '../components/categories/EditModal';
import { Form } from '../components/categories/Form';
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
          category: {},
          updateCategory: () => {},
          updateSubcat: () => {},
          deleteSubcat: () => {}
        };
        const PropsError = checkProps(EditModal, expectedProps);
        expect(PropsError).toBeUndefined();
      });

    });
})
