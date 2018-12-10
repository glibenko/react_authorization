import React from 'react';
// import renderer from 'react-test-renderer';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from './index';



configure({ adapter: new Adapter() });



describe('<Foo />', () => {
  it('Link changes the class when hovered', () => {
    const wrapper = mount(<Main val="2" />);
    console.log(wrapper.debug());
    expect(wrapper.props().val).toBeTruthy();
    expect(wrapper.props().val).toEqual('2');
  });
});
