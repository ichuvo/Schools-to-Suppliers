import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import { EditModal } from '../components/users/EditModal';
import { Form } from '../components/users/Form';
import enzymeConfig from '../enzymeConfig';
import checkProptypes from "check-prop-types";

export const checkProps = (component, expectedProps) => {
  const propsErr = checkProptypes(
    component.proptypes,
    expectedProps,
    "props",
    component.name
  );
  return propsErr;
};

describe('<Form>', function() {

    describe("Checking Propusers", () => {
      it("Should not throw a warning", () => {
        const expectedProps = {
          exists: true,
          user: {},
          updateUser: () => {},
          groups: []
        };
        const PropsError = checkProps(EditModal, expectedProps);
        expect(PropsError).toBeUndefined();
      });

    });
})
