import VButton from '../../packages/VButton/src/index.vue';

export default {
  title: 'Atoms/VButton',
  component: VButton,
};

const Template = (args) => ({
  components: { VButton },
  setup() {
    return { args };
  },
  template: '<VButton v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
