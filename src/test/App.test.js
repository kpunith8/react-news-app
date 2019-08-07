import React from "react";
import renderer from "react-test-renderer";
import Search from '../../src/Search';
import Result from '../../src/Result';
import Adapter from 'enzyme-adapter-react-16.3';
import Enzyme, { shallow } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

const props = {
  items: [
    { title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y' },
    { title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z' },
  ],
};

describe("App", () => {

  test("Search has a valid snapshot", () => {
    const component = renderer.create(<Search>Search</Search>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Result has a valid snapshot', () => {
    const component = renderer.create(
      <Result {...props} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  // using enzyme
  it('Result shows two items in list', () => {
    const element = shallow(
      <Result {...props} />
    );
    expect(element.find('.row').length).toBe(1);
    expect(element.find('.row-item').length).toBe(2);
  });
});