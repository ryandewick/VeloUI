import { shallowMount } from '@vue/test-utils';
import VButton from '../src/index.vue';

describe('VButton', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(VButton);
    expect(wrapper.exists()).toBe(true);
  });
});
