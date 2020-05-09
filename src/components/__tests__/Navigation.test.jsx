import React from 'react';
import { shallow } from 'enzyme'
import Navigation, { Logo } from '../Navigation';
import Button from '../Button';

import { mountWithTheme } from '../../setupTests';

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

it('should render', () => {
  shallow(<Navigation/>);
});

describe('navigation seen by creator', () => {
  const auth = { isCreator: true };

  it('should render logo', () => {
    const component = mountWithTheme(<Navigation auth={auth}/>);
    const logo = component.find(Logo);
    expect(logo).toHaveLength(1);
  });
  it('should render "share" button', () => {
    const component = mountWithTheme(<Navigation auth={auth}/>);
    expect(component.find(Button)).toHaveLength(1);
  });
  describe('button', () => {
    it('should have text "udostępnij"', () => {
      const component = mountWithTheme(<Navigation auth={auth}/>);
      const button = component.find(Button);
      expect(button.text()).toEqual('udostępnij');
    });
    it('should have btnType="secondary" and size="lg"', () => {
      const component = mountWithTheme(<Navigation auth={auth}/>);
      const button = component.find(Button);
      expect(button.props().btnType).toEqual('secondary');
      expect(button.props().size).toEqual('lg');
    });
  });
});

describe('navigation seen by user', () => {
  const auth = { isCreator: false };

  it('should render logo', () => {
    const component = mountWithTheme(<Navigation auth={auth}/>);
    const logo = component.find(Logo);
    expect(logo).toHaveLength(1);
  });
  it('shouldn\'t render "share" button', () => {
    const component = mountWithTheme(<Navigation auth={auth}/>);
    expect(component.find(Button).exists()).toEqual(false);
  });
});

