const resolvePlugins = () => {
  const resolve = require.context('./plugins', true);

  const builtInDescriptors = ['./enum', './numeric'];

  const idToPlugin = (id: string) => ({
    id: id.replace(/^.\//, 'built-in:'),
    name: id.replace(/^.\//, ''),
    apply: resolve(id).default,
  });

  return builtInDescriptors.map(idToPlugin);
};

const PropEnhancer = {
  install: (Vue: any) => {
    Vue.mixin({
      beforeCreate() {
        const plugins = resolvePlugins();

        const props = this.$options.props || {};

        Object.entries(props).forEach(([prop, descriptor]: Array<any>) => {
          plugins.forEach(({ name, apply }) => {
            if (descriptor.hasOwnProperty(name)) {
              apply(descriptor, prop);
            }
          });
        });
      },
    });
  },
};

export default PropEnhancer;
