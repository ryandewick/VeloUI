import { shallowMount } from '@vue/test-utils';
import VCard from '../src/index.vue';

describe('VCard', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(VCard);
    expect(wrapper.exists()).toBe(true);
  });
});
