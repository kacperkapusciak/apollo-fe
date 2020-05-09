import Enzyme, { shallow, mount } from 'enzyme'
import { ThemeConsumer } from 'styled-components'
import Adapter from 'enzyme-adapter-react-16';

import theme from './styles/theme';

Enzyme.configure({ adapter: new Adapter() });

export const shallowWithTheme = (children) => {
  ThemeConsumer._currentValue = theme;
  return shallow(children)
};

export const mountWithTheme = (children) => {
  ThemeConsumer._currentValue = theme;
  return mount(children)
};
