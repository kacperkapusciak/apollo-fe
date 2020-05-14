import React from 'react';
import { shallow } from 'enzyme'
import DeletePoll, { Header } from '../DeletePoll';
import Button from '../../components/Button';

import { shallowWithTheme } from '../../setupTests';

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

it('should render', () => {
  shallow(<DeletePoll/>);
});

it('should have a header with message', () => {
  const component = shallowWithTheme(<DeletePoll/>);
  const header = component.find(Header);
  expect(header).toHaveLength(1);
  expect(header.text()).toEqual('Czy na pewno chcesz usunąć ankietę?')
});

it('should have two buttons', () => {
  const component = shallowWithTheme(<DeletePoll/>);
  expect(component.find(Button)).toHaveLength(2);
});

describe('buttons', () => {
  test('buttons should have texts "anuluj" and "usuń"', () => {
    const component = shallowWithTheme(<DeletePoll/>);
    const buttons = component.find(Button).map(button => button.text());
    expect(buttons).toEqual(['anuluj', 'usuń']);
  });

  test('cancel button should be small with "tertiary" styling', () => {
    const component = shallowWithTheme(<DeletePoll/>);
    const button = component.find(Button).at(0);
    expect(button.props().size).toEqual('sm');
    expect(button.props().btnType).toEqual('tertiary');
  });

  test('delete button should be small with "primary" styling', () => {
    const component = shallowWithTheme(<DeletePoll/>);
    const button = component.find(Button).at(1);
    expect(button.props().size).toEqual('sm');
    expect(button.props().btnType).toEqual('primary');
  });

  test('cancel button should close the modal', () => {
    const closeModal = jest.fn();
    const component = shallowWithTheme(<DeletePoll closeModal={closeModal}/>);
    const button = component.find(Button).at(0);
    expect(button.props().onClick).toEqual(closeModal);
  });
});

