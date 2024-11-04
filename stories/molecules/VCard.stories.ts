import VCard from '../../packages/VCard/src/index.vue';

export default {
  title: 'Molecules/VCard',
  component: VCard,
};

const Template = (args) => ({
  components: { VCard },
  setup() {
    return { args };
  },
  template: '<VCard v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
