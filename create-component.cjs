// generate-component.js
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Set up CLI prompt
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const COMPONENT_TYPES = ['atoms', 'molecules', 'organisms'];

// Convert camelCase or PascalCase to PascalCase for import compatibility
const toPascalCase = (str) =>
  str
    .split(/[-_]/) // Split by hyphen or underscore
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

// Convert component names to kebab-case for CSS class naming
const toKebabCase = (str) =>
  str
    .replace(/([a-z])([A-Z])/g, '$1-$2')  // Add dash between camelCase boundaries
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2') // Add dash between uppercase boundaries
    .toLowerCase();

rl.question('Enter the component name (PascalCase): ', (componentName) => {
  if (!componentName) {
    console.error('Component name cannot be empty.');
    rl.close();
    return;
  }

  rl.question(`Enter the component type (${COMPONENT_TYPES.join('/')}): `, (componentType) => {
    if (!COMPONENT_TYPES.includes(componentType)) {
      console.error(`Invalid component type. Choose one of: ${COMPONENT_TYPES.join(', ')}`);
      rl.close();
      return;
    }

    // Define paths
    const componentDir = path.join(__dirname, 'packages', componentName);
    const srcDir = path.join(componentDir, 'src');
    const testsDir = path.join(componentDir, 'tests');
    const storiesDir = path.join(__dirname, 'stories', componentType);

    // Convert the component name to PascalCase for variable naming
    const pascalComponentName = toPascalCase(componentName);
    // Convert the component name to kebab-case for class naming
    const kebabComponentName = toKebabCase(componentName);

    // Create directories
    [componentDir, srcDir, testsDir, storiesDir].forEach((dir) => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });

    // Create Vue component file named index.vue with SCSS support and kebab-case class names
    const componentFilePath = path.join(srcDir, `index.vue`);
    const componentContent = `<template>
  <div class="${kebabComponentName}">
    <!-- ${componentName} component -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: '${pascalComponentName}',
  props: {},
});
</script>

<style lang="scss" scoped>
.${kebabComponentName} {
  /* Add component styles here */
}
</style>
`;
    fs.writeFileSync(componentFilePath, componentContent);

    // Create index.ts file in the component directory
    const indexPath = path.join(componentDir, 'index.ts');
    const indexContent = `import ${pascalComponentName} from './src/index.vue';
export default ${pascalComponentName};
`;
    fs.writeFileSync(indexPath, indexContent);

    // Create TypeScript test file
    const testFilePath = path.join(testsDir, `${componentName}.spec.ts`);
    const testContent = `import { shallowMount } from '@vue/test-utils';
import ${pascalComponentName} from '../src/index.vue';

describe('${pascalComponentName}', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(${pascalComponentName});
    expect(wrapper.exists()).toBe(true);
  });
});
`;
    fs.writeFileSync(testFilePath, testContent);

    // Create Storybook story file with relative import path
    const storyFilePath = path.join(storiesDir, `${componentName}.stories.ts`);
    const storyContent = `import ${pascalComponentName} from '../../packages/${componentName}/src/index.vue';

export default {
  title: '${componentType.charAt(0).toUpperCase() + componentType.slice(1)}/${pascalComponentName}',
  component: ${pascalComponentName},
};

const Template = (args) => ({
  components: { ${pascalComponentName} },
  setup() {
    return { args };
  },
  template: '<${pascalComponentName} v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
`;
    fs.writeFileSync(storyFilePath, storyContent);

    console.log(`Component ${componentName} created successfully! Story created at ${storyFilePath}`);
    rl.close();
  });
});
