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
  template: '<v-button v-bind="args">Click here</v-button>',
});

export const Default = Template.bind({});
Default.args = {};
