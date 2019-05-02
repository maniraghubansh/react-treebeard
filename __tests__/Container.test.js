import React from 'react';
import {shallow} from 'enzyme';

import {decorators} from '../src';
import Container from '../src/components/Decorators/Container';
import animations from '../src/themes/animations';
import data from '../example/data';
import style from '../src/themes/default';

const onClick = jest.fn();

const renderComponent = (props = {}) => {
    const wrapper = shallow(<Container
        {...{decorators, onClick, animations}}
        node={data}
        style={style.tree.node}
        {...props}
    />);
    wrapper.Toggle = () => wrapper.find('Toggle');
    wrapper.VelocityComponent = () => wrapper.find('VelocityComponent');
    return wrapper;
};

describe('<Container/>', () => {
    describe('when terminal is true', () => {
        it('should contains a decorators.Header into their children', () => {
            const wrapper = renderComponent({terminal: true});
            expect(
                wrapper
                    .children()
                    .contains(<decorators.Header node={data} style={style.tree.node.header}/>)
            ).toBe(true);
        });
    });
    describe('when terminal is false', () => {
        const wrapper = renderComponent({terminal: false});
        it('should exists VelocityComponent', () => {
            expect(wrapper.VelocityComponent().exists()).toBe(true);
        });
        describe('and animations are false', () => {
            it('should exists Toggle component', () => {
                expect(wrapper.Toggle().exists()).toBe(true);
            });
        });
    });
});