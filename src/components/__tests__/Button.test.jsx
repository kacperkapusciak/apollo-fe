import React from 'react';
import 'jest-styled-components'
import { mount, shallow } from 'enzyme'

import Button from '../Button';
import theme from '../../styles/theme';

describe('basic functionality', () => {
  it('should render', () => {
    shallow(<Button theme={theme}/>);
  });

  it('should invoke provided function on click', () => {
    const mockFunction = jest.fn();
    const component = mount(<Button theme={theme} onClick={mockFunction}/>);

    expect(mockFunction).not.toHaveBeenCalled();
    component.simulate('click');
    expect(mockFunction).toHaveBeenCalled();
  });

  it('should display provided text', () => {
    const component = shallow(<Button theme={theme}>Some text</Button>);
    expect(component.text()).toContain('Some text');
  });

  it('should have cursor set to pointer', () => {
    const component = mount(<Button theme={theme}/>);
    expect(component).toHaveStyleRule('cursor', 'pointer');
  });
});

describe('btnType styling', () => {
  it('should have "primary" styling by default', () => {
    const component = mount(<Button theme={theme}/>);
    expect(component).toHaveStyleRule('color', theme.colors.neutral[0]);
    expect(component).toHaveStyleRule('background', theme.colors.primary[600]);
  });

  it('should have "primary" styling when btnType="primary"', () => {
    const component = mount(<Button theme={theme} btnType="primary"/>);
    expect(component).toHaveStyleRule('color', theme.colors.neutral[0]);
    expect(component).toHaveStyleRule('background', theme.colors.primary[600]);
  });

  it('should have "secondary" styling when btnType="secondary"', () => {
    const component = mount(<Button theme={theme} btnType="secondary"/>);
    expect(component).toHaveStyleRule('color', theme.colors.primary[700]);
    expect(component).toHaveStyleRule('background', 'transparent');
    expect(component).toHaveStyleRule('border', `2px solid ${theme.colors.primary[700]}`);
  });

  it('should have "tertiary" styling when btnType="tertiary"', () => {
    const component = mount(<Button theme={theme} btnType="tertiary"/>);
    expect(component).toHaveStyleRule('color', theme.colors.neutral[600]);
    expect(component).toHaveStyleRule('background', 'transparent');
  });
});

describe('sizing', () => {
  it('should have "large" styling by default', () => {
    const component = mount(<Button theme={theme}/>);
    expect(component).toHaveStyleRule('height', '48px');
    expect(component).toHaveStyleRule('font-size', '18px');
  });

  it('should have "small" styling when size="sm"', () => {
    const component = mount(<Button theme={theme} size="sm"/>);
    expect(component).toHaveStyleRule('height', '40px');
    expect(component).toHaveStyleRule('font-size', '16px');
  });

  it('should have "large" styling when size="lg"', () => {
    const component = mount(<Button theme={theme} size="lg"/>);
    expect(component).toHaveStyleRule('height', '48px');
    expect(component).toHaveStyleRule('font-size', '18px');
  });
});
